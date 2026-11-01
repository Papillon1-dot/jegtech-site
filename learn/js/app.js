/* Capital Market Guide by J.E.G Technologies — app logic (routing, accounts, lessons, market). */
(function(){
"use strict";
const CFG = window.CMG_CONFIG || {};
const LIVE = !!(CFG.FIREBASE && window.firebase && firebase.initializeApp);
let auth=null, db=null;
if(LIVE){ firebase.initializeApp(CFG.FIREBASE); auth=firebase.auth(); db=firebase.firestore(); }
const ADMIN = String(CFG.ADMIN_EMAIL||"").toLowerCase();
const WA = CFG.WHATSAPP || "+234 916 277 1042";
const WA_LINK = "https://wa.me/"+WA.replace(/\D/g,"");
const root = document.getElementById("root");
const $ = s=>document.querySelector(s);
const esc = s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fmt = (n,d=2)=>(n==null||isNaN(n))?"—":Number(n).toLocaleString("en-NG",{minimumFractionDigits:d,maximumFractionDigits:d});
const ls = { get(k){ try{return JSON.parse(localStorage.getItem(k)||"null");}catch(e){return null;} }, set(k,v){ try{localStorage.setItem(k,JSON.stringify(v));}catch(e){} } };
const sleep = ms=>new Promise(r=>setTimeout(r,ms));

const st = { user:null, profile:null, done:{}, cur:0, games:{}, market:null, isAdmin:false, pending:null, ready:false };
const SEED_MARKET = {asOfLabel:"Friday, 23 October 2026", asi:247222.27, asiPrev:244956.94, asiChg:0.92, mcap:"160.52trn", volume:"611.66m", deals:"33,540", value:"—",
  source:"NGX daily trading data as reported by Nairametrics, 23 Oct 2026", note:"Shares closed the week higher, led by Dangote Cement and FirstHoldCo.",
  gainers:[{sym:"DANGCEM",name:"Dangote Cement",price:1111,chg:10},{sym:"FIRSTHOLDCO",name:"First HoldCo",price:144.1,chg:10},{sym:"GUINEAINS",name:"Guinea Insurance",price:0.93,chg:9.41},{sym:"FIDELITYBK",name:"Fidelity Bank",price:24,chg:9.09},{sym:"FTNCOCOA",name:"FTN Cocoa Processors",price:7.92,chg:5.6}],
  losers:[{sym:"LIVESTOCK",name:"Livestock Feeds",price:17.05,chg:-9.79},{sym:"TRIPPLEG",name:"Tripple Gee and Company",price:2.82,chg:-8.74},{sym:"UPDCREIT",name:"UPDC REIT",price:17.5,chg:-8.14},{sym:"HBMNG",name:"HBM Nigeria",price:350,chg:-7.65},{sym:"NEIMETH",name:"Neimeth Pharmaceuticals",price:7.1,chg:-6.58}]};

/* Levels: group the 8 modules into 3 friendly stages */
const LEVELS = [
  {n:1, name:"Starter", about:"Money basics in plain English", mods:[0,1], color:"var(--emerald)"},
  {n:2, name:"Explorer", about:"How buying and selling shares works", mods:[2,3,4], color:"var(--navy-2)"},
  {n:3, name:"Pro", about:"Read companies and the market like an expert", mods:[5,6,7], color:"#B07D12"}
];
const lessonsOfLevel = lv => LESSONS.map((l,i)=>lv.mods.includes(l.m)?i:-1).filter(i=>i>=0);
const levelOfLesson = i => LEVELS.find(lv=>lv.mods.includes(LESSONS[i].m));
const lessonPoints = ()=>Object.values(st.done).reduce((a,d)=>a+(d.score||0)*10,0);
const gamePoints = ()=>Object.values(st.games||{}).reduce((a,g)=>a+(g.pts||0),0);
const points = ()=>lessonPoints()+gamePoints();
const doneCount = ()=>Object.keys(st.done).length;
const unlocked = i => i===0 || !!st.done[i-1];

/* ---------- icons ---------- */
const MARK = `<svg viewBox="0 0 120 120" aria-hidden="true"><path d="M67.6 16.7A44 44 0 1 0 104 60" fill="none" stroke="currentColor" stroke-width="14"/><path d="M111 60H86" fill="none" stroke="currentColor" stroke-width="14"/><path d="M60 60 91 29M80 28h12v12" fill="none" stroke="#12A67A" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="56" cy="64" r="8" fill="#12A67A"/></svg>`;
const I = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
  learn:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/><path d="M9 7h6"/></svg>',
  play:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="12" rx="5"/><path d="M7 11v4M5 13h4"/><circle cx="16" cy="12" r="1"/><circle cx="18" cy="14" r="1"/></svg>',
  market:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></svg>',
  help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14"/><circle cx="12" cy="17.5" r=".6" fill="currentColor"/></svg>',
  wa:'<svg viewBox="0 0 32 32" fill="#fff"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5 1-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.8 1.2 3.2 1.4 3.5c.2.2 2.4 3.6 5.8 5 2.1.9 3 1 4 .8.7-.1 1.9-.8 2.2-1.5s.3-1.4.2-1.5c-.1-.2-.3-.3-.6-.4z"/></svg>',
  check:'✓'
};

/* ---------- router ---------- */
const PUBLIC = ["", "join", "signin", "reset"];
function route(){ const h=location.hash.replace(/^#\/?/,""); const [p,arg]=h.split("/"); return {p:p||"", arg}; }
function go(path){ if(location.hash!=="#/"+path) location.hash="#/"+path; else render(); }
window.addEventListener("hashchange", ()=>render());
let menuOpen=false;

async function render(){
  if(!st.ready) return;
  const {p,arg}=route();
  window.scrollTo(0,0); menuOpen=false;
  if(!st.user && !PUBLIC.includes(p) && p!=="verify"){ return go("signin"); }
  if(st.user && st.profile && st.profile.passcodeSet && (p===""||p==="join"||p==="signin")){ return go("home"); }
  switch(p){
    case "": return viewLanding();
    case "join": return viewJoin();
    case "signin": return viewSignin();
    case "reset": return viewReset();
    case "verify": return viewVerify();
    case "passcode": return viewPasscode();
    case "welcome": return viewWelcome(+arg||0);
    case "home": return shell("home", viewHome());
    case "learn": return shell("learn", viewLearn());
    case "lesson": return shell("learn", viewLesson(Math.max(0,Math.min(LESSONS.length-1, +arg||0))), ()=>bindLesson(+arg||0));
    case "play": return shell("play", viewPlay(arg), ()=>bindPlay(arg));
    case "market": return shell("market", viewMarket(), bindMarket);
    case "help": return shell("help", viewHelp());
    case "learners": return shell("home", `<div id="lrn"><p class="muted">Loading learners…</p></div>`, loadLearners);
    default: return go(st.user?"home":"");
  }
}

/* ---------- public: landing ---------- */
function topbar(){ return `<div class="strip"><div class="wrap"><a href="#/join">New: 4 free mini games to practise investing <em>Play now →</em></a></div></div>
  <header class="topbar" id="tb"><div class="wrap"><a class="lockup" href="#/">${MARK}<span><b>Capital Market Guide</b><small>by J.E.G Technologies</small></span></a>
  <nav><a class="txtlink" href="#/signin">Sign in</a><a class="btn btn-sm" href="#/join">Get started <span class="chev">»</span></a></nav></div></header>`; }
const SB_ICONS = `<span class="ic"><svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx=".8" fill="#0B1F33"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8" fill="#0B1F33"/><rect x="10" y="3" width="3" height="9" rx=".8" fill="#0B1F33"/><rect x="15" y="0" width="3" height="12" rx=".8" fill="#0B1F33"/></svg><svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.4 6.8a6.5 6.5 0 0 1 9.2 0L11.2 8.2a4.5 4.5 0 0 0-6.4 0zM1.2 4.6a9.6 9.6 0 0 1 13.6 0L13.4 6a7.6 7.6 0 0 0-10.8 0z" fill="#0B1F33"/></svg><svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="#0B1F33" opacity=".4"/><rect x="2" y="2" width="17" height="9" rx="2" fill="#0B1F33"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="#0B1F33" opacity=".4"/></svg></span>`;
function phoneScreen(m){
  const up=Number(m.asiChg)>=0, C=2*Math.PI*31;
  return `<div class="scr-in">
    <div class="sb"><span>9:41</span>${SB_ICONS}</div>
    <div class="ps">
      <div class="ps-top"><div><small>Good morning,</small><b>Goodnews</b></div><span class="ps-pts">60 pts</span></div>
      <div class="ps-cont"><div><small>Level 1 · Starter</small><h4>Why companies sell shares</h4><span class="go">Continue</span></div>
        <svg class="ps-ring" viewBox="0 0 78 78"><circle cx="39" cy="39" r="31" stroke="#1C3D5C"/><circle cx="39" cy="39" r="31" stroke="#2BC48F" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C*.78}" transform="rotate(-90 39 39)"/><text x="39" y="45" text-anchor="middle" fill="#F6F4EE" font-size="17" font-weight="700" font-family="Hanken Grotesk">22%</text></svg></div>
      <div class="ps-grid">
        <div class="ps-tile"><i style="background:var(--gain-soft);color:var(--emerald-dark)">${I.learn}</i><b>Lessons</b><span>2 of ${LESSONS.length} done</span></div>
        <div class="ps-tile"><i style="background:#E3E9EF;color:var(--navy)">${I.play}</i><b>Play</b><span>Learn with games</span></div>
      </div>
      <div class="ps-mkt"><div><small>NGX All-Share</small><b>${fmt(m.asi)}</b><small class="${up?"up":"down"}" style="font-weight:700">${up?"▲ +":"▼ "}${fmt(m.asiChg)}% today</small></div>
        <svg class="spark" viewBox="0 0 110 40"><path d="M2 32 L14 28 L24 30 L36 22 L48 24 L58 16 L70 19 L82 11 L94 13 L108 5" fill="none" stroke="${up?"#12A67A":"#B4372A"}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    </div>
    <div class="ps-tab"><span class="on">${I.home}Home</span><span>${I.learn}Learn</span><span>${I.play}Play</span><span>${I.market}Market</span></div>
  </div>`;
}
function viewLanding(){
  const m=st.market||SEED_MARKET, up=Number(m.asiChg)>=0;
  const appIcon=MARK.replace(/stroke="currentColor"/g,'stroke="#F6F4EE"');
  const GM=window.CMG_GAMES||{};
  root.innerHTML = `<div class="screen">${topbar()}
  <main>
    <section class="hero2"><div class="wrap">
      <span class="tagpill glass">Free · For complete beginners</span>
      <h1>The stock market, <em>made simple</em></h1>
      <p class="lead">Short, friendly lessons and fun games that take you from “what is a share?” to understanding the Nigerian Exchange.</p>
      <div class="ctas"><a class="btn btn-em" href="#/join">Start learning free <span class="chev">»</span></a><a class="btn btn-glass" href="#/signin">I have an account</a></div>
      <div class="stage" aria-hidden="true">
        <div class="iphone"><span class="btn-side b1"></span><span class="btn-side b2"></span><span class="btn-side b3"></span><span class="btn-side b4"></span>
          <div class="scr"><div class="island"></div>${phoneScreen(m)}</div></div>
        <div class="note n1"><span class="app">${appIcon}</span><div><b>Lesson 2 unlocked</b><span>You scored 3/3. Nice work!</span></div><span class="t">now</span></div>
        <div class="note n2"><span class="app">${appIcon}</span><div><b>Market closed ${up?"higher":"lower"}</b><span>All-Share ${up?"+":""}${fmt(m.asiChg)}%. Tap to see why.</span></div><span class="t">2m</span></div>
      </div>
    </div></section>

    <section class="state"><div class="wrap">
      <span class="tagpill soft">Learn at your own pace</span>
      <h2>Understand money <em>before</em> you invest it</h2>
      <p>Many people hear about shares from friends or social media and jump in blind. We help you learn the basics first, in plain English, so you can make your own decisions with confidence.</p>
      <a class="btn" href="#/join">Start learning <span class="chev">»</span></a>
    </div></section>

    <section class="wrap cards">
      <div class="bigcard navy">
        <div><span class="tagpill glass">Learn</span><h3>${LESSONS.length} bite-size lessons</h3><p>Five minutes each. One idea at a time, with real Nigerian examples like MTN, Dangote and your local market. A quick quiz after every lesson.</p><a class="btn btn-light" href="#/join">Take lesson 1 <span class="chev">»</span></a></div>
        <div class="art"><div class="art-card"><small class="eyebrow">Lesson 1</small><h4>What a share actually is</h4><p>Imagine you and four friends buy a shop together. Each of you owns one fifth.</p><div class="k"><b>Remember</b>A share is a small piece of a company. Own a piece, share in its success.</div></div></div>
      </div>
      <div class="bigcard green">
        <div><span class="tagpill glass">Play</span><h3>4 games to practise</h3><p>Guess where prices go, match market words, spot scams and build a pretend basket of companies. No real money, just points.</p><a class="btn btn-light" href="#/join">Play free <span class="chev">»</span></a></div>
        <div class="art"><div class="games-mini">${Object.values(GM).map(g=>`<div><i style="color:${g.color}">${g.icon}</i><b>${g.title}</b><span>${g.time}</span></div>`).join("")}</div></div>
      </div>
      <div class="bigcard paper">
        <div><span class="tagpill soft">Follow</span><h3>The real market, <em>in simple words</em></h3><p>A daily look at the Nigerian Exchange: what went up, what went down, and what it means for someone just starting.</p><a class="btn" href="#/join">See today's market <span class="chev">»</span></a></div>
        <div class="art"><div class="art-card"><small class="muted">NGX All-Share Index</small><div class="art-big">${fmt(m.asi)}</div><b class="${up?"up":"down"}">${up?"▲ +":"▼ "}${fmt(m.asiChg)}%</b>
          ${(m.gainers||[]).slice(0,2).map(g=>`<div class="art-mv"><span><b>${esc(g.name)}</b></span><span class="up" style="font-weight:700">+${fmt(g.chg)}%</span></div>`).join("")}</div></div>
      </div>
    </section>

    <section class="path"><div class="wrap">
      <div class="sec-c"><span class="tagpill soft">Your path</span><h2>Start as a beginner. <em>Grow into a pro.</em></h2><p>The words get more professional only when you are ready for them.</p></div>
      <div class="path-line">
        ${LEVELS.map(lv=>`<div class="lvl"><i style="background:${lv.color}">${lv.n}</i><h3>${lv.name}</h3><p>${lv.about}.</p><small>${lessonsOfLevel(lv).length} lessons</small></div>`).join("")}
      </div>
    </div></section>

    <section class="teaser"><div class="wrap">
      <div class="sec-c"><span class="tagpill soft">Try it now</span><h2>One quick question</h2><p>This is how every lesson ends. Pick an answer and see.</p></div>
      <div class="tq">
        <p class="tq-q">If you buy a share of MTN, what do you get?</p>
        <div class="tq-opts" id="tq">
          <button type="button" data-ok="0">A free SIM card</button>
          <button type="button" data-ok="1">A small piece of the company</button>
          <button type="button" data-ok="0">A loan you must pay back</button>
        </div>
        <p class="tq-fb" id="tqfb" hidden></p>
      </div>
    </div></section>

    <section class="band"><div class="wrap">
      <h2>Your money journey starts <em>today</em></h2>
      <p>Free to join. Your first lesson takes five minutes.</p>
      <a class="btn btn-em" href="#/join">Create my free account <span class="chev">»</span></a>
    </div></section>
  </main>
  <footer class="foot"><div class="wrap"><span>© 2026 J.E.G Technologies, a division of Emedom Industries Limited. For learning only, not investment advice.</span>
    <nav><a href="/">J.E.G Technologies</a><a href="https://aicfo.jegtech.com.ng">AI CFO</a><a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp ${esc(WA)}</a></nav></div></footer>
  <a class="fab-wa home-wa" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${I.wa}</a>
  </div>`;
  const tb=$("#tb"); const onS=()=>tb&&tb.classList.toggle("scrolled",scrollY>8); addEventListener("scroll",onS,{passive:true}); onS();
  document.querySelectorAll("#tq button").forEach(b=>b.onclick=()=>{
    document.querySelectorAll("#tq button").forEach(x=>{x.classList.remove("right","wrong"); if(x.dataset.ok==="1") x.classList.add("right");});
    if(b.dataset.ok!=="1") b.classList.add("wrong");
    const fb=$("#tqfb"); fb.hidden=false;
    fb.innerHTML = (b.dataset.ok==="1"?'<b class="up">You got it.</b> ':'<b class="down">Not quite.</b> ')+"A share is a small piece of a company. If the company does well, your piece can grow in value. That's lesson 1. <a class='linkish' href='#/join'>Start free</a>";
  });
}

/* ---------- public: auth pages ---------- */
function authLayout(sideTitle, sideText, steps, panel){
  root.innerHTML = `<div class="split screen">
    <aside class="side on-navy">
      <a class="lockup" href="#/">${MARK.replace('stroke="currentColor"','stroke="#F6F4EE"').replace('stroke="currentColor"','stroke="#F6F4EE"')}<span><b>Capital Market Guide</b><small>by J.E.G Technologies</small></span></a>
      <div class="side-copy"><h1>${sideTitle}</h1><p>${sideText}</p></div>
      ${steps?`<ol class="side-list">${steps}</ol>`:""}
    </aside>
    <main class="panel">${panel}</main></div>`;
}
const joinSteps = n => ["Tell us your name","Confirm your email","Choose a passcode"].map((t,i)=>`<li class="${i<n?"done":i===n?"now":""}"><i>${i<n?"✓":i+1}</i>${t}</li>`).join("");
const msgBox = (m,ok)=> m?`<p class="msg ${ok?"ok":"err"}">${esc(m)}</p>`:"";
function busy(btn,on,label){ if(!btn) return; btn.disabled=on; if(on){btn.dataset.t=btn.textContent; btn.textContent=label||"Please wait…";} else if(btn.dataset.t) btn.textContent=btn.dataset.t; }

function viewJoin(msg){
  authLayout("Start your money journey today.","It's free. In a few minutes you'll take your first lesson.", joinSteps(0), `
    <a class="back" href="#/">← Back</a>
    <form class="card-form" id="fJoin" novalidate>
      <div><span class="eyebrow">Step 1 of 3</span><h2 style="margin-top:6px">Create your free account</h2></div>
      <div class="field"><label for="jName">Your full name</label><input class="input" id="jName" autocomplete="name" placeholder="e.g. Goodnews Jackson" required></div>
      <div class="field"><label for="jPhone">Phone number</label><input class="input" id="jPhone" type="tel" autocomplete="tel" placeholder="e.g. 0803 123 4567" required></div>
      <div class="field"><label for="jEmail">Email address</label><input class="input" id="jEmail" type="email" autocomplete="email" placeholder="you@gmail.com" required><span class="hint">We'll send a link here to confirm it's really you.</span></div>
      <div class="field"><label for="jLevel">How much do you know about shares?</label><select class="input" id="jLevel"><option>Nothing yet, I'm brand new</option><option>A little</option><option>I have bought shares before</option></select></div>
      ${msgBox(msg)}
      <button class="btn btn-em btn-block" id="jBtn" type="submit">Continue</button>
      <p class="hint" style="font-size:13px;color:var(--slate)">This is for learning only. We will never ask for your bank details.</p>
    </form>
    <p class="switch">Already have an account? <a href="#/signin">Sign in</a></p>`);
  $("#fJoin").addEventListener("submit", async e=>{ e.preventDefault();
    const p={name:$("#jName").value.trim(), phone:$("#jPhone").value.trim(), email:$("#jEmail").value.trim().toLowerCase(), level:$("#jLevel").value};
    if(p.name.length<2) return viewJoin("Please enter your full name.");
    if((p.phone.match(/\d/g)||[]).length<10) return viewJoin("Please enter a phone number with at least 10 digits.");
    if(!/^\S+@\S+\.\S+$/.test(p.email)) return viewJoin("That email address doesn't look right.");
    busy($("#jBtn"),true,"Creating your account…"); await startSignup(p); });
}
function viewSignin(msg, ok, email){
  authLayout("Welcome back.","Pick up exactly where you stopped, on any phone or laptop.", "", `
    <a class="back" href="#/">← Back</a>
    <form class="card-form" id="fIn" novalidate>
      <h2>Sign in</h2>
      <div class="field"><label for="sEmail">Email address</label><input class="input" id="sEmail" type="email" autocomplete="email" value="${esc(email||ls.get("cmg-last-email")||"")}" required></div>
      <div class="field"><label for="sPin">Passcode</label><input class="input pin" id="sPin" type="password" inputmode="numeric" autocomplete="current-password" placeholder="••••••" required></div>
      ${msgBox(msg,ok)}
      <button class="btn btn-em btn-block" id="sBtn" type="submit">Sign in</button>
      <a class="linkish" href="#/reset" style="justify-self:start">Forgot your passcode?</a>
    </form>
    <p class="switch">New here? <a href="#/join">Create a free account</a></p>`);
  $("#fIn").addEventListener("submit", async e=>{ e.preventDefault(); busy($("#sBtn"),true); await signIn($("#sEmail").value.trim().toLowerCase(), $("#sPin").value.trim()); });
}
function viewReset(msg, ok){
  authLayout("No wahala.","We'll email you a link to choose a new passcode.", "", `
    <a class="back" href="#/signin">← Back to sign in</a>
    <form class="card-form" id="fRe" novalidate>
      <h2>Reset your passcode</h2>
      <p class="muted">Enter your email. Open the link we send, type a new 6-digit passcode, then come back and sign in.</p>
      <div class="field"><label for="rEmail">Email address</label><input class="input" id="rEmail" type="email" autocomplete="email" value="${esc(ls.get("cmg-last-email")||"")}" required></div>
      ${msgBox(msg,ok)}
      <button class="btn btn-em btn-block" id="rBtn" type="submit">Send reset link</button>
    </form>`);
  $("#fRe").addEventListener("submit", async e=>{ e.preventDefault(); busy($("#rBtn"),true); await startReset($("#rEmail").value.trim().toLowerCase()); });
}
let pollT=null, coolUntil=0;
function viewVerify(msg, ok){
  if(!st.user) return go("signin");
  authLayout("Almost there.","Confirming your email keeps your account and progress safe.", joinSteps(1), `
    <div class="card-form">
      <div class="mail-art"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0E8A65" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></div>
      <div><span class="eyebrow">Step 2 of 3</span><h2 style="margin-top:6px">Check your email</h2></div>
      <p class="muted">We sent a link to <b style="color:var(--navy)">${esc(st.user.email)}</b>. Open the email and tap the link. This page will move on by itself.</p>
      <p class="muted" style="font-size:14px">Can't find it? Check your <b>Spam</b> or <b>Promotions</b> folder. It comes from noreply@…firebaseapp.com.</p>
      ${msgBox(msg,ok)}
      <button class="btn btn-em btn-block" id="vDone" type="button">I've confirmed my email</button>
      <p style="font-size:14.5px"><button class="linkish" id="vRe" type="button">Send the email again</button> <span id="vWait" class="muted"></span> · <button class="linkish" id="vOut" type="button">Use a different email</button></p>
    </div>`);
  const tick=()=>{ const b=$("#vRe"), w=$("#vWait"); if(!b) return; const left=Math.ceil((coolUntil-Date.now())/1000); if(left>0){ b.disabled=true; w.textContent="(in "+left+"s)"; setTimeout(tick,1000);} else { b.disabled=false; w.textContent=""; } }; tick();
  $("#vDone").onclick=async()=>{ busy($("#vDone"),true,"Checking…"); if(!(await checkVerified())) viewVerify("Not confirmed yet. Tap the link in the email first."); };
  $("#vRe").onclick=async()=>{ const ok=await sendVerify(); viewVerify(ok?"A new email is on its way.":lastErr, ok); };
  $("#vOut").onclick=async()=>{ clearInterval(pollT); await auth.signOut(); st.user=null; go("join"); };
  clearInterval(pollT); pollT=setInterval(()=>{ if(route().p==="verify" && document.visibilityState==="visible") checkVerified(); else if(route().p!=="verify") clearInterval(pollT); },5000);
}
function viewPasscode(msg){
  if(!st.user) return go("signin");
  const need=!(st.profile&&st.profile.full_name);
  authLayout("Last step!","Your passcode is how you'll sign in from now on.", joinSteps(2), `
    <form class="card-form" id="fPin" novalidate>
      <div><span class="eyebrow">Step 3 of 3</span><h2 style="margin-top:6px">Choose your passcode</h2></div>
      <p class="muted">Pick 6 numbers you'll remember. Next time, just enter your email and this passcode.</p>
      ${need?`<div class="field"><label for="pName">Your full name</label><input class="input" id="pName" autocomplete="name" required></div>
      <div class="field"><label for="pPhone">Phone number</label><input class="input" id="pPhone" type="tel" autocomplete="tel" required></div>`:""}
      <div class="field"><label for="p1">Passcode (6 numbers)</label><input class="input pin" id="p1" type="password" inputmode="numeric" maxlength="6" autocomplete="new-password" required></div>
      <div class="field"><label for="p2">Type it again</label><input class="input pin" id="p2" type="password" inputmode="numeric" maxlength="6" autocomplete="new-password" required></div>
      ${msgBox(msg)}
      <button class="btn btn-em btn-block" id="pBtn" type="submit">Save and continue</button>
    </form>`);
  $("#fPin").addEventListener("submit", async e=>{ e.preventDefault();
    const a=$("#p1").value.trim(), b=$("#p2").value.trim();
    if(need){ const ph=$("#pPhone").value.trim(); if((ph.match(/\d/g)||[]).length<10) return viewPasscode("Please enter a phone number with at least 10 digits.");
      st.pending={...(st.pending||{}), name:$("#pName").value.trim(), phone:ph}; }
    if(!/^\d{6}$/.test(a)) return viewPasscode("Use exactly 6 numbers.");
    if(/^(\d)\1{5}$/.test(a)||a==="123456"||a==="654321") return viewPasscode("That one is too easy to guess. Try different numbers.");
    if(a!==b) return viewPasscode("The two passcodes are not the same.");
    busy($("#pBtn"),true,"Saving…"); await setPasscode(a); });
}

/* ---------- welcome story (first time) ---------- */
const STORY = [
  {t:"Meet Ada.", p:"Ada sells hair products in Port Harcourt. Every month she keeps ₦10,000 in a box under her bed.", art:"box"},
  {t:"But prices keep rising.", p:"A year later, Ada's ₦120,000 buys less than before. Her money is sleeping while prices climb.", art:"price"},
  {t:"Then Ada discovers shares.", p:"Her friend explains: a share is a small piece of a real company, like MTN or Dangote. When the company grows, your piece can grow too.", art:"pie"},
  {t:"Now it's your turn.", p:"Like Ada, you'll learn one small step at a time. No big grammar. No pressure. Ready?", art:"steps"}
];
function storyArt(k){
  const a={
    box:`<svg viewBox="0 0 200 160" width="210"><rect x="45" y="70" width="110" height="70" rx="8" fill="#12304B"/><rect x="45" y="70" width="110" height="18" rx="6" fill="#1C3D5C"/><g class="coin"><circle cx="100" cy="45" r="20" fill="#E8B547"/><text x="100" y="52" text-anchor="middle" font-size="20" font-weight="700" fill="#7a5a12">₦</text></g><circle cx="70" cy="58" r="8" fill="#2BC48F" opacity=".6"/><circle cx="135" cy="52" r="6" fill="#2BC48F" opacity=".5"/></svg>`,
    price:`<svg viewBox="0 0 200 160" width="210"><path d="M20 130 L60 115 L95 100 L130 70 L175 30" fill="none" stroke="#E8B547" stroke-width="6" stroke-linecap="round"/><path d="M165 28 L178 28 L178 42" fill="none" stroke="#E8B547" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><rect x="25" y="135" width="150" height="4" rx="2" fill="#1C3D5C"/><text x="40" y="60" font-size="14" fill="#AFC0CF" font-family="IBM Plex Mono">prices ↑</text></svg>`,
    pie:`<svg viewBox="0 0 200 160" width="210"><circle cx="100" cy="82" r="56" fill="#12304B"/><path d="M100 82 L100 26 A56 56 0 0 1 152 64 Z" fill="#2BC48F"/><g transform="translate(12,-10)"><path d="M100 82 L100 26 A56 56 0 0 1 152 64 Z" fill="#12A67A" opacity=".0"/></g><text x="122" y="56" font-size="13" font-weight="700" fill="#0B1F33" font-family="IBM Plex Sans">you</text></svg>`,
    steps:`<svg viewBox="0 0 200 160" width="210"><rect x="30" y="115" width="40" height="25" rx="4" fill="#1C3D5C"/><rect x="80" y="90" width="40" height="50" rx="4" fill="#12304B"/><rect x="130" y="60" width="40" height="80" rx="4" fill="#12A67A"/><circle cx="150" cy="40" r="12" fill="#E8B547"/><path d="M144 40 l4 4 8-8" stroke="#0B1F33" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`
  }; return a[k]||"";
}
function viewWelcome(i){
  i=Math.max(0,Math.min(STORY.length-1,i)); const s=STORY[i], last=i===STORY.length-1;
  const first=(st.profile&&st.profile.full_name||"").split(" ")[0];
  root.innerHTML = `<div class="story"><div class="story-card">
    <div class="story-art">${storyArt(s.art)}</div>
    <div class="story-body story-slide">
      ${i===0?`<span class="eyebrow">Welcome${first?", "+esc(first):""}! A 30-second story</span>`:`<span class="eyebrow">Story · ${i+1} of ${STORY.length}</span>`}
      <h2>${s.t}</h2><p>${s.p}</p>
      <div class="story-nav">
        <div class="story-dots">${STORY.map((_,k)=>`<i class="${k===i?"on":""}"></i>`).join("")}</div>
        <div style="display:flex;gap:8px">${i>0?`<a class="btn btn-ghost btn-sm" href="#/welcome/${i-1}">Back</a>`:`<button class="btn btn-ghost btn-sm" id="skip" type="button">Skip</button>`}
        ${last?`<button class="btn btn-em btn-sm" id="startL" type="button">Start lesson 1 →</button>`:`<a class="btn btn-em btn-sm" href="#/welcome/${i+1}">Next</a>`}</div>
      </div>
    </div></div></div>`;
  const fin=async(to)=>{ ls.set("cmg-seen-story-"+(st.user&&st.user.uid),true); try{ if(LIVE) await db.collection("profiles").doc(st.user.uid).set({storySeen:true},{merge:true}); }catch(e){} go(to); };
  const sk=$("#skip"); if(sk) sk.onclick=()=>fin("home");
  const sl=$("#startL"); if(sl) sl.onclick=()=>fin("lesson/0");
}

/* ---------- app shell ---------- */
function shell(tab, body, after){
  const n=(st.profile&&st.profile.full_name)||"", ini=(n.trim()[0]||"?").toUpperCase();
  const tabs=[["home","Home",I.home],["learn","Learn",I.learn],["play","Play",I.play],["market","Market",I.market]];
  root.innerHTML = `<header class="appbar on-navy"><div class="wrap">
      <a class="lockup" href="#/home">${MARK.replace(/stroke="currentColor"/g,'stroke="#F6F4EE"')}<span><b>Capital Market Guide</b><small>by J.E.G Technologies</small></span></a>
      <nav class="appnav">${tabs.map(t=>`<a href="#/${t[0]}" class="${tab===t[0]?"on":""}">${t[1]}</a>`).join("")}<a href="#/help" class="${tab==="help"?"on":""}">Help</a></nav>
      <div class="app-right"><span class="pts">${points()} pts</span><button class="avatar" id="av" aria-label="Account menu">${esc(ini)}</button></div>
    </div><div class="menu" id="menu" hidden>
      <div style="padding:8px 12px 10px;border-bottom:1px solid var(--rule-soft);margin-bottom:4px"><b>${esc(n||"Learner")}</b><div class="muted" style="font-size:13px">${esc(st.user&&st.user.email||"")}</div></div>
      <a href="#/help">Help &amp; WhatsApp</a>
      <a href="#/welcome/0">Watch the welcome story</a>
      ${st.isAdmin?`<a href="#/learners">Learners (admin)</a><a href="#/market">Update market (admin)</a>`:""}
      <button id="out" type="button">Sign out</button>
    </div></header>
    <main class="wrap app-main screen">${body}</main>
    <nav class="tabbar" aria-label="Main">${tabs.map(t=>`<a href="#/${t[0]}" class="${tab===t[0]?"on":""}">${t[2]}<span>${t[1]}</span></a>`).join("")}</nav>
    <a class="fab-wa" href="${WA_LINK}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${I.wa}</a>`;
  $("#av").onclick=e=>{ e.stopPropagation(); const m=$("#menu"); m.hidden=!m.hidden; };
  document.addEventListener("click",()=>{ const m=$("#menu"); if(m) m.hidden=true; },{once:true});
  $("#out").onclick=signOut;
  if(after) after();
}

/* ---------- dashboard ---------- */
function viewHome(){
  const first=(st.profile&&st.profile.full_name||"").split(" ")[0]||"there";
  const n=doneCount(), total=LESSONS.length, pct=Math.round(n/total*100);
  const i=Math.min(st.cur, total-1), l=LESSONS[i], lv=levelOfLesson(i);
  const C=2*Math.PI*42, off=C*(1-n/total);
  const hr=new Date().getHours(), hi=hr<12?"Good morning":hr<17?"Good afternoon":"Good evening";
  const tips=["A share is a small piece of a company. Own a piece, share in its success.","Never put money you need for rent or food into shares.","Shares can go down as well as up. That's normal. Patience matters.","Spread your money across different companies. Don't put all your eggs in one basket.","If anyone promises you guaranteed profit on shares, be careful. It's likely a scam."];
  const tip=tips[new Date().getDate()%tips.length];
  return `<div class="greet"><span class="muted">${hi},</span><h1>${esc(first)} 👋</h1></div>
  <section class="cont">
    <div>
      <span class="eyebrow">${n===0?"Start here":"Continue learning"} · Level ${lv.n} ${lv.name}</span>
      <h2>Lesson ${i+1}: ${esc(l.t)}</h2>
      <p>${n===0?"Your first lesson takes about 5 minutes.":`You've finished ${n} of ${total} lessons. Keep going!`}</p>
      <a class="btn btn-em" style="margin-top:16px" href="#/lesson/${i}">${n===0?"Start lesson 1":"Continue"} →</a>
    </div>
    <svg class="ring" viewBox="0 0 100 100" aria-label="${pct}% complete"><circle class="bg" cx="50" cy="50" r="42"/><circle class="fg" cx="50" cy="50" r="42" stroke-dasharray="${C}" stroke-dashoffset="${off}" transform="rotate(-90 50 50)"/><text x="50" y="57" text-anchor="middle">${pct}%</text></svg>
  </section>
  <div class="tiles">
    <a class="tile" href="#/learn"><span class="ico" style="background:var(--gain-soft);color:var(--emerald-dark)">${I.learn}</span><b>Lessons</b><span>${n}/${total} done</span></a>
    <a class="tile" href="#/play"><span class="soon" style="background:var(--gain-soft);color:var(--emerald-dark)">New</span><span class="ico" style="background:#E3E9EF;color:var(--navy)">${I.play}</span><b>Play</b><span>${gamePoints()} game points</span></a>
    <a class="tile" href="#/market"><span class="ico" style="background:var(--sun-soft);color:#7a5a12">${I.market}</span><b>Market</b><span>Today's prices</span></a>
    <a class="tile" href="#/help"><span class="ico" style="background:#EDE9E0;color:var(--slate)">${I.help}</span><b>Help</b><span>Ask us anything</span></a>
  </div>
  <div class="tip"><span style="font-size:22px">💡</span><div><b>Tip of the day</b><p class="muted" style="margin-top:4px">${tip}</p></div></div>`;
}

/* ---------- learn ---------- */
function viewLearn(){
  return `<div class="page-h"><span class="eyebrow">Your path</span><h1>Lessons</h1><p class="muted">Three levels. Finish one lesson to unlock the next.</p></div>
  ${LEVELS.map(lv=>{
    const ids=lessonsOfLevel(lv), d=ids.filter(i=>st.done[i]).length, open=unlocked(ids[0]);
    const isCur=ids.includes(st.cur);
    return `<section class="level">
      <button class="level-h" type="button" data-lv="${lv.n}" aria-expanded="${isCur||(!open?false:d<ids.length&&d>0)}">
        <span class="level-badge" style="background:${lv.color}">${lv.n}</span>
        <span><b>Level ${lv.n} · ${lv.name}</b><span>${lv.about}</span><span class="lbar"><i style="width:${Math.round(d/ids.length*100)}%"></i></span></span>
        <span class="lock">${open?`${d}/${ids.length}`:"🔒 Locked"}</span>
      </button>
      <div class="lessons" ${isCur?"":"hidden"}>${ids.map(i=>{ const ok=unlocked(i), dn=st.done[i];
        return `<button class="lrow ${dn?"done":""} ${i===st.cur?"cur":""}" ${ok?"":"disabled"} data-i="${i}" type="button"><span class="lnum">${dn?"✓":i+1}</span><span>${esc(LESSONS[i].t)}</span><span class="st">${dn?dn.score+"/3":ok?"Start":"🔒"}</span></button>`; }).join("")}</div>
    </section>`; }).join("")}`;
}
document.addEventListener("click", e=>{
  const h=e.target.closest(".level-h"); if(h){ const list=h.nextElementSibling; list.hidden=!list.hidden; h.setAttribute("aria-expanded",!list.hidden); return; }
  const r=e.target.closest(".lrow"); if(r && !r.disabled){ go("lesson/"+r.dataset.i); }
});

function viewLesson(i){
  if(!unlocked(i)) { setTimeout(()=>go("lesson/"+st.cur),0); return ""; }
  const l=LESSONS[i], lv=levelOfLesson(i), d=st.done[i];
  if(st.cur!==i){ st.cur=i; persist(); }
  return `<article class="reader">
    <div class="reader-top"><a class="back" href="#/learn">← All lessons</a><span class="eyebrow">Lesson ${i+1} of ${LESSONS.length}</span></div>
    <span class="eyebrow" style="color:var(--emerald-dark)">Level ${lv.n} · ${lv.name} · ${esc(MODULES[l.m])}</span>
    <h1>${esc(l.t)}</h1>
    <div class="body">${l.body}</div>
    <form class="quiz" id="quiz">
      <div><span class="eyebrow">Quick check</span><h2 style="margin-top:4px">3 questions</h2><p class="muted" style="margin-top:4px">Get 2 right to unlock the next lesson. Don't worry, you can try again.</p></div>
      ${l.q.map((q,qi)=>`<fieldset class="q"><p>${qi+1}. ${esc(q.q)}</p>${q.o.map((o,oi)=>`<label class="opt" id="o-${qi}-${oi}"><input type="radio" name="q${qi}" value="${oi}"><span>${esc(o)}</span></label>`).join("")}<div id="fb-${qi}"></div></fieldset>`).join("")}
      <div id="qres">${d?`<div class="result pass"><b>Done · ${d.score}/3</b><span>You can retake it any time.</span></div>`:""}</div>
      <button class="btn btn-em" type="submit">Check my answers</button>
    </form>
    <div class="nav-row">${i>0?`<a class="btn btn-line btn-sm" href="#/lesson/${i-1}">← Previous</a>`:"<span></span>"}${d&&i<LESSONS.length-1?`<a class="btn btn-sm" href="#/lesson/${i+1}">Next lesson →</a>`:""}</div>
  </article>`;
}
function bindLesson(i){
  const f=$("#quiz"); if(!f) return;
  f.addEventListener("submit", e=>{ e.preventDefault(); grade(i); });
}
function grade(i){
  const l=LESSONS[i];
  const ans=l.q.map((q,qi)=>{ const r=document.querySelector(`input[name="q${qi}"]:checked`); return r?+r.value:null; });
  if(ans.includes(null)){ $("#qres").innerHTML=`<div class="result fail"><span>Please answer all 3 questions first.</span></div>`; return; }
  let score=0;
  l.q.forEach((q,qi)=>{
    q.o.forEach((_,oi)=>{ const el=$(`#o-${qi}-${oi}`); el.classList.remove("right","wrong"); if(oi===q.a) el.classList.add("right"); else if(oi===ans[qi]) el.classList.add("wrong"); });
    const ok=ans[qi]===q.a; if(ok) score++;
    $(`#fb-${qi}`).innerHTML = ok ? `<div class="fb good"><b>✓ Correct</b><span>${esc(q.why)}</span></div>`
      : `<div class="fb bad"><b>✗ Not quite</b><span><span class="lbl">The right answer</span><br><b>${esc(q.o[q.a])}</b></span><span><span class="lbl">Why</span><br>${esc(q.why)}</span></div>`;
  });
  const first=!st.done[i], prev=st.done[i]?st.done[i].score:0;
  if(score>=2){
    if(score>prev) st.done[i]={score,at:new Date().toISOString()};
    if(first && i<LESSONS.length-1) st.cur=i+1;
    persist();
    $("#qres").innerHTML=`<div class="result pass"><b>${score}/3 · Well done!</b><span>${i<LESSONS.length-1?"The next lesson is open.":"You finished every lesson!"}</span>${i<LESSONS.length-1?`<a class="btn btn-em btn-sm" href="#/lesson/${i+1}">Next lesson →</a>`:""}</div>`;
    if(first) celebrate(i,score);
  } else {
    $("#qres").innerHTML=`<div class="result fail"><b>${score}/3</b><span>Read the explanations above, then try again. You need 2 right.</span><button class="btn btn-line btn-sm" type="button" id="retry">Try again</button></div>`;
    $("#retry").onclick=()=>render();
  }
  $("#qres").scrollIntoView({behavior:"smooth",block:"center"});
}
const ORD=["first","second","third","fourth","fifth","sixth","seventh","eighth","ninth","tenth"];
function celebrate(i,score){
  const l=LESSONS[i], last=i===LESSONS.length-1, lv=levelOfLesson(i), ids=lessonsOfLevel(lv), lvDone=ids.every(k=>st.done[k]);
  const title= last?"You did it!": lvDone?`Level ${lv.n} complete!`:"Congratulations!";
  const text = last?"You finished the whole Capital Market Guide. Amazing work!": lvDone?`You finished every lesson in Level ${lv.n} · ${lv.name}. The next level is open.`: `You finished your ${i<10?ORD[i]:"next"} lesson: “${l.t}”.`;
  const wrap=document.createElement("div"); wrap.className="cele";
  wrap.innerHTML=`<div class="cele-card" role="dialog" aria-modal="true"><svg width="90" height="90" viewBox="0 0 96 96" aria-hidden="true"><path d="M30 4h14l8 26H38z" fill="#12A67A"/><path d="M66 4H52l-8 26h14z" fill="#0E8A65"/><circle cx="48" cy="58" r="30" fill="#E8B547"/><circle cx="48" cy="58" r="23" fill="none" stroke="#FBEFD5" stroke-width="3"/><path d="M48 42l5 10 11 1.6-8 7.8 2 11-10-5.3-10 5.3 2-11-8-7.8 11-1.6z" fill="#fff"/></svg>
    <h2>${title}</h2><p>${esc(text)}</p><div class="chips"><span class="chip">${score}/3 correct</span><span class="chip" style="background:var(--sun-soft)">+${score*10} points</span><span class="chip">${doneCount()} of ${LESSONS.length} done</span></div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:6px">${last?"":`<button class="btn btn-em" id="cNext" type="button">Next lesson →</button>`}<button class="btn btn-line" id="cStay" type="button">See my answers</button></div></div>`;
  document.body.append(wrap); confetti();
  const close=()=>wrap.remove(); const nx=wrap.querySelector("#cNext"); if(nx){ nx.focus(); nx.onclick=()=>{ close(); go("lesson/"+(i+1)); }; }
  wrap.querySelector("#cStay").onclick=close; wrap.addEventListener("click",e=>{ if(e.target===wrap) close(); });
}
function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const c=document.createElement("canvas"); c.className="confetti"; document.body.append(c);
  const x=c.getContext("2d"), dpr=devicePixelRatio||1, W=innerWidth, H=innerHeight; c.width=W*dpr; c.height=H*dpr; x.scale(dpr,dpr);
  const cols=["#12A67A","#E8B547","#0B1F33","#2BC48F","#F6F4EE"];
  const P=Array.from({length:170},(_,k)=>({x:W/2+(Math.random()-.5)*140,y:H*.42,vx:(Math.random()-.5)*15,vy:-Math.random()*14-5,s:Math.random()*7+5,c:cols[k%cols.length],a:Math.random()*6.3,va:(Math.random()-.5)*.35}));
  const t0=performance.now(); (function f(t){ const el=t-t0; x.clearRect(0,0,W,H);
    P.forEach(p=>{ p.vy+=.32; p.vx*=.985; p.x+=p.vx; p.y+=p.vy; p.a+=p.va; x.save(); x.translate(p.x,p.y); x.rotate(p.a); x.globalAlpha=Math.max(0,1-el/3200); x.fillStyle=p.c; x.fillRect(-p.s/2,-p.s/4,p.s,p.s/2); x.restore(); });
    if(el<3200) requestAnimationFrame(f); else c.remove(); })(t0);
}

