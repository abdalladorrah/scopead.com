/**
 * data_guide.js
 * Developer and Marketer Guide.
 */
if (!window.projectData) window.projectData = {};

window.projectData.guide = {
    title: { ar: "دليل إدارة وتطوير المشروع (Master Guide) 🛠️", en: "Project Management & Development Guide 🛠️" },
    subtitle: { ar: "المرجع الشامل للصيانة، التعديل، والتوسع", en: "Comprehensive reference for maintenance, editing, and expansion" },

    // 1. Philosophy Section
    philosophy: {
        title: { ar: "فلسفة الفريم-وورك (Is this a Framework?) 🏗️", en: "Philosophy: Is this a Framework? 🏗️" },
        text: {
            ar: `نعم، يمكن تسميته **"Lenci Framework"**. هو ليس مجرد كود، بل "بنية عمل" تربط البيانات (Data Model) بالواجهة (UI) بشكل تلقائي. حالياً هو "Boilerplate/Pattern"، ولكي يصبح "مكتبة" (Library) يحتاج للتغليف (Distribution). الوضع الحالي هو الأفضل لأنه يمنحك سرعة التعديل الكاملة دون قيود المكتبات الخارجية.`,
            en: `Yes, this can be called the **"Lenci Framework"**. It's not just code; it's a "work structure" that connects the Data Model to the UI automatically. Currently, it's a "Boilerplate/Pattern". To become a formal "Library", it would need distribution packaging. The current state is ideal as it grants you full speed and flexibility without library constraints.`
        }
    },

    // 2. Page Inventory
    inventory: {
        title: { ar: "دليل الصفحات (Page Directory) 📚", en: "Page Directory 📚" },
        list: [
            { name: "index.html", desc: { ar: "اللوحة الرئيسية، العداد التنازلي، وأهم الأرقام.", en: "Main dashboard, countdown, and core metrics." } },
            { name: "strategy.html", desc: { ar: "الدستور التشغيلي، المهمة، والرؤية الكبرى.", en: "Operational constitution, mission, and grand vision." } },
            { name: "plan.html", desc: { ar: "خطة الربع الأول بالتفصيل (أسبوع بأسبوع).", en: "Detailed Q1 roadmap (week-by-week)." } },
            { name: "persona.html", desc: { ar: "تحليل الشخصيات المستهدفة والرسائل التسويقية.", en: "Target personas and marketing messaging analysis." } },
            { name: "competitors.html", desc: { ar: "مقارنة السوق ونقاط الضعف التي سنستغلها.", en: "Market comparison and exploitable weaknesses." } },
            { name: "creatives.html", desc: { ar: "تصورات الإعلانات (Reels) ومحتوى القنوات.", en: "Ad concepts (Reels) and channel-specific content." } },
            { name: "budget.html", desc: { ar: "توزيع الميزانية (85,000 ريال) والـ KPIs.", en: "Budget allocation (85k SAR) and KPIs." } },
            { name: "journey.html", desc: { ar: "خريطة تجربة الضيف من الإغراء للمغادرة.", en: "Guest journey map from allure to departure." } },
            { name: "retention.html", desc: { ar: "كيفية تحويل الضيف لعميل دائم (Tribe).", en: "Turning guests into loyal tribe members." } },
            { name: "timeline.html", desc: { ar: "جدول الإطلاق (4 أسابيع).", en: "Launch timeline (4 weeks)." } },
            { name: "checklist.html", desc: { ar: "قائمة التحقق النهائية قبل التدشين.", en: "Final pre-launch checklist." } }
        ]
    },

    // 3. Component Library
    components: {
        title: { ar: "مكتبة العناصر (Component Library) 🧩", en: "Component Library 🧩" },
        items: [
            { name: ".card", desc: { ar: "الحاوية الرئيسية للمحتوى (خلفية بيضاء + ظل).", en: "Primary content container (white bg + shadow)." } },
            { name: ".metric-card", desc: { ar: "عرض الأرقام الكبيرة والقيم المالية.", en: "Displaying big numbers and financial values." } },
            { name: ".step", desc: { ar: "عرض العمليات المتسلسلة (رقم + محتوى).", en: "Sequential processes (number + content)." } },
            { name: ".checklist-group", desc: { ar: "مجموعات المهام مع خاصية علامة الصحة.", en: "Task groups with checkmark functionality." } },
            { name: ".persona-card", desc: { ar: "بطاقات ملونة مخصصة لتحليل الجماهير.", en: "Color-coded cards for audience analysis." } }
        ]
    },

    // 4. User Guides
    guides: [
        {
            role: { ar: "للمسوق (Marketer) 📢", en: "For Marketers 📢" },
            steps: [
                { ar: "افتح ملف البيانات الخاص بالصفحة (مثلاً `js/data_dashboard.js`).", en: "Open the specific page data file (e.g., `js/data_dashboard.js`)." },
                { ar: "استخدم `ar` للعربية و `en` للإنجليزية.", en: "Use `ar` for Arabic and `en` for English contents." },
                { ar: "لا تحذف الفواصل (,) أو الأقواس {} لكي لا ينهار الكود.", en: "Do not delete commas (,) or braces {} to avoid breaking the code." },
                { ar: "تحديث الميزانية يتم تلقائياً في `budget.html` بمجرد تغيير الرقم.", en: "Budget updates automatically in `budget.html` once numbers change." }
            ]
        },
        {
            role: { ar: "للمطور (Developer) 💻", en: "For Developers 💻" },
            steps: [
                { ar: "لإضافة صفحة: انسخ `marketing_template.html` وقم بتسميته.", en: "To add a page: Copy `marketing_template.html` and rename it." },
                { ar: "أضف ملف بيانات جديد في مجلد `js/` (مثلاً `data_newpage.js`).", en: "Create a new data file in `js/` folder (e.g., `data_newpage.js`)." },
                { ar: "استخدم IDs متوافقة بين الـ HTML والـ JS (مثلاً: `hero-title-ar`).", en: "Use compatible IDs between HTML and JS (e.g., `hero-title-ar`)." },
                { ar: "أضف الرابط في `nav.js` لكي تظهر الصفحة في القائمة الرئيسية.", en: "Add the link in `nav.js` so it appears in the main menu." }
            ]
        }
    ]
};
