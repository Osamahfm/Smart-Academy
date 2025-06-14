document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const closeBtn = document.querySelector('.close');

    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    function updateCartDisplay() {
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
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    addToCartBtn.addEventListener('click', function() {
        const courseId = this.dataset.course;
        const price = parseFloat(this.dataset.price);
        const courseName = document.querySelector('header h2').textContent;

        if (!cart.find(item => item.id === courseId)) {
            cart.push({
                id: courseId,
                name: courseName,
                price: price
            });
            updateCartDisplay();
            showNotification('Course added to cart!');
        } else {
            showNotification('Course is already in cart!', 'warning');
        }
    });

    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('cart-item-remove')) {
            const id = e.target.dataset.id;
            const index = cart.findIndex(item => item.id === id);
            if (index > -1) {
                cart.splice(index, 1);
                updateCartDisplay();
                showNotification('Course removed from cart!');
            }
        }
    });

    cartBtn.addEventListener('click', function() {
        cartModal.style.display = 'block';
        updateCartDisplay();
    });

    closeBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    document.getElementById('checkoutBtn').addEventListener('click', function() {
        if (cart.length > 0) {
            window.location.href = 'checkout.html';
        } else {
            showNotification('Your cart is empty!', 'warning');
        }
    });

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    updateCartCount();

    
});

const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseover', function(e) {
        e.preventDefault();
        this.title = '';
    });
});