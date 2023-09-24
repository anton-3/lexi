let pageIndex = 0

currentLanguage = 'foreign'

// Function to update the story content based on the current page
function updateStory() {
  const storyContent = document.getElementById('storyContent')
  const currentPage = storyPages[pageIndex]

  const caption = currentLanguage == 'english' ? currentPage.englishCaption : currentPage.caption
  // Check if there is a current page to display
  if (currentPage) {
    storyContent.innerHTML = `
            <div class="card mx-auto"> <!-- Apply mx-auto class for horizontal centering -->
                <img src="${currentPage.imageUrl}" alt="Page Image" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${caption}</p>
                </div>
            </div>
        `

    // Apply object-fit to the image
    const imageElement = storyContent.querySelector('.card-img-top')
    imageElement.style.objectFit = 'cover' // You can adjust 'cover' to other values like 'contain' as needed
  } else {
    storyContent.innerHTML = 'End of the story.'
  }
}

// Initial load
updateStory()

// Attach event listeners for navigation
document.getElementById('prevPage').addEventListener('click', function () {
  if (pageIndex > 0) {
    pageIndex--
    updateStory()
  }
})

document.getElementById('nextPage').addEventListener('click', function () {
  if (pageIndex < storyPages.length - 1) {
    pageIndex++
    updateStory()
  }
})

document.getElementById('translateButton').addEventListener('click', function () {
  currentLanguage = currentLanguage == 'english' ? 'foreign' : 'english'
  updateStory()
})

function getURLParameter(name) {
  const params = new URLSearchParams(window.location.search)
  return params.get(name)
}

window.addEventListener('load', function () {
  // Get the darkMode parameter from the URL
  const darkModePreference = getURLParameter('darkMode')

  // Check if darkModePreference is "enabled" and set dark mode accordingly
  if (darkModePreference === 'enabled') {
    document.body.classList.add('dark-mode')
  }
})