/* ---------- play ---------- */
function gameApi(id){
  return { esc, fmt, confetti, LESSONS,
    stats:()=>st.games[id]||{best:0,plays:0,pts:0},
    award(score, extra){ const g=st.games[id]||{best:0,plays:0,pts:0}; g.plays=(g.plays||0)+1; g.pts=(g.pts||0)+score; g.best=Math.max(g.best||0,score); g.last=new Date().toISOString(); if(extra) Object.assign(g,extra); st.games[id]=g; persist(); const p=document.querySelector(".pts"); if(p) p.textContent=points()+" pts"; return g; },
    back:()=>go("play"), replay:()=>render() };
}
function viewPlay(id){
  const G=window.CMG_GAMES||{};
  if(id && G[id]) return `<div class="game-top"><a class="back" href="#/play">← All games</a><span class="pts-chip">${gamePoints()} game pts</span></div><div id="game" class="game"></div>`;
  const list=Object.entries(G);
  return `<div class="page-h"><span class="eyebrow">Play &amp; practise</span><h1>Games</h1><p class="muted">Learn the market by playing. No real money, just fun and points.</p></div>
  <div class="ghub-sum"><div><b>${gamePoints()}</b><span>game points</span></div><div><b>${Object.values(st.games).reduce((a,g)=>a+(g.plays||0),0)}</b><span>games played</span></div><div><b>${points()}</b><span>total points</span></div></div>
  <div class="ghub">${list.map(([k,g])=>{ const s=st.games[k]; return `<a class="gcard" href="#/play/${k}" style="--gc:${g.color}">
    <span class="gart">${g.icon}</span><div class="gtxt"><b>${g.title}</b><span>${g.blurb}</span><small>${g.time}${s&&s.plays?` · Best ${s.best} pts`:""}</small></div><span class="gplay">Play</span></a>`; }).join("")}</div>
  <p class="muted" style="font-size:13px;margin-top:14px">Games use made-up companies and pretend results to teach you. They are not predictions or investment advice.</p>`;
}
function bindPlay(id){ const G=window.CMG_GAMES||{}; if(id&&G[id]){ const w=document.querySelector(".fab-wa"); if(w) w.remove(); G[id].run(document.getElementById("game"), gameApi(id)); } }

