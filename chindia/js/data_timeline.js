/**
 * data_timeline.js
 * Timeline visual data.
 */
if (!window.projectData) window.projectData = {};

window.projectData.timeline = {
    title: { ar: "الجدول الزمني", en: "Timeline" },
    subtitle: { ar: "خارطة تنفيذ الحملة", en: "Campaign Execution Roadmap" },
    sectionTitle: { ar: "المراحل", en: "Phases" },
    list: [
        {
            title: { ar: "الأسبوع 1: إنتاج المحتوى (4 عروض + 2 فيديو)", en: "Week 1: Content Production (4 Offers + 2 Videos)" },
            week: { ar: "Feb 1 - Feb 7", en: "Feb 1 - Feb 7" },
            desc: { ar: "التركيز الكامل على التصوير والمونتاج وتجهيز المواد الدعائية.", en: "Full focus on shooting, editing, and preparing ad creatives." },
            status: "done"
        },
        {
            title: { ar: "الأسبوع 2: إطلاق الحملات (سناب وانستقرام)", en: "Week 2: Ads Launch (Snap & Insta)" },
            week: { ar: "Feb 8 - Feb 14", en: "Feb 8 - Feb 14" },
            desc: { ar: "بدء الصرف الإعلاني واستهداف الجمهور المحيط.", en: "Starting ad spend and targeting local audience." },
            status: "active"
        },
        {
            title: { ar: "الأسبوع 3: حملة رمضان (بوكسات السحور)", en: "Week 3: Ramadan Campaign (Suhoor Boxes)" },
            week: { ar: "Feb 15 - Feb 21", en: "Feb 15 - Feb 21" },
            desc: { ar: "التحول للترويج لمنتجات رمضان والسحور.", en: "Pivot to promoting Ramadan and Suhoor products." },
            status: "pending"
        },
        {
            title: { ar: "الأسبوع 4: الاستدامة (تيك توك وواتساب)", en: "Week 4: Sustain (TikTok & WhatsApp)" },
            week: { ar: "Feb 22 - Feb 28", en: "Feb 22 - Feb 28" },
            desc: { ar: "الحفاظ على العملاء وإعادة الاستهداف.", en: "Customer retention and retargeting." },
            status: "pending"
        }
    ]
};
