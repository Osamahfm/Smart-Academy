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

      // Pagination controls
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