/* ---------- market ---------- */
function moverRows(a){ if(!a||!a.length) return `<tr><td colspan="3" class="muted">No data yet.</td></tr>`;
  return a.map(r=>{ const c=Number(r.chg), cls=c>=0?"up":"down"; return `<tr><td><span class="sym">${esc(r.sym)}</span><span class="nm">${esc(r.name||"")}</span></td><td class="fig">₦${fmt(r.price)}</td><td><span class="pill ${cls}">${c>0?"+":""}${fmt(c)}%</span></td></tr>`; }).join(""); }
function viewMarket(){
  const m=st.market||SEED_MARKET, up=Number(m.asiChg)>=0;
  return `<div class="page-h"><span class="eyebrow">Nigerian Exchange · close of ${esc(m.asOfLabel||"")}</span><h1>Today's market</h1><p class="muted">A quick look at how shares moved on the last trading day.</p></div>
  <div class="mkt">
    <div class="mcard"><span class="eyebrow">NGX All-Share Index</span><div class="asi-v fig">${fmt(m.asi)}</div><div class="fig ${up?"up":"down"}" style="font-weight:600">${up?"▲ +":"▼ "}${fmt(m.asiChg)}% <span class="muted" style="font-weight:400">from ${fmt(m.asiPrev)}</span></div>
      <p class="muted" style="margin-top:10px;font-size:15px"><b style="color:var(--navy)">In simple words:</b> this number shows how all shares on the exchange did together. ${up?"It went up, so on average share prices rose.":"It went down, so on average share prices fell."}</p></div>
    <div class="mcard stats"><div class="stat"><span class="eyebrow">Total value</span><b>₦${esc(m.mcap)}</b></div><div class="stat"><span class="eyebrow">Shares traded</span><b>${esc(m.volume)}</b></div><div class="stat"><span class="eyebrow">Trades</span><b>${esc(m.deals)}</b></div><div class="stat"><span class="eyebrow">Value traded</span><b>${esc(m.value||"—")}</b></div></div>
  </div>
  <div class="mkt" style="margin-top:16px">
    <div class="mcard"><h2 style="font-size:18px;margin-bottom:8px">Biggest gainers</h2><div class="tblwrap"><table class="tbl"><tr><th>Company</th><th>Price</th><th>Change</th></tr>${moverRows(m.gainers)}</table></div></div>
    <div class="mcard"><h2 style="font-size:18px;margin-bottom:8px">Biggest fallers</h2><div class="tblwrap"><table class="tbl"><tr><th>Company</th><th>Price</th><th>Change</th></tr>${moverRows(m.losers)}</table></div></div>
  </div>
  <p class="muted" style="font-size:13px;margin-top:12px">Source: ${esc(m.source||"")}. Live prices during trading hours (10:00–14:30): <a href="https://ngxgroup.com/exchange/data/equities-price-list/" target="_blank" rel="noopener">NGX price list</a>.</p>
  <div id="adminBox"></div>`;
}
function parseMovers(t){ return t.split("\n").map(s=>s.trim()).filter(Boolean).map(s=>{ const p=s.split(",").map(x=>x.trim()); return {sym:p[0],name:p[1]||"",price:parseFloat(p[2]),chg:parseFloat(p[3])}; }).filter(r=>r.sym&&!isNaN(r.price)&&!isNaN(r.chg)); }
function bindMarket(){
  if(!st.isAdmin||!LIVE) return;
  const m=st.market||{}, lines=a=>(a||[]).map(r=>[r.sym,r.name,r.price,r.chg].join(", ")).join("\n");
  $("#adminBox").innerHTML=`<details class="mcard" style="margin-top:16px"><summary style="cursor:pointer;font-weight:700">Update the market (admin only)</summary>
  <form id="adm" class="card-form" style="margin-top:14px"><div class="tiles" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));margin:0">
  ${[["aDate","Session date","asOfLabel"],["aAsi","ASI close","asi"],["aPrev","Previous close","asiPrev"],["aMcap","Total value (e.g. 160.52trn)","mcap"],["aVol","Shares traded","volume"],["aDeals","Trades","deals"],["aVal","Value traded","value"],["aSrc","Source","source"],["aNote","Short note","note"]].map(f=>`<div class="field"><label for="${f[0]}">${f[1]}</label><input class="input" id="${f[0]}" value="${esc(m[f[2]]??"")}"></div>`).join("")}</div>
  <div class="field"><label for="aG">Gainers — one per line: SYMBOL, Name, price, % change</label><textarea class="input" id="aG" rows="5" style="padding:10px;min-height:120px">${esc(lines(m.gainers))}</textarea></div>
  <div class="field"><label for="aL">Fallers — same format</label><textarea class="input" id="aL" rows="5" style="padding:10px;min-height:120px">${esc(lines(m.losers))}</textarea></div>
  <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn btn-em" type="submit">Publish</button><span class="muted" id="admMsg"></span></div></form></details>`;
  $("#adm").addEventListener("submit", async e=>{ e.preventDefault();
    const asi=parseFloat($("#aAsi").value), prev=parseFloat($("#aPrev").value);
    if(isNaN(asi)||isNaN(prev)){ $("#admMsg").textContent="Enter the ASI close and previous close as numbers."; return; }
    const d={asOfLabel:$("#aDate").value.trim(), asi, asiPrev:prev, asiChg:+((asi-prev)/prev*100).toFixed(2), mcap:$("#aMcap").value.trim(), volume:$("#aVol").value.trim(), deals:$("#aDeals").value.trim(), value:$("#aVal").value.trim(), source:$("#aSrc").value.trim(), note:$("#aNote").value.trim(), gainers:parseMovers($("#aG").value), losers:parseMovers($("#aL").value), updatedAt:new Date().toISOString()};
    $("#admMsg").textContent="Publishing…";
    try{ await db.collection("market").doc("latest").set(d); st.market=d; render(); }catch(err){ $("#admMsg").textContent="Not published: "+(err.message||err); }
  });
}
async function loadMarket(){ if(LIVE){ try{ const s=await db.collection("market").doc("latest").get(); if(s.exists) st.market=s.data(); }catch(e){} } }

