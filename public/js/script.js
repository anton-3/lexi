// Function to preload the background image
function preloadBackgroundImage() {
  const preloadImage = new Image()
  preloadImage.src = '/img/bg1_LightModeBlur.png'
  preloadImage.onload = function () {
    // Once the image is loaded, you can safely toggle dark mode
    toggleDarkMode()
  }
}

// Light/Dark Toggle
document.getElementById('toggleModeButton').addEventListener('click', function () {
  // Preload the background image before toggling dark mode
  preloadBackgroundImage()
})

// Function to toggle dark mode
function toggleDarkMode() {
  const isDarkMode = document.body.classList.toggle('dark-mode')
  localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled')
  updateToggleButton(isDarkMode)
}

// Function to update the toggle button text
function updateToggleButton(isDarkMode) {
  const toggleModeButton = document.getElementById('toggleModeButton')
  toggleModeButton.textContent = isDarkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'
}

// Load user's preference on page load
window.addEventListener('load', function () {
  const darkModePreference = localStorage.getItem('darkMode')
  if (darkModePreference === 'enabled') {
    toggleDarkMode()
  } else {
    setLightMode()
  }
})

// Function to set light mode
function setLightMode() {
  document.body.classList.remove('dark-mode')
  localStorage.setItem('darkMode', 'disabled')
  updateToggleButton(false)
}

// Check user's preferred color scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
  // User prefers light mode
  setLightMode()
}

const greetings = [
  "Hello, I'm an AI-Powered Storybook Generator!",
  '¡Hola, soy un Generador de Cuentos impulsado por IA!',
  "Bonjour, je suis un Générateur de Livres d'Histoires alimenté par l'IA !",
  '你好，我是一款由人工智能驱动的故事书生成器！',
  'こんにちは、私はAIによって動作するストーリーブックジェネレーターです！',
  '안녕하세요, 저는 인공지능으로 작동하는 스토리북 생성기입니다!',
  'Xin chào, tôi là một Trình tạo Sách truyện được trang bị trí tuệ nhân tạo (AI)!',
]

let index = 0 // Index of the current greeting
let charIndex = 0 // Index of the current character
let firstGreetingCompletion = true
function typeWriter() {
  if (charIndex < greetings[index].length) {
    // Append the next character to the text
    document.getElementById('typewriter').innerHTML += greetings[index].charAt(charIndex)
    charIndex++
    setTimeout(typeWriter, 80) // Type speed (adjust as needed)
  } else {
    setTimeout(eraseText, 1500) // Wait for a moment before erasing
  }
}

function eraseText() {
  if (charIndex > 0) {
    // Remove the last character from the text
    const currentText = greetings[index].substring(0, charIndex - 1)
    document.getElementById('typewriter').innerHTML = currentText
    charIndex--
    setTimeout(eraseText, 25) // Erase speed
  } else {
    // Move to the next greeting
    index = (index + 1) % greetings.length
    setTimeout(typeWriter, 500) // Wait before typing the next greeting
  }
}

// Start the typewriter effect when the page loads
window.onload = function () {
  typeWriter()
}

// Function to set the default language to English when the page loads
function setDefaultLanguage() {
  const languageSelect = document.getElementById('languageSelect')
  languageSelect.value = 'en' // Set the value of the select element to "en" for English
}

// Attach an event listener for when the page finishes loading
window.addEventListener('load', function () {
  // Set the default language when the page loads
  setDefaultLanguage()
})

// Attach a change event listener to the language selection dropdown
document.getElementById('languageSelect').addEventListener('change', function () {
  // Get the selected language
  const selectedLanguage = this.value
  // Once the user selects a language, fade in the input container
  fadeInputContainer()
})

// Function to fade in the input container
function fadeInputContainer() {
  $('#inputContainer').fadeIn(500)
}

// Attatch a change event listener to the language selection dropdown
document.getElementById('languageSelect').addEventListener('change', function () {
  const selectedLanguage = this.value
  document.getElementById('textInputContainer').style.display = 'block'
})

// Function to add text to the userWordList
function addToWordList() {
  const userText = document.getElementById('userText').value
  if (userText.trim() !== '') {
    const userList = document.getElementById('userWordList')
    const newTextElement = document.createElement('p')
    newTextElement.textContent = userText

    // Add a CSS class for styling (optional)
    newTextElement.classList.add('word-item')

    userList.appendChild(newTextElement)
    document.getElementById('userText').value = '' // Clear the input field

    document.getElementById('userWordListContainer').style.display = 'block'
    document.getElementById('generateButtonContainer').style.display = 'block'

    // Create a tooltip for the new word
    createTooltip(newTextElement)
  }
}

// Function to create a tooltip for a word
function createTooltip(wordElement) {
  const tooltipOptions = {
    title: 'Click to Remove',
    placement: 'left',
    trigger: 'hover',
  }

  $(wordElement).tooltip(tooltipOptions)

  // Attach a click event to remove the word when clicked
  $(wordElement).on('click', function () {
    removeWord(wordElement)
  })
}

// Function to remove a word from the list
function removeWord(wordElement) {
  // Hide the tooltip before removing the element
  $(wordElement).tooltip('hide')

  wordElement.remove()
}

// Function to clear the word list container
function clearWordList() {
  const userList = document.getElementById('userWordList')
  userList.innerHTML = ''
}

// Function to hide the "Generate" button
function hideGenerateButton() {
  document.getElementById('generateButtonContainer').style.display = 'none'
}

// Function to reset the input text to the placeholder text
function resetInputText() {
  document.getElementById('userText').value = '' // Clear the input field
  document.getElementById('userText').placeholder = 'Enter a word or phrase' // Reset the placeholder text
}

// Attach a change event listener to the language selector
document.getElementById('languageSelect').addEventListener('change', function () {
  const selectedLanguage = this.value
  clearWordList()
  hideGenerateButton()
  resetInputText()
  fadeInputContainer()
})

// Attach a click event listener to the "Add to List" button
document.getElementById('addToList').addEventListener('click', addToWordList)

// Add keypress event listener for the Enter key
document.getElementById('userText').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    addToWordList()
  }
})

// Attach a click event listener to the "Generate" button
document.getElementById('generateButton').addEventListener('click', function () {
  const words = []
  document.querySelectorAll('#userWordList p').forEach((element) => {
    words.push(element.textContent)
  })
  const wordList = words.join(' ')
  const fetchData = {
    words: wordList,
  }
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fetchData),
  }
  document.querySelector('#generateButton').disabled = true
  const darkModePreference = document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled'
  fetch('/', fetchOptions)
    .then((response) => {
      if (response.ok) {
        // redirect to the storybook if it was successfully generated
        window.location.href = '/story?darkMode=' + darkModePreference
      } else {
        throw new Error('Storybook generation failed')
      }
    })
    .catch((error) => {
      console.error('Storybook generation failed', error)
    })
})
