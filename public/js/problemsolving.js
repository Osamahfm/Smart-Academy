document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get DOM elements
    const cartBtn = document.getElementById('cartBtn');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Initialize cart display
    updateCartDisplay();

    // Cart button click handler
    cartBtn.addEventListener('click', function() {
        modal.style.display = "block";
        updateCartDisplay();
    });

    // Close button click handler
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });

    // Click outside modal handler
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Add to cart handler
    addToCartBtn.addEventListener('click', function() {
        const course = {
            name: "Problem Solving",  // Updated course name
            price: 599,
            id: "problemsolving"      // Updated course ID
        };

        if (!cart.some(item => item.id === course.id)) {
            cart.push(course);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification('Course added to cart!', 'success');
        } else {
            showNotification('Course is already in cart!', 'warning');
        }
    });
        // Checkout button handler
        checkoutBtn.addEventListener('click', function() {
            if (cart.length > 0) {
                showNotification('Proceeding to checkout...', 'info');
                // Add checkout logic here
            } else {
                showNotification('Your cart is empty!', 'warning');
            }
        });
    
        function updateCartDisplay() {
            cartCount.textContent = cart.length;
            
            if (cart.length === 0) {
                cartItems.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <p>Your cart is empty</p>
                    </div>`;
                cartTotal.textContent = '$0';
                return;
            }
    
            let total = 0;
            cartItems.innerHTML = cart.map(item => {
                total += item.price;
                return `
                    <div class="cart-item">
                        <div class="item-info">
                            <span class="item-name">${item.name}</span>
                            <span class="item-price">$${item.price}</span>
                        </div>
                        <button onclick="removeFromCart('${item.id}')" class="remove-btn">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>`;
            }).join('');
    
            cartTotal.textContent = `$${total}`;
        }
    
        // Make removeFromCart function available globally
        window.removeFromCart = function(id) {
            cart = cart.filter(item => item.id !== id);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            showNotification('Course removed from cart', 'warning');
        }
    
        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
            `;
            document.body.appendChild(notification);
    
            setTimeout(() => notification.classList.add('show'), 100);
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    
        function getNotificationIcon(type) {
            switch(type) {
                case 'success': return 'fa-check-circle';
                case 'warning': return 'fa-exclamation-circle';
                case 'info': return 'fa-info-circle';
                default: return 'fa-info-circle';
            }
        }
    
        // Add notification styles
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: -300px;
                background: white;
                padding: 15px 20px;
                border-radius: 4px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                transition: right 0.3s ease;
                z-index: 1100;
            }
    
            .notification.show {
                right: 20px;
            }
    
            .notification.success { border-left: 4px solid #4CAF50; }
            .notification.warning { border-left: 4px solid #ff9800; }
            .notification.info { border-left: 4px solid #2196F3; }
    
            .notification i {
                font-size: 1.2rem;
            }
    
            .notification.success i { color: #4CAF50; }
            .notification.warning i { color: #ff9800; }
            .notification.info i { color: #2196F3; }
        `;
        document.head.appendChild(style);
    });
    