/* ---------- help ---------- */
function viewHelp(){
  const faqs=[["Do I need money to use this?","No. Learning here is free. You only need money if you later decide to buy real shares through a licensed stockbroker."],["Will you ask for my bank details?","Never. We will never ask for your bank details, BVN or card number. If someone does, it's not us."],["How do I start buying real shares?","Finish Level 1 first. Lessons 6 to 10 show you how to choose a licensed broker and open your account."],["I forgot my passcode.","Sign out, then tap ‘Forgot your passcode?’ on the sign-in page. We'll email you a reset link."]];
  return `<div class="page-h"><span class="eyebrow">We're here for you</span><h1>Help</h1></div>
  <div class="mcard" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap;justify-content:space-between"><div><b style="font-family:var(--f-display)">Chat with us on WhatsApp</b><p class="muted">Ask any question about the lessons or the stock market.</p><p class="fig" style="margin-top:4px">${esc(WA)}</p></div><a class="btn btn-em" href="${WA_LINK}" target="_blank" rel="noopener">Open WhatsApp</a></div>
  <div class="level" style="margin-top:16px">${faqs.map(f=>`<details style="border-bottom:1px solid var(--rule-soft);padding:16px 18px"><summary style="cursor:pointer;font-weight:600">${f[0]}</summary><p class="muted" style="margin-top:8px">${f[1]}</p></details>`).join("")}</div>
  <p class="muted" style="font-size:13px;margin-top:14px">Capital Market Guide is for learning only and is not investment advice. Share prices can go down as well as up.</p>`;
}

