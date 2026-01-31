/**
 * data_future.js
 * Expansion Plans and Future Vision.
 */
if (!window.projectData) window.projectData = {};

window.projectData.future = {
    intro: {
        title: { ar: "خطط التوسع", en: "Expansion Plans" },
        subtitle: { ar: "ما بعد الإطلاق", en: "Beyond the Launch" }
    },
    phases: [
        {
            title: { ar: "خارطة الطريق الموسمية", en: "Seasonal Roadmap" },
            items: [
                {
                    badge: { ar: "قريباً", en: "Soon" },
                    badgeColor: "#10b981",
                    title: { ar: "ما قبل رمضان", en: "Pre-Ramadan" },
                    desc: {
                        ar: "تفعيل كامل لتطبيقات التوصيل. ميزة تنافسية في السعر.",
                        en: "Full Activation of apps. Competitive pricing edge."
                    }
                },
                {
                    badge: { ar: "رمضان", en: "Ramadan" },
                    badgeColor: "#8b5cf6",
                    title: { ar: "إفطار رمضان", en: "Ramadan Iftar" },
                    desc: {
                        ar: "وضع خامل: استقبال طلبات عضوية فقط.",
                        en: "Passive Mode: Organic orders only."
                    }
                },
                {
                    badge: { ar: "رمضان", en: "Ramadan" },
                    badgeColor: "#f59e0b",
                    title: { ar: "سحور رمضان", en: "Ramadan Suhoor" },
                    desc: {
                        ar: "التركيز الأقوى: 80% من الميزانية (شفت ليلي).",
                        en: "Prime Focus: 80% budget on late night shift."
                    }
                }
            ]
        }
    ]
};
