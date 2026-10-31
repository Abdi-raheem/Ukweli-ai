import { ScamScenario } from '../types';

export const KENYAN_SCAM_SCENARIOS: ScamScenario[] = [
  {
    id: 'mpesa-reverse-con',
    title: 'Fake M-Pesa Reverse Scam',
    category: 'Fake M-Pesa SMS / Reverse Fraud',
    riskHint: 'High Risk',
    contextTag: 'Safaricom SMS',
    description: 'SMS spoofed to look like an M-Pesa deposit, followed by a frantic call begging for reversal.',
    text: `RC82KL9201 Confirmed. You have received Ksh14,500.00 from STEPHEN NJOROGE 0722894102 on 30/10/26 at 1:15 PM. New M-PESA balance is Ksh15,120.00. Transaction cost, Ksh0.00.

[Followed by phone call from 0722894102]: "Hujambo bro, nimekosea kutuma ada ya mtoto wangu kwako badala ya mwalimu. Tafadhali nirudishie Ksh 14,000 kwa hii namba haraka mtoto asifukuzwe shule!"`,
  },
  {
    id: 'advance-loan-app',
    title: 'Predatory Fake Loan App Fee',
    category: 'Advance-Fee Fake Loan',
    riskHint: 'High Risk',
    contextTag: 'Fast Cash Loan',
    description: 'Fake lending app offering large instant loan but demanding upfront "processing/security" fee.',
    text: `CONGRATULATIONS! Your Tala-Plus Quick Loan application of KES 28,000 has been APPROVED by the Credit Committee.

To disburse funds directly to your M-Pesa wallet within 5 minutes:
1. Pay mandatory CRB Verification & File Activation Fee of KES 380
2. Pay to Buy Goods Till Number: 748291 (Tala Operations Dept)
3. Your loan of KES 28,000 + bonus KES 500 will disburse immediately upon fee payment.
Hurry! Offer expires in 25 minutes!`,
  },
  {
    id: 'kuccps-laptop-grant',
    title: 'Fake KUCCPS / Govt Grant Link',
    category: 'WhatsApp / Viral Disinformation',
    riskHint: 'High Risk',
    contextTag: 'WhatsApp Broadcast',
    description: 'Viral message on student WhatsApp groups claiming government is giving free laptops and KES 10,000 stipends.',
    text: `*MINISTRY OF EDUCATION & KUCCPS PRESIDENTIAL LAPTOP SCHEME 2026* 💻🇰🇪

Due to new digital learning guidelines, President Ruto has directed the Ministry of Education to disburse FREE HP Core i5 Laptops + KES 10,000 study allowance to all first year, second year and university students nationwide.

Over 45,000 students have already received theirs!
Registration is FREE and closes tonight at 11:59 PM.

Click the official link below to claim yours before slots fill up:
👉 http://kuccps-fund-disbursement.top/apply-now?ref=zetech

*Share this message to 5 WhatsApp student groups to verify your national ID immediately.*`,
  },
  {
    id: 'ghost-electronics-shop',
    title: 'Instagram Ghost iPhone Deal',
    category: 'Ghost Social Commerce Shop',
    riskHint: 'High Risk',
    contextTag: 'Instagram / TikTok',
    description: 'Dubious electronics shop in "Nairobi CBD" advertising phones at 80% discount and asking for courier deposits.',
    text: `🚨 CRAZY WEEKEND CLEARANCE SALE AT NAIROBI IWORLD HUB! 🚨
Location: Tom Mboya Street, Al-Noor Exhibition, 2nd Floor Shop 14.

Brand New Apple iPhone 15 Pro Max 256GB (Sealed box, 1 year Apple Care):
Normal Price: KES 165,000
Clearance Price: KES 34,999 ONLY! (3 units remaining!)

Free Delivery across Kenya via Fargo Courier / Easy Coach.
NOTE: Due to high demand in Nairobi, strictly NO WALK-INS without reservation. Pay delivery deposit of KES 1,200 to Till 918230 (Nairobi Logistics) to hold your unit. Once rider arrives, you inspect and pay remaining balance.`,
  },
  {
    id: 'kdf-recruitment-bribe',
    title: 'Fake KDF / Police Recruitment Notice',
    category: 'Impersonation / Fake Tender',
    riskHint: 'High Risk',
    contextTag: 'Telegram / WhatsApp',
    description: 'Impersonating military recruitment officers promising guaranteed cadets slots for an upfront medical badge fee.',
    text: `KENYA DEFENCE FORCES (KDF) 2026 MASS RECRUITMENT CALL-UP LIST
Reference: MOD/REC/VOL.XI/2026

Special notification for shortlisted civilian candidates in Kiambu, Nairobi, and Machakos counties.
Reporting date: 15th November 2026 at Lanet Barracks Nakuru.
All shortlisted recruits must purchase the official Military Medical Examination Badge (KES 2,450) through Major Kiprono on WhatsApp 0719-384-912 before receiving the stamped Ministry of Defence clearance voucher.
Do not share this internal communication.`,
  },
  {
    id: 'legit-safaricom-bundle',
    title: 'Legitimate Safaricom Official Offer',
    category: 'Genuine Communication',
    riskHint: 'Safe',
    contextTag: 'Authentic SMS',
    description: 'Official promotional offer from Safaricom through alphanumeric shortcode with no suspicious external links.',
    text: `Dear Customer, get 2.5GB + 300 Mins + 500 SMS valid for 30 Days at only Ksh 500 with Tunukiwa Monthly. Dial *544# to activate. Safaricom, for you.`,
  },
];

