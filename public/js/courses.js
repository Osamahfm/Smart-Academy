document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/courses")
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch courses");
      return response.json();
    })
    .then(courses => {
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
            <button class="enter-course" onclick="window.location.href='/courses/${course._id}'">Enter Course</button>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Error loading courses:", error);
      document.getElementById("dynamic-courses-container").innerHTML =
        "<p>Failed to load courses. Please try again later.</p>";
    });
});
