const greetings = [
    "Hello, I'm an AI-Powered Storybook Generator!",
    "¡Hola, soy un Generador de Cuentos impulsado por IA!",
    "Bonjour, je suis un Générateur de Livres d'Histoires alimenté par l'IA !",
    "你好，我是一款由人工智能驱动的故事书生成器！",
    "こんにちは、私はAIによって動作するストーリーブックジェネレーターです！",
    "안녕하세요, 저는 인공지능으로 작동하는 스토리북 생성기입니다!",
    "Xin chào, tôi là một Trình tạo Sách truyện được trang bị trí tuệ nhân tạo (AI)!",
];

let index = 0; // Index of the current greeting
let charIndex = 0; // Index of the current character
let firstGreetingCompletion = true;
function typeWriter() {
    if (charIndex < greetings[index].length) {
        // Append the next character to the text
        document.getElementById("typewriter").innerHTML += greetings[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80); // Type speed (adjust as needed)
    } else {
        setTimeout(eraseText, 1500); // Wait for a moment before erasing
    }
}

function eraseText() {
    if (charIndex > 0) {
        // Remove the last character from the text
        const currentText = greetings[index].substring(0, charIndex - 1);
        document.getElementById("typewriter").innerHTML = currentText;
        charIndex--;
        setTimeout(eraseText, 25); // Erase speed
    } else {
        // Move to the next greeting
        index = (index + 1) % greetings.length;
        setTimeout(typeWriter, 500); // Wait before typing the next greeting
    }
}

// Start the typewriter effect when the page loads
window.onload = function () {
    typeWriter();
};

// Function to set the default language to English when the page loads
function setDefaultLanguage() {
    const languageSelect = document.getElementById("languageSelect");
    languageSelect.value = "en"; // Set the value of the select element to "en" for English
}

// Attach an event listener for when the page finishes loading
window.addEventListener("load", function () {
    // Set the default language when the page loads
    setDefaultLanguage();
});

// Attach a change event listener to the language selection dropdown
document.getElementById("languageSelect").addEventListener("change", function () {
    // Get the selected language
    const selectedLanguage = this.value;
    // Once the user selects a language, fade in the input container
    fadeInputContainer();
});

// Function to fade in the input container
function fadeInputContainer() {
    $("#inputContainer").fadeIn(500);
}

// Function to add text to the userWordList
function addToWordList() {
    const userText = document.getElementById("userText").value;
    if (userText.trim() !== "") {
        const userList = document.getElementById("userWordList");
        const newTextElement = document.createElement("p");
        newTextElement.textContent = userText;

        // Add a CSS class for styling (optional)
        newTextElement.classList.add("word-item");

        userList.appendChild(newTextElement);
        document.getElementById("userText").value = ""; // Clear the input field

        // Create a tooltip for the new word
        createTooltip(newTextElement);
    }
}

// Function to create a tooltip for a word
function createTooltip(wordElement) {
    const tooltipOptions = {
        title: "Click to Remove",
        placement: "left",
        trigger: "hover",
    };

    $(wordElement).tooltip(tooltipOptions);

    // Attach a click event to remove the word when clicked
    $(wordElement).on("click", function () {
        removeWord(wordElement);
    });
}

// Function to remove a word from the list
function removeWord(wordElement) {
    // Hide the tooltip before removing the element
    $(wordElement).tooltip("hide");

    wordElement.remove();
}

// Attach a click event listener to the "Add to List" button
document.getElementById("addToList").addEventListener("click", addToWordList);

// Add keypress event listener for the Enter key
document.getElementById("userText").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addToWordList();
    }
});

// Attach a click event listener to the "Generate" button
document.getElementById("generateButton").addEventListener("click", function () {
    // Redirect to the new HTML page (replace 'newpage.html' with the actual URL)
    window.location.href = "story.html";
});