let currentPage = 1;

function loadCourses(page = 1) {
  fetch(`/api/courses?page=${page}&limit=6`)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    })
    .then(data => {
      const { courses, totalPages } = data;
      const container = document.getElementById("dynamic-courses-container");
      container.innerHTML = "";

      if (!courses.length) {
        container.innerHTML = "<p>No courses available.</p>";
        return;
      }

      courses.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";
        card.innerHTML = `
          <div class="course-img" style="background-image: url('${course.imageUrl || '/Photos/default.jpg'}');">
            <span class="course-tag">${course.category || 'General'}</span>
          </div>
          <div class="course-content">
            <h3 class="courseName">${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
              <span><i class="far fa-clock"></i> ${course.duration || 'N/A'}</span>
              <span><i class="far fa-user"></i> ${course.level || 'All Levels'}</span>
            </div>
            
            <button class="enter-course" onclick="window.location.href='/${course.slug}'">Enter Course</button>


          </div>
        `;
        container.appendChild(card);
      });

      const pagination = document.getElementById("pagination-controls");
      pagination.innerHTML = `
        <button ${page <= 1 ? "disabled" : ""} onclick="loadCourses(${page - 1})">Previous</button>
        <span>Page ${page} of ${totalPages}</span>
        <button ${page >= totalPages ? "disabled" : ""} onclick="loadCourses(${page + 1})">Next</button>
      `;
      currentPage = page;
    })
    .catch(error => {
      console.error("Error loading courses:", error);
      document.getElementById("dynamic-courses-container").innerHTML =
        "<p>Failed to load courses. Please try again later.</p>";
    });
}

document.addEventListener("DOMContentLoaded", () => loadCourses(currentPage));

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('courseSearch');
    const searchButton = searchInput.nextElementSibling;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const courseCards = document.querySelectorAll('.course-card');
        const courseCategories = document.querySelectorAll('.course-category');
      
        const homeCourseCards = document.querySelectorAll('.course-grid .course-card');

        if (!searchTerm) {
            courseCards.forEach(card => card.style.display = 'block');
            courseCategories.forEach(category => category.style.display = 'block');
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

        courseCategories.forEach(category => {
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
