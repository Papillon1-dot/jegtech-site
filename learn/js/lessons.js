/* ---------------- COURSE ---------------- */
const MODULES = [
 "Foundations",
 "Getting started as an investor",
 "How trading works on the NGX",
 "Classifying stocks",
 "Sector by sector",
 "Reading a company",
 "Reading the market",
 "Risk, tax and your plan"
];
const L = (m,t,body,q)=>({m,t,body,q});
const LESSONS = [
/* ===== Module 1 ===== */
L(0,"What a share actually is",`
<p>A company that wants to grow needs money. One way to raise it is to sell small pieces of ownership to the public. Each piece is called a <b>share</b> (or a <b>stock</b>). If a company has 1,000,000 shares and you own 10,000, you own 1% of that business.</p>
<p>Owning a share gives you three things:</p>
<ul><li><b>A claim on profits.</b> When the company pays out part of its profit, you receive a <b>dividend</b> in proportion to your shares.</li>
<li><b>A share of value growth.</b> If the business becomes more valuable, other investors will pay more for your shares. That increase is a <b>capital gain</b>.</li>
<li><b>A vote.</b> Shareholders vote at the Annual General Meeting (AGM) on matters such as electing directors and approving dividends.</li></ul>
<div class="key"><b>Remember</b>A share is part-ownership of a real business. Its long-run value follows what the business earns, not what people say about it on social media.</div>
<p>Shares are different from a bank deposit. A deposit promises your money back plus interest. A share promises nothing: if the company does badly, its share price can fall and dividends can stop.</p>`,[
 {q:"If a company has 2,000,000 shares and you hold 20,000, what fraction do you own?",o:["0.1%","1%","10%","20%"],a:1,why:"20,000 ÷ 2,000,000 = 0.01, which is 1%."},
 {q:"What is a dividend?",o:["A loan the company gives you","A part of company profit paid to shareholders","The fee a broker charges","The price of one share"],a:1,why:"Dividends are distributions of profit to shareholders."},
 {q:"Which statement is true about shares?",o:["Your money is guaranteed like a bank deposit","The share price can fall and you can lose money","Every company must pay a dividend every year","Shareholders never get to vote"],a:1,why:"Shares carry risk; nothing is guaranteed."}]),
L(0,"Why companies list on a stock exchange",`
<p>A company "lists" when its shares are admitted to trade on an exchange. In Nigeria that exchange is the <b>Nigerian Exchange Limited (NGX)</b>, part of Nigerian Exchange Group.</p>
<p>Companies list for several reasons:</p>
<ul><li><b>To raise capital</b> from many investors at once, for factories, expansion or paying down debt.</li>
<li><b>To give existing owners a way to sell</b>, because a listed share can be sold to anyone in the market.</li>
<li><b>Visibility and credibility.</b> Listed companies must publish audited accounts and follow disclosure rules, which builds trust with banks, suppliers and customers.</li></ul>
<p>In return, a listed company accepts obligations: it must release results on schedule, disclose price-sensitive information promptly and follow the corporate governance rules of the NGX and the Securities and Exchange Commission.</p>
<div class="ex">Example: Dangote Cement, MTN Nigeria and Guaranty Trust Holding Company are all listed on the NGX. Anyone with a stockbroking account can buy their shares.</div>
<div class="key"><b>Why it matters to you</b>Because listed companies must publish their results, you can study the numbers before you invest. Use that right.</div>`,[
 {q:"What is the name of Nigeria's main stock exchange?",o:["CSCS","Nigerian Exchange Limited (NGX)","Central Bank of Nigeria","FMDQ Securities Exchange"],a:1,why:"Equities in Nigeria trade mainly on the NGX."},
 {q:"Which is a main reason a company lists?",o:["To avoid publishing accounts","To raise capital from many investors","To stop paying tax","To become a bank"],a:1,why:"Listing lets a company raise money from the public."},
 {q:"What must a listed company do in return?",o:["Nothing","Publish results and disclose important information","Guarantee its share price","Pay every shareholder a salary"],a:1,why:"Disclosure obligations are the price of a listing."}]),
L(0,"Primary market and secondary market",`
<p>There are two places where you can meet a share.</p>
<p><b>The primary market</b> is where a company sells <i>new</i> shares and receives the money. Examples:</p>
<ul><li><b>Initial Public Offering (IPO):</b> the first sale of shares to the public.</li>
<li><b>Public offer:</b> a later sale of new shares to the public.</li>
<li><b>Rights issue:</b> new shares offered first to existing shareholders, usually at a discount.</li></ul>
<p><b>The secondary market</b> is where investors trade shares that already exist, with each other, through the exchange. When you buy MTN shares on the NGX today, the money goes to the seller, not to MTN.</p>
<div class="key"><b>Remember</b>Primary market: money goes to the company. Secondary market: money goes to another investor.</div>
<p>Most of your activity as an investor happens in the secondary market. The primary market is occasional, and offers come with a prospectus or circular that you should read before applying.</p>`,[
 {q:"In an IPO, who receives the money you pay?",o:["Another investor","The company issuing the shares","The CSCS","The SEC"],a:1,why:"An IPO is a primary-market sale; the issuer receives the money."},
 {q:"You buy existing shares on the NGX. Who receives your money?",o:["The company","The seller of those shares","The government","Your bank"],a:1,why:"Secondary-market trades are between investors."},
 {q:"A rights issue offers new shares first to…",o:["Foreign investors only","Existing shareholders","Company staff only","The Central Bank"],a:1,why:"Rights issues give existing holders the first right to buy."}]),
L(0,"Who runs and protects the market",`
<p>Several institutions keep the Nigerian capital market working. Knowing who does what helps you know where to check and where to complain.</p>
<div class="tblwrap"><table><tr><th>Institution</th><th>Role</th></tr>
<tr><td><b>Securities and Exchange Commission (SEC)</b></td><td>The apex regulator. It registers brokers, advisers and fund managers, approves offers, and protects investors under the Investments and Securities Act 2025.</td></tr>
<tr><td><b>Nigerian Exchange (NGX)</b></td><td>Runs the trading platform, lists companies and sets trading rules.</td></tr>
<tr><td><b>CSCS</b></td><td>The Central Securities Clearing System: the depository that records who owns which shares and handles clearing and settlement.</td></tr>
<tr><td><b>Stockbrokers (Trading License Holders)</b></td><td>Firms licensed to place orders on the NGX for you.</td></tr>
<tr><td><b>Registrars</b></td><td>Keep each company's register of members and pay out dividends.</td></tr></table></div>
<div class="key"><b>Protect yourself</b>Before you send money to any broker or "investment platform", confirm it is registered with the SEC. Unregistered schemes promising fixed high returns are a common source of loss.</div>`,[
 {q:"Which body is the apex regulator of Nigeria's capital market?",o:["NGX","CSCS","SEC","Registrars"],a:2,why:"The SEC regulates the market and registers operators."},
 {q:"Which institution records who owns which shares?",o:["CSCS","CBN","NGX","Your bank"],a:0,why:"CSCS is the central depository."},
 {q:"Who usually pays dividends to shareholders on behalf of a company?",o:["The SEC","Registrars","Stockbrokers","The NGX"],a:1,why:"Registrars maintain the register and pay dividends."}]),
L(0,"Investing versus trading versus speculating",`
<p>People use "the stock market" in different ways. Be clear which one you are doing.</p>
<ul><li><b>Investing:</b> buying shares of businesses you have studied and holding them for years, earning dividends and growth. Your result depends mostly on the business.</li>
<li><b>Trading:</b> buying and selling over days, weeks or months to profit from price movements. Your result depends on timing, discipline and costs.</li>
<li><b>Speculating:</b> buying on tips or excitement without analysis, hoping someone pays more later. Your result depends mostly on luck.</li></ul>
<p>Each approach has costs. Every buy and sell attracts fees, so frequent trading needs bigger moves just to break even. On the NGX, many smaller stocks trade thinly, which makes quick exits harder.</p>
<div class="key"><b>A sensible start</b>Begin as an investor: learn the businesses, hold for the long term, and treat trading as a skill you build slowly with small amounts.</div>`,[
 {q:"Buying a stock because a friend posted 'it will double this week' is best described as…",o:["Investing","Speculating","Hedging","Value analysis"],a:1,why:"Acting on tips without analysis is speculation."},
 {q:"Why does frequent trading need larger price moves to make money?",o:["Because the SEC taxes every trade at 50%","Because each buy and sell attracts fees","Because prices only move once a year","It doesn't"],a:1,why:"Transaction costs accumulate with each trade."},
 {q:"A long-term investor's results depend mostly on…",o:["Daily news","The performance of the business","The weather","Social media trends"],a:1,why:"Over years, share prices follow business results."}]),

/* ===== Module 2 ===== */
L(1,"Choosing a stockbroker or investing app",`
<p>You cannot buy directly on the NGX yourself. You place orders through a <b>stockbroker</b>, also called a Trading License Holder. Many brokers now offer mobile apps.</p>
<p>When choosing, check:</p>
<ol><li><b>Registration:</b> the firm is registered with the SEC and is a Trading License Holder of the NGX.</li>
<li><b>Account in your own name:</b> your shares should sit in a CSCS account under your name, not in a pooled account you cannot see.</li>
<li><b>Fees:</b> ask for the full fee schedule for buying and selling, including statutory charges.</li>
<li><b>Ease of use:</b> a clear app, timely contract notes and responsive support.</li>
<li><b>Research:</b> some brokers give clients free research reports.</li></ol>
<div class="key"><b>Check</b>You should be able to verify your holdings independently with CSCS. If a platform refuses to show where your shares are held, be careful.</div>`,[
 {q:"Who places your buy and sell orders on the NGX?",o:["You, directly","A licensed stockbroker","The Central Bank","Your church treasurer"],a:1,why:"Only licensed Trading License Holders access the trading system."},
 {q:"Where should your shares ideally be recorded?",o:["In the broker's personal name","In a CSCS account in your own name","Nowhere","On a paper receipt only"],a:1,why:"Your own CSCS account means you are the recorded owner."},
 {q:"What is the first thing to verify about a broker?",o:["Its logo colour","Registration with the SEC","How many followers it has","Its office size"],a:1,why:"Registration is the basic protection."}]),
L(1,"Opening your account: CSCS and CHN",`
<p>When you open a stockbroking account, your broker also creates your account with the CSCS. You will receive:</p>
<ul><li><b>A CSCS account number</b>, which links your holdings to your broker.</li>
<li><b>A CHN (Clearing House Number)</b>, your unique investor identifier across all brokers. You keep the same CHN even if you use more than one broker.</li></ul>
<p>Typical documents for KYC (Know Your Customer):</p>
<ul><li>Valid ID (NIN slip or card, international passport, driver's licence or voter's card)</li>
<li>BVN (Bank Verification Number)</li>
<li>Proof of address, such as a recent utility bill</li>
<li>Passport photograph and bank account details in your own name, for dividends and withdrawals</li></ul>
<div class="key"><b>Tip</b>Make sure the name on your bank account, BVN and broker account match exactly. Mismatches are the main cause of unpaid dividends.</div>`,[
 {q:"What is a CHN?",o:["A broker's licence","Your unique investor number with the clearing house","A type of share","The NGX trading hours"],a:1,why:"CHN stands for Clearing House Number, your investor identifier."},
 {q:"Why must your names match across BVN, bank and broker records?",o:["It is a fashion rule","Mismatches can stop dividend payments","It reduces share prices","It doesn't matter"],a:1,why:"Registrars pay into verified accounts; mismatched names cause failures."},
 {q:"Which of these is normally required for KYC?",o:["Your WhatsApp status","BVN and a valid ID","A university degree","A reference from the NGX"],a:1,why:"BVN and identification are standard KYC requirements."}]),
L(1,"Funding your account and understanding costs",`
<p>After your account is approved, you transfer money to your broker (usually into a designated client account). The broker credits your trading balance, and you can then place orders.</p>
<p>Every trade carries costs. On the NGX these usually include:</p>
<ul><li><b>Brokerage commission</b>, charged by your broker as a percentage of the trade value.</li>
<li><b>Statutory fees</b> such as the SEC fee and CSCS fee, plus VAT on commission.</li>
<li>Some apps add a platform or custody fee.</li></ul>
<p>Ask your broker for its current fee schedule; charges vary by broker and are reviewed from time to time. A useful rule of thumb is to work out the <b>round-trip cost</b>: what you pay to buy and later sell.</p>
<div class="ex">Example: if your total costs are about 1.5% to buy and 1.5% to sell, a share must rise about 3% before you make any profit.</div>
<div class="key"><b>Remember</b>Small, frequent trades lose a big share of their value to costs. Fewer, considered trades usually work out better.</div>`,[
 {q:"What does 'round-trip cost' mean?",o:["The cost of a taxi to the NGX","Total costs to buy and later sell","Only the buying fee","The dividend"],a:1,why:"Round trip = buying costs plus selling costs."},
 {q:"If buying and selling each cost about 1.5%, roughly how much must a share rise to break even?",o:["0.5%","1.5%","About 3%","10%"],a:2,why:"1.5% + 1.5% ≈ 3%."},
 {q:"Where should you get the exact fee schedule?",o:["Your broker","A random blog","Guess it","The weather report"],a:0,why:"Fees vary by broker; ask yours."}]),
L(1,"Placing your first order",`
<p>Your first order is simpler than it looks. In your broker's app or by instruction to your broker, you specify:</p>
<ol><li><b>The stock symbol</b>, for example DANGCEM for Dangote Cement or MTNN for MTN Nigeria.</li>
<li><b>Buy or sell.</b></li>
<li><b>Quantity</b> (number of units).</li>
<li><b>Order type</b>, usually a <b>limit order</b> at a price you choose (covered in Module 3).</li>
<li><b>Duration</b>, such as valid for today only or until a set date.</li></ol>
<p>When the order executes, your broker sends a <b>contract note</b> showing the price, quantity, fees and settlement date. Keep every contract note; you will need them for your records and for tax.</p>
<div class="key"><b>Before pressing buy</b>Check the symbol carefully. Several companies have similar names, and a wrong symbol buys the wrong business.</div>`,[
 {q:"What document confirms your executed trade?",o:["A contract note","A dividend warrant","A prospectus","A CHN"],a:0,why:"The contract note confirms the details of a trade."},
 {q:"What is DANGCEM?",o:["A bank","The NGX symbol for Dangote Cement","A tax","An order type"],a:1,why:"Stocks trade under short symbols."},
 {q:"Why keep your contract notes?",o:["They are collectible","For records and tax calculations","They increase your returns","They are not useful"],a:1,why:"They show your cost and sale prices."}]),
L(1,"How you receive dividends and track holdings",`
<p>When a company declares a dividend, the <b>registrar</b> pays it to shareholders on its register at the qualification date. Payment is usually made by direct transfer into your bank account (e-dividend).</p>
<p>To make sure you are paid:</p>
<ul><li><b>Register for e-dividend</b> with the registrars of the companies you own. Your broker can help.</li>
<li>Keep your bank details and contact details up to date.</li>
<li>Track statements: CSCS and your broker can show your holdings, and you should check them at least monthly.</li></ul>
<p>Unclaimed dividends are a long-standing problem in Nigeria, often caused by wrong bank details or name mismatches. Fixing this early avoids losing money you earned.</p>
<div class="key"><b>Remember</b>A dividend is only useful if it reaches you. Mandate your bank account with each registrar.</div>`,[
 {q:"Who pays your dividend into your bank account?",o:["The NGX","The registrar","The SEC","The broker's staff personally"],a:1,why:"Registrars process dividend payments."},
 {q:"What does e-dividend registration do?",o:["Doubles your dividend","Lets dividends be paid directly into your bank account","Cancels your shares","Nothing"],a:1,why:"It mandates electronic payment to your account."},
 {q:"A common cause of unclaimed dividends is…",o:["Too many dividends","Wrong bank details or name mismatches","Low share prices","Using a mobile app"],a:1,why:"Data mismatches stop payments."}]),

/* ===== Module 3 ===== */
L(2,"The trading day on the NGX",`
<p>The NGX equities market trades Monday to Friday, except public holidays. Times are West Africa Time (WAT). The day has sessions:</p>
<div class="tblwrap"><table><tr><th>Time</th><th>Session</th><th>What happens</th></tr>
<tr><td class="mono">09:30</td><td>Pre-open</td><td>Orders are entered; no trades execute yet.</td></tr>
<tr><td class="mono">09:55</td><td>Opening auction</td><td>The system balances orders to find opening prices.</td></tr>
<tr><td class="mono">10:00</td><td>Continuous trading</td><td>Buy and sell orders match as they arrive.</td></tr>
<tr><td class="mono">14:20</td><td>Pre-close</td><td>Orders for the closing auction.</td></tr>
<tr><td class="mono">14:30</td><td>Market close</td><td>Closing prices are set.</td></tr></table></div>
<p>So the main window for trades is 10:00 to 14:30. Orders you place outside these hours wait in queue until the next session, if your broker accepts them.</p>
<div class="key"><b>Source</b>Times follow the NGX published equities market structure. Check ngxgroup.com if they change.</div>`,[
 {q:"When does continuous trading start on the NGX?",o:["08:00","09:30","10:00","12:00"],a:2,why:"Continuous trading begins at 10:00 WAT."},
 {q:"What time does the NGX market close?",o:["14:30","16:00","17:30","12:00"],a:0,why:"Market close is 14:30 WAT."},
 {q:"During pre-open (09:30)…",o:["Trades execute immediately","Orders are entered but do not execute yet","The market is closed for the day","Only foreigners trade"],a:1,why:"Pre-open collects orders before the opening auction."}]),
L(2,"Bid, offer and the spread",`
<p>At any moment, buyers and sellers are waiting in the market:</p>
<ul><li>The <b>bid</b> is the highest price a buyer is currently willing to pay.</li>
<li>The <b>offer</b> (or ask) is the lowest price a seller is willing to accept.</li>
<li>The <b>spread</b> is the gap between them.</li></ul>
<div class="ex">Example: bid ₦23.80, offer ₦24.00. The spread is ₦0.20. If you buy now at ₦24.00 and immediately sell at ₦23.80, you lose ₦0.20 per share before fees.</div>
<p>Heavily traded stocks such as large banks usually have narrow spreads. Thinly traded small companies can have wide spreads and few sellers, so a buy order can push the price up and a sell order can push it down.</p>
<p>This ease of buying and selling is called <b>liquidity</b>. Check a stock's daily traded volume before you buy, especially if you might need to sell quickly.</p>`,[
 {q:"The bid is…",o:["The lowest price a seller accepts","The highest price a buyer will pay","The closing price","The dividend"],a:1,why:"Bid = best buying interest."},
 {q:"Bid ₦50.00, offer ₦50.50. What is the spread?",o:["₦0.05","₦0.50","₦5.00","₦100.50"],a:1,why:"50.50 − 50.00 = 0.50."},
 {q:"A thinly traded stock usually has…",o:["Narrow spreads and many sellers","Wide spreads and fewer trades","No price","Guaranteed liquidity"],a:1,why:"Low liquidity widens spreads."}]),
L(2,"Order types: limit and market",`
<p>How you instruct your order affects the price you get.</p>
<ul><li><b>Limit order:</b> buy at or below a price you set, or sell at or above it. You control the price, but the order may not fill.</li>
<li><b>Market order:</b> buy or sell immediately at the best available price. It fills quickly, but in a thin market the price can be worse than you expected.</li></ul>
<p>Orders also have a <b>duration</b>: <i>Day</i> (cancelled at close if unfilled) or <i>Good Till Date</i> (stays until a date you choose). Some systems support special instructions such as <b>Fill and Kill</b> (fill what you can now, cancel the rest) and <b>All or None</b>.</p>
<div class="key"><b>Practical rule</b>On the NGX, most retail investors should use limit orders. They protect you from paying far more than you intended in a stock with few sellers.</div>`,[
 {q:"Which order guarantees the price but not the execution?",o:["Market order","Limit order","Stop-loss on margin","Dividend order"],a:1,why:"A limit order fixes your price but may not fill."},
 {q:"What is the main risk of a market order in a thin stock?",o:["It never fills","You may pay a much worse price","It is illegal","It doubles fees"],a:1,why:"Market orders take whatever price is available."},
 {q:"A 'Day' order that does not fill is…",o:["Kept forever","Cancelled at market close","Converted to a bond","Sent to the SEC"],a:1,why:"Day orders expire at the close."}]),
L(2,"Price movement limits on the NGX",`
<p>To reduce extreme swings, the NGX caps how far a share's price can move in one day. The standard daily band is <b>±10%</b> from the previous close.</p>
<div class="ex">Example: a stock closed at ₦100. The next day it can trade between ₦90 and ₦110. This is why you often see top gainers at exactly +10% and losers at −10%.</div>
<p>On 23 October 2026, for instance, Dangote Cement and FirstHoldCo both closed exactly 10% up, at the daily ceiling.</p>
<p>Two more points:</p>
<ul><li>A price only changes if enough volume trades. In June 2026 the SEC approved NGX amendments that set new minimum volumes needed to move a published price: 10,000 units for stocks priced ₦1,000 and above, 50,000 for ₦500 to ₦1,000, and 100,000 below ₦500. The NGX said it would announce the effective date separately.</li>
<li>When a stock is "limit up" for several days, sellers may disappear. When it is "limit down", buyers may disappear. Plan exits before you need them.</li></ul>`,[
 {q:"A stock closed at ₦200. What is its maximum price the next day under a ±10% band?",o:["₦210","₦220","₦240","₦400"],a:1,why:"200 × 1.10 = 220."},
 {q:"Why do many top gainers show exactly +10%?",o:["Coincidence","They hit the daily upper limit","The SEC sets all prices","Dividends are 10%"],a:1,why:"The daily band caps the move at 10%."},
 {q:"What do the 2026 volume thresholds affect?",o:["How much volume must trade before the published price can change","Dividend tax","Broker licences","Trading hours"],a:0,why:"They set minimum traded quantities for a price change."}]),
L(2,"Settlement: T+2",`
<p>When your trade executes, ownership and money do not change hands instantly. They <b>settle</b> a short time later through the CSCS.</p>
<p>Since <b>28 November 2025</b>, Nigerian equities settle on <b>T+2</b>: two business days after the trade date (T). Before that the cycle was T+3.</p>
<div class="ex">Example: you buy on Monday. Settlement is Wednesday. The shares are then fully recorded in your CSCS account, and the seller receives the money.</div>
<p>Why it matters:</p>
<ul><li>If you sell, your cash is available after settlement, not on the trade day.</li>
<li>For dividends, you must be on the register by the qualification date. Because of settlement, you need to <b>buy at least two business days before</b> that date to qualify.</li></ul>
<div class="key"><b>Remember</b>T = trade date. T+2 = two business days later. Weekends and public holidays don't count.</div>`,[
 {q:"What is the current equities settlement cycle in Nigeria?",o:["T+0","T+2","T+3","T+5"],a:1,why:"Nigeria moved to T+2 on 28 November 2025."},
 {q:"You buy on Thursday (no holidays). When does it settle?",o:["Thursday","Friday","Monday","Wednesday"],a:2,why:"Two business days after Thursday is Monday."},
 {q:"Why must you buy before the qualification date to get a dividend?",o:["Because trades need time to settle","Because dividends are random","The broker decides","You don't need to"],a:0,why:"You must be on the register, which requires settlement."}]),

/* ===== Module 4 ===== */
L(3,"Boards of the NGX",`
<p>The NGX groups listed companies onto <b>boards</b> according to size, track record and governance.</p>
<ul><li><b>Premium Board:</b> the largest, most established companies that meet the highest listing and corporate-governance standards.</li>
<li><b>Main Board:</b> established companies that meet the standard listing requirements. Most listed companies sit here.</li>
<li><b>Growth Board:</b> smaller and younger companies with growth potential, under lighter entry requirements. It replaced the old Alternative Securities Market (ASeM) as the home for growth companies.</li></ul>
<p>A board is not a buy or sell signal. A Premium Board company can still be expensive or decline; a Growth Board company can be a strong business. But board placement tells you something about size, history and disclosure standards.</p>
<div class="key"><b>Use it this way</b>Smaller boards usually mean less liquidity and less analyst coverage. Size your positions smaller there and do more of your own research.</div>`,[
 {q:"Which board hosts the largest companies with the highest governance standards?",o:["Growth Board","Premium Board","Main Board","Penny Board"],a:1,why:"The Premium Board is for the largest, best-governed issuers."},
 {q:"The Growth Board is designed for…",o:["Government bonds","Smaller, younger companies with growth potential","Foreign currencies","Only banks"],a:1,why:"It serves growth-stage companies."},
 {q:"Is a company's board a buy signal?",o:["Yes, always","No, it describes size and standards, not value","Only on Mondays","Only for banks"],a:1,why:"Board placement says nothing about whether the price is attractive."}]),
L(3,"Large-cap, mid-cap and small-cap",`
<p><b>Market capitalisation</b> (market cap) is the total value the market puts on a company:</p>
<p class="mono">Market cap = share price × number of shares in issue</p>
<p>Investors group companies by size:</p>
<ul><li><b>Large-cap:</b> the biggest companies, such as Dangote Cement, MTN Nigeria, Airtel Africa and the largest banks. Usually more liquid and more stable.</li>
<li><b>Mid-cap:</b> medium-sized companies, often with room to grow.</li>
<li><b>Small-cap:</b> smaller companies. They can grow fast but are riskier and often thinly traded.</li></ul>
<p>There is no single official cut-off on the NGX; analysts use different thresholds. On the NGX a handful of large-caps make up a big share of the total market value, so they move the All-Share Index more than hundreds of small stocks combined.</p>
<div class="ex">Example: a company with 10 billion shares at ₦30 has a market cap of ₦300 billion.</div>`,[
 {q:"How is market capitalisation calculated?",o:["Revenue × profit","Share price × shares in issue","Dividend ÷ price","Assets − liabilities"],a:1,why:"Market cap = price × shares outstanding."},
 {q:"A company has 4 billion shares at ₦50. Its market cap is…",o:["₦20 billion","₦200 billion","₦2 trillion","₦54 billion"],a:1,why:"4bn × ₦50 = ₦200bn."},
 {q:"Small-cap stocks are generally…",o:["Risk-free","Riskier and less liquid","Always better than large-caps","Bonds"],a:1,why:"Smaller companies usually carry more risk and less liquidity."}]),
L(3,"Blue chips and penny stocks",`
<p><b>Blue-chip stocks</b> are large, well-established companies with long records of earnings and, usually, dividends. In Nigeria, investors commonly describe large banks, Dangote Cement, MTN Nigeria, Nestlé Nigeria and similar names this way. It is an informal label, not an official category.</p>
<p><b>Penny stocks</b> are shares priced very low, typically below ₦1 or a few naira. Low prices attract beginners because "you can buy many units". But:</p>
<ul><li>A low price does not mean a stock is cheap. Value depends on profits and the number of shares.</li>
<li>Many penny stocks are small, thinly traded and easier to move with little money, which makes them targets for hype.</li>
<li>A ₦0.50 stock and a ₦500 stock can be equally expensive or equally cheap relative to their earnings.</li></ul>
<div class="key"><b>Remember</b>Never judge a share by its price alone. Compare price with earnings per share (Module 6).</div>`,[
 {q:"Is 'blue chip' an official NGX classification?",o:["Yes","No, it is an informal label","Only for banks","Only for foreign stocks"],a:1,why:"Blue chip is market slang for large, established companies."},
 {q:"Why is a ₦0.60 share not automatically cheap?",o:["Because value depends on earnings and shares in issue, not price alone","Because the SEC says so","Because it pays no dividend","It is always cheap"],a:0,why:"Price must be compared with earnings."},
 {q:"Penny stocks are often targets for hype because…",o:["They are large and liquid","Little money can move their prices","They are government-guaranteed","They don't trade"],a:1,why:"Thin trading makes them easy to push around."}]),
L(3,"Growth, value and income stocks",`
<p>Investors also classify stocks by what they offer:</p>
<ul><li><b>Growth stocks:</b> companies expected to grow earnings fast. They often reinvest profits instead of paying large dividends, and usually trade at high valuation multiples.</li>
<li><b>Value stocks:</b> companies trading at low prices relative to their earnings or assets, often because the market is pessimistic about them. The investor bets that the pessimism is overdone.</li>
<li><b>Income (dividend) stocks:</b> companies that pay steady, relatively high dividends. Several Nigerian banks and telecom companies have been popular with income investors.</li></ul>
<p>A company can move between categories. A growth company matures and starts paying dividends; a value stock may stay cheap for a reason.</p>
<div class="key"><b>Use it this way</b>Decide what you want from a holding (growth, income or recovery) and judge it by that test.</div>`,[
 {q:"A company that reinvests most profits to expand quickly is typically a…",o:["Growth stock","Income stock","Bond","Penny stock"],a:0,why:"Growth companies reinvest for expansion."},
 {q:"A value stock is one that…",o:["Has the highest price","Trades cheaply relative to earnings or assets","Never pays dividends","Is on the Growth Board"],a:1,why:"Value means low price relative to fundamentals."},
 {q:"An investor who wants regular cash from holdings looks for…",o:["Income (dividend) stocks","Only penny stocks","Stocks with no profits","Rights issues only"],a:0,why:"Income stocks pay steady dividends."}]),
L(3,"Cyclical and defensive stocks",`
<p>Some businesses rise and fall with the economy; others are steadier.</p>
<ul><li><b>Cyclical stocks</b> do well when the economy is booming and poorly in downturns. Examples: cement and construction (people build more in good times), oil and gas (tied to crude prices), and some industrial goods.</li>
<li><b>Defensive stocks</b> sell things people buy in good times and bad: food, beverages, household products, telecom services and healthcare.</li></ul>
<p>In Nigeria, the picture is shaped by naira exchange rates, inflation and interest rates. A consumer goods company is defensive in demand, but if it imports raw materials, a weaker naira can still cut its profits sharply.</p>
<div class="key"><b>Remember</b>"Defensive" describes demand, not the share price. Always check a company's costs and currency exposure.</div>`,[
 {q:"Which is most likely a cyclical sector?",o:["Cement and construction","Basic food","Pharmaceuticals","Telecoms"],a:0,why:"Building activity rises and falls with the economy."},
 {q:"Defensive stocks sell products that…",o:["Only rich people buy","People keep buying in bad times","Are exported only","Are illegal"],a:1,why:"Demand for essentials is steady."},
 {q:"Why can a defensive Nigerian company still see profits fall?",o:["It can't","A weaker naira can raise imported input costs","Defensive stocks pay no tax","Because of trading hours"],a:1,why:"Currency exposure affects costs."}]),
L(3,"ETFs, REITs and other listed products",`
<p>The NGX lists more than ordinary shares:</p>
<ul><li><b>Exchange Traded Funds (ETFs):</b> funds that hold a basket of assets and trade like a share. Some track an NGX index; others hold gold or bonds. One purchase gives you diversification.</li>
<li><b>Real Estate Investment Trusts (REITs):</b> trusts that own income-producing property and pay out most of their rental income. UPDC REIT is an example on the NGX.</li>
<li><b>Bonds and mutual funds:</b> some government and corporate bonds and fund units are also listed.</li></ul>
<p>These products help beginners spread risk. Check their liquidity, though: some ETFs trade rarely, so their market price can drift away from the value of what they hold.</p>
<div class="key"><b>Remember</b>An ETF is only as diversified as the index or basket it holds. Read its factsheet.</div>`,[
 {q:"What does an ETF give you in one purchase?",o:["A single company","A basket of assets","A bank loan","A guaranteed return"],a:1,why:"ETFs hold a basket of securities."},
 {q:"A REIT mainly earns income from…",o:["Mining","Property rents","Phone calls","Crude oil"],a:1,why:"REITs own income-producing real estate."},
 {q:"A risk with some Nigerian ETFs is…",o:["They trade rarely, so prices can drift from asset value","They are illegal","They pay no fees","They never fall"],a:0,why:"Low liquidity can cause price gaps."}]),

/* ===== Module 5 ===== */
L(4,"How the NGX groups sectors",`
<p>The NGX sorts listed companies into sectors so investors can compare similar businesses. The main sectors are:</p>
<div class="tblwrap"><table><tr><th>Sector</th><th>Examples of listed companies</th></tr>
<tr><td>Financial Services</td><td>Banks, insurers, asset managers</td></tr>
<tr><td>Industrial Goods</td><td>Dangote Cement, BUA Cement, HBM Nigeria</td></tr>
<tr><td>Consumer Goods</td><td>Nestlé Nigeria, Nigerian Breweries, BUA Foods, PZ Cussons</td></tr>
<tr><td>Oil and Gas</td><td>Seplat Energy, Aradel Holdings, Conoil</td></tr>
<tr><td>ICT</td><td>MTN Nigeria, Airtel Africa</td></tr>
<tr><td>Agriculture</td><td>Okomu Oil Palm, Presco, FTN Cocoa, Livestock Feeds</td></tr>
<tr><td>Conglomerates</td><td>Transcorp, UAC of Nigeria</td></tr>
<tr><td>Healthcare</td><td>Fidson, May &amp; Baker, Neimeth</td></tr>
<tr><td>Construction / Real Estate</td><td>UPDC and others</td></tr>
<tr><td>Natural Resources, Services</td><td>Smaller groups of companies</td></tr></table></div>
<p>The following lessons take the biggest sectors one at a time: what drives them, what to look at, and the main risks.</p>`,[
 {q:"MTN Nigeria belongs to which NGX sector?",o:["ICT","Oil and Gas","Agriculture","Healthcare"],a:0,why:"Telecoms sit in the ICT sector."},
 {q:"Okomu Oil Palm and Presco are in…",o:["Agriculture","Industrial Goods","ICT","Insurance"],a:0,why:"Palm oil producers are in Agriculture."},
 {q:"Why are sectors useful?",o:["To compare similar businesses","They set share prices","They replace financial statements","They are only for tax"],a:0,why:"Sector grouping allows like-for-like comparison."}]),
L(4,"Financial Services: banks",`
<p>Banks are the most traded group on the NGX. Their business is simple to describe: they take deposits and lend money, earning the difference in interest (<b>net interest income</b>), plus fees, trading gains and foreign-exchange income.</p>
<p>What drives bank profits:</p>
<ul><li><b>Interest rates.</b> Higher CBN policy rates often widen what banks earn on loans and government securities.</li>
<li><b>Asset quality.</b> When borrowers fail to repay, banks book impairment charges that cut profit. Watch the <b>non-performing loan (NPL) ratio</b>.</li>
<li><b>Capital.</b> The CBN's bank recapitalisation programme required banks to raise new capital by March 2026. Rights issues and public offers from that exercise increased the number of bank shares.</li>
<li><b>FX gains.</b> Naira moves can produce large one-off gains or losses.</li></ul>
<div class="key"><b>Metrics to check</b>Return on equity (ROE), NPL ratio, capital adequacy ratio, cost-to-income ratio and dividend history.</div>`,[
 {q:"What is a bank's main income source?",o:["Selling cement","Net interest income from lending and deposits","Phone airtime","Crop sales"],a:1,why:"Banks earn the gap between interest received and paid."},
 {q:"A rising NPL ratio usually signals…",o:["Better asset quality","More loans going bad","Higher dividends","Lower risk"],a:1,why:"NPLs are loans not being repaid."},
 {q:"How did the bank recapitalisation programme affect shareholders?",o:["No effect","Banks issued more shares to raise capital","Banks were delisted","Dividends became mandatory"],a:1,why:"Raising new capital meant new shares, through rights issues and offers."}]),
L(4,"Financial Services: insurance and other financials",`
<p>Beyond banks, the Financial Services sector includes:</p>
<ul><li><b>Insurance companies</b> (for example AIICO and Cornerstone Insurance). They collect premiums, pay claims and invest the float. Profit depends on underwriting discipline and investment returns.</li>
<li><b>Asset managers and brokers</b>, whose income rises with market activity.</li>
<li><b>Holding companies</b> that own banks and other financial businesses.</li></ul>
<p>Many insurance stocks trade at low prices and attract speculation. Their results can swing widely with claims and investment gains, and the sector has gone through regulator-led recapitalisation as well.</p>
<div class="key"><b>Metrics to check</b>For insurers: gross written premium growth, claims ratio, combined ratio (claims plus expenses relative to premium; below 100% means underwriting profit) and solvency.</div>`,[
 {q:"An insurer earns from premiums and from…",o:["Investing its float","Selling cement","Mining gold","Airtime sales"],a:0,why:"Insurers invest premiums before claims are paid."},
 {q:"A combined ratio below 100% means…",o:["An underwriting profit","An underwriting loss","No customers","Bankruptcy"],a:0,why:"Claims plus expenses are less than premiums."},
 {q:"Why do insurance stock profits swing a lot?",o:["Claims and investment gains vary","They never change","They are fixed by law","Because of the weather only"],a:0,why:"Both claims and investment income are volatile."}]),
L(4,"Industrial Goods",`
<p>Industrial Goods on the NGX is dominated by <b>cement</b>: Dangote Cement, BUA Cement and HBM Nigeria (formerly Lafarge Africa). Because Dangote Cement is one of the largest companies on the exchange, its share price moves the whole index.</p>
<p>What drives the sector:</p>
<ul><li><b>Construction demand</b> from government infrastructure spending and private housing.</li>
<li><b>Energy costs.</b> Kilns burn gas, coal or other fuels; energy is a major cost.</li>
<li><b>Pricing power.</b> A few large producers dominate, so price increases often stick, though they attract public and political attention.</li>
<li><b>Currency.</b> Imported equipment and spare parts cost more when the naira weakens.</li></ul>
<div class="key"><b>Metrics to check</b>Sales volumes (tonnes), price per tonne, EBITDA margin, energy cost per tonne and debt levels.</div>`,[
 {q:"Which product dominates the NGX Industrial Goods sector?",o:["Cement","Rice","Phones","Crude oil"],a:0,why:"Cement producers are the largest companies in the sector."},
 {q:"Why does Dangote Cement move the whole NGX index?",o:["Its market cap is very large","It pays no dividends","It is a bank","It is on the Growth Board"],a:0,why:"Index weight follows market cap."},
 {q:"A major cost for cement makers is…",o:["Energy","Airtime","Insurance claims","Seeds"],a:0,why:"Kilns use a lot of energy."}]),
L(4,"Consumer Goods",`
<p>Consumer Goods companies make food, beverages and household products: Nestlé Nigeria, Nigerian Breweries, BUA Foods, Dangote Sugar, PZ Cussons and others.</p>
<p>What drives the sector:</p>
<ul><li><b>Consumer spending power.</b> High inflation squeezes household budgets, and people trade down to cheaper brands.</li>
<li><b>Input costs.</b> Many companies import raw materials or packaging. A weaker naira raises costs quickly.</li>
<li><b>FX-denominated debt.</b> Some firms owe dollars to parent companies or lenders; naira devaluation produced large FX losses for several of them after 2023.</li>
<li><b>Pricing.</b> Companies that can raise prices without losing volume protect their margins.</li></ul>
<div class="key"><b>Metrics to check</b>Revenue growth split into price and volume, gross margin, FX losses, net debt and negative equity (when liabilities exceed assets).</div>`,[
 {q:"Which is a Consumer Goods company?",o:["Nestlé Nigeria","Seplat Energy","Zenith Bank","Dangote Cement"],a:0,why:"Nestlé makes food and beverages."},
 {q:"Why did several consumer companies report big FX losses after 2023?",o:["They had dollar-denominated obligations when the naira weakened","They sold too much","They paid too many dividends","Trading hours changed"],a:0,why:"Naira devaluation increased the naira cost of dollar debts."},
 {q:"Revenue growth from price increases alone, with falling volumes, suggests…",o:["Strong demand","Consumers are buying less","No inflation","Higher market share for sure"],a:1,why:"Falling volumes mean fewer units sold."}]),
L(4,"Oil and Gas",`
<p>The Oil and Gas sector includes <b>upstream</b> producers such as Seplat Energy and Aradel Holdings, and <b>downstream</b> marketers such as Conoil, TotalEnergies Marketing Nigeria and MRS.</p>
<p>What drives the sector:</p>
<ul><li><b>Crude oil prices</b> (Brent), for producers' revenue.</li>
<li><b>Production volumes</b>, affected by pipeline security, theft and maintenance.</li>
<li><b>Exchange rates.</b> Producers earn in dollars, so a weaker naira can raise their naira earnings.</li>
<li><b>Fuel pricing and regulation</b> for marketers, including changes after petrol subsidy removal and the growth of local refining.</li></ul>
<div class="key"><b>Metrics to check</b>Production in barrels of oil equivalent per day, realised oil price, cost per barrel, reserves and debt. For marketers: volumes and margins per litre.</div>`,[
 {q:"An upstream oil company mainly…",o:["Explores and produces oil and gas","Sells fuel at filling stations only","Lends money","Makes cement"],a:0,why:"Upstream = exploration and production."},
 {q:"Why can a weaker naira help Nigerian oil producers?",o:["They earn largely in dollars","They import all their revenue","It cuts their production","It doesn't"],a:0,why:"Dollar revenue converts to more naira."},
 {q:"What key operational number should you check for a producer?",o:["Barrels of oil equivalent per day","Number of bank branches","Tonnes of cement","Insurance claims ratio"],a:0,why:"Production volume drives revenue."}]),
L(4,"ICT and telecoms",`
<p>The ICT sector is led by <b>MTN Nigeria</b> and <b>Airtel Africa</b>, two of the largest companies on the exchange by market value.</p>
<p>What drives them:</p>
<ul><li><b>Subscribers and data usage.</b> Data has become the main growth engine as smartphone use rises.</li>
<li><b>Tariffs.</b> Telecom prices are regulated by the Nigerian Communications Commission (NCC). Tariff approvals have a big effect on revenue.</li>
<li><b>Costs in dollars.</b> Tower leases and equipment are often priced in or linked to dollars, so naira weakness hurts margins.</li>
<li><b>Fintech services</b> such as mobile money (MoMo PSB, SmartCash) are a newer growth area.</li></ul>
<div class="key"><b>Metrics to check</b>Subscriber numbers, average revenue per user (ARPU), data traffic growth, EBITDA margin, capex and FX exposure.</div>`,[
 {q:"Who regulates telecom tariffs in Nigeria?",o:["NCC","SEC","NGX","CSCS"],a:0,why:"The Nigerian Communications Commission regulates telecoms."},
 {q:"What has become the main growth engine for telecoms?",o:["Data services","Landlines","Postal services","Cement"],a:0,why:"Data usage is growing fastest."},
 {q:"ARPU stands for…",o:["Average revenue per user","Annual return per unit","Asset ratio per unit","Approved rate per user"],a:0,why:"ARPU measures revenue per subscriber."}]),
L(4,"Agriculture",`
<p>Agriculture on the NGX is small in number but important: <b>Okomu Oil Palm</b> and <b>Presco</b> (palm oil), <b>FTN Cocoa Processors</b>, <b>Livestock Feeds</b> and <b>Ellah Lakes</b>, among others.</p>
<p>What drives the sector:</p>
<ul><li><b>Commodity prices.</b> Palm oil producers benefit when crude palm oil prices rise, both locally and internationally.</li>
<li><b>Yields and plantation age.</b> Palm trees take years to mature; new planting affects output years later.</li>
<li><b>Input costs:</b> fertiliser, maize and soybean (for feed producers), and diesel.</li>
<li><b>Weather and security</b> in farming areas.</li></ul>
<div class="key"><b>Metrics to check</b>Production tonnes, average selling price, mature hectares, gross margin and capital spending on new plantations.</div>`,[
 {q:"Which is an NGX-listed palm oil producer?",o:["Presco","MTN Nigeria","Zenith Bank","Conoil"],a:0,why:"Presco produces palm oil."},
 {q:"For a feed producer like Livestock Feeds, a key input cost is…",o:["Maize and soybean","Airtime","Cement","Crude oil reserves"],a:0,why:"Animal feed uses maize and soybean."},
 {q:"Why does new planting affect output only years later?",o:["Palm trees take years to mature","The SEC delays it","Prices are fixed","It doesn't"],a:0,why:"Plantation crops have long maturity periods."}]),
L(4,"Conglomerates, healthcare and real estate",`
<p><b>Conglomerates</b> own businesses across several industries. Transcorp, for example, has interests in hotels and power; UAC of Nigeria owns food, paints and other businesses. Value them by looking at each part separately, a sum-of-the-parts view.</p>
<p><b>Healthcare</b> includes drug makers such as Fidson, May &amp; Baker and Neimeth. Demand is steady, but many inputs (active pharmaceutical ingredients) are imported, so currency matters.</p>
<p><b>Construction and Real Estate</b> includes property developers and REITs. Results depend on property demand, interest rates and how quickly assets can be sold or let.</p>
<div class="key"><b>Remember</b>For a conglomerate, ask which unit makes the money. For healthcare, ask about import dependence. For real estate, ask about occupancy and debt.</div>`,[
 {q:"What is a conglomerate?",o:["A company with businesses across several industries","A type of bond","A bank regulator","An ETF"],a:0,why:"Conglomerates are diversified groups."},
 {q:"A sensible way to value a conglomerate is…",o:["Sum of the parts","Ignore it","Use only its share price","Count its employees"],a:0,why:"Value each business unit separately."},
 {q:"A key risk for Nigerian drug makers is…",o:["Imported raw materials priced in foreign currency","Too much rainfall","Telecom tariffs","Oil theft"],a:0,why:"Many pharmaceutical inputs are imported."}]),

/* ===== Module 6 ===== */
L(5,"The income statement",`
<p>The <b>income statement</b> (profit or loss statement) shows how much a company earned and spent over a period, usually a quarter or a year.</p>
<div class="tblwrap"><table><tr><th>Line</th><th>Meaning</th></tr>
<tr><td>Revenue</td><td>Sales of goods or services</td></tr>
<tr><td>Cost of sales</td><td>Direct costs of producing what was sold</td></tr>
<tr><td>Gross profit</td><td>Revenue − cost of sales</td></tr>
<tr><td>Operating expenses</td><td>Salaries, marketing, administration</td></tr>
<tr><td>Operating profit (EBIT)</td><td>Profit from the core business</td></tr>
<tr><td>Finance costs / FX gains or losses</td><td>Interest and currency effects</td></tr>
<tr><td>Profit after tax (PAT)</td><td>What belongs to shareholders</td></tr></table></div>
<p>Listed NGX companies publish quarterly results within set deadlines, and audited full-year accounts. You can find them on the NGX corporate disclosures page.</p>
<div class="key"><b>Look for</b>Revenue growth, margins (profit ÷ revenue) and whether profit came from the core business or one-off gains.</div>`,[
 {q:"Gross profit equals…",o:["Revenue − cost of sales","Revenue + expenses","Profit after tax × 2","Assets − liabilities"],a:0,why:"Gross profit is revenue less direct costs."},
 {q:"Which line belongs to shareholders after all costs and tax?",o:["Revenue","Profit after tax","Cost of sales","EBIT"],a:1,why:"PAT is the bottom line."},
 {q:"Why check whether profit came from one-off gains?",o:["One-off gains may not repeat","They are illegal","They are always bigger","It doesn't matter"],a:0,why:"Sustainable profit comes from the core business."}]),
L(5,"The balance sheet",`
<p>The <b>balance sheet</b> is a snapshot of what a company owns and owes on a date.</p>
<p class="mono">Assets = Liabilities + Equity</p>
<ul><li><b>Assets:</b> cash, receivables, inventory, factories, equipment.</li>
<li><b>Liabilities:</b> loans, payables to suppliers, other obligations.</li>
<li><b>Equity (shareholders' funds):</b> what is left for owners after liabilities.</li></ul>
<p>Warning signs:</p>
<ul><li><b>Negative equity:</b> liabilities exceed assets. Several Nigerian companies reached this after large FX losses.</li>
<li><b>Heavy short-term debt</b> with little cash.</li>
<li><b>Rapidly rising receivables</b>: customers may not be paying.</li></ul>
<div class="ex">Example: assets ₦500bn, liabilities ₦420bn. Equity is ₦80bn.</div>`,[
 {q:"The balance sheet equation is…",o:["Assets = Liabilities + Equity","Revenue = Profit","Assets = Revenue","Equity = Revenue − Tax"],a:0,why:"This identity always holds."},
 {q:"Assets ₦300bn, liabilities ₦350bn. Equity is…",o:["₦650bn","−₦50bn (negative equity)","₦50bn","₦0"],a:1,why:"300 − 350 = −50."},
 {q:"Which is a warning sign on a balance sheet?",o:["Large cash balance","Negative equity","Low debt","Steady receivables"],a:1,why:"Negative equity means liabilities exceed assets."}]),
L(5,"EPS and the P/E ratio",`
<p><b>Earnings per share (EPS)</b> divides profit after tax among the shares:</p>
<p class="mono">EPS = Profit after tax ÷ Shares in issue</p>
<p>The <b>price-to-earnings ratio (P/E)</b> tells you how much investors pay for each naira of earnings:</p>
<p class="mono">P/E = Share price ÷ EPS</p>
<div class="ex">Example: a company earns ₦50bn and has 10bn shares, so EPS = ₦5. If the share price is ₦40, P/E = 8. Investors pay ₦8 for every ₦1 of annual earnings.</div>
<p>A low P/E can mean the stock is cheap, or that the market expects profits to fall. A high P/E can mean strong expected growth, or that the price has run ahead of reality. Compare P/E with similar companies in the same sector and with the company's own history.</p>
<div class="key"><b>Remember</b>This is why price alone means nothing: a ₦1 share with EPS of ₦0.02 (P/E 50) is more expensive than a ₦100 share with EPS of ₦20 (P/E 5).</div>`,[
 {q:"Profit ₦20bn, shares 4bn. EPS is…",o:["₦0.20","₦5","₦80","₦24"],a:1,why:"20 ÷ 4 = 5."},
 {q:"Price ₦60, EPS ₦6. P/E is…",o:["10","6","360","66"],a:0,why:"60 ÷ 6 = 10."},
 {q:"Which is more expensive on earnings?",o:["₦2 share, EPS ₦0.05","₦200 share, EPS ₦40","They are the same","Can't compare"],a:0,why:"P/E of 40 versus 5."}]),
L(5,"Dividend yield and dividend dates",`
<p><b>Dividend yield</b> shows the cash return from dividends relative to price:</p>
<p class="mono">Dividend yield = Dividend per share ÷ Share price × 100</p>
<div class="ex">Example: ₦3 dividend, ₦30 share price. Yield = 10%.</div>
<p>Dividend dates you must know:</p>
<ul><li><b>Declaration date:</b> the company announces the dividend.</li>
<li><b>Qualification date</b> (also called closure date): you must be on the register by this date. With T+2 settlement, buy at least two business days earlier.</li>
<li><b>Payment date:</b> money is paid to your account.</li></ul>
<p>Shares usually fall by about the dividend amount after they go "ex-dividend", because new buyers no longer get that payment.</p>
<div class="key"><b>Watch out</b>A very high yield can be a warning: the share price may have fallen because the market expects the dividend to be cut.</div>`,[
 {q:"Dividend ₦2, price ₦40. Dividend yield is…",o:["2%","5%","20%","80%"],a:1,why:"2 ÷ 40 × 100 = 5%."},
 {q:"To receive a dividend you must be on the register by the…",o:["Payment date","Qualification date","AGM date only","Year end"],a:1,why:"The qualification date sets the list of entitled shareholders."},
 {q:"Why might a very high dividend yield be a warning?",o:["The price may have fallen on fears of a dividend cut","High yields are always safe","The SEC bans them","It isn't"],a:0,why:"Yield rises when price falls."}]),
L(5,"Price-to-book and return on equity",`
<p><b>Price-to-book (P/B)</b> compares the market price with the accounting value of equity per share (book value):</p>
<p class="mono">P/B = Share price ÷ Book value per share</p>
<p><b>Return on equity (ROE)</b> shows how much profit the company earns on shareholders' funds:</p>
<p class="mono">ROE = Profit after tax ÷ Average shareholders' equity × 100</p>
<p>These two work together, especially for banks. A bank with high ROE deserves a higher P/B than one with low ROE. Many Nigerian banks have traded below book value (P/B under 1) at times, which reflects investor doubts about asset quality, dividend sustainability or future dilution.</p>
<div class="ex">Example: equity ₦1tn, profit ₦250bn. ROE = 25%.</div>`,[
 {q:"P/B compares price with…",o:["Earnings","Book value per share","Revenue","Dividend"],a:1,why:"Book value = equity per share."},
 {q:"Profit ₦100bn, average equity ₦500bn. ROE is…",o:["5%","20%","50%","500%"],a:1,why:"100 ÷ 500 = 20%."},
 {q:"A bank trading at P/B below 1 means…",o:["The market values it below its accounting equity","It has no assets","It is delisted","It pays no tax"],a:0,why:"Price is less than book value per share."}]),
L(5,"Corporate actions: bonuses, rights and splits",`
<p>Companies sometimes change their share structure:</p>
<ul><li><b>Bonus issue:</b> free extra shares to existing holders, for example 1 for every 5 held. The share price adjusts down, so your total value does not change on the day.</li>
<li><b>Rights issue:</b> the right to buy new shares, usually at a discount. If you don't take up your rights (or sell them where allowed), your ownership percentage falls. This is <b>dilution</b>.</li>
<li><b>Share split:</b> one share becomes several cheaper ones. Value is unchanged.</li>
<li><b>Share reconstruction</b> (consolidation): the reverse of a split.</li></ul>
<div class="ex">Example: you own 500 shares at ₦10 (₦5,000). A 1-for-5 bonus gives you 100 more shares. Price adjusts to about ₦8.33. Value: 600 × ₦8.33 ≈ ₦5,000.</div>
<div class="key"><b>Remember</b>Bonuses and splits do not create value by themselves. Rights issues need cash from you if you want to keep your share of the company.</div>`,[
 {q:"After a bonus issue, your total value on the day…",o:["Doubles","Stays about the same","Falls to zero","Is taxed 50%"],a:1,why:"The price adjusts to reflect the extra shares."},
 {q:"If you ignore a rights issue, your ownership percentage…",o:["Rises","Falls (dilution)","Stays exactly the same","Becomes 100%"],a:1,why:"New shares go to others."},
 {q:"A share split…",o:["Creates value","Divides each share into more shares without changing value","Is a dividend","Is a bond"],a:1,why:"Splits change the count, not the value."}]),

/* ===== Module 7 ===== */
L(6,"The NGX All-Share Index",`
<p>The <b>NGX All-Share Index (ASI)</b> tracks the price performance of all ordinary shares listed on the NGX. It is weighted by market capitalisation, so large companies move it more.</p>
<p>When people say "the market rose 0.92% today", they usually mean the ASI. On 23 October 2026 the ASI closed at <b>247,222.27</b>, up 0.92%, and total market capitalisation was about <b>₦160.52 trillion</b>.</p>
<p>Points to understand:</p>
<ul><li>The ASI can rise while most stocks fall, if a few heavyweights rise strongly.</li>
<li>Check <b>market breadth</b> (number of gainers versus losers) to see how broad a move is.</li>
<li>The index measures prices only. Your real return also includes dividends.</li></ul>
<div class="key"><b>Remember</b>The index is a summary. Your portfolio return depends on what you hold.</div>`,[
 {q:"What does the NGX ASI track?",o:["Only bank shares","All ordinary shares listed on the NGX","Oil prices","The naira exchange rate"],a:1,why:"It covers all listed ordinary shares."},
 {q:"Why can the ASI rise while most stocks fall?",o:["It is weighted by market cap, so heavyweights dominate","It is random","The SEC adjusts it","It can't"],a:0,why:"Large companies carry more weight."},
 {q:"Market breadth means…",o:["Number of gainers versus losers","The width of the NGX building","Total dividends","Trading hours"],a:0,why:"Breadth shows how widespread a move is."}]),
L(6,"NGX 30 and sector indices",`
<p>Besides the ASI, the NGX publishes many other indices:</p>
<ul><li><b>NGX 30:</b> the 30 largest and most liquid companies. A good gauge of blue-chip performance.</li>
<li><b>Sector indices:</b> NGX Banking, NGX Insurance, NGX Consumer Goods, NGX Oil and Gas, NGX Industrial Goods and others.</li>
<li><b>Thematic indices:</b> for example NGX Pension (stocks eligible for pension fund investment) and NGX Premium (Premium Board companies).</li></ul>
<p>Use them to answer two questions: which parts of the market are leading, and whether a stock you own is doing better or worse than its own sector.</p>
<div class="ex">Example: if your bank stock rose 5% this year but the NGX Banking index rose 20%, your stock has lagged its peers. Find out why.</div>`,[
 {q:"The NGX 30 tracks…",o:["The 30 largest, most liquid companies","30 random stocks","30 bonds","30 brokers"],a:0,why:"NGX 30 covers the top 30 by size and liquidity."},
 {q:"Your stock rose 5%; its sector index rose 20%. Your stock has…",o:["Outperformed","Underperformed its sector","Matched","Been delisted"],a:1,why:"5% is less than 20%."},
 {q:"Sector indices help you see…",o:["Which parts of the market are leading","Your bank balance","Tax rates","Trading hours"],a:0,why:"They compare sector performance."}]),
L(6,"Reading a daily market report",`
<p>A typical daily NGX report contains:</p>
<ul><li><b>ASI close and % change</b>, and the year-to-date return.</li>
<li><b>Market capitalisation</b> and how much value was gained or lost.</li>
<li><b>Volume</b> (number of shares traded), <b>value</b> (naira amount) and <b>deals</b> (number of trades).</li>
<li><b>Top gainers and losers.</b></li>
<li><b>Most traded stocks</b> by volume or value.</li></ul>
<p>How to read it well: rising prices on rising volume suggest stronger conviction; a stock up 10% on a few thousand shares means little. Large value traded in one stock can come from a single block trade between institutions.</p>
<div class="ex">On 23 October 2026, volume jumped about 70% to roughly 611.7 million shares across 33,540 deals as the index rose 0.92%, led by Dangote Cement and FirstHoldCo at the 10% limit.</div>`,[
 {q:"'Deals' in a market report means…",o:["Number of trades executed","Number of companies","Total dividends","Broker fees"],a:0,why:"Deals count individual trades."},
 {q:"A price rise on very low volume is…",o:["Strong evidence","Weak evidence of real demand","Always a buy signal","Impossible"],a:1,why:"Few trades say little about demand."},
 {q:"Volume measures…",o:["Naira value traded","Number of shares traded","Number of brokers","Price change"],a:1,why:"Volume is the number of units."}]),
L(6,"Interest rates, inflation and the naira",`
<p>The macroeconomy shapes the whole market.</p>
<ul><li><b>Interest rates.</b> The Central Bank's Monetary Policy Rate (MPR) influences yields on Treasury bills and bonds. When safe yields are high, some investors move money out of stocks into fixed income, and vice versa.</li>
<li><b>Inflation.</b> High inflation erodes consumers' spending power and raises company costs. Stocks of companies that can raise prices hold up better.</li>
<li><b>Exchange rates.</b> A weaker naira raises costs for importers, helps exporters and dollar earners, and affects how foreign investors see Nigerian returns.</li>
<li><b>Foreign portfolio flows.</b> When foreign investors can move money in and out easily, they add demand, especially for large-caps.</li></ul>
<div class="key"><b>Practice</b>Before a CBN Monetary Policy Committee meeting, read what analysts expect, then watch how bank and consumer stocks react to the decision.</div>`,[
 {q:"When Treasury bill yields are very high, stocks may face…",o:["More demand","Competition from safe fixed income","No effect ever","Delisting"],a:1,why:"Investors compare returns across assets."},
 {q:"A weaker naira usually helps…",o:["Companies that earn in dollars","Companies that only import inputs","No one","Only banks with dollar debts"],a:0,why:"Dollar earnings convert to more naira."},
 {q:"Which body sets the Monetary Policy Rate?",o:["The CBN","The NGX","The SEC","CSCS"],a:0,why:"The Central Bank's MPC sets it."}]),
L(6,"Charts and technical analysis basics",`
<p><b>Technical analysis</b> studies price and volume patterns. Even if you invest on fundamentals, a few basics help with timing.</p>
<ul><li><b>Trend:</b> a series of higher highs and higher lows is an uptrend; lower highs and lower lows is a downtrend.</li>
<li><b>Support and resistance:</b> price levels where buying or selling has repeatedly appeared.</li>
<li><b>Moving averages:</b> the average closing price over, for example, 50 or 200 days. Price above a rising average suggests an uptrend.</li>
<li><b>Volume confirmation:</b> breakouts on high volume are more meaningful.</li></ul>
<p>Limits on the NGX: many stocks trade too thinly for patterns to mean much, and the ±10% daily band shapes how charts look. Use technical tools mainly on liquid stocks.</p>
<div class="key"><b>Remember</b>Charts describe what has happened. They don't explain why, and they don't guarantee what happens next.</div>`,[
 {q:"Higher highs and higher lows describe…",o:["A downtrend","An uptrend","A dividend","A rights issue"],a:1,why:"That is the definition of an uptrend."},
 {q:"A 200-day moving average is…",o:["The average closing price over 200 trading days","200 shares","A 200% return","A tax"],a:0,why:"It smooths price over 200 days."},
 {q:"Why are chart patterns less reliable on thin NGX stocks?",o:["Few trades make patterns noisy","Charts are illegal","The SEC changes them","They are always reliable"],a:0,why:"Low volume means less information in prices."}]),

/* ===== Module 8 ===== */
L(7,"Diversification and position sizing",`
<p><b>Diversification</b> means spreading money across different companies and sectors so one bad outcome doesn't ruin you.</p>
<ul><li>Hold several companies across different sectors, not five banks.</li>
<li>Consider an ETF for broad exposure.</li>
<li>Keep an emergency fund in cash or money-market funds outside the stock market.</li></ul>
<p><b>Position sizing</b> limits how much of your portfolio sits in one stock. A common beginner rule is no more than 10–15% in any single company, and less in small, illiquid stocks.</p>
<div class="ex">Example: with ₦500,000 and a 10% limit, your largest position is ₦50,000. If that stock halves, you lose ₦25,000, or 5% of the portfolio, not half your savings.</div>
<div class="key"><b>Remember</b>Only invest money you will not need in the next few years.</div>`,[
 {q:"Holding five banks and nothing else is…",o:["Well diversified","Concentrated in one sector","Risk-free","An ETF"],a:1,why:"All holdings face the same sector risks."},
 {q:"₦1,000,000 portfolio with a 10% position limit. Max in one stock?",o:["₦10,000","₦100,000","₦500,000","₦1,000,000"],a:1,why:"10% of ₦1m = ₦100,000."},
 {q:"Where should your emergency fund be?",o:["In penny stocks","In cash or money-market funds","In one stock","In a rights issue"],a:1,why:"Emergency money must be safe and available."}]),
L(7,"Taxes on your stock market returns",`
<p>Two taxes matter most for individual investors.</p>
<p><b>Withholding tax on dividends.</b> Dividends are paid after tax is deducted at source, generally at 10%. The registrar deducts it before the money reaches you.</p>
<p><b>Tax on gains from selling shares.</b> From <b>1 January 2026</b>, under the Nigeria Tax Act 2025, gains on shares are taxed at your income tax rates rather than a flat 10%. Key reliefs announced for individuals:</p>
<ul><li>Exemption where total disposal proceeds in 12 months are no more than <b>₦150 million</b> and total gains are no more than <b>₦10 million</b>.</li>
<li>Gains reinvested in shares of Nigerian companies within 12 months can be exempt.</li>
<li>For shares held before 2026, the cost base can be the higher of what you paid or the closing price on 31 December 2025.</li></ul>
<p>Detailed regulations may refine these rules. Keep your contract notes, and confirm your position with a tax professional.</p>
<div class="key"><b>Remember</b>Most small retail investors fall within the exemption thresholds, but records are what prove it.</div>`,[
 {q:"Dividend withholding tax is generally…",o:["0%","10%","30%","50%"],a:1,why:"Dividends generally attract 10% WHT, deducted at source."},
 {q:"From when do the new rules on share gains apply?",o:["1 January 2026","1 January 2020","They don't exist","2030"],a:0,why:"The Nigeria Tax Act 2025 rules took effect on 1 January 2026."},
 {q:"Which records help prove your gains and exemptions?",o:["Contract notes","WhatsApp chats","Screenshots of tips","None"],a:0,why:"Contract notes show your costs and sale prices."}]),
L(7,"Spotting scams and market manipulation",`
<p>Nigeria has seen many investment schemes collapse. Learn the warning signs:</p>
<ul><li><b>Guaranteed high returns</b>, such as "10% per month, no risk".</li>
<li><b>Pressure to act now</b> and to recruit friends for bonuses.</li>
<li><b>Unregistered operators.</b> Check the SEC website.</li>
<li><b>Pump-and-dump</b> in small stocks: a group promotes a thinly traded stock, buyers rush in, the promoters sell, and the price collapses.</li>
<li><b>Fake "signals" groups</b> that charge fees and show only winning trades.</li></ul>
<div class="key"><b>Rule</b>If someone guarantees a return on shares, they are either mistaken or lying. Share returns can never be guaranteed.</div>
<p>If you suspect fraud, report it to the SEC and keep records of every payment and message.</p>`,[
 {q:"'Invest ₦100,000 and earn 15% monthly, guaranteed' is…",o:["A safe stock","A classic scam warning sign","An ETF","A dividend"],a:1,why:"Guaranteed high returns are a red flag."},
 {q:"In a pump-and-dump, promoters…",o:["Buy and hold for years","Hype a thin stock, then sell to late buyers","Pay dividends","Report to the SEC"],a:1,why:"They profit from the buyers they attract."},
 {q:"Where can you check if an investment firm is registered?",o:["The SEC","Instagram","A WhatsApp status","Nowhere"],a:0,why:"The SEC keeps registers of capital market operators."}]),
L(7,"Your emotions and your returns",`
<p>Most beginner losses come from behaviour, not bad luck.</p>
<ul><li><b>Fear of missing out (FOMO):</b> buying after a stock has already hit +10% several days running.</li>
<li><b>Panic selling:</b> selling good companies in a temporary fall.</li>
<li><b>Anchoring:</b> refusing to sell a bad investment until it "gets back to what I paid".</li>
<li><b>Overconfidence:</b> trading too often after a few wins.</li></ul>
<p>Practical defences:</p>
<ol><li>Write down why you are buying before you buy.</li>
<li>Decide in advance what would make you sell (the business changed, the price far exceeds your estimate of value, or you need the money).</li>
<li>Review your portfolio on a schedule, such as monthly, rather than every hour.</li></ol>
<div class="key"><b>Remember</b>The market will test your patience. A written plan protects you from your own impulses.</div>`,[
 {q:"Buying a stock only because it rose 10% three days in a row is…",o:["Analysis","FOMO","Diversification","Dividend investing"],a:1,why:"That is fear of missing out."},
 {q:"Refusing to sell until the price returns to your purchase price is…",o:["Anchoring","Hedging","Value investing","Settlement"],a:0,why:"Your purchase price is irrelevant to the company's future."},
 {q:"A good defence against emotional trading is…",o:["Check prices every minute","A written investment plan","Follow every tip","Borrow to invest"],a:1,why:"A plan made in calm conditions guides decisions."}]),
L(7,"Building your first investment plan",`
<p>Put everything together into a simple written plan:</p>
<ol><li><b>Goal:</b> what are you investing for, and when will you need the money?</li>
<li><b>Amount:</b> a starting sum and a monthly contribution you can sustain, after your emergency fund.</li>
<li><b>Approach:</b> for example, 60% in large-cap dividend payers across three sectors, 20% in an index ETF, 20% in carefully researched mid-caps.</li>
<li><b>Rules:</b> maximum per stock, limit orders only, no borrowing to invest.</li>
<li><b>Research routine:</b> read each company's quarterly results; follow the NGX disclosures page.</li>
<li><b>Review:</b> monthly check, deeper review every quarter.</li></ol>
<div class="ex">Monthly investing (sometimes called naira-cost averaging) means you buy more units when prices are low and fewer when they are high, and it removes the pressure to time the market perfectly.</div>
<div class="key"><b>Next step</b>Use the AI desk to test your understanding, read the research links, and message us on WhatsApp if you want help getting started.</div>`,[
 {q:"What should come before investing in stocks?",o:["An emergency fund","A loan","A penny stock","Nothing"],a:0,why:"Emergency money protects you from forced selling."},
 {q:"Investing a fixed amount every month helps you…",o:["Avoid needing to time the market","Guarantee profit","Avoid all fees","Get bonuses"],a:0,why:"Regular investing spreads purchase prices over time."},
 {q:"Which rule belongs in a sensible beginner plan?",o:["Borrow heavily to invest","Use limit orders and cap each position","Buy every tip","Put everything in one stock"],a:1,why:"Limit orders and position caps control risk."}])
];

