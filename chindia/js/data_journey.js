/**
 * data_journey.js
 * Customer Journey Stages.
 */
if (!window.projectData) window.projectData = {};

window.projectData.journey = {
    title: { ar: "رحلة العميل", en: "Customer Journey" },
    subtitle: { ar: "من الاكتشاف إلى الولاء", en: "From Discovery to Advocacy" },
    sectionTitle: { ar: "مسار العميل (The Funnel)", en: "The Funnel Flow" },
    steps: [
        {
            step: "01",
            title: { ar: "الاكتشاف (Discovery)", en: "Discovery" },
            text: { ar: "لحظة الانتباه: إعلان سناب (Geofenced) بصوت الطشة.", en: "The Spark: Geofenced Snap Ad (Sizzle)." }
        },
        {
            step: "02",
            title: { ar: "التفكير (Consideration)", en: "Consideration" },
            text: { ar: "التفتيش الرقمي: فحص الصور والتقييمات.", en: "Digital Audit: Checking Reviews." }
        },
        {
            step: "03",
            title: { ar: "التجربة (Experience)", en: "Experience" },
            text: { ar: "لحظة الحقيقة: أجواء، أكل ساخن، خدمة سريعة.", en: "Moment of Truth: Vibe, Hot Food, Fast Service." }
        },
        {
            step: "04",
            title: { ar: "الاحتفاظ (Retention)", en: "Retention" },
            text: { ar: "الخطاف: استلام 'كارت العودة'.", en: "The Hook: Receiving 'Bounce-back Card'." }
        },
        {
            step: "05",
            title: { ar: "التوصية (Advocacy)", en: "Advocacy" },
            text: { ar: "المسوق المجاني: تصوير ستوري للمكان.", en: "Free Marketer: Posting Stories." }
        }
    ]
};
