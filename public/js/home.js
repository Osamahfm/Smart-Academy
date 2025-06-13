// Navigation function
function navigateToSignUp() {
    window.location.href = "/signlog";
}

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const coursesInCart = new Set();

function updateCartCount() {
    fetch('/cart/count', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        cartCount = data.count;
        if (cartCountElement) cartCountElement.textContent = cartCount;
    })
    .catch(err => console.error('Failed to update cart count', err));
}

function createCartPanel() {
    // Remove existing panel if exists
    const existingPanel = document.querySelector('.cart-panel');
    if (existingPanel) existingPanel.remove();

    const cartPanel = document.createElement('div');
    cartPanel.className = 'cart-panel';

    const cartContent = document.createElement('div');
    cartContent.className = 'cart-content';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-cart';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = () => cartPanel.classList.remove('open');

    const title = document.createElement('h2');
    title.textContent = 'Shopping Cart';

    cartContent.appendChild(closeBtn);
    cartContent.appendChild(title);

    fetch('/cart', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(cartItems => {
        if (cartItems.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Your cart is empty';
            emptyMessage.className = 'empty-cart-message';
            cartContent.appendChild(emptyMessage);
        } else {
            const itemsList = document.createElement('div');
            itemsList.className = 'cart-items';

            let total = 0;
            cartItems.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <p>$${item.price}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                `;
                itemsList.appendChild(cartItem);
                total += parseFloat(item.price);
            });

            cartContent.appendChild(itemsList);

            const totalElement = document.createElement('div');
            totalElement.className = 'cart-total';
            totalElement.innerHTML = `
                <h3>Total: $${total.toFixed(2)}</h3>
                <button class="checkout-btn">Proceed to Checkout</button>
            `;
            cartContent.appendChild(totalElement);
        }

        cartPanel.appendChild(cartContent);
        document.body.appendChild(cartPanel);
        setTimeout(() => cartPanel.classList.add('open'), 50);
    })
    .catch(err => console.error('Failed to fetch cart', err));
}

function addToCart(courseId, courseName, coursePrice, courseImage) {
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            courseId,
            name: courseName,
            price: coursePrice,
            image: courseImage
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            updateCartCount();
            cartCountElement.classList.add('cart-bump');
            setTimeout(() => cartCountElement.classList.remove('cart-bump'), 300);
            showNotification('Course added to cart!', 'success');
        }
    })
    .catch(err => console.error('Failed to add course to cart', err));
}

function removeFromCart(courseId) {
    fetch(`/cart/remove/${courseId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) {
            updateCartCount();
            const panel = document.querySelector('.cart-panel');
            if (panel) panel.remove();
            createCartPanel();
            showNotification('Course removed from cart!', 'success');
        }
    })
    .catch(err => console.error('Failed to remove course from cart', err));
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }, 100);
}

// Initialize cart and scroll animations
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();

    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', createCartPanel);
    }

    // Optional scroll-based reveal animation
    const animatedElements = document.querySelectorAll(".scroll-reveal, .c1, .c2, .c3, .css1, .css2, .css3, .net1, .net2, .net3");

    function checkScroll() {
        let scrollPosition = window.scrollY + window.innerHeight;

        animatedElements.forEach((element) => {
            let elementPosition = element.offsetTop;
            if (scrollPosition > elementPosition + 50) {
                element.classList.add("show");
            } else if (window.scrollY + 50 < elementPosition) {
                element.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();
});
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('courseSearch');
    const searchButton = searchInput.nextElementSibling;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // Handle courses page layout
        const courseCards = document.querySelectorAll('.course-card');
        const courseCategories = document.querySelectorAll('.course-category');
        
        // Handle home page layout
        const homeCourseCards = document.querySelectorAll('.course-grid .course-card');
        const homeCourseCategories = document.querySelectorAll('.course-category');

        // If search is empty, show all courses
            courseCards.forEach(card => card.style.display = 'block');
            courseCategories.forEach(category => category.style.display = 'block');
            homeCourseCards.forEach(card => card.style.display = 'block');
            homeCourseCategories.forEach(category => category.style.display = 'block');
            return;
        }

        let hasVisibleCourses = false;

        // Search in courses page
        courseCards.forEach(card => {
            const courseName = card.querySelector('.courseName')?.textContent.toLowerCase() || '';
            const courseDescription = card.querySelector('p')?.textContent.toLowerCase() || '';
            const courseTag = card.querySelector('.course-tag')?.textContent.toLowerCase() || '';

            const isVisible = courseName.includes(searchTerm) || 
                            courseDescription.includes(searchTerm) || 
                            courseTag.includes(searchTerm);

            card.style.display = isVisible ? 'block' : 'none';
            if (isVisible) hasVisibleCourses = true;
        });

        // Search in home page
        homeCourseCards.forEach(card => {
            const courseName = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const courseInstructor = card.querySelector('.instructor')?.textContent.toLowerCase() || '';
            const courseMeta = card.querySelector('.course-meta')?.textContent.toLowerCase() || '';

            const isVisible = courseName.includes(searchTerm) || 
                            courseInstructor.includes(searchTerm) || 
                            courseMeta.includes(searchTerm);

            card.style.display = isVisible ? 'block' : 'none';
            if (isVisible) hasVisibleCourses = true;
        });

        // Show/hide category sections based on whether they have visible courses
        courseCategories.forEach(category => {
            const categoryCards = category.querySelectorAll('.course-card');
            const hasVisibleCards = Array.from(categoryCards).some(card => card.style.display !== 'none');
            category.style.display = hasVisibleCards ? 'block' : 'none';
        });

        homeCourseCategories.forEach(category => {
            const categoryCards = category.querySelectorAll('.course-card');
            const hasVisibleCards = Array.from(categoryCards).some(card => card.style.display !== 'none');
            category.style.display = hasVisibleCards ? 'block' : 'none';
        });

        // Scroll to the first visible course if any
        if (hasVisibleCourses) {
            const firstVisibleCard = document.querySelector('.course-card[style="display: block;"]');
            if (firstVisibleCard) {
                firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Add event listeners
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}); 
