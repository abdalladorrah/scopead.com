/**
 * data_dashboard.js
 * Dashboard specific data, KPIs, and Summary.
 */
if (!window.projectData) window.projectData = {};

window.projectData.dashboard = {
    hero: {
        title: { ar: "ملخص الأداء - فبراير 2026", en: "Performance Summary - Feb 2026" },
        tagline: { ar: "نظرة شمولية على انطلاقة شينـديا", en: "A holistic view of the Chindia Launch" }
    },
    countdown: {
        title: { ar: "التركيز الحالي: مرحلة 'الجوع'", en: "Current Focus: Cravings Mode" },
        description: { ar: "التوصيل: نشط (Active)", en: "Delivery: Active" },
        targetDate: "2026-02-18T00:00:00" // Pivot date (Phase 2)
    },
    metrics: {
        main: [
            {
                value: { ar: "35,000 SAR", en: "35,000 SAR" },
                label: { ar: "هدف الإيرادات (Investment)", en: "Revenue Target (Investment)" },
                special: true
            },
            {
                value: { ar: "1,170 SAR", en: "1,170 SAR" },
                label: { ar: "المتوسط اليومي المطلوب", en: "Daily Revenue Required" },
                special: false
            },
            {
                value: { ar: "85 SAR", en: "85 SAR" },
                label: { ar: "متوسط الفاتورة", en: "Average Ticket" },
                special: false
            }
        ],
        tickets: [
            {
                label: { ar: "الرسالة", en: "Mission" },
                value: { ar: "إرضاء الأذواق المختلفة", en: "Satisfying Different Tastes" }
            },
            {
                label: { ar: "المفهوم", en: "Concept" },
                value: { ar: "عالمان، طاولة واحدة", en: "Two Worlds, One Table" }
            },
            {
                label: { ar: "التجربة", en: "Experience" },
                value: { ar: "بصرية وحسية", en: "Visual & Sensory" }
            }
        ]
    },
    quickAccess: {
        title: { ar: "روابط سريعة", en: "Quick Access" },
        items: [
            {
                href: "strategy.html",
                icon: "🎯",
                title: { ar: "الاستراتيجية", en: "Strategy" },
                desc: { ar: "الرؤية والخطة", en: "Vision & Plan" }
            },
            {
                href: "plan.html",
                icon: "📅",
                title: { ar: "خطة العمل", en: "Action Plan" },
                desc: { ar: "المهام الأسبوعية", en: "Weekly Tasks" }
            },
            {
                href: "creatives.html",
                icon: "🎨",
                title: { ar: "الإعلانات", en: "Creatives" },
                desc: { ar: "العروض والحملات", en: "Offers & Campaigns" }
            }
        ]
    }
};
