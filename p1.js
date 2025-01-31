
  // Select elements
const popup = document.getElementById('popup');
const popupImg = document.getElementById('popup-img');
const close = document.getElementById('close');
const zoomableImages = document.querySelectorAll('.zoomable');

// Add click event to each image
zoomableImages.forEach(image => {
  image.addEventListener('click', () => {
    popup.style.display = 'flex'; // Show popup
    popupImg.src = image.src; // Set clicked image as the popup image
  });
});

// Close the popup when clicking the close button
close.addEventListener('click', () => {
  popup.style.display = 'none';
});

// Optional: Close popup when clicking outside the image
popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});
