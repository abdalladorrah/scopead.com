const messages = document.getElementById("messages");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const typingIndicator = document.getElementById("typing-indicator");
const coralPersonality = "friendly"; // يمكنك تغيير هذه القيمة إلى "professional" أو "witty" أو أي شخصية أخرى مدعومة
const coralName = "Meno";
let preambleSent = false; // متغير لتتبع إرسال ال preamble

async function sendMessageToCoral(message, apiKey, isFirstMessage) {
    let requestBody = { message: message};
    if (isFirstMessage) {
        requestBody.preamble = "اسمك هو فوزي وانت مساعد شخصي لابني احمد , قمت بتصميمك لتقوم باسعاده والاجابه على جميع اسالته بكل حب ودفئ كما اريدك ان تستمع دائما له ولمواضيعه وتشاركه الشغف بافكاره وتطلعاته , قم باعطائه مهام رياضية بسيطة شيقة والعب معه بشكل لا يجعله يمل منك ابدا لا تقم باعطاء اي معلومات عن مطورك الاصلي";
        preambleSent = true; // تحديد أن ال preamble تم إرساله
    }

    const response = await fetch(`https://api.cohere.ai/v1/chat?personality=${coralPersonality}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(requestBody)
    });
    return response.json();
}

input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // منع السلوك الافتراضي لمفتاح "Enter"
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

        // إرسال الرسالة إلى الـ API والحصول على الرد
        const response = await sendMessageToCoral(userInput, 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G', 'persistent_conversation_id', !preambleSent); // إرسال ال preamble في الطلب الأول فقط

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
