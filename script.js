const messages = document.getElementById("messages");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const typingIndicator = document.getElementById("typing-indicator");

const coralPersonality = "funny"; // يمكنك تغيير هذه القيمة إلى "professional" أو "witty" أو أي شخصية أخرى مدعومة
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
    const userInput = input.value.trim();

    if (userInput !== "") {
        // Display the user's message in the chat box
        addMessage(userInput, 'user');

        // Show typing indicator
        typingIndicator.style.display = "block";

        const response = await sendMessageToCoral(userInput, 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G'); // استبدل 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G' بمفتاح API الخاص بك

        console.log(response); // Print the full response for verification

        let botMessage = response && response.text ? response.text : "حدث خطأ أثناء معالجة طلبك.";

        // Replace 'كورال' with 'منوفي' and 'coral' with 'Menoufy'
        botMessage = botMessage.replace(/كورال/gi, 'مينو').replace(/coral/gi, 'Meno');
        botMessage = botMessage.replace(/cohere/gi, 'scopead').replace(/كوهير/gi, 'سكوب');

        // Hide typing indicator
        typingIndicator.style.display = "none";

        // Clear the input field after sending the message
        input.value = "";

        // Write the bot's message word by word
        writeMessageWordByWord(botMessage);
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
