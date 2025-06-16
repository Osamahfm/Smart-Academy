function navigateToSignUp() {
    window.location.href = "/signlog";
}

document.addEventListener('DOMContentLoaded', function() {
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
        const courseCards = document.querySelectorAll('.course-card');
       
        const homeCourseCards = document.querySelectorAll('.course-grid .course-card');
        const homeCourseCategories = document.querySelectorAll('.course-category');

        if (!searchTerm) {
            courseCards.forEach(card => card.style.display = 'block');
            homeCourseCards.forEach(card => card.style.display = 'block');
            homeCourseCategories.forEach(category => category.style.display = 'block');
            return;
        }

        let hasVisibleCourses = false;

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

        homeCourseCategories.forEach(category => {
            const categoryCards = category.querySelectorAll('.course-card');
            const hasVisibleCards = Array.from(categoryCards).some(card => card.style.display !== 'none');
            category.style.display = hasVisibleCards ? 'block' : 'none';
        });

        if (hasVisibleCourses) {
            const firstVisibleCard = document.querySelector('.course-card[style="display: block;"]');
            if (firstVisibleCard) {
                firstVisibleCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});
