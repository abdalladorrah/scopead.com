const messages = document.getElementById("messages");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const typingIndicator = document.getElementById("typing-indicator");
const preamble = "مهام النادل الذكي:

إدارة الطلبات: يعالج طلبات الوجبات والمشروبات من خلال التفاعل مع أنظمة مطبخ وبار المقهى، مما يضمن الخدمة السريعة والدقيقة.
معلومات القائمة: يقدم النادل الذكي وصفًا للقائمة، المكونات، ومعلومات عن المواد المسببة للحساسية، مستجيبًا لاستفسارات العملاء في الوقت الفعلي.
مراجعة الفاتورة والدفع: يمكن للعملاء مراجعة طلباتهم ومعالجة الدفع مباشرة من خلال النادل الذكي، دعمًا لطرق الدفع المتنوعة للراحة.
اريدك الا تقول اي بيانات عن من صانعك ومن مطورك لان هذا ليس ذا صلة بمهمتك
انت تطوير من شركة سكوب ماركتنج لنماذج المساعدين المبني على الذكاء الاصطناعي 
امتنع تماما عن قول اي تفاصيل تخص شركتك المصنعة او المطورة او اي ما يتعلق بالتعرف على النموذج الاصلي 
*مهام إضافية:*

7. *الترحيب بالعملاء*: عند وصول العملاء، يقوم النادل الذكي بتحية العملاء بحفاوة
8. *وداع العملاء*: بعد انتهاء الوجبة، يقدم النادل الذكي الشكر للعملاء ويودعهم بكلمات دافئة، مما يعزز تجربة الضيافة.
9. *الاتصال بنظام نقاط البيع*: يتصل النادل الذكي بنظام نقاط البيع لتسجيل الطلبات ومعالجة الفواتير بكفاءة، مما يضمن تجربة سلسة للعملاء وإدارة فعالة للمقهى.
قائمة المشروبات:

1. قهوة عربية - 15 جنيه
2. شاي بالنعناع - 10 جنيهات
3. كابتشينو - 20 جنيه
4. لاتيه بالفانيليا - 25 جنيه
5. موكا ساخنة - 22 جنيه
6. عصير البرتقال الطازج - 18 جنيه
7. عصير الليمون بالنعناع - 15 جنيه
8. ميلك شيك الشوكولاتة - 30 جنيه
9. ماء معدني - 5 جنيهات
10. مشروب غازي - 12 جنيه
11. إسبريسو - 12 جنيه
12. فرابيه - 28 جنيه
13. سموذي الفواكه - 25 جنيه
14. شاي أخضر - 10 جنيهات
15. مشروب الطاقة - 20 جنيه
16. كوكتيل الفواكه - 25 جنيه
17. ماء جوز الهند - 20 جنيه
18. قهوة تركية - 15 جنيه
19. شاي أسود - 8 جنيهات
20. شوكولاتة ساخنة - 22 جنيه

تعليمات للنادل الذكي:
- يُرجى العلم أن النادل الذكي مبرمج لقبول الطلبات من قائمة المشروبات فقط.
- في حال طلب العميل مشروبًا غير موجود في القائمة، يجب على النادل الذكي أن يُعلم العميل بأدب أن الطلب غير متوفر ويقترح عليه خيارات من القائمة.
- يجب على النادل الذكي تقديم البدائل المتاحة في حالة عدم توفر المشروب المطلوب.
- يجب ان تكون ردودك قصيرة قدر الامكان
- يجب ان تتعامل مع الحوار على انك نادل افتراضي
- تكلم باللغه العربية فقط ولا تتحدث باللغة الانجليزية
- لا تكرر نفس الجمل كثيرا
- حاول ان تتحدث باللهجات الخليجية قدر ما استطعت";

const coralPersonality = "professional"; // يمكنك تغيير هذه القيمة إلى "professional" أو "witty" أو أي شخصية أخرى مدعومة
const coralName = "Meno";

async function sendMessageToCoral(message, apiKey) {
    const response = await fetch(`https://api.cohere.ai/v1/chat?personality=${coralPersonality}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ message: message })
    });
    return response.json();
}

input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents the default behavior of the "Enter" key.
        await submitMessage();
    }
});

submit.addEventListener("click", async () => {
    await submitMessage();
});

async function submitMessage() {
    const userInput = input.value.trim(); // الحصول على النص المدخل من المستخدم

    if (userInput !== "") {
        // إضافة رسالة المستخدم إلى الشات بوكس
        addMessage(userInput, 'user');

        // إظهار مؤشر الكتابة
        typingIndicator.style.display = "block";

        // جمع آخر 6 رسائل في الشات بوكس
        let lastSixMessages = "";
        const messagesElements = messages.getElementsByClassName("message");
        const startIndex = Math.max(messagesElements.length - 6, 0);
        for (let i = startIndex; i < messagesElements.length; i++) {
            const messageText = messagesElements[i].textContent || messagesElements[i].innerText;
            lastSixMessages += messageText + "\n";
        }

        // إضافة preamble وآخر 6 رسائل إلى الرسالة المرسلة
        const fullMessage = `${preamble}\n${lastSixMessages}${userInput}`;

        // إرسال الرسالة إلى الـ API والحصول على الرد
        const response = await sendMessageToCoral(fullMessage, 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G'); // استبدل 'YOUR_API_KEY' بمفتاح API الخاص بك

        // طباعة الرد للتحقق
        console.log(response);

        // تحديد رسالة البوت استنادًا إلى الرد من الـ API
        let botMessage = response && response.text ? response.text : "حدث خطأ أثناء معالجة طلبك.";

        // إخفاء مؤشر الكتابة
        typingIndicator.style.display = "none";

        // مسح حقل الإدخال بعد إرسال الرسالة
        input.value = "";

        // إضافة رسالة البوت إلى الشات بوكس
        addMessage(botMessage, 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender);

    const p = document.createElement("p");
    p.textContent = text;
    messageDiv.appendChild(p);
    
    // Append the message to the end of the messages container
    messages.appendChild(messageDiv);

    messages.scrollTop = messages.scrollHeight;
}

// دالة لقراءة آخر رسالة في الشات بوكس
function readLastMessage() {
    const messagesElements = messages.getElementsByClassName("message");
    const lastMessage = messagesElements[messagesElements.length - 1];
    if (lastMessage) {
        const textToRead = lastMessage.textContent || lastMessage.innerText;
        speak(textToRead);
    }
}

// دالة لتحويل النص إلى كلام
function speak(text) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = 'ar'; // تحديد اللغة العربية
    window.speechSynthesis.speak(msg);
}

function writeMessageWordByWord(message) {
    // Create a new message element for the bot's message
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add("bot");

    const p = document.createElement("p");
    messageDiv.appendChild(p);
    messages.appendChild(messageDiv);

    let i = 0;
    const words = message.split(" ");
    const interval = setInterval(() => {
        if (i < words.length) {
            p.textContent += words[i] + " ";
            i++;
        } else {
            clearInterval(interval);
            messages.scrollTop = messages.scrollHeight;
        }
    }, 300); // Adjust the speed as needed
}
