// Function to scroll to the products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    productsSection.scrollIntoView({ behavior: 'smooth' });
}

// Example function to add items to the cart (basic for now)
function addToCart(productName, price) {
    alert(`${productName} has been added to your cart! Price: $${price}`);
}
