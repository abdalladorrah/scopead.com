const messages = document.getElementById("messages");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const typingIndicator = document.getElementById("typing-indicator");

const coralPersonality = "friendly"; // يمكنك تغيير هذه القيمة إلى "professional" أو "witty" أو أي شخصية أخرى مدعومة
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
        addMessage(userInput, "user");

        // Show typing indicator
        typingIndicator.style.display = "block";

        const response = await sendMessageToCoral(userInput, 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G'); // استبدل 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G' بمفتاح API الخاص بك

        console.log(response); // Print the full response for verification

        let botMessage = response && response.text ? response.text : "حدث خطأ أثناء معالجة طلبك.";

        // Replace 'كورال' with 'منوفي' and 'coral' with 'Menoufy'
        botMessage = botMessage.replace(/كورال/gi, 'مينو').replace(/coral/gi, 'Meno');

        // Hide typing indicator
        typingIndicator.style.display = "none";

        // Split the response into words
        const words = botMessage.split(" ");

        // Create a paragraph element for the bot's message
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.classList.add("bot");

        const p = document.createElement("p");
        messageDiv.appendChild(p);
        messages.appendChild(messageDiv);

        // Display each word gradually
        for (let i = 0; i < words.length; i++) {
            p.textContent += words[i] + " ";
            await new Promise(resolve => setTimeout(resolve, 300)); // Delay between each word
        }

        messages.scrollTop = messages.scrollHeight;

        input.value = ""; // Clear the input field after sending
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(sender);

    const p = document.createElement("p");
    p.innerHTML = text;
    messageDiv.appendChild(p);
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
}
