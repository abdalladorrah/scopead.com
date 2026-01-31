/**
 * data_competitors.js
 * Competitive landscape and SWOT.
 */
if (!window.projectData) window.projectData = {};

window.projectData.competitors = {
    intro: {
        title: { ar: "المنافسون", en: "Competitors" },
        subtitle: { ar: "تحليل المشهد التنافسي", en: "Competitive Landscape Analysis" }
    },
    sections: {
        landscape: { ar: "مقارنة بالسوق", en: "Market Comparison" },
        swot: { ar: "تحليل SWOT", en: "SWOT Analysis" }
    },
    headers: {
        name: { ar: "المنافس", en: "Concern" },
        position: { ar: "التموضع", en: "Position" },
        benchmark: { ar: "المعيار", en: "Benchmark" },
        exploit: { ar: "الثغرة", en: "Exploit" },
        strategy: { ar: "استراتيجيتنا", en: "Our Strategy" }
    },
    list: [
        {
            name: { ar: "Royal Garden", en: "Royal Garden" },
            position: { ar: "The Vibe", en: "The Vibe" },
            benchmark: { ar: "مكان للتصوير", en: "Instagrammable" },
            exploit: { ar: "السعر مرتفع", en: "High Price" },
            strategy: { ar: "نفس الجو، سعر أقل", en: "Same Vibe, Lower Price" }
        },
        {
            name: { ar: "Golden Royal", en: "Golden Royal" },
            position: { ar: "فخامة", en: "Luxury" },
            benchmark: { ar: "جودة عالية", en: "High Quality" },
            exploit: { ar: "رسمي جداً", en: "Too Formal" },
            strategy: { ar: "فخامة في المتناول (70% جودة بـ 40% سعر)", en: "70% Quality @ 40% Price" }
        },
        {
            name: { ar: "Fast Food", en: "Fast Food" },
            position: { ar: "وجبات سريعة", en: "Quick Meals" },
            benchmark: { ar: "سرعة ورخص", en: "Cheap & Fast" },
            exploit: { ar: "جودة منخفضة", en: "Low Quality" },
            strategy: { ar: "جودة أعلى، سرعة مقاربة", en: "Better Quality, Similar Speed" }
        }
    ],
    self: {
        name: { ar: "شينـديا", en: "Chindia" },
        position: { ar: "الجار المتطور", en: "Modern Neighbor" },
        benchmark: { ar: "أصيل وعصري", en: "Authentic & Modern" },
        exploit: { ar: "-", en: "-" },
        strategy: { ar: "عالمان، طاولة واحدة", en: "Two Worlds, One Table" }
    },
    swot: {
        strengths: [
            { ar: "موقع استراتيجي (حيوي)", en: "Strategic Location" },
            { ar: "قيمة مقابل السعر (85 ريال)", en: "Value for Money (85 SAR)" },
            { ar: "ديكور Instagrammable", en: "Instagrammable Decor" }
        ],
        weaknesses: [
            { ar: "علامة تجارية جديدة", en: "New Brand Awareness" },
            { ar: "ميزانية تسويق محدودة", en: "Limited Ad Budget" }
        ],
        opportunities: [
            { ar: "موسم رمضان (سحور)", en: "Ramadan Season (Suhoor)" },
            { ar: "نمو تطبيقات التوصيل", en: "Delivery Apps Growth" }
        ],
        threats: [
            { ar: "حرب الأسعار", en: "Price War" },
            { ar: "دخول منافسين جدد", en: "New Entrants" }
        ]
    }
};
