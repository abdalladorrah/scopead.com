/**
 * data_personas.js
 * Target Audience Profiles.
 */
if (!window.projectData) window.projectData = {};

window.projectData.personas = {
    title: { ar: "شخصيات العملاء", en: "Customer Personas" },
    subtitle: { ar: "من هم عملاؤنا المثاليون؟", en: "Who are our Ideal Customers?" },
    list: [
        {
            colorClass: "p-blue",
            name: { ar: "المستكشف (The Explorer)", en: "The Flavor Explorer" },
            tag: { text: "Fusion Seeker", color: "#3b82f6" },
            demographics: { ar: "شباب | محب للتجربة", en: "Youth | Experience Seeker" },
            driver: { ar: "تجربة مذاق الأكل الهندي والصيني على طاولة واحدة", en: "Indian & Chinese tastes on one table" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "طاولة طريق الحرير (مكس هندي صيني)", en: "The Silk Road Board (Fusion Mix)" }
            }
        },
        {
            colorClass: "p-green",
            name: { ar: "الموفر الذكي (Smart Saver)", en: "The Smart Saver" },
            tag: { text: "Value Hunter", color: "#10b981" },
            demographics: { ar: "موظفين | عائلات صغيرة", en: "Employees | Small Families" },
            driver: { ar: "يبحث عن الجودة بسعر منافس وسط الأسبوع", en: "Quality at a discount mid-week" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "عرض الاثنين والأربعاء (خصم 20% أو وجبة توفير)", en: "Mon & Wed Recharge (20% Off or Value Set)" }
            }
        },
        {
            colorClass: "p-orange",
            name: { ar: "التنفيذي (The Executive)", en: "The Executive" },
            tag: { text: "Business Closer", color: "#f97316" },
            demographics: { ar: "رجل أعمال | وقت غداء/عشاء", en: "Businessman | Lunch/Dinner" },
            driver: { ar: "مكان هادئ وراقٍ لتقفيل الصفقات", en: "Quiet, premium spot to close deals" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "عشاء العمل الفاخر (Business Set Menu)", en: "The Deal Closer (Premium Set Menu)" }
            }
        },
        {
            colorClass: "p-purple",
            name: { ar: "نجم رمضان (Ramadan Star)", en: "Ramadan Socialite" },
            tag: { text: "Seasonal", color: "#8b5cf6" },
            demographics: { ar: "سهرانين | شباب وعائلات", en: "Night Owls | Youth & Families" },
            driver: { ar: "سحور مميز ومختلف عن التقليدي", en: "Unique Suhoor experience" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "بوكس السحور (Chindia Suhoor Box)", en: "Chindia Suhoor Box" }
            }
        },
        {
            colorClass: "p-red",
            name: { ar: "كبير العائلة (Family Hero)", en: "The Family Hero" },
            tag: { text: "Weekend Gathering", color: "#ef4444" },
            demographics: { ar: "عائلات كبيرة | مناسبات", en: "Large Families | Occasions" },
            driver: { ar: "إرضاء جميع الأذواق (الكبار والصغار)", en: "Satisfying all tastes (Adults & Kids)" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "وليمة الجمعة (الطبق العائلي الكبير)", en: "Friday Family Feast (Grand Platter)" }
            }
        },
        {
            colorClass: "p-pink",
            name: { ar: "الثنائي (The Duo)", en: "The Social Duo" },
            tag: { text: "Sharing", color: "#ec4899" },
            demographics: { ar: "أزواج | أصدقاء", en: "Couples | Friends" },
            driver: { ar: "مشاركة الطعام في جو مريح", en: "Sharing food in a cozy vibe" },
            strategy: {
                title: { ar: "العرض المناسب (Launch Offer)", en: "Launch Offer" },
                text: { ar: "سيت ميو للمشاركة (Spice & Zen)", en: "Spice & Zen Sharing Set" }
            }
        }
    ]
};
