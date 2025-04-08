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