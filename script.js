const messages = document.getElementById("messages");
const input = document.getElementById("input");
const submit = document.getElementById("submit");
const typingIndicator = document.getElementById("typing-indicator");

async function sendMessageToCoral(message, apiKey) {
    const response = await fetch('https://api.cohere.ai/v1/chat', {
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

        const response = await sendMessageToCoral(userInput, 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G'); // Replace 'ONTHGbFAhxC54QlQxnEAZKGZrqIWe7ALERnUl22G' with your own API key

        console.log(response); // Print the full response for verification

        const botMessage = response && response.text ? response.text : "An error occurred while processing your request."; // Extract the message correctly

        // Hide typing indicator
        typingIndicator.style.display = "none";

        addMessage(botMessage, "bot");

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
