export type Locale = "en" | "ur";

export const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.programs": "Programs",
    "nav.impact": "Impact",
    "nav.donate": "Donate",
    "nav.contact": "Contact",
    "nav.donateNow": "Donate Now",

    // Hero
    "hero.established": "Established 1998",
    "hero.titleLine1": "Al-Iftikhar",
    "hero.titleLine2Accent": "Bugvia",
    "hero.titleLine2Rest": "Foundation",
    "hero.subtitle":
      "Serving rural communities through education, healthcare, and social welfare across Bhera, Buggah Sharif, and the villages of District Jhelum.",
    "hero.cta.support": "Support Our Cause",
    "hero.cta.learn": "Learn More",

    // About
    "about.label": "Who We Are",
    "about.headingStart": "Rooted in ",
    "about.headingAccent": "Service",
    "about.p1":
      "Founded in 2008 by Dr. Anwaar Ahmed Bugvi, the Al-Iftikhar Bugvia Foundation was born from a deep commitment to uplifting the rural ancestral communities of the Bugvi family.",
    "about.p1.founder": "Dr. Anwaar Ahmed Bugvi",
    "about.p2":
      "Operating across Buggah Sharif, Khanna, Dhook, and surrounding villages in District Jhelum, AIBF addresses the most fundamental needs of underserved communities — from clean water and education to healthcare and social support.",
    "about.p3":
      "We believe that every individual deserves access to basic necessities and the opportunity to lead a dignified life. Our work is guided by Islamic principles of service, compassion, and community solidarity.",
    "about.quote":
      "\u201CTrue service is not in grand gestures but in the quiet, persistent commitment to lifting those around us.\u201D",
    "about.quoteAuthor": "— Dr. Anwaar Ahmed Bugvi, Founder",
    "about.value1.title": "Education & Character",
    "about.value1.desc":
      "Propagation of education and character building for the next generation, with merit-based scholarships and awards.",
    "about.value2.title": "Healthcare Access",
    "about.value2.desc":
      "Free medical camps including general medicine, ophthalmology, and gynecology for rural communities.",
    "about.value3.title": "Social Welfare",
    "about.value3.desc":
      "Supporting widows, orphans, the elderly, and disaster victims with financial assistance and resources.",
    "about.value4.title": "Cultural Preservation",
    "about.value4.desc":
      "Preserving the heritage and traditions of Bhera, Buggah Sharif, and surrounding areas for future generations.",

    // Programs
    "programs.label": "What We Do",
    "programs.headingStart": "Our ",
    "programs.headingAccent": "Programs",
    "programs.subtitle":
      "From healthcare to education, our programs address the most fundamental needs of underserved rural communities.",
    "programs.1.title": "Free Medical Camps",
    "programs.1.desc":
      "Regular medical camps providing general medicine, eye care, and gynecology services to rural communities with no access to healthcare facilities.",
    "programs.2.title": "Merit Scholarships",
    "programs.2.desc":
      "Cash awards and certificates for high-achieving students, encouraging academic excellence and providing educational support for underprivileged families.",
    "programs.3.title": "Ramadan & Eid Support",
    "programs.3.desc":
      "Distribution of ration packages during Ramadan and Eid gifts to families in need, ensuring no one is left behind during celebrations.",
    "programs.4.title": "Marriage Assistance",
    "programs.4.desc":
      "Financial support and dowry assistance for daughters of economically disadvantaged families, helping them begin married life with dignity.",
    "programs.5.title": "Sahaara Relief Program",
    "programs.5.desc":
      "Our flagship initiative providing direct support to burn patients, widows, disabled families, and those in urgent medical need through financial assistance and essential resources.",
    "programs.6.title": "Heritage Preservation",
    "programs.6.desc":
      "Documenting and preserving the cultural traditions, literary heritage, and spiritual teachings of Bhera and Buggah Sharif for future generations.",

    // Impact
    "impact.label": "Our Reach",
    "impact.headingStart": "Making a ",
    "impact.headingAccent": "Difference",
    "impact.stat1.number": "391+",
    "impact.stat1.label": "Patients Treated",
    "impact.stat1.sub": "At Bugvia Foundation Dispensary",
    "impact.stat2.number": "27+",
    "impact.stat2.label": "Years of Service",
    "impact.stat2.sub": "Established 1998",
    "impact.stat3.number": "35+",
    "impact.stat3.label": "Ration Drives",
    "impact.stat3.sub": "Families supported each Ramadan",
    "impact.stat4.number": "63",
    "impact.stat4.label": "Community Updates",
    "impact.stat4.sub": "On our Instagram @aibf_org",
    "impact.quote":
      "Our mission is simple — to bring education, health, and dignity to every family in our communities. We are Ansars — helpers — and we answer that calling every day.",
    "impact.quoteAttrib": "Al-Iftikhar Bugvia Foundation",

    // Donate
    "donate.label": "Make a Difference",
    "donate.headingLine1": "Your ",
    "donate.headingAccent": "Generosity",
    "donate.headingLine2": "Changes Lives",
    "donate.p1":
      "All community members, family, friends, well-wishers and donors are requested to join hands with Al-Iftikhar Bugvia Foundation for the service of Islam and Humanity.",
    "donate.p2":
      "Your contributions fund free medical camps, educational scholarships, Ramadan ration packages, and direct support for widows, orphans, and the elderly.",
    "donate.type.zakat": "Zakat",
    "donate.type.sadqa": "Sadqa",
    "donate.type.charity": "Charity",
    "donate.type.donations": "Donations",
    "donate.bankTitle": "Bank Transfer Details",
    "donate.bank.label": "Bank",
    "donate.bank.value": "Faysal Bank, MBS Bhera (3353)",
    "donate.account.label": "Account Title",
    "donate.account.value": "Al Iftikhar Bugvia Foundation",
    "donate.iban.label": "IBAN",
    "donate.iban.value": "PK45 FAYS 3353 4990 0000 6131",
    "donate.intl":
      "For international transfers or other payment methods, please ",
    "donate.intl.link": "contact us directly",
    "donate.copyIban": "Copy IBAN",
    "donate.suggest1.amount": "Rs 1,000",
    "donate.suggest1.label": "Medicine for a patient",
    "donate.suggest1.icon": "💊",
    "donate.suggest2.amount": "Rs 5,000",
    "donate.suggest2.label": "A family's monthly ration",
    "donate.suggest2.icon": "🛒",
    "donate.suggest3.amount": "Rs 10,000",
    "donate.suggest3.label": "A student's annual scholarship",
    "donate.suggest3.icon": "📚",
    "donate.suggest4.amount": "Rs 25,000",
    "donate.suggest4.label": "A widow's fresh start",
    "donate.suggest4.icon": "🏠",

    // Instagram CTA
    "instagram.heading": "Follow Our Journey",
    "instagram.subtitle": "Stay connected with our work and community impact on Instagram",
    "instagram.handle": "@aibf_org",
    "instagram.cta": "Follow Us on Instagram",

    // Contact
    "contact.label": "Get in Touch",
    "contact.headingStart": "Contact ",
    "contact.headingAccent": "Us",
    "contact.reachOut": "Reach out to us",
    "contact.reachOutDesc":
      "Whether you have questions about our programs, want to volunteer, or wish to make a contribution, we would love to hear from you.",
    "contact.address.label": "Address",
    "contact.address.value":
      "Sher Shahi Jamia Masjid Bugvia, Molana Zahoor Ahmed Bugvi Road, Bhera, Sargodha",
    "contact.phone.label": "Phone",
    "contact.phone.value": "+92 301 6701340",
    "contact.email.label": "Email",
    "contact.email.value": "contact@aibf.ngo",
    "contact.person1.name": "Sahibzada Ahmad Mansoor Bugvi",
    "contact.person1.role": "General Secretary — +92 321 4699096",
    "contact.person2.name": "Sahibzada Salman Abubakar Bugvi",
    "contact.person2.role": "Coordinator AIBF — +92 321 2554978",
    "contact.form.name": "Name",
    "contact.form.email": "Email *",
    "contact.form.message": "Message *",
    "contact.form.send": "Send Message",
    "contact.form.sending": "Sending...",
    "contact.form.successTitle": "Thank You",
    "contact.form.successMsg":
      "Your message has been received. We will get back to you shortly.",
    "contact.form.error": "Something went wrong. Please try again.",

    // Footer
    "footer.orgName": "Al-Iftikhar Bugvia Foundation",
    "footer.servingSince": "Serving Since 2008",
    "footer.desc":
      "A nonprofit dedicated to education, healthcare, and social welfare for rural communities in Pakistan.",
    "footer.quickLinks": "Quick Links",
    "footer.link.about": "About Us",
    "footer.link.programs": "Our Programs",
    "footer.link.donate": "Donate",
    "footer.link.contact": "Contact",
    "footer.link.bugvi": "Bugvi Family (bugvi.org)",
    "footer.contact": "Contact",
    "footer.copyright": "Al-Iftikhar Bugvia Foundation. All rights reserved.",
    "footer.projectOf": "A project of the ",
    "footer.bugviFamily": "Bugvi Family",
    "footer.legal": "Legal",
    "footer.link.privacy": "Privacy Policy",
    "footer.link.terms": "Terms & Conditions",
    "footer.link.refund": "Refund Policy",
    "footer.link.services": "Our Services",
  },
  ur: {
    // Navbar
    "nav.about": "تعارف",
    "nav.programs": "پروگرامز",
    "nav.impact": "اثرات",
    "nav.donate": "عطیات",
    "nav.contact": "رابطہ",
    "nav.donateNow": "ابھی عطیہ دیں",

    // Hero
    "hero.established": "1998 سے خدمت میں",
    "hero.titleLine1": "الافتخار",
    "hero.titleLine2Accent": "بگوی",
    "hero.titleLine2Rest": "فاؤنڈیشن",
    "hero.subtitle":
      "بھیرہ، بگا شریف اور ضلع جہلم کے دیہی علاقوں میں تعلیم، صحت اور سماجی بہبود کے ذریعے کمیونٹیز کی خدمت",
    "hero.cta.support": "ہمارے مقصد کی حمایت کریں",
    "hero.cta.learn": "مزید جانیں",

    // About
    "about.label": "ہم کون ہیں",
    "about.headingStart": "",
    "about.headingAccent": "خدمت",
    "about.p1":
      "2008 میں ڈاکٹر انوار احمد بگوی کی بنیاد پر قائم کی گئی، الافتخار بگویا فاؤنڈیشن بگوی خاندان کی دیہی آبائی برادریوں کو بلند کرنے کے گہرے عزم سے پیدا ہوئی۔",
    "about.p1.founder": "ڈاکٹر انوار احمد بگوی",
    "about.p2":
      "بگاہ شریف، کھنہ، ڈھوک اور ضلع جہلم کے آس پاس کے دیہاتوں میں کام کرتے ہوئے، AIBF پسماندہ برادریوں کی بنیادی ضروریات کو پورا کرتا ہے — صاف پانی اور تعلیم سے لے کر صحت کی دیکھ بھال اور سماجی مدد تک۔",
    "about.p3":
      "ہمارا یقین ہے کہ ہر فرد بنیادی ضروریات تک رسائی اور عزت کی زندگی گزارنے کا مستحق ہے۔ ہمارا کام خدمت، ہمدردی اور برادری کی یکجہتی کے اسلامی اصولوں پر مبنی ہے۔",
    "about.quote":
      "\u201Cحقیقی خدمت بڑے اشاروں میں نہیں بلکہ اپنے اردگرد کے لوگوں کو اٹھانے کے خاموش، مسلسل عزم میں ہے۔\u201D",
    "about.quoteAuthor": "— ڈاکٹر انوار احمد بگوی، بانی",
    "about.value1.title": "تعلیم اور کردار سازی",
    "about.value1.desc":
      "اگلی نسل کے لیے تعلیم کی ترویج اور کردار سازی، میرٹ پر مبنی وظائف اور انعامات کے ساتھ۔",
    "about.value2.title": "صحت کی دیکھ بھال تک رسائی",
    "about.value2.desc":
      "دیہی برادریوں کے لیے عمومی طب، آنکھوں کی دیکھ بھال اور امراض نسواں سمیت مفت طبی کیمپ۔",
    "about.value3.title": "سماجی بہبود",
    "about.value3.desc":
      "بیواؤں، یتیموں، بزرگوں اور آفات کے متاثرین کی مالی مدد اور وسائل سے مدد۔",
    "about.value4.title": "ثقافتی تحفظ",
    "about.value4.desc":
      "آنے والی نسلوں کے لیے بھیرہ، بگاہ شریف اور آس پاس کے علاقوں کی وراثت اور روایات کا تحفظ۔",

    // Programs
    "programs.label": "ہم کیا کرتے ہیں",
    "programs.headingStart": "ہمارے ",
    "programs.headingAccent": "پروگرامز",
    "programs.subtitle":
      "صحت کی دیکھ بھال سے تعلیم تک، ہمارے پروگرامز پسماندہ دیہی برادریوں کی بنیادی ضروریات کو پورا کرتے ہیں۔",
    "programs.1.title": "مفت طبی کیمپ",
    "programs.1.desc":
      "صحت کی سہولیات تک رسائی نہ رکھنے والی دیہی برادریوں کے لیے عمومی طب، آنکھوں کی دیکھ بھال اور امراض نسواں کی خدمات فراہم کرنے والے باقاعدہ طبی کیمپ۔",
    "programs.2.title": "میرٹ وظائف",
    "programs.2.desc":
      "اعلیٰ کارکردگی دکھانے والے طلباء کے لیے نقد انعامات اور سرٹیفکیٹ، تعلیمی فضیلت کی حوصلہ افزائی اور پسماندہ خاندانوں کے لیے تعلیمی مدد۔",
    "programs.3.title": "رمضان اور عید سپورٹ",
    "programs.3.desc":
      "رمضان میں راشن پیکجوں کی تقسیم اور ضرورت مند خاندانوں کو عید کے تحائف، تاکہ جشن کے دوران کوئی پیچھے نہ رہے۔",
    "programs.4.title": "شادی میں مدد",
    "programs.4.desc":
      "معاشی طور پر پسماندہ خاندانوں کی بیٹیوں کے لیے مالی مدد اور جہیز کی مدد، تاکہ وہ عزت کے ساتھ ازدواجی زندگی شروع کر سکیں۔",
    "programs.5.title": "سہارا ریلیف پروگرام",
    "programs.5.desc":
      "ہمارا اہم منصوبہ جو جلے ہوئے مریضوں، بیواؤں، معذور خاندانوں اور فوری طبی ضرورت مندوں کو مالی امداد اور ضروری وسائل فراہم کرتا ہے۔",
    "programs.6.title": "وراثت کا تحفظ",
    "programs.6.desc":
      "آنے والی نسلوں کے لیے بھیرہ اور بگاہ شریف کی ثقافتی روایات، ادبی ورثے اور روحانی تعلیمات کو دستاویزی شکل دینا اور محفوظ کرنا۔",

    // Impact
    "impact.label": "ہماری رسائی",
    "impact.headingStart": "",
    "impact.headingAccent": "فرق",
    "impact.stat1.number": "391+",
    "impact.stat1.label": "مریضوں کا علاج",
    "impact.stat1.sub": "بگویہ فاؤنڈیشن ڈسپنسری میں",
    "impact.stat2.number": "27+",
    "impact.stat2.label": "سال خدمت",
    "impact.stat2.sub": "1998 سے قائم",
    "impact.stat3.number": "35+",
    "impact.stat3.label": "راشن ڈرائیو",
    "impact.stat3.sub": "ہر رمضان خاندانوں کی مدد",
    "impact.stat4.number": "63",
    "impact.stat4.label": "کمیونٹی اپ ڈیٹس",
    "impact.stat4.sub": "ہمارے انسٹاگرام @aibf_org پر",
    "impact.quote":
      "ہمارا مشن سادہ ہے — اپنی کمیونٹیز کے ہر خاندان تک تعلیم، صحت اور عزت لانا۔ ہم انصار ہیں — مددگار — اور ہم ہر روز اس پکار کا جواب دیتے ہیں۔",
    "impact.quoteAttrib": "الافتخار بگویا فاؤنڈیشن",

    // Donate
    "donate.label": "فرق ڈالیں",
    "donate.headingLine1": "آپ کی ",
    "donate.headingAccent": "سخاوت",
    "donate.headingLine2": "زندگیاں بدل دیتی ہے",
    "donate.p1":
      "تمام برادری کے اراکین، خاندان، دوستوں، نیک خواہشات رکھنے والوں اور عطیہ دہندگان سے گزارش ہے کہ اسلام اور انسانیت کی خدمت کے لیے الافتخار بگویا فاؤنڈیشن کے ساتھ ہاتھ ملائیں۔",
    "donate.p2":
      "آپ کے عطیات مفت طبی کیمپوں، تعلیمی وظائف، رمضان راشن پیکجوں اور بیواؤں، یتیموں اور بزرگوں کی براہ راست مدد کو فنڈ کرتے ہیں۔",
    "donate.type.zakat": "زکوٰۃ",
    "donate.type.sadqa": "صدقہ",
    "donate.type.charity": "خیرات",
    "donate.type.donations": "عطیات",
    "donate.bankTitle": "بینک ٹرانسفر کی تفصیلات",
    "donate.bank.label": "بینک",
    "donate.bank.value": "فیصل بینک، ایم بی ایس بھیرہ (3353)",
    "donate.account.label": "اکاؤنٹ ٹائٹل",
    "donate.account.value": "الافتخار بگویہ فاؤنڈیشن",
    "donate.iban.label": "آئی بی اے این",
    "donate.iban.value": "PK45 FAYS 3353 4990 0000 6131",
    "donate.intl":
      "بین الاقوامی ٹرانسفرز یا ادائیگی کے دیگر طریقوں کے لیے، براہ کرم ",
    "donate.intl.link": "ہم سے براہ راست رابطہ کریں",
    "donate.copyIban": "آئی بی اے این کاپی کریں",
    "donate.suggest1.amount": "1,000 روپے",
    "donate.suggest1.label": "ایک مریض کی دوائی",
    "donate.suggest1.icon": "💊",
    "donate.suggest2.amount": "5,000 روپے",
    "donate.suggest2.label": "ایک خاندان کا ماہانہ راشن",
    "donate.suggest2.icon": "🛒",
    "donate.suggest3.amount": "10,000 روپے",
    "donate.suggest3.label": "ایک طالب علم کا سالانہ وظیفہ",
    "donate.suggest3.icon": "📚",
    "donate.suggest4.amount": "25,000 روپے",
    "donate.suggest4.label": "ایک بیوہ کی نئی شروعات",
    "donate.suggest4.icon": "🏠",

    // Instagram CTA
    "instagram.heading": "ہمارے سفر کی پیروی کریں",
    "instagram.subtitle": "انسٹاگرام پر ہمارے کام اور کمیونٹی اثرات سے جڑے رہیں",
    "instagram.handle": "@aibf_org",
    "instagram.cta": "انسٹاگرام پر فالو کریں",

    // Contact
    "contact.label": "رابطہ کریں",
    "contact.headingStart": "ہم سے ",
    "contact.headingAccent": "رابطہ",
    "contact.reachOut": "ہم سے رابطہ کریں",
    "contact.reachOutDesc":
      "چاہے آپ کے ہمارے پروگرامز کے بارے میں سوالات ہوں، رضاکارانہ خدمات انجام دینا چاہتے ہوں، یا عطیہ دینا چاہتے ہوں، ہم آپ سے سننا پسند کریں گے۔",
    "contact.address.label": "پتہ",
    "contact.address.value":
      "شیر شاہی جامع مسجد بگویا، مولانا ظہور احمد بگوی روڈ، بھیرہ، سرگودھا",
    "contact.phone.label": "فون",
    "contact.phone.value": "+92 301 6701340",
    "contact.email.label": "ای میل",
    "contact.email.value": "contact@aibf.ngo",
    "contact.person1.name": "صاحبزادہ احمد منصور بگوی",
    "contact.person1.role": "جنرل سیکرٹری — +92 321 4699096",
    "contact.person2.name": "صاحبزادہ سلمان ابوبکر بگوی",
    "contact.person2.role": "کوآرڈینیٹر AIBF — +92 321 2554978",
    "contact.form.name": "نام",
    "contact.form.email": "ای میل *",
    "contact.form.message": "پیغام *",
    "contact.form.send": "پیغام بھیجیں",
    "contact.form.sending": "بھیجا جا رہا ہے...",
    "contact.form.successTitle": "شکریہ",
    "contact.form.successMsg":
      "آپ کا پیغام موصول ہو گیا ہے۔ ہم جلد آپ سے رابطہ کریں گے۔",
    "contact.form.error": "کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔",

    // Footer
    "footer.orgName": "الافتخار بگویا فاؤنڈیشن",
    "footer.servingSince": "2008 سے خدمت میں",
    "footer.desc":
      "پاکستان کے دیہی علاقوں میں تعلیم، صحت اور سماجی بہبود کے لیے وقف ایک غیر منافع بخش تنظیم۔",
    "footer.quickLinks": "فوری لنکس",
    "footer.link.about": "ہمارے بارے میں",
    "footer.link.programs": "ہمارے پروگرامز",
    "footer.link.donate": "عطیات",
    "footer.link.contact": "رابطہ",
    "footer.link.bugvi": "بگوی خاندان (bugvi.org)",
    "footer.contact": "رابطہ",
    "footer.copyright":
      "الافتخار بگویا فاؤنڈیشن۔ جملہ حقوق محفوظ ہیں۔",
    "footer.projectOf": "",
    "footer.bugviFamily": "بگوی خاندان",
    "footer.legal": "قانونی",
    "footer.link.privacy": "رازداری کی پالیسی",
    "footer.link.terms": "شرائط و ضوابط",
    "footer.link.refund": "واپسی کی پالیسی",
    "footer.link.services": "ہماری خدمات",
  },
};
