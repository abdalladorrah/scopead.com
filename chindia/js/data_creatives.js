/**
 * data_creatives.js
 * Marketing Creatives and Offers.
 */
if (!window.projectData) window.projectData = {};

window.projectData.creatives = {
    title: { ar: "الإعلانات والعروض", en: "Ads & Creatives" },
    subtitle: { ar: "عروض الإطلاق الاستراتيجية", en: "Strategic Launch Offers" },
    list: [
        {
            channel: { ar: "عروض الإطلاق (Launch Offers)", en: "Launch Offers" },
            ads: [
                {
                    badge: "Fusion",
                    title: { ar: "طاولة طريق الحرير (Silk Road Board)", en: "The Silk Road Board" },
                    content: {
                        ar: "تجربة المذاقين معاً على طاولة واحدة.\n🎯 موجه لـ: المستكشف (The Flavor Explorer)",
                        en: "Experience both tastes on one table.\n🎯 Target: The Flavor Explorer"
                    }
                },
                {
                    badge: "Value",
                    title: { ar: "أيام الشحن (Mon & Wed Recharge)", en: "Mon & Wed Recharge" },
                    content: {
                        ar: "خصم 20% أو وجبة توفير لكسر الروتين.\n🎯 موجه لـ: الموفر الذكي (Smart Saver)",
                        en: "20% Off or Value Set to break routine.\n🎯 Target: The Smart Saver"
                    }
                },
                {
                    badge: "Business",
                    title: { ar: "عشاء العمل (The Deal Closer)", en: "The Deal Closer" },
                    content: {
                        ar: "قائمة عشاء فاخرة ومختصرة لرجال الأعمال.\n🎯 موجه لـ: التنفيذي (The Executive)",
                        en: "Premium, concise set menu for business.\n🎯 Target: The Executive"
                    }
                }
            ]
        },
        {
            channel: { ar: "عروض المواسم والعائلة", en: "Seasonal & Family" },
            ads: [
                {
                    badge: "Ramadan",
                    title: { ar: "بوكس السحور (Chindia Box)", en: "Chindia Suhoor Box" },
                    content: {
                        ar: "نودلز/برياني + دجاج في بوكس مخصص للسحور.\n🎯 موجه لـ: نجم رمضان (Ramadan Socialite)",
                        en: "Noodles/Biryani in a custom Suhoor box.\n🎯 Target: Ramadan Socialite"
                    }
                },
                {
                    badge: "Family",
                    title: { ar: "وليمة الجمعة (Grand Platter)", en: "Friday Family Feast" },
                    content: {
                        ar: "طبق عائلي ضخم يرضي كل الأذواق.\n🎯 موجه لـ: كبير العائلة (Family Hero)",
                        en: "Massive platter satisfying all tastes.\n🎯 Target: The Family Hero"
                    }
                },
                {
                    badge: "Sharing",
                    title: { ar: "سيت المشاركة (Spice & Zen)", en: "Spice & Zen Set" },
                    content: {
                        ar: "تشكيلة مختارة للمشاركة بين شخصين.\n🎯 موجه لـ: الثنائي (The Duo)",
                        en: "Curated selection for two to share.\n🎯 Target: The Social Duo"
                    }
                }
            ]
        }
    ]
};
