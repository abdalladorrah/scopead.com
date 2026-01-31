/**
 * data_checklist.js
 * Pre-launch Checklist.
 */
if (!window.projectData) window.projectData = {};

window.projectData.checklist = {
    title: { ar: "قائمة المهام (Marketing Checklist) 📝", en: "Marketing Checklist 📝" },
    tagline: { ar: "خطوات عملية لنجاح الحملة", en: "Practical steps for campaign success" },
    groups: [
        {
            title: { ar: "👑 1. محتوى المليون (The Million Content)", en: "👑 1. The Million Content" },
            items: [
                {
                    title: { ar: "فيديو 'طقوس المندي' (Slow-Motion)", en: "Video: 'The Mandi Ritual' (Slow-Mo)" },
                    desc: { ar: "تصوير سينمائي للحفرة، الدخان، وتقطيع اللحم (لإقناع 'العميد').", en: "Cinematic shots of the Tanoor, smoke, and meat falling off the bone." },
                    tag: { text: "Hero", class: "tag-creative" }
                },
                {
                    title: { ar: "تصوير 'أجواء اللاونج' (Vibe Content)", en: "Photography: 'Lounge Vibe'" },
                    desc: { ar: "تركيز على الإضاءة الخافتة، الشيشة، والموكتيلات (لجذب 'ليان').", en: "Focus on dim lighting, Shisha, and Mocktails (to attract 'Layan')." },
                    tag: null
                },
                {
                    title: { ar: "صور 'غداء العمل' (LinkedIn Style)", en: "Business Lunch Photos (LinkedIn Style)" },
                    desc: { ar: "صور احترافية للطاولات، اللابتوب، والقهوة (بدون فوضى).", en: "Professional shots of tables, laptops, and coffee (decluttered)." },
                    tag: null
                }
            ]
        },
        {
            title: { ar: "🛠️ 2. التجهيز للمعركة (Prep)", en: "🛠️ 2. Battle Prep" },
            items: [
                {
                    title: { ar: "قوائم إفطار الشركات (Corporate Menu)", en: "Corporate Iftar Menus" },
                    desc: { ar: "تجهيز ملف PDF فاخر لإرساله لمدراء الموارد البشرية.", en: "Prepare a premium PDF to be sent to HR Managers." },
                    tag: { text: "عاجل", class: "tag-high" }
                },
                {
                    title: { ar: "تحديث ردود جوجل (Google Replies)", en: "Update Google Replies" },
                    desc: { ar: "تغيير نغمة الرد من 'أهلاً بك' إلى 'شرفت دارك.. ضيفنا الغالي'.", en: "Change reply tone from 'Welcome' to 'Honored to host you, our dear guest'." },
                }
            ]
        }
    ]
};
