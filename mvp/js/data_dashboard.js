/**
 * data_dashboard.js
 * Content for the main dashboard (index.html).
 * Updated with detailed breakdowns and risk analysis (Cons).
 */
if (!window.projectData) window.projectData = {};

window.projectData.dashboard = {
    hero: {
        title: {
            ar: "حزمة البداية \"Lean & Mean\" (فريق MVP) 🚀 - التفاصيل الكاملة",
            en: "The \"Lean & Mean\" Starter Pack (MVP Team) 🚀 - Detailed Breakdown"
        },
        tagline: {
            ar: "نحن لا نحتاج لجيش الآن. نحتاج فقط لهؤلاء اللاعبين الثلاثة لبدء العمل بذكاء.",
            en: "We don't need an army yet. We just need these 3 key players to get the ball rolling smart."
        }
    },
    team: [
        {
            role: { ar: "1. العقل المدبر (قائد التسويق الرقمي)", en: "1. The Mastermind (Digital Marketing Lead)" },
            vibe: { ar: "الجو العام: نصف جنرال، نصف جندي.", en: "The Vibe: Half General, half Soldier." },
            job: { ar: "المهمة: يطبخ الاستراتيجية، يسيطر على الميزانية، يدير الإعلانات، ويضبط الجميع. باختصار، هو من يقود السفينة.", en: "The Job: Cooks up the strategy, controls the budget, runs the ads, and keeps everyone in check. Basically, the one steering the ship." },
            details: {
                ar: "يقوم بتصميم مسار العميل (Funnel Architecture)، تحسين العائد على الإنفاق (ROAS)، والربط التقني (Pixels/CRM). هو حلقة الوصل بين أهداف البيزنس والحملات الإعلانية.",
                en: "Focuses on high-level funnel architecture, ROAS optimization, and technical integrations (pixels/CRM). Translates business goals into live ad campaigns."
            },
            cons: {
                ar: "⚠️ العيوب والمخاطر: يمثل نقطة فشل وحيدة (Single Point of Failure). إذا غرق في المهام اليدوية، تموت الاستراتيجية. معرض للاحتراق الوظيفي السريع إذا أدار أكثر من مشروعين.",
                en: "⚠️ The Downside: Major bottleneck risk. If they get stuck doing manual tasks, strategy dies. High burnout potential if managing more than 2 complex accounts."
            }
        },
        {
            role: { ar: "2. الصوت (استراتيجي وكاتب المحتوى)", en: "2. The Voice (Content Strategist & Writer)" },
            vibe: { ar: "الجو العام: الحكواتي.", en: "The Vibe: The storyteller." },
            job: { ar: "المهمة: يقرر ماذا نقول وكيف نقوله. يكتب النصوص، والتعليقات، ويدير \"ضبط المزاج\" في التعليقات.", en: "The Job: Decides what we say and how we say it. Writes the scripts, the captions, and handles the \"vibe check\" in the comments." },
            details: {
                ar: "يضمن توحيد نبرة الصوت (Tone of Voice) عبر الإعلانات، السوشيال ميديا، والإيميلات. يكتب سكريبتات الفيديو التي تخاطب نقاط ألم العميل مباشرة.",
                en: "Owns the narrative across all touchpoints: Ads, Social, Email, and Landing Pages. Ensures the brand doesn't sound like a generic robot."
            },
            cons: {
                ar: "⚠️ العيوب والمخاطر: الإبداع يحتاج مساحة. إذا طلبنا منه الرد على 100 رسالة يومياً + كتابة إبداعية، ستنخفض جودة المحتوى وتصبح مملة ومكررة.",
                en: "⚠️ The Downside: Volume limits. You can't write quality scripts AND reply to 100 DMs a day. Creativity drops fast when rushed or overwhelmed with support tickets."
            }
        },
        {
            role: { ar: "3. الساحر البصري (محرر الفيديو والمصمم)", en: "3. The Visual Wizard (Video Editor & Creator)" },
            vibe: { ar: "الجو العام: يجعل الأشياء تبدو باهظة الثمن.", en: "The Vibe: Making things look expensive." },
            job: { ar: "المهمة: تحويل الأفكار المملة إلى ريلز/تيك توك نارية وتصاميم أنيقة. إذا كان لازم يطلع شكله حلو، يروح له.", en: "The Job: Turning boring ideas into fire Reels/TikToks and slick designs. If it needs to look good, it goes to them." },
            details: {
                ar: "مسؤول عن أول 3 ثوانٍ في الفيديو (Hook Rate). ينتج فيديوهات سريعة الإيقاع (Fast-paced) وتصاميم متعددة لاختبارات الأداء (A/B Testing).",
                en: "Responsible for the 'Hook rate'. Producing fast-paced edits, motion graphics, and multiple variations of static assets for A/B testing."
            },
            cons: {
                ar: "⚠️ العيوب والمخاطر: الريندر والتعديلات تستهلك وقتاً طويلاً. إذا زاد الضغط عن الحد المسموح، سيلجأ لاستخدام قوالب جاهزة ونفقد هويتنا البصرية المميزة.",
                en: "⚠️ The Downside: Rendering takes time. If requests pile up beyond capacity, they will start using generic templates and we lose our unique brand identity."
            }
        }
    ],
    output: {
        title: { ar: "📦 ماذا ستحصل عليه كل شهر (الزبدة)", en: "📦 What You Get Every Month (The Goods)" },
        intro: { ar: "مع هذا الثلاثي، إليك الإنتاج الشهري الواقعي. شغل نظيف بدون حرق، ونتائج ملموسة:", en: "With this trio, here is the realistic monthly output. No burnout, just results:" },
        items: [
            {
                title: { ar: "الإعلانات (The Ads)", en: "The Ads" },
                desc: { ar: "إدارة شاملة لـ 5 منصات (LinkedIn, Snapchat, Google, Meta, TikTok). مراجعات أسبوعية + تقرير شهري ذكي.", en: "Full management of 5 platforms (LinkedIn, Snapchat, Google, Meta, TikTok). Weekly check-ins + 1 smart monthly report." }
            },
            {
                title: { ar: "المحتوى (The Content)", en: "The Content" },
                desc: { ar: "12-15 ريلز/تيك توك (جودة عالية، جاهزة للانتشار) + 10-15 تصميم ثابت (للإعلانات أو التايم لاين).", en: "12-15 Reels/TikToks (High quality, ready to go viral) + 10-15 Static Designs (For ads or feed)." }
            },
            {
                title: { ar: "المهام اليومية (Daily Grind)", en: "The Daily Grind" },
                desc: { ar: "جدول النشر + الرد على الرسائل/التعليقات (بحد أقصى ساعتين يومياً).", en: "Posting schedule + replying to DMs/Comments (max 2 hours/day)." }
            }
        ]
    },
    stack: {
        title: { ar: "🛠️ عدة الشغل (The Tech Stack)", en: "🛠️ The Tech Stack" },
        tools: [
            { name: "Slack / Discord", desc: { ar: "للتواصل اليومي السريع (بدل واتساب المزعج).", en: "For quick daily comms (No WhatsApp chaos)." } },
            { name: "ClickUp / notion", desc: { ar: "تريلو أو نوشن لإدارة المهام والمحتوى.", en: "Content calendar & Task management." } },
            { name: "Google Drive", desc: { ar: "لحفظ الأصول (فيديوهات، تصاميم) بجودة عالية.", en: "High-quality asset storage." } },
            { name: "CapCut / Premiere", desc: { ar: "لمونتاج الفيديو السريع والاحترافي.", en: "For editing magic." } }
        ]
    },
    hiring: {
        title: { ar: "📈 متى نوظف؟ (منطق \"وريني الفلوس\")", en: "📈 When Do We Hire? (The \"Show Me The Money\" Logic)" },
        intro: { ar: "إحنا ما نوظف عبث. التوسع يصير بس لما الأرقام تجبرنا. هذي القواعد ومخاطر تجاهلها:", en: "We don't hire just because we feel like it. We scale only when the numbers scream for help. Here are the rules and the risks:" },
        rules: [
            {
                name: { ar: "1. قاعدة \"الكاش الكثيف\" (Media Buyer)", en: "1. The \"Big Spender\" Rule (Media Buyer)" },
                trigger: { ar: "الشرط: لما يوصل صرف الإعلانات 100 ألف ريال/شهرياً.", en: "Trigger: When ad spend hits 100k SAR/month." },
                why: { ar: "السبب: في هالمرحلة، الغلطة تكلف ثروة. المتخصص بيطلع حقه وزيادة بأنه يمنع هدر الميزانية. توظيف محترف أوفر لك من حرق الفلوس.", en: "Why? At this level, a tiny mistake costs a fortune. A specialist pays for themselves by saving us from wasting budget. It’s cheaper to hire a pro than to burn cash." },
                cons: { ar: "⚠️ لو ما وظفنا؟ القائد العام هيغرق في الإعلانات، وهنبدا نحرق فلوس في حملات مش معمولة صح.", en: "⚠️ Risk if skipped: The Lead gets overwhelmed, strategy stops, and we start burning cash on unoptimized ads." }
            },
            {
                name: { ar: "2. قاعدة \"البهلوان\" (Account Manager)", en: "2. The \"Juggling\" Rule (Account Manager)" },
                trigger: { ar: "الشرط: لما نمسك أكثر من 3 براندات في وقت واحد.", en: "Trigger: When we are handling 3+ Brands at once." },
                why: { ar: "السبب: قائد الفريق بيضيع وقته في الملاحق وينسى الشغل الأساسي. نحتاج \"ضابط إيقاع\" يدير العملاء عشان القائد يتفرغ للاستراتيجية.", en: "Why? The Marketing Lead will burn out trying to chase everyone. We need a \"Traffic Controller\" to manage the clients so the Lead can focus on strategy." },
                cons: { ar: "⚠️ لو ما وظفنا؟ العميل هيحس بالإهمال، الطلبات هتتأخر، وهنخسر ثقة البيزنس.", en: "⚠️ Risk if skipped: Clients feel neglected, requests get lost, and we lose trust with stakeholders." }
            },
            {
                name: { ar: "3. قاعدة \"الإنفجار\" (Sales/Moderation)", en: "3. The \"Blowing Up\" Rule (Sales/Moderation)" },
                trigger: { ar: "الشرط: لما تنفجر الرسائل الخاصة (أكثر من 50 عميل محتمل/يومياً).", en: "Trigger: When DMs are exploding (50+ leads/day)." },
                why: { ar: "السبب: الكاتب شغلته يكتب، مو يسولف طول اليوم. إذا تأخرنا في الرد، خسرنا فلوس. وقتها لازم نجيب موظف مبيعات مخصص.", en: "Why? The writer needs to write, not chat all day. If we’re too busy to reply fast, we’re losing money. That’s when we get a dedicated sales rep." },
                cons: { ar: "⚠️ لو ما وظفنا؟ معدل الإغلاق (Sales Closing) هيقع في الأرض، وهنكون بنصرف على إعلانات بتجيب زباين بنطنشهم.", en: "⚠️ Risk if skipped: Sales closing rate crashes. We effectively pay for ads to bring customers that we then ignore." }
            }
        ]
    },
    my_role: {
        title: { ar: "📍 أين أقف أنا؟ (خارطة الطريق الخاصة بي)", en: "📍 Where Do I Fit? (My Personal Roadmap)" },
        intro: {
            ar: "بصراحة، دوري كـ Performance Expert يأتي عادةً بعد وجود الفريق الأساسي لتحسين النتائج. ولكن لأننا في مرحلة بناء، سأقوم بتبديل القبعات (Roles) تدريجياً لخدمة الشركة:",
            en: "Honestly, a Performance Expert usually steps in *after* the core team exists to optimize results. But since we are starting, I will shift gears in phases:"
        },
        phases: [
            {
                step: "1",
                title: { ar: "المرحلة الحالية: المدير المؤقت (Interim Manager)", en: "Current Phase: The Interim Manager" },
                desc: {
                    ar: "بما أننا نبدأ، سأقوم بدور مدير التسويق الرقمي (Lead). سأبني الأنظمة، أقود فريق الـ MVP، وأتأكد من أن عجلة العمل تدور بشكل صحيح (التوسع لأسفل الهرم).",
                    en: "Since we are starting, I act as the Digital Marketing Lead. I build the systems, lead the MVP team, and ensure the machine is running (Downward Scaling)."
                }
            },
            {
                step: "2",
                title: { ar: "نقطة التحول: التوسع الرأسي (The Upward Scale)", en: "The Pivot: Upward Scaling" },
                desc: {
                    ar: "في مرحلة التوسع، الخطوة الأولى هي توظيف مدير تسويق رقمي (Digital Marketing Manager)، يليه مدير حسابات (Account Manager) أو منسق. الهدف: تسليم الراية التشغيلية.",
                    en: "In the scaling phase, the first hire is a Digital Marketing Manager, followed by an Account Manager or Coordinator. Goal: To hand over the operational baton."
                }
            },
            {
                step: "3",
                title: { ar: "المستقبل: العودة للملعب (The Performance Zone)", en: "Future: Back to Performance Zone" },
                desc: {
                    ar: "هنا أعود لمكاني الطبيعي والأكثر ربحية للشركة: التركيز على النمو (Growth)، تعظيم العائد (ROAS)، وتحليل البيانات المعقدة للمشاريع الكبيرة مثل Lenci.ai.",
                    en: "Here I return to my natural habitat: 100% focus on Growth, ROAS, and deep data analytics for big projects like Lenci.ai. Less managing people, more managing profit."
                }
            }
        ]
    }
};