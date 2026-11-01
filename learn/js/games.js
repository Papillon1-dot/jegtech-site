/* Capital Market Guide — mini games. Each game: {title, blurb, time, color, icon, run(el, api)}.
   All companies here are made up and all results are pretend, to teach ideas safely. */
(function(){
"use strict";
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const naira=n=>"₦"+Math.round(n).toLocaleString("en-NG");
const ico=p=>`<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

function frame(el, opts){ // shared header: title, round dots, score
  el.innerHTML=`<div class="g-head"><div><span class="eyebrow" style="color:${opts.color}">${opts.kicker}</span><h1>${opts.title}</h1></div><div class="g-score"><b id="gScore">0</b><span>points</span></div></div>
  ${opts.rounds?`<div class="g-dots">${Array.from({length:opts.rounds},(_,i)=>`<i data-i="${i}"></i>`).join("")}</div>`:""}
  <div id="gBody" class="g-body"></div>`;
  return { body:el.querySelector("#gBody"), score(n){ const s=el.querySelector("#gScore"); s.textContent=n; s.parentElement.classList.remove("bump"); void s.offsetWidth; s.parentElement.classList.add("bump"); },
    dot(i,ok){ const d=el.querySelector(`.g-dots i[data-i="${i}"]`); if(d) d.className=ok===true?"ok":ok===false?"no":"now"; } };
}
function finish(el, api, {score, max, title, lines, extra}){
  const prev=api.stats().best||0; const g=api.award(score, extra); const best=score>prev;
  const sc=el.querySelector("#gScore"); if(sc) sc.textContent=score; el.querySelectorAll(".g-dots i").forEach(d=>{ if(!d.className||d.className==="now") d.className="ok"; });
  el.querySelector("#gBody").innerHTML=`<div class="g-end">
    <div class="g-medal">${score>=max*.7?"🏆":score>=max*.4?"⭐":"💪"}</div>
    <h2>${title}</h2>
    <div class="g-endscore"><b>+${score}</b><span>points${best&&g.plays>1?" · New best!":""}</span></div>
    ${lines?`<div class="g-lines">${lines}</div>`:""}
    <div class="g-actions"><button class="btn btn-em" type="button" id="gAgain">Play again</button><button class="btn btn-line" type="button" id="gBack">Other games</button></div></div>`;
  el.querySelector("#gAgain").onclick=api.replay; el.querySelector("#gBack").onclick=api.back;
  if(score>=max*.5) api.confetti();
  el.scrollIntoView({behavior:"smooth",block:"start"});
}

/* ---------------- 1. Up or Down? ---------------- */
const NEWS=[
 {co:"Eko Bank",n:"Eko Bank reports a profit twice as big as last year and raises its dividend.",a:"up",why:"Bigger profits and bigger dividends make more people want to own the share, so buyers push the price up."},
 {co:"Delta Oil",n:"Delta Oil's main pipeline is shut for three months after it was damaged.",a:"down",why:"Less oil sold means less money coming in. Investors expect lower profit, so some sell."},
 {co:"Lagos Cement Co.",n:"Government approves a huge new road project. Lagos Cement Co. will supply the cement.",a:"up",why:"A big new customer means more sales ahead. Investors buy in early."},
 {co:"Naija Telecom",n:"The regulator fines Naija Telecom a very large amount for poor service.",a:"down",why:"A big fine takes money straight out of profit, and it hurts the company's name."},
 {co:"Harvest Foods",n:"Harvest Foods' chairman is arrested for fraud.",a:"down",why:"Investors need to trust the people running a company. Bad news about leaders often makes prices fall fast."},
 {co:"Harvest Foods",n:"World wheat prices fall sharply. Harvest Foods uses lots of wheat to make flour and noodles.",a:"up",why:"Cheaper raw materials mean lower costs. The company can keep more profit from each sale."},
 {co:"Delta Oil",n:"Oil prices jump to their highest level in three years.",a:"up",why:"Delta Oil sells each barrel for more money, so its profit is expected to rise."},
 {co:"Most shares",n:"The central bank raises interest rates sharply to fight inflation.",a:"down",why:"When savings and government bonds pay more, some investors move money out of shares. Borrowing also costs companies more."},
 {co:"Bright Insurance",n:"Bright Insurance announces a loss this year instead of the profit it promised.",a:"down",why:"A surprise loss disappoints investors. Many sell, and the price drops."},
 {co:"Naija Telecom",n:"Naija Telecom adds 5 million new customers in one year.",a:"up",why:"More customers paying every month means more money coming in for years."},
 {co:"Kano Breweries",n:"Kano Breweries says sales fell because people have less money to spend.",a:"down",why:"When customers cut back, sales and profit shrink. Investors expect a weaker year."},
 {co:"Lagos Cement Co.",n:"Lagos Cement Co. opens a new factory that doubles how much it can make.",a:"up",why:"More products to sell can mean much more profit, if demand is there."},
 {co:"Eko Bank",n:"A big foreign investor agrees to buy 20% of Eko Bank at a high price.",a:"up",why:"A serious buyer paying a high price is a strong sign the company is worth more."},
 {co:"Delta Oil",n:"Delta Oil cancels its dividend so it can pay off debt.",a:"down",why:"Many people hold the share for its dividend. When it stops, some of them sell."},
 {co:"Kano Breweries",n:"The naira weakens sharply. Kano Breweries imports most of its malt and machines.",a:"down",why:"Imported things now cost more naira, so the company's costs go up and profit falls."},
 {co:"Harvest Foods",n:"Harvest Foods wins a contract to feed every army barracks in the country.",a:"up",why:"A big, steady contract means reliable sales. Investors like that."}
];
function upDown(el, api){
  const R=8, qs=shuffle(NEWS).slice(0,R); let i=0, score=0, streak=0, right=0;
  const f=frame(el,{kicker:"Game 1",title:"Up or Down?",rounds:R,color:"var(--emerald-dark)"});
  const show=()=>{
    const q=qs[i]; f.dot(i);
    f.body.innerHTML=`<div class="ud-card"><span class="ud-tag">📰 Breaking news · ${q.co}</span><p class="ud-news">${q.n}</p>
      <p class="muted">What will most likely happen to the share price?</p>
      <div class="ud-btns"><button class="ud-btn up" data-a="up" type="button"><span>▲</span>Up</button><button class="ud-btn down" data-a="down" type="button"><span>▼</span>Down</button></div>
      <div id="udRes"></div></div>${streak>=2?`<p class="g-streak">🔥 ${streak} in a row</p>`:""}`;
    f.body.querySelectorAll(".ud-btn").forEach(b=>b.onclick=()=>answer(b.dataset.a));
  };
  const answer=a=>{
    const q=qs[i], ok=a===q.a; f.body.querySelectorAll(".ud-btn").forEach(b=>{b.disabled=true; if(b.dataset.a===q.a) b.classList.add("is-right"); else if(b.dataset.a===a) b.classList.add("is-wrong");});
    if(ok){ right++; streak++; score+=10+(streak>=3?5:0); } else streak=0;
    f.score(score); f.dot(i,ok);
    const path=q.a==="up"?"M4 46 L22 40 L36 43 L52 30 L66 33 L82 18 L96 20 L116 6":"M4 8 L22 14 L36 11 L52 24 L66 21 L82 36 L96 33 L116 46";
    f.body.querySelector("#udRes").innerHTML=`<div class="ud-res ${ok?"good":"bad"}"><svg class="ud-chart" viewBox="0 0 120 52"><path d="${path}" fill="none" stroke="${q.a==="up"?"#12A67A":"#B4372A"}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>
      <div><b>${ok?(streak>=3?"Correct! +15 streak bonus":"Correct! +10"):"Not this time"}</b><p>The price would most likely go <b>${q.a}</b>. ${q.why}</p></div></div>
      <button class="btn btn-em btn-block" id="udNext" type="button" style="margin-top:14px">${i<R-1?"Next news →":"See my score"}</button>`;
    f.body.querySelector("#udNext").onclick=()=>{ i++; if(i<R) show(); else finish(el,api,{score,max:R*10+(R-2)*5,title:`You read ${right} of ${R} right`,
      lines:`<p>News moves prices because it changes what investors <b>expect</b> a company to earn. In real life prices do not always move the way you expect, which is why we never put all our money on one guess.</p>`}); };
  };
  show();
}

/* ---------------- 2. Word Match ---------------- */
const WORDS=[
 ["Share","A small piece of ownership in a company"],["Dividend","Part of a company's profit paid to its shareholders"],["Stockbroker","A licensed firm that buys and sells shares for you"],
 ["Bull market","A time when share prices keep rising"],["Bear market","A time when share prices keep falling"],["Portfolio","All your investments together"],
 ["Diversify","Spread your money across different investments"],["CSCS","Keeps the official record of the shares you own in Nigeria"],["NGX","The Nigerian Exchange, where shares are bought and sold"],
 ["SEC","The government body that protects investors"],["Market cap","What the whole company is worth on the market"],["Blue chip","A big, well-known, steady company"],
 ["IPO","When a company first sells shares to the public"],["Capital gain","Profit from selling a share for more than you paid"],["Volatility","How much and how fast a price jumps up and down"],
 ["AGM","The yearly meeting where shareholders vote"],["Bonus shares","Free extra shares given to people who already own the share"],["Liquidity","How easily you can buy or sell without waiting"]
];
function wordMatch(el, api){
  const N=6, set=shuffle(WORDS).slice(0,N); const terms=shuffle(set), means=shuffle(set);
  let pick=null, matched=0, miss=0, score=0; const t0=Date.now();
  const f=frame(el,{kicker:"Game 2",title:"Word Match",color:"var(--navy-2)"});
  f.body.innerHTML=`<p class="muted" style="margin-bottom:14px">Tap a word, then tap what it means. Match all ${N}.</p>
   <div class="wm"><div class="wm-terms">${terms.map(t=>`<button class="wm-t" type="button" data-k="${api.esc(t[0])}">${api.esc(t[0])}</button>`).join("")}</div>
   <div class="wm-means">${means.map(t=>`<button class="wm-m" type="button" data-k="${api.esc(t[0])}">${api.esc(t[1])}</button>`).join("")}</div></div>
   <p class="wm-stat"><span id="wmM">0</span>/${N} matched · <span id="wmX">0</span> mistakes</p>`;
  const B=f.body;
  B.querySelectorAll(".wm-t").forEach(b=>b.onclick=()=>{ if(b.classList.contains("done")) return; B.querySelectorAll(".wm-t").forEach(x=>x.classList.remove("sel")); b.classList.add("sel"); pick=b; });
  B.querySelectorAll(".wm-m").forEach(b=>b.onclick=()=>{
    if(b.classList.contains("done")) return;
    if(!pick){ const t=B.querySelector(".wm-t:not(.done)"); if(t){ t.classList.add("hint"); setTimeout(()=>t.classList.remove("hint"),600);} return; }
    if(b.dataset.k===pick.dataset.k){ b.classList.add("done"); pick.classList.remove("sel"); pick.classList.add("done"); pick=null; matched++; score+=20; }
    else { miss++; score=Math.max(0,score-5); b.classList.add("bad"); pick.classList.add("bad"); const p=pick; setTimeout(()=>{b.classList.remove("bad"); p.classList.remove("bad");},500); }
    f.score(score); B.querySelector("#wmM").textContent=matched; B.querySelector("#wmX").textContent=miss;
    if(matched===N){ const secs=Math.round((Date.now()-t0)/1000), bonus=secs<45?20:secs<90?10:0; score+=bonus;
      setTimeout(()=>finish(el,api,{score,max:N*20+20,title:miss===0?"Perfect match!":"All matched!",
        lines:`<p>Time: <b>${secs}s</b>${bonus?` · speed bonus <b>+${bonus}</b>`:""} · mistakes: <b>${miss}</b></p><div class="wm-review">${set.map(t=>`<div><b>${api.esc(t[0])}</b><span>${api.esc(t[1])}</span></div>`).join("")}</div>`}),450); }
  });
}

/* ---------------- 3. Spot the Scam ---------------- */
const MSGS=[
 {from:"Investment Coach Mike",m:"🔥 Invest ₦50,000 today and get ₦150,000 in 7 days. GUARANTEED! Only 10 slots left. Send to my account now.",scam:true,why:"Promises of guaranteed, fast, huge profit plus pressure to hurry are classic scam signs. Real investments can lose money."},
 {from:"+234 81•• ••• •••",m:"This is the SEC. Your shares have been frozen. Pay a ₦20,000 unlock fee to this number to release them.",scam:true,why:"The SEC never asks you to pay fees to a phone number or personal account. Check with your broker or the SEC's official contacts."},
 {from:"CSCS Notifications",m:"Your share statement for October is ready. View it on the official CSCS portal or ask your stockbroker for a copy.",scam:false,why:"Statements are normal. It sends you to the official channel and asks for no money, PIN or password."},
 {from:"VIP Stock Signals 💎",m:"Join our VIP group for ₦10,000 and earn 5% profit EVERY DAY on your money. 100% safe.",scam:true,why:"5% a day would turn ₦10,000 into millions in a year. No real investment does that. Paying to 'join' is a warning sign."},
 {from:"Eko Bank Plc",m:"Notice: our Annual General Meeting holds on 20 May. Shareholders may attend or vote by proxy. Details are on our website.",scam:false,why:"Companies must invite shareholders to their AGM. No payment or personal details are requested."},
 {from:"MTN Promo Team",m:"Congratulations! You have won free shares. To claim, reply with your BVN, account number and ATM PIN.",scam:true,why:"Never share your PIN or BVN with anyone. No real company gives away shares this way."},
 {from:"Your stockbroker",m:"We have received your ₦30,000 transfer into your trading account. Your available balance is ₦30,000.",scam:false,why:"Money you sent to your own trading account at a licensed broker is confirmed. No promises of profit, no requests."},
 {from:"Chidi (old classmate)",m:"Bro I now double money with stock trading. My cousin made ₦2m last month. Just send me the money, I go trade for you.",scam:true,why:"Sending money to a person to 'trade for you' is risky and often a scam, even from people you know. Use a licensed broker in your own name."},
 {from:"Lagos Cement Co.",m:"A dividend of ₦2.00 per share has been paid into the bank account linked to your CSCS account.",scam:false,why:"This is how e-dividends work in Nigeria. Money comes to you; nothing is asked of you."},
 {from:"Insider Tips 🚀",m:"BUY NOW!!! This tiny company's share will go up 1000% next week. Inside information. Don't tell anyone.",scam:true,why:"This is a 'pump and dump'. Scammers hype a small share, then sell to the people who rush in. Trading on inside information is also illegal."},
 {from:"Your stockbroker",m:"Reminder: share prices can go up or down. Only invest money you will not need soon.",scam:false,why:"An honest warning about risk is what a responsible, licensed broker should send."},
 {from:"WealthGrow Platform",m:"We are approved by CBN, SEC and NGX! Refer 3 friends to unlock your profit withdrawal.",scam:true,why:"Needing to recruit people before you can withdraw is how Ponzi schemes work. Check the SEC's list of registered operators yourself."}
];
function spotScam(el, api){
  const R=8; let qs=shuffle(MSGS).slice(0,R); if(qs.every(q=>q.scam)) qs[R-1]=MSGS.find(m=>!m.scam);
  let i=0, score=0, right=0;
  const f=frame(el,{kicker:"Game 3",title:"Spot the Scam",rounds:R,color:"var(--loss)"});
  const show=()=>{ const q=qs[i]; f.dot(i);
    f.body.innerHTML=`<div class="ss-phone"><div class="ss-head"><span class="ss-av">${api.esc(q.from[0]==="+"?"?":q.from[0])}</span><div><b>${api.esc(q.from)}</b><small>today</small></div></div>
      <div class="ss-chat"><div class="ss-bub">${api.esc(q.m)}<small>9:41</small></div></div></div>
      <p class="muted" style="text-align:center;margin:16px 0 10px">Is this message safe or a scam?</p>
      <div class="ud-btns"><button class="ud-btn down" data-a="scam" type="button"><span>🚩</span>Scam</button><button class="ud-btn up" data-a="ok" type="button"><span>✓</span>Looks safe</button></div><div id="ssRes"></div>`;
    f.body.querySelectorAll(".ud-btn").forEach(b=>b.onclick=()=>answer(b.dataset.a==="scam"));
  };
  const answer=saidScam=>{ const q=qs[i], ok=saidScam===q.scam; if(ok){right++; score+=10;} f.score(score); f.dot(i,ok);
    f.body.querySelectorAll(".ud-btn").forEach(b=>{b.disabled=true; const isScamBtn=b.dataset.a==="scam"; if(isScamBtn===q.scam) b.classList.add("is-right"); else if(isScamBtn===saidScam) b.classList.add("is-wrong");});
    f.body.querySelector("#ssRes").innerHTML=`<div class="ud-res ${ok?"good":"bad"}"><div style="font-size:26px">${q.scam?"🚩":"✅"}</div><div><b>${ok?"Well spotted!":"Careful!"} This is ${q.scam?"a scam":"safe"}.</b><p>${q.why}</p></div></div>
      <button class="btn btn-em btn-block" id="ssNext" type="button" style="margin-top:14px">${i<R-1?"Next message →":"See my score"}</button>`;
    f.body.querySelector("#ssNext").onclick=()=>{ i++; if(i<R) show(); else finish(el,api,{score,max:R*10,title:`You spotted ${right} of ${R}`,
      lines:`<p><b>Remember the red flags:</b> guaranteed or very fast profit, pressure to hurry, sending money to a person instead of a licensed broker, and anyone asking for your PIN or BVN.</p>`}); };
  };
  show();
}

/* ---------------- 4. My First Basket ---------------- */
const COS=[
 {id:"eko",name:"Eko Bank",sec:"Banking",e:"🏦"},{id:"tel",name:"Naija Telecom",sec:"Telecom",e:"📱"},{id:"oil",name:"Delta Oil",sec:"Oil & gas",e:"🛢️"},
 {id:"cem",name:"Lagos Cement Co.",sec:"Building",e:"🏗️"},{id:"food",name:"Harvest Foods",sec:"Food",e:"🌾"},{id:"brew",name:"Kano Breweries",sec:"Drinks",e:"🍺"},
 {id:"ins",name:"Bright Insurance",sec:"Insurance",e:"🛡️"},{id:"med",name:"Sunrise Pharma",sec:"Health",e:"💊"}
];
const EVENTS=[
 {t:"Oil prices shoot up",d:"Oil sells for much more this year.",fx:{"Oil & gas":32,Drinks:-4,Food:-3},base:3},
 {t:"Oil prices crash",d:"Oil becomes cheap around the world.",fx:{"Oil & gas":-34,Banking:-6},base:2},
 {t:"Interest rates jump",d:"The central bank raises rates to fight rising prices.",fx:{Banking:12,Building:-14,Insurance:4},base:-6},
 {t:"A strong economy year",d:"People are earning and spending more.",fx:{Building:22,Drinks:16,Food:8},base:12},
 {t:"The naira weakens",d:"Imported goods and materials cost more.",fx:{Drinks:-16,Food:-10,Health:-12,"Oil & gas":14,Telecom:-6},base:0},
 {t:"Phone and data boom",d:"Millions more people go online.",fx:{Telecom:28},base:3},
 {t:"Food prices rise",d:"Families spend more on food.",fx:{Food:16,Drinks:-6},base:1},
 {t:"Insurance scandal",d:"One insurer is caught hiding losses.",fx:{Insurance:-38,Banking:-4},base:1},
 {t:"Health awareness push",d:"Government spends more on clinics and medicine.",fx:{Health:22},base:2}
];
function basket(el, api){
  const START=100000, YEARS=3; let picks=[];
  const f=frame(el,{kicker:"Game 4",title:"My First Basket",color:"#B07D12"});
  const pickScreen=()=>{
    f.body.innerHTML=`<div class="bk-intro"><p>You have <b>${naira(START)}</b> of pretend money. Choose <b>1 to 5</b> companies. Your money is shared equally between them. Then we fast-forward <b>${YEARS} years</b>.</p></div>
      <div class="bk-grid">${COS.map(c=>`<button class="bk-co" type="button" data-id="${c.id}"><span class="bk-e">${c.e}</span><b>${c.name}</b><small>${c.sec}</small><i class="bk-tick">✓</i></button>`).join("")}</div>
      <div class="bk-bar"><span id="bkInfo">Pick at least 1 company</span><button class="btn btn-em" id="bkGo" type="button" disabled>Fast-forward ${YEARS} years →</button></div>`;
    const upd=()=>{ const n=picks.length; f.body.querySelector("#bkInfo").innerHTML=n?`<b>${n}</b> picked · ${naira(START/n)} each · ${new Set(picks.map(id=>COS.find(c=>c.id===id).sec)).size} sectors`:"Pick at least 1 company"; f.body.querySelector("#bkGo").disabled=!n; };
    f.body.querySelectorAll(".bk-co").forEach(b=>b.onclick=()=>{ const id=b.dataset.id; if(picks.includes(id)){picks=picks.filter(x=>x!==id); b.classList.remove("on");} else if(picks.length<5){picks.push(id); b.classList.add("on");} else { b.classList.add("shake"); setTimeout(()=>b.classList.remove("shake"),400);} upd(); });
    f.body.querySelector("#bkGo").onclick=simulate;
  };
  const simulate=()=>{
    const evs=shuffle(EVENTS).slice(0,YEARS);
    const hold={}; picks.forEach(id=>hold[id]=START/picks.length);
    const all={}; COS.forEach(c=>all[c.id]=START); // "if you put everything in one company"
    const hist=[START]; const yearLog=[];
    evs.forEach(ev=>{ const ch={};
      COS.forEach(c=>{ const r=(ev.base+(ev.fx[c.sec]||0)+(Math.random()*12-6))/100; ch[c.id]=r; all[c.id]*=1+r; if(hold[c.id]!=null) hold[c.id]*=1+r; });
      hist.push(Object.values(hold).reduce((a,b)=>a+b,0)); yearLog.push({ev,ch}); });
    let y=0;
    const showYear=()=>{ const {ev,ch}=yearLog[y], val=hist[y+1], prev=hist[y];
      f.body.innerHTML=`<div class="bk-year"><span class="ud-tag">Year ${y+1} of ${YEARS}</span><h2>${ev.t}</h2><p class="muted">${ev.d}</p>
        <div class="bk-val"><span>Your basket</span><b id="bkCount">${naira(prev)}</b><em class="${val>=prev?"up":"down"}">${val>=prev?"▲":"▼"} ${Math.abs((val/prev-1)*100).toFixed(1)}% this year</em></div>
        <div class="bk-rows">${picks.map(id=>{const c=COS.find(k=>k.id===id), r=ch[id]; return `<div class="bk-row"><span>${c.e} ${c.name}</span><b class="${r>=0?"up":"down"}">${r>=0?"+":""}${(r*100).toFixed(1)}%</b></div>`;}).join("")}</div>
        <button class="btn btn-em btn-block" id="bkNext" type="button">${y<YEARS-1?"Next year →":"See the result"}</button></div>`;
      const el2=f.body.querySelector("#bkCount"), t0=performance.now();
      (function tick(t){ const k=Math.min(1,(t-t0)/900); el2.textContent=naira(prev+(val-prev)*k); if(k<1) requestAnimationFrame(tick); })(t0);
      f.body.querySelector("#bkNext").onclick=()=>{ y++; if(y<YEARS) showYear(); else result(); };
    };
    const result=()=>{
      const end=hist[YEARS], sectors=new Set(picks.map(id=>COS.find(c=>c.id===id).sec)).size;
      const ranked=COS.map(c=>({c,v:all[c.id]})).sort((a,b)=>b.v-a.v), best=ranked[0], worst=ranked[ranked.length-1];
      const score=20+Math.min(5,sectors)*10+(end>START?20:0);
      const W=300,H=110, mn=Math.min(...hist)*.97, mx=Math.max(...hist)*1.03, X=i=>10+i*(W-20)/YEARS, Y=v=>H-10-(v-mn)/(mx-mn||1)*(H-20);
      const line=hist.map((v,i)=>`${i?"L":"M"}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
      finish(el,api,{score,max:90,title:end>=START?`Your basket grew to ${naira(end)}`:`Your basket is now ${naira(end)}`,extra:{lastBasket:Math.round(end)},
        lines:`<svg class="bk-chart" viewBox="0 0 ${W} ${H}"><line x1="10" x2="${W-10}" y1="${Y(START)}" y2="${Y(START)}" stroke="#D9D5CB" stroke-dasharray="4 4"/><path d="${line}" fill="none" stroke="${end>=START?"#12A67A":"#B4372A"}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${hist.map((v,i)=>`<circle cx="${X(i)}" cy="${Y(v)}" r="4" fill="#0B1F33"/>`).join("")}</svg>
        <p>You picked <b>${picks.length}</b> compan${picks.length===1?"y":"ies"} across <b>${sectors}</b> sector${sectors===1?"":"s"}. Diversity bonus: <b>+${Math.min(5,sectors)*10}</b>${end>START?" · growth bonus <b>+20</b>":""}.</p>
        <div class="bk-cmp"><div><span>All in the best company (${best.c.name})</span><b class="up">${naira(best.v)}</b></div><div><span>All in the worst company (${worst.c.name})</span><b class="down">${naira(worst.v)}</b></div><div><span>Your basket</span><b>${naira(end)}</b></div></div>
        <p><b>The lesson:</b> nobody knows in advance which company will win. Spreading your money across different sectors means one bad year for one company does not wipe you out.</p>
        <p class="muted" style="font-size:13px">Made-up companies and pretend results, for learning only.</p>`});
    };
    showYear();
  };
  pickScreen();
}