/* ---------- admin: learners ---------- */
async function loadLearners(){
  const box=$("#lrn"); if(!st.isAdmin||!LIVE){ box.innerHTML='<p class="muted">Admins only.</p>'; return; }
  try{
    const [pf,pg]=await Promise.all([db.collection("profiles").get(), db.collection("progress").get()]);
    const pm={}; pg.forEach(d=>pm[d.id]=d.data());
    const rows=[]; pf.forEach(d=>{ const p=d.data(), g=pm[d.id]||{}; rows.push({...p, done:Object.keys(g.done||{}).length, cur:typeof g.cur==="number"?g.cur:0, at:g.updatedAt||p.createdAt}); });
    rows.sort((a,b)=>String(b.at||"").localeCompare(String(a.at||"")));
    box.innerHTML=`<div class="page-h"><span class="eyebrow">Admin</span><h1>Learners</h1><p class="muted">${rows.length} account${rows.length===1?"":"s"}</p></div><div class="mcard tblwrap"><table class="tbl left"><tr><th>Name</th><th>Email</th><th>Phone</th><th>Done</th><th>Now on</th><th>Last active</th></tr>${rows.map(r=>`<tr><td>${esc(r.full_name||"—")}</td><td>${esc(r.email||"")}</td><td class="fig">${esc(r.phone||"")}</td><td class="fig">${r.done}/${LESSONS.length}</td><td>Lesson ${r.cur+1}</td><td class="fig">${r.at?new Date(r.at).toLocaleString("en-NG",{dateStyle:"medium",timeStyle:"short"}):"—"}</td></tr>`).join("")}</table></div>`;
  }catch(e){ box.innerHTML=`<p class="muted">Couldn't load learners: ${esc(e.message||e)}</p>`; }
}

