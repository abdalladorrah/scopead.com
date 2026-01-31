/**
 * data_retention.js
 * Retention and Loyalty Strategies.
 */
if (!window.projectData) window.projectData = {};

window.projectData.retention = {
    title: { ar: "استراتيجية الحفاظ على العميل", en: "Client Retention Strategy" },
    subtitle: { ar: "كيف نضمن عودتهم؟ (خطة عملية)", en: "How we guarantee their return? (Operational Plan)" },
    list: [
        {
            title: { ar: "1. بروتوكولات الخدمة (Service Protocols)", en: "1. Service Protocols" },
            items: [
                {
                    icon: "👔",
                    head: { ar: "بروتوكول التنفيذي (Executive Protocol)", en: "Executive Protocol" },
                    text: { ar: "يتم استقبال 'أصحاب عشاء العمل' من قبل المدير، وتوجيههم فوراً للطاولات الهادئة، وتقديم ضيافة 'ترحيب' قبل الطلب.", en: "Executives are greeted by the Manager, seated immediately in quiet zones, and served 'Welcome' appetizers." }
                },
                {
                    icon: "👨‍👩‍👧‍👦",
                    head: { ar: "بروتوكول العائلة (Family Protocol)", en: "Family Protocol" },
                    text: { ar: "نبدأ بخدمة الأطفال أولاً (ألوان + وجباتهم)، مما يمنح الوالدين راحة البال للاستمتاع بالتجربة.", en: "We serve kids first (colors + meals), giving parents peace of mind to enjoy the experience." }
                }
            ]
        },
        {
            title: { ar: "2. المحرك التقني (The Tech Engine)", en: "2. The Tech Engine" },
            items: [
                {
                    icon: "📲",
                    head: { ar: "قاعدة بيانات العملاء (CRM)", en: "CRM Database" },
                    text: { ar: "كل حجز أو طلب توصيل يسجل: (الاسم، الطبق المفضل، تاريخ الميلاد). نستخدمها لإرسال عروض شخصية.", en: "Every booking/order logs: Name, Fav Dish, Birthday. Used for personalized offers." }
                },
                {
                    icon: "💬",
                    head: { ar: "رسائل الواتساب الذكية", en: "Smart WhatsApp" },
                    text: { ar: "رسالة تلقائية بعد 3 أيام: 'كيف كانت تجربتك؟' + كود خصم خاص للزيارة القادمة للموفر الذكي.", en: "Auto-msg after 3 days: 'How was it?' + specific discount code for the Smart Saver." }
                }
            ]
        },
        {
            title: { ar: "3. برامج الولاء (Loyalty Programs)", en: "3. Loyalty Programs" },
            items: [
                {
                    icon: "🛂",
                    head: { ar: "جواز الشينـديا (Fusion Passport)", en: "Fusion Passport" },
                    text: { ar: "نحول تكرار الزيارة للعبة: كل تجربة جديدة (هندي/صيني) = ختم. 5 أختام = وجبة مجانية. (للمستكشفين)", en: "Gamifying visits: New experience = Stamp. 5 Stamps = Free Meal. (For Explorers)" }
                },
                {
                    icon: "💳",
                    head: { ar: "كاش باك (Cashback)", en: "Smart Cashback" },
                    text: { ar: "بدلاً من الخصم المباشر الدائم، نمنح رصيداً في المحفظة للزيارة القادمة، لضمان العودة.", en: "Instead of direct discounts, we give wallet credit for the next visit to ensure return." }
                }
            ]
        }
    ]
};