window.CMG_GAMES={
  updown:{title:"Up or Down?",blurb:"Read the news. Guess if the share price goes up or down, then learn why.",time:"8 rounds · 2 min",color:"#12A67A",icon:ico('<path d="M8 34 18 24l7 6 15-16"/><path d="M32 14h8v8"/>'),run:upDown},
  words:{title:"Word Match",blurb:"Match market words like ‘dividend’ to their simple meaning.",time:"6 pairs · 1 min",color:"#12304B",icon:ico('<rect x="6" y="10" width="16" height="12" rx="3"/><rect x="26" y="26" width="16" height="12" rx="3"/><path d="M22 16h6a4 4 0 0 1 4 4v6"/>'),run:wordMatch},
  scam:{title:"Spot the Scam",blurb:"Real message or a trap? Learn the red flags that protect your money.",time:"8 messages · 2 min",color:"#B4372A",icon:ico('<path d="M24 5 8 11v11c0 10 7 17 16 21 9-4 16-11 16-21V11z"/><path d="M24 17v9"/><circle cx="24" cy="32" r="1" fill="currentColor"/>'),run:spotScam},
  basket:{title:"My First Basket",blurb:"Pick companies with ₦100,000 pretend money and fast-forward 3 years.",time:"3 pretend years · 3 min",color:"#B07D12",icon:ico('<path d="M6 18h36l-4 22H10z"/><path d="M16 18l6-10M32 18l-6-10"/><path d="M18 26v8M24 26v8M30 26v8"/>'),run:basket}
};
})();
