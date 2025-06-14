document.addEventListener('DOMContentLoaded', function() {
   
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartBtn = document.getElementById('cartBtn');
    const modal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');
    const checkoutBtn = document.getElementById('checkoutBtn');

    
    const course = {
        name: "Backend Development",
        price: 999,
        id: "backend"
    };

    updateCartDisplay();

    cartBtn.addEventListener('click', function() {
        modal.style.display = "block";
        requestAnimationFrame(() => {
            modal.classList.add('show');
        });
        updateCartDisplay();
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.style.display = "none";
            modal.classList.remove('fade-out', 'show');
        }, 300);
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            closeBtn.click();
        }
    });

    addToCartBtn.addEventListener('click', function() {
        if (!cart.some(item => item.id === course.id)) {
            addToCartBtn.classList.add('adding');
            setTimeout(() => {
                cart.push(course);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                showNotification('Backend Development course added to cart!', 'success');
                addToCartBtn.classList.remove('adding');
            }, 500);
        } else {
            showNotification('This course is already in your cart!', 'warning');
        }
    });

    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            checkoutBtn.classList.add('processing');
            checkoutBtn.textContent = 'Processing...';
            showNotification('Processing your order...', 'info');
            
            setTimeout(() => {
                cart = [];
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                showNotification('Order processed successfully!', 'success');
                
                setTimeout(() => {
                    modal.classList.add('fade-out');
                    setTimeout(() => {
                        modal.style.display = "none";
                        modal.classList.remove('fade-out', 'show');
                        checkoutBtn.classList.remove('processing');
                        checkoutBtn.textContent = 'Proceed to Checkout';
                    }, 300);
                }, 1000);
            }, 2000);
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
                <div class="cart-item" data-id="${item.id}">
                    <div class="item-info">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">$${item.price}</span>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn" title="Remove from cart">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>`;
        }).join('');

        cartTotal.textContent = `$${total}`;
    }

    window.removeFromCart = function(id) {
        const itemElement = document.querySelector(`[data-id="${id}"]`);
        if (itemElement) {
            itemElement.classList.add('removing');
            setTimeout(() => {
                cart = cart.filter(item => item.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
                showNotification('Course removed from cart', 'info');
            }, 300);
        }
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            warning: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            error: 'fa-times-circle'
        };
        return icons[type] || icons.info;
    }

    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: -300px;
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1100;
        }

        .notification.show {
            right: 20px;
            transform: translateY(0);
        }

        .notification.success { border-left: 4px solid #2B7A78; }
        .notification.warning { border-left: 4px solid #ff9800; }
        .notification.info { border-left: 4px solid #17252A; }
        .notification.error { border-left: 4px solid #f44336; }

        .notification i {
            font-size: 1.2rem;
        }

        .notification.success i { color: #2B7A78; }
        .notification.warning i { color: #ff9800; }
        .notification.info i { color: #17252A; }
        .notification.error i { color: #f44336; }

        .adding {
            animation: pulse 0.5s ease;
        }

        .removing {
            animation: slideOut 0.3s ease forwards;
        }

        .fade-out {
            animation: fadeOut 0.3s ease;
        }

        .processing {
            position: relative;
            pointer-events: none;
            opacity: 0.7;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }

        @keyframes slideOut {
            to { 
                opacity: 0;
                transform: translateX(100%);
            }
        }

        @keyframes fadeOut {
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});