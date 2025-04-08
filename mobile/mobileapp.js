document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const addToCartBtn = document.querySelector('.add-to-cart');

    // Add to Cart
    addToCartBtn.addEventListener('click', function() {
        const courseId = this.dataset.course;
        const price = parseFloat(this.dataset.price);
        const courseName = this.dataset.name;

        // Check if course is already in cart
        if (!cart.find(item => item.id === courseId)) {
            cart.push({
                id: courseId,
                name: courseName,
                price: price
            });
            updateCart();
            showNotification('Course added to cart!');
        } else {
            showNotification('Course is already in cart!', 'warning');
        }
    });

    // Update Cart
    function updateCart() {
        cartCount.textContent = cart.length;
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            total += item.price;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <span>${item.name}</span>
                    <div>
                        <span>$${item.price}</span>
                        <i class="fas fa-trash cart-item-remove" data-id="${item.id}"></i>
                    </div>
                </div>
            `;
        });

        cartTotal.textContent = `$${total}`;
    }

    // Remove from Cart
    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-item-remove')) {
            const id = e.target.dataset.id;
            const index = cart.findIndex(item => item.id === id);
            if (index > -1) {
                cart.splice(index, 1);
                updateCart();
                showNotification('Course removed from cart!');
            }
        }
    });

    // Show Cart Modal
    cartBtn.onclick = function() {
        cartModal.style.display = 'block';
    }

    // Close Cart Modal
    cartModal.querySelector('.close').onclick = function() {
        cartModal.style.display = 'none';
    }

    // Checkout
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            // Add your payment processing logic here
            window.location.href = 'checkout.html';
        } else {
            showNotification('Your cart is empty!', 'warning');
        }
    });

    // Notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
});
