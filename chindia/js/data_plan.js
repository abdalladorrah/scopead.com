/**
 * data_plan.js
 * Weekly Action Plan and Execution Phases.
 */
if (!window.projectData) window.projectData = {};

window.projectData.plan = {
    q1Title: { ar: "دليل التنفيذ - فبراير 2026", en: "Execution Manual - Feb 2026" },
    q1Tagline: { ar: "خريطة طريق: من التجهيز إلى الولاء", en: "Roadmap: From Setup to Loyalty" },
    weekendPush: {
        title: { ar: "الملخص التنفيذي", en: "Executive Summary" },
        items: [
            { message: { ar: "الأسبوع 1: تدريب البروتوكولات وتجهيز المحتوى", en: "Week 1: Protocol Training & Content Prep" } },
            { message: { ar: "الأسبوع 2: الإطلاق الموجه (التنفيذي والموفر)", en: "Week 2: Targeted Launch (Executive & Saver)" } },
            { message: { ar: "الأسبوع 3: نشر ثقافة الاندماج (المستكشف)", en: "Week 3: Fusion Culture Push (Explorer)" } }
        ]
    },
    months: [
        {
            name: { ar: "شهر فبراير", en: "February" },
            weeks: [
                {
                    week: "Week 1",
                    task: {
                        ar: "<b>التأسيس الداخلي:</b> تدريب الموظفين على 'بروتوكولات الشخصيات' (استقبال التنفيذي، خدمة الأطفال)، وتصوير أطباق 'طاولة طريق الحرير' بشكل احترافي.",
                        en: "<b>Internal Setup:</b> Train staff on 'Persona Protocols' (Executive greeting, Kids service), and professional shoot for 'Silk Road Board'."
                    }
                },
                {
                    week: "Week 2",
                    task: {
                        ar: "<b>الإطلاق الموجه:</b> توجيه دعوات خاصة للشركات المجاورة (عشاء العمل)، وإطلاق إعلانات 'أيام الشحن' (الاثنين/الأربعاء) للموظفين.",
                        en: "<b>Targeted Launch:</b> Direct invites to nearby offices (Business Dinner), and launch 'Recharge Days' ads (Mon/Wed) for employees."
                    }
                },
                {
                    week: "Week 3",
                    task: {
                        ar: "<b>ترويج الاندماج:</b> دعوة مؤثرين (Foodies) لتجربة 'طاولة طريق الحرير' ونشرها كـ 'تحدي تذوق'، مع تفعيل 'جواز الشينـديا'.",
                        en: "<b>Fusion Push:</b> Invite Foodie influencers to try 'Silk Road Board' as a 'Taste Challenge', activating 'Fusion Passport'."
                    }
                },
                {
                    week: "Week 4",
                    task: {
                        ar: "<b>التحضير للموسم:</b> الترويج المكثف لـ 'وليمة الجمعة' للعائلات، وبدء الحملة التشويقية لـ 'بوكس السحور' الرمضاني.",
                        en: "<b>Season Prep:</b> Heavy push for 'Friday Family Feast', and starting the teaser campaign for 'Ramadan Suhoor Box'."
                    }
                }
            ]
        }
    ],
    influencers: {
        title: { ar: "دور المؤثرين", en: "Influencer Role" },
        tiers: [
            { tier: "Foodies", role: { ar: "التركيز على شرح فكرة 'الاندماج' وتجربة الصنفين معاً.", en: "Focus on explaining the 'Fusion' concept & tasting both." } },
            { tier: "Lifestyle", role: { ar: "تغطية أجواء المكان كوجهة مناسبة للعائلة والعمل.", en: "Covering the Vibe as a Family & Business destination." } }
        ]
    }
};
