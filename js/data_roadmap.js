/**
 * data_roadmap.js
 * Comprehensive roadmap content for team evolution.
 */
if (!window.projectData) window.projectData = {};

window.projectData.roadmap = {
    hero: {
        title: { ar: "خارطة الطريق: من التأسيس إلى الإمبراطورية 🏛️", en: "The Roadmap: From MVP to Empire 🏛️" },
        tagline: { ar: "الدليل الشامل للتحول من فريق 'Lean' إلى مؤسسة متكاملة", en: "The comprehensive guide to scaling from Lean Team to Full Enterprise" }
    },
    intro: {
        ar: "هذه الوثيقة ليست مجرد خطة، بل هي دستور العمل. توضح بدقة متى نتحرك، من نوظف، ولماذا. كل خطوة هنا مربوطة بشرط تنفيذي (Trigger) يضمن أننا لا نحرق المال ولا نتأخر عن النمو.",
        en: "This document is not just a plan, it's our constitution. It clarifies exactly when to move, who to hire, and why. Every step is tied to an execution trigger ensuring we neither burn cash nor stall growth."
    },
    phases: [
        {
            id: "phase1",
            title: { ar: "المرحلة الأولى: حجر الأساس (MVP)", en: "Phase 1: The Foundation (MVP)" },
            subtitle: { ar: "الفريق القتالي الحالي", en: "The Current Combat Team" },
            status: { ar: "نشط حالياً ✅", en: "Active Now ✅" },
            description: {
                ar: "هذه هي مرحلة الانطلاق. الهدف هنا ليس التوسع، بل 'إثبات النموذج' (Proof of Concept). نعتمد على الكفاءة العالية لعدد قليل من الأفراد.",
                en: "Launch phase. The goal is not scaling, but Proof of Concept. We rely on the high efficiency of a few individuals."
            },
            steps: [
                {
                    role: { ar: "الثلاثي المرح (The Trio)", en: "The Trio" },
                    action: { ar: "تعيين الفريق الأساسي (Lead, Content, Visual)", en: "Hire Core Team (Lead, Content, Visual)" },
                    trigger: { ar: "الآن (Immediate)", en: "Immediate" },
                    details: {
                        ar: "يتم تشكيل الفريق المكون من: قائد التسويق (أنا)، كاتب المحتوى، ومصمم الفيديو. هذا الفريق مسؤول عن إدارة الحملات بالكامل.",
                        en: "Forming the squad: Marketing Lead (Me), Content Writer, and Video Editor. Responsible for full campaign execution."
                    }
                }
            ]
        },
        {
            id: "phase2",
            title: { ar: "المرحلة الثانية: التوسع لأسفل (Downward Scaling)", en: "Phase 2: Downward Scaling" },
            subtitle: { ar: "تخفيف الضغط التشغيلي", en: "Offloading Operational Pressure" },
            status: { ar: "مشروط بالأرقام ⏳", en: "Conditional on Metrics ⏳" },
            description: {
                ar: "في هذه المرحلة، نبدأ بتوظيف المنفذين (Doers) لرفع ضغط العمل الروتيني عن الفريق الأساسي، مما يسمح للفريق الأساسي بالتركيز على الجودة.",
                en: "Here we hire 'Doers' to lift routine workloads off the core team, allowing the core team to focus on quality."
            },
            steps: [
                {
                    role: { ar: "أخصائي شراء ميديا (Media Buyer)", en: "Dedicated Media Buyer" },
                    trigger: { ar: "عند وصول صرف الإعلانات 100 ألف ريال/شهر", en: "Ad spend hits 100k SAR/month" },
                    why: { ar: "حماية الميزانية من الهدر الدقيق. القائد يضع الاستراتيجية، والميديا باير ينفذ التحسينات اليومية.", en: "Budget protection. Lead sets strategy, Media Buyer handles daily optimizations." }
                },
                {
                    role: { ar: "مدير حسابات (Account Manager)", en: "Account Manager" },
                    trigger: { ar: "إدارة 3 علامات تجارية في وقت واحد", en: "Handling 3+ Brands simultaneously" },
                    why: { ar: "فصل خدمة العملاء عن التنفيذ الفني. الـ Lead لا يجب أن يقضي يومه في الرد على اتصالات العملاء.", en: "Separating Client Service from Tech Execution. Lead shouldn't spend the day on client calls." }
                },
                {
                    role: { ar: "مسؤول مبيعات/ردود (Moderator/Sales)", en: "Sales/Moderation Rep" },
                    trigger: { ar: "استقبال 50+ رسالة يومياً", en: "Receiving 50+ leads/day" },
                    why: { ar: "تحويل المحادثات إلى أموال. كاتب المحتوى سيتوقف عن الإبداع إذا قضى وقته في الرد على 'بكم؟'.", en: "Turning chats into cash. Content writer stops creating if they spend all day answering 'How much?'" }
                }
            ]
        },
        {
            id: "phase3",
            title: { ar: "المرحلة الثالثة: التوسع لأعلى (Upward Scaling)", en: "Phase 3: Upward Scaling" },
            subtitle: { ar: "بناء هيكل القيادة", en: "Building Leadership Structure" },
            status: { ar: "الرؤية المستقبلية 🔭", en: "Future Vision 🔭" },
            description: {
                ar: "هنا نتحول من فريق إلى شركة. نبدأ بتوظيف مديرين (Managers) ليتفرغ القائد العام (أنا) للتطوير والاستراتيجيات الكبرى.",
                en: "Transition from Team to Agency. Hiring Managers so the Lead (Me) can focus on Growth and Macro-Strategy."
            },
            steps: [
                {
                    priority: "1",
                    role: { ar: "مدير تسويق رقمي (Digital Marketing Manager)", en: "Digital Marketing Manager" },
                    trigger: {
                        ar: "عندما احتاج للتفرغ الكامل لتطوير البيزنس (Business Development) أو الدخول في شراكات استراتيجية.",
                        en: "When I need full focus on Business Development or Strategic Partnerships."
                    },
                    action: {
                        ar: "يستلم مني قيادة فريق الـ MVP بالكامل. يصبح هو المرجع اليومي للمصمم والكاتب والميديا باير.",
                        en: "Takes over the MVP team leadership. Becomes the daily reference for the Designer, Writer, and Media Buyer."
                    }
                },
                {
                    priority: "2",
                    role: { ar: "مدير حسابات أول (Senior Account Manager)", en: "Senior Account Manager" },
                    trigger: {
                        ar: "عند وجود عملاء VIP يتطلبون معاملة خاصة واجتماعات استراتيجية دورية لا يستطيع الـ Account Manager العادي إدارتها.",
                        en: "Presence of VIP clients requiring high-level strategic meetings that a junior AM cannot handle."
                    },
                    action: {
                        ar: "يدير العلاقة مع كبار العملاء، ويشرف على فريق خدمة العملاء.",
                        en: "Manages VIP relationships and oversees the client service team."
                    }
                },
                {
                    priority: "3",
                    role: { ar: "مدير عمليات (Operations Director)", en: "Operations Director" },
                    trigger: {
                        ar: "عندما يتجاوز الفريق 10 موظفين وتصبح الإجراءات الإدارية (HR, Finance, Workflow) عائقاً أمام الإنتاجية.",
                        en: "Team exceeds 10 people and admin processes (HR, Finance, Workflow) start blocking productivity."
                    },
                    action: {
                        ar: "يضبط إيقاع الشركة الداخلي. يضمن أن الجميع يعمل وفق نظام موحد، ويدير الموارد البشرية والمالية.",
                        en: "Orchestrates internal rhythm. Ensures everyone follows the system, manages HR and Finance resources."
                    }
                }
            ]
        }
    ]
};
