let pageIndex = 0

// Function to update the story content based on the current page
function updateStory() {
  const storyContent = document.getElementById('storyContent')
  const currentPage = storyPages[pageIndex]

  // Check if there is a current page to display
  if (currentPage) {
    storyContent.innerHTML = `
            <div class="card mx-auto"> <!-- Apply mx-auto class for horizontal centering -->
                <img src="${currentPage.imageUrl}" alt="Page Image" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${currentPage.caption}</p>
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

/**
 * COME BACK TO THIS
 */

// // Function to update the story content based on the current page with image and caption transition
// function updateStoryContentWithTransition(nextPageIndex) {
//     const storyContent = document.getElementById("storyContent");
//     const currentPage = storyPages[pageIndex];
//     const nextPage = storyPages[nextPageIndex];

//     // Check if there is a current page to display
//     if (currentPage) {
//         storyContent.innerHTML = `
//             <div class="card mx-auto"> <!-- Apply mx-auto class for horizontal centering -->
//                 <img src="${currentPage.imageUrl}" alt="Page Image" class="card-img-top">
//                 <div class="card-body">
//                     <p class="card-text">${currentPage.caption}</p>
//                 </div>
//             </div>
//         `;

//         // Apply object-fit to the image
//         const imageElement = storyContent.querySelector(".card-img-top");
//         imageElement.style.objectFit = "cover"; // You can adjust 'cover' to other values like 'contain' as needed
//     } else {
//         storyContent.innerHTML = "End of the story.";
//     }

//     // Check if there is a next page to display
//     if (nextPage) {
//         // Apply the fade-out animation to the current image
//         const currentImage = storyContent.querySelector(".card-img-top");
//         currentImage.classList.add("image-transition", "image-fade-out");

//         // Wait for the fade-out animation to complete
//         setTimeout(() => {
//             // Update the image source and caption
//             currentImage.src = nextPage.imageUrl;
//             currentImage.alt = "Page Image";
//             currentImage.classList.remove("image-transition", "image-fade-out");

//             // Apply the fade-in animation to the new image
//             currentImage.classList.add("image-transition");
//             setTimeout(() => {
//                 currentImage.classList.remove("image-transition");
//             }, 500); // Adjust timing as needed
//         }, 500); // Wait for the fade-out animation to complete (adjust timing as needed)
//     } else {
//         storyContent.innerHTML = "End of the story.";
//     }
// }

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
