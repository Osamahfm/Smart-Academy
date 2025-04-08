document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.getElementById('cartBtn');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    let cart = [];

    // Open cart modal
    cartBtn.onclick = function() {
        modal.style.display = "block";
        updateCartDisplay();
    }

    // Close cart modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Add to cart functionality
    addToCartBtn.onclick = function() {
        const course = {
            name: "Data Structures",
            price: 699,
            id: "datastructures"
        };

        // Check if course is already in cart
        if (!cart.some(item => item.id === course.id)) {
            cart.push(course);
            updateCartDisplay();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Course added to cart!';
            addToCartBtn.parentNode.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        }
    }

    function updateCartDisplay() {
        cartCount.textContent = cart.length;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            cartTotal.textContent = '$0';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map(item => {
            total += item.price;
            return `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        }).join('');

        cartTotal.textContent = `$${total}`;
    }

    // Make removeFromCart function available globally
    window.removeFromCart = function(id) {
        cart = cart.filter(item => item.id !== id);
        updateCartDisplay();
    }
});