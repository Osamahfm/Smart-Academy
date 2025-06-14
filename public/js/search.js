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
        if (!searchTerm) {
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