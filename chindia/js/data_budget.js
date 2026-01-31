/**
 * data_budget.js
 * Financial breakdown and Marketing Budget.
 */
if (!window.projectData) window.projectData = {};

window.projectData.budget = {
    title: { ar: "الميزانية", en: "Budget" },
    subtitle: { ar: "توزيع الاستثمار التسويقي", en: "Marketing Investment Allocation" },
    total: { ar: "الإجمالي: 10,000 ريال", en: "Total: 10,000 SAR" }, /* Updated total property name to match HTML expectation if needed, or kept separate */
    totalBudget: { ar: "10,000 SAR", en: "10,000 SAR" },
    philosophy: {
        ar: "نحن لا نُنفق للإعلان، بل نستثمر لكسر حاجز الجمود. فلسفتنا هي 'التركيز الجغرافي المفرط' (Hyper-Local Focus).",
        en: "We don't spend to advertise; we invest to break the momentum barrier. Our philosophy is 'Hyper-Local Focus'."
    },
    sections: {
        philosophy: { ar: "فلسفة الصرف", en: "Spending Philosophy" },
        googleAds: { ar: "إعلانات جوجل (أمثلة)", en: "Google Ads (Examples)" },
        allocation: { ar: "توزيع الميزانية", en: "Budget Allocation" },
        kpis: { ar: "مؤشرات الأداء", en: "Key Performance Indicators" }
    },
    googleAds: [
        {
            headline: { ar: "أفضل هندي وصيني في الحي", en: "Best Indian & Chinese in Town" },
            desc: { ar: "جرب شينـديا اليوم! طعم أصلي وأجواء عصرية.", en: "Try Chindia Today! Authentic Taste, Modern Vibes." }
        }
    ],
    items: [
        {
            name: { ar: "سناب شات", en: "Snapchat" },
            desc: { ar: "المحرك الرئيسي - استهداف جغرافي", en: "Primary Driver - Geofencing" },
            amount: "3,500",
            pct: "35%",
            colorClass: "primary"
        },
        {
            name: { ar: "انستقرام", en: "Instagram" },
            desc: { ar: "الجاذبية البصرية (Reels)", en: "Visual Appeal (Reels)" },
            amount: "3,500",
            pct: "35%",
            colorClass: "primary" /* Using primary/secondary classes as defined in CSS or existing logic */
        },
        {
            name: { ar: "تيك توك", en: "TikTok" },
            desc: { ar: "الانتشار والوعي", en: "Reach & Awareness" },
            amount: "2,000",
            pct: "20%",
            colorClass: "secondary"
        },
        {
            name: { ar: "جوجل", en: "Google Ads" },
            desc: { ar: "بناء الثقة والبحث", en: "Trust & Search" },
            amount: "1,000",
            pct: "10%",
            colorClass: "tertiary"
        }
    ],
    kpis: [
        { label: "CAC Target", val: "25 - 35 SAR" },
        { label: "Avg Ticket", val: "70 SAR" },
        { label: "Exp. ROAS", val: "3.5x" },
        { label: "Est. Revenue", val: "35,000 SAR" }
    ]
};