export const SHENG_FRAUD_GLOSSARY = [
  {
    term: 'Kuoshwa',
    literal: 'To be washed',
    fraudMeaning: 'To get conned or have all your money drained in broad daylight by deceptive tricksters.',
    example: '"Bro usilipe hiyo registration fee ya loan, utaoshwa vibaya sana!"',
  },
  {
    term: 'Kamiti Network',
    literal: 'Kamiti Maximum Prison syndicate',
    fraudMeaning: 'Incarcerated fraudsters using smuggled phones to send mass fake M-Pesa SMS and call victims pretending to be confused callers or Safaricom engineers.',
    example: '"Hao ni mafisi wa Kamiti wamekutumia fake SMS ya balance."',
  },
  {
    term: 'Kukatwa Fee',
    literal: 'To be deducted a fee',
    fraudMeaning: 'Scam technique where victims are convinced that paying a small "token fee" (e.g. KES 300) will unlock a huge windfall (KES 50,000).',
    example: '"Hakuna loan inaitisha deposit kwanza. Ukilipa, umekatwa."',
  },
  {
    term: 'Kuibiwa Hewani',
    literal: 'Stolen in the air (SIM swap)',
    fraudMeaning: 'Remote SIM swap fraud or deceptive social engineering where scammers obtain your PIN or OTP over the phone.',
    example: '"Msee alipigiwa na mtu anadai ni Safaricom care, akaibiwa hewani."',
  },
  {
    term: 'Ghost Shop (Boda Boda Courier Con)',
    literal: 'Virtual non-existent shop',
    fraudMeaning: 'Social media sellers who ask for parcel or courier fees before dispatching a product, then immediately block you on WhatsApp and Instagram.',
    example: '"Huyo seller wa Instagram hana duka, ni ghost shop."',
  },
  {
    term: 'Kuwa Rada',
    literal: 'Be on radar / alert',
    fraudMeaning: 'Stay hyper-vigilant against digital fraud tricks targeting Kenyan youth and students.',
    example: '"Kuwa rada na link za WhatsApp zinazodai kuna free laptops za government."',
  },
];

export const VERIFIED_HOTLINES = [
  {
    agency: 'Safaricom Fraud Reporting',
    action: 'Forward suspicious SMS or con phone number to 333 (Free of charge)',
    phone: '333',
    channel: 'SMS',
    badge: 'Official Safaricom',
  },
  {
    agency: 'M-Pesa Official Reversal',
    action: 'Forward the legitimate transaction SMS to 456 to initiate official automated reversal',
    phone: '456',
    channel: 'SMS',
    badge: 'M-Pesa 456',
  },
  {
    agency: 'DCI Anti-Fraud Unit',
    action: 'Directorate of Criminal Investigations Cybercrime & Serious Crimes Division',
    phone: '0800 722 203',
    channel: 'Toll-Free',
    badge: 'National Police',
  },
  {
    agency: 'National Cyber Security (NC4)',
    action: 'Report digital identity theft, domain spoofing, and mass phishing campaigns',
    phone: 'incidents@nc4.go.ke',
    channel: 'Email / Portal',
    badge: 'National Security',
  },
  {
    agency: 'Central Bank of Kenya (CBK)',
    action: 'Verify if a digital credit lender is legally licensed under DCP regulations',
    phone: 'www.centralbank.go.ke',
    channel: 'Web Directory',
    badge: 'Regulator',
  },
];
