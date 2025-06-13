document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("log");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const registered=["Introduction to Computer Science"
        ,"Discrete Mathematics",
        "Web Development",
        "Computer Networks"
        ,"Algorithms Analysis AND Design"];
        function checkRegisteration(courseName){
            if(registered.includes(courseName)){
                window.location.href = "";
            }
            else{
                alert("You are not registered in this course. Please register first.");
            }
        }
});
function navigateToSignUp(){
    window.location.href = "signup.html";
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const sortBy = document.getElementById('sort-by');
    const courseCards = document.querySelectorAll('.course-card');

    // Search and filter function
    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const level = levelFilter.value;

        courseCards.forEach(card => {
            const courseName = card.querySelector('.courseName').textContent.toLowerCase();
            const courseCategory = card.querySelector('.course-tag').textContent;
            const courseLevel = card.querySelector('.course-meta span:last-child').textContent;
            
            const matchesSearch = courseName.includes(searchTerm);
            const matchesCategory = !category || courseCategory === category;
            const matchesLevel = !level || courseLevel.includes(level);

            card.style.display = matchesSearch && matchesCategory && matchesLevel ? 'block' : 'none';
        });
    }

    // Sort function
    function sortCourses() {
        const container = document.querySelector('.courses-container');
        const cards = Array.from(courseCards);

        cards.sort((a, b) => {
            const getValue = (card) => {
                switch(sortBy.value) {
                    case 'name':
                        return card.querySelector('.courseName').textContent;
                    case 'level':
                        return card.querySelector('.course-meta span:last-child').textContent;
                    case 'duration':
                        return card.querySelector('.course-meta span:first-child').textContent;
                    default:
                        return '';
                }
            };

            return getValue(a).localeCompare(getValue(b));
        });

        cards.forEach(card => container.appendChild(card));
    }

    // Event listeners
    searchInput.addEventListener('input', filterCourses);
    searchBtn.addEventListener('click', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
    sortBy.addEventListener('change', sortCourses);
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const categoryFilter = document.getElementById('category-filter');
    const levelFilter = document.getElementById('level-filter');
    const courseCards = document.querySelectorAll('.course-card');

    function filterCourses() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value.toLowerCase();
        const level = levelFilter.value.toLowerCase();

        courseCards.forEach(card => {
            const courseName = card.querySelector('.courseName').textContent.toLowerCase();
            const courseTag = card.querySelector('.course-tag').textContent.toLowerCase();
            const courseLevel = card.querySelector('.course-meta span:last-child').textContent.toLowerCase();

            const matchesSearch = courseName.includes(searchTerm);
            const matchesCategory = !category || courseTag.includes(category);
            const matchesLevel = !level || courseLevel.includes(level);

            card.style.display = (matchesSearch && matchesCategory && matchesLevel) ? 'block' : 'none';
        });

        updateCategories();
    }

    function updateCategories() {
        document.querySelectorAll('.course-category').forEach(category => {
            const hasVisibleCourses = [...category.querySelectorAll('.course-card')]
                .some(card => card.style.display !== 'none');
            category.style.display = hasVisibleCourses ? 'block' : 'none';
        });
    }

    // Event listeners
    searchInput.addEventListener('input', filterCourses);
    searchBtn.addEventListener('click', filterCourses);
    categoryFilter.addEventListener('change', filterCourses);
    levelFilter.addEventListener('change', filterCourses);
});

// Navigation function
function navigateToSignUp(){
    window.location.href = "signup.html";
}

// Cart functionality
let cartCount = 0;
const cartCountElement = document.querySelector('.cart-count');
const coursesInCart = new Set();

function updateCartCount() {
    cartCountElement.textContent = cartCount;
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('coursesInCart', JSON.stringify(Array.from(coursesInCart)));
}

function createCartPanel() {
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
    
    // Display cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
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
                <button class="remove-item" onclick="removeFromCart('${item.id}')">
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
}

function addToCart(courseId, courseName, coursePrice, courseImage) {
    if (!coursesInCart.has(courseId)) {
        cartCount++;
        coursesInCart.add(courseId);
        updateCartCount();
        
        // Add animation effect
        cartCountElement.classList.add('cart-bump');
        setTimeout(() => {
            cartCountElement.classList.remove('cart-bump');
        }, 300);

        // Store course details in cart
        let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        cartItems.push({
            id: courseId,
            name: courseName,
            price: coursePrice,
            image: courseImage
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        showNotification('Course added to cart!', 'success');
    } else {
        showNotification('Course is already in cart!', 'warning');
    }
}

function removeFromCart(courseId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    cartItems = cartItems.filter(item => item.id !== courseId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    coursesInCart.delete(courseId);
    cartCount--;
    updateCartCount();
    
    document.querySelector('.cart-panel').remove();
    createCartPanel();
    showNotification('Course removed from cart!', 'success');
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
    // Initialize cart from localStorage
    const storedCount = localStorage.getItem('cartCount');
    const storedCourses = localStorage.getItem('coursesInCart');
    
    if (storedCount && storedCourses) {
        cartCount = parseInt(storedCount);
        coursesInCart = new Set(JSON.parse(storedCourses));
        updateCartCount();
    }

    // Add click event to cart button
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.addEventListener('click', createCartPanel);

    // Scroll reveal animation
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

// Add styles for animations and cart panel
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: -300px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        transition: right 0.3s ease;
        z-index: 1000;
    }

    .notification.success {
        background-color: #2B7A78;
    }

    .notification.warning {
        background-color: #ff9800;
    }

    .notification.show {
        right: 20px;
    }

    .cart-bump {
        animation: cartBump 0.3s ease-out;
    }

    .cart-panel {
        position: fixed;
        top: 0;
        right: -400px;
        width: 400px;
        height: 100vh;
        background: white;
        box-shadow: -2px 0 5px rgba(0,0,0,0.1);
        transition: right 0.3s ease;
        z-index: 1001;
    }

    .cart-panel.open {
        right: 0;
    }

    .cart-content {
        padding: 20px;
        height: 100%;
        overflow-y: auto;
    }

    .cart-content h2 {
        color: #17252A;
        margin-bottom: 20px;
    }

    .empty-cart-message {
        text-align: center;
        color: #666;
        margin-top: 40px;
    }

    .close-cart {
        position: absolute;
        right: 20px;
        top: 20px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #17252A;
    }

    .cart-items {
        margin-bottom: 20px;
    }

    .cart-item {
        display: flex;
        align-items: center;
        padding: 15px;
        border-bottom: 1px solid #eee;
        gap: 15px;
    }

    .cart-item img {
        width: 80px;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
    }

    .item-details {
        flex: 1;
    }

    .item-details h3 {
        color: #17252A;
        font-size: 1rem;
        margin-bottom: 5px;
    }

    .item-details p {
        color: #2B7A78;
        font-weight: bold;
    }

    .remove-item {
        background: none;
        border: none;
        color: #ff0000;
        cursor: pointer;
        padding: 5px;
    }

    .cart-total {
        margin-top: 20px;
        padding: 20px;
        border-top: 2px solid #eee;
        text-align: right;
    }

    .cart-total h3 {
        color: #17252A;
        margin-bottom: 15px;
    }

    .checkout-btn {
        background: #2B7A78;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }

    .checkout-btn:hover {
        background: #3AAFA9;
        transform: translateY(-2px);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    @keyframes cartBump {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    @media (max-width: 480px) {
        .cart-panel {
            width: 100%;
            right: -100%;
        }

        .notification {
            width: 90%;
            right: -100%;
        }

        .notification.show {
            right: 5%;
        }
    }
`;
document.head.appendChild(style);