/* ---------- accounts ---------- */
let lastErr="";
function friendly(e){
  const c=String(e&&e.code||""), m=String(e&&e.message||e||"");
  if(c.includes("wrong-password")||c.includes("invalid-credential")||c.includes("invalid-login")) return "That email and passcode don't match. Check them, or reset your passcode.";
  if(c.includes("user-not-found")) return "We can't find an account with that email. Create one first.";
  if(c.includes("email-already-in-use")) return "This email already has an account. Sign in, or reset your passcode.";
  if(c.includes("invalid-email")) return "That email address doesn't look right.";
  if(c.includes("too-many-requests")||c.includes("quota")) return "Too many tries. Please wait a few minutes and try again.";
  if(c.includes("weak-password")) return "Use exactly 6 numbers for your passcode.";
  if(c.includes("network")) return "No internet connection. Check your data and try again.";
  return "Something went wrong. Please try again. ("+(c||m).slice(0,80)+")";
}
const siteUrl=()=>location.origin+location.pathname;
function tempPass(){ const a=new Uint8Array(18); crypto.getRandomValues(a); return "T!"+[...a].map(x=>x.toString(36)).join("")+"9z"; }
async function sendVerify(){ coolUntil=Date.now()+60000; try{ await auth.currentUser.sendEmailVerification({url:siteUrl()}); return true; }catch(e){ lastErr=friendly(e); return false; } }
async function getProfile(uid){ try{ const s=await db.collection("profiles").doc(uid).get(); return s.exists?s.data():null; }catch(e){ return null; } }
async function checkVerified(){
  const u=auth&&auth.currentUser; if(!u) return false;
  try{ await u.reload(); }catch(e){ return false; }
  if(auth.currentUser.emailVerified){ clearInterval(pollT); try{ await auth.currentUser.getIdToken(true); }catch(e){} st.profile=await getProfile(auth.currentUser.uid); go("passcode"); return true; }
  return false;
}
async function startSignup(p){
  if(!LIVE) return viewJoin("The site is offline right now. Please try again later.");
  st.pending=p; ls.set("cmg-last-email",p.email);
  try{
    const cred=await auth.createUserWithEmailAndPassword(p.email,tempPass());
    st.user=cred.user;
    st.profile={email:p.email, full_name:p.name, phone:p.phone, level:p.level, passcodeSet:false, createdAt:new Date().toISOString(), updatedAt:new Date().toISOString()};
    await db.collection("profiles").doc(cred.user.uid).set(st.profile);
    await sendVerify(); go("verify");
  }catch(e){ viewJoin(friendly(e)); }
}
async function startReset(email){
  try{ await auth.sendPasswordResetEmail(email,{url:siteUrl()}); ls.set("cmg-last-email",email); viewSignin("Reset link sent! Open the email, choose a new 6-number passcode, then sign in here.",true,email); }
  catch(e){ viewReset(friendly(e)); }
}
async function setPasscode(pin){
  try{
    const u=auth.currentUser; await u.updatePassword(pin);
    const p=st.pending||{}, upd={email:u.email, passcodeSet:true, updatedAt:new Date().toISOString()};
    if(p.name) upd.full_name=p.name; if(p.phone) upd.phone=p.phone;
    await db.collection("profiles").doc(u.uid).set(upd,{merge:true});
    st.pending=null; await afterLogin(u, true);
  }catch(e){
    if(String(e&&e.code).includes("requires-recent-login")){ await auth.signOut(); st.user=null; return viewReset("For your security, please set your passcode using a reset link."); }
    viewPasscode(friendly(e));
  }
}
async function signIn(email,pin){
  if(!LIVE) return viewSignin("The site is offline right now. Please try again later.");
  ls.set("cmg-last-email",email);
  try{ const c=await auth.signInWithEmailAndPassword(email,pin); await afterLogin(c.user,false,true); }
  catch(e){ viewSignin(friendly(e),false,email); }
}
async function afterLogin(u, justSet, viaPin){
  st.user=u;
  if(!u.emailVerified){ await sendVerify().catch(()=>{}); return go("verify"); }
  let prof=await getProfile(u.uid);
  if(viaPin && prof && !prof.passcodeSet){ try{ await db.collection("profiles").doc(u.uid).set({passcodeSet:true},{merge:true}); }catch(e){} prof.passcodeSet=true; }
  st.profile=prof;
  if(!prof||!prof.passcodeSet||!prof.full_name) return go("passcode");
  st.isAdmin=!!ADMIN && (u.email||"").toLowerCase()===ADMIN;
  try{ const s=await db.collection("progress").doc(u.uid).get(); const pr=s.exists?s.data():null; st.done=(pr&&pr.done)||{}; st.cur=(pr&&typeof pr.cur==="number")?pr.cur:0; st.games=(pr&&pr.games)||{}; }catch(e){ st.done={}; st.cur=0; st.games={}; }
  const seen=prof.storySeen||ls.get("cmg-seen-story-"+u.uid);
  if(!seen && doneCount()===0) return go("welcome/0");
  const r=route().p; if(["","join","signin","reset","verify","passcode"].includes(r)) go("home"); else render();
}
async function signOut(){ if(LIVE) await auth.signOut(); st.user=null; st.profile=null; st.done={}; st.cur=0; st.games={}; st.isAdmin=false; go(""); }
let saveT=null, saving=false, again=false;
function persist(){
  clearTimeout(saveT);
  saveT=setTimeout(async()=>{ if(!LIVE||!st.user) return; if(saving){ again=true; return; } saving=true;
    try{ await db.collection("progress").doc(st.user.uid).set({done:st.done, cur:st.cur, games:st.games, updatedAt:new Date().toISOString()}); }catch(e){ setTimeout(persist,8000); }
    saving=false; if(again){ again=false; persist(); } const p=$(".pts"); if(p) p.textContent=points()+" pts"; },400);
}

/* ---------- start ---------- */
(async function boot(){
  root.innerHTML='<div style="min-height:60vh;display:grid;place-items:center;color:#3C4A58">Loading…</div>';
  await loadMarket();
  if(!LIVE){ st.ready=true; return render(); }
  let first=true;
  auth.onAuthStateChanged(async u=>{
    if(!first) return; first=false;
    if(u){ st.user=u; st.ready=true; await afterLogin(u); }
    else { st.ready=true; render(); }
  });
})();
})();
