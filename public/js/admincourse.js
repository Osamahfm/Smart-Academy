// public/js/adminCourses.js
document.addEventListener('DOMContentLoaded', function() {
    const toggleFormBtn = document.getElementById('toggleCourseForm');
    const courseFormContainer = document.getElementById('courseFormContainer');
    const courseForm = document.getElementById('courseForm');
    const cancelFormBtn = document.getElementById('cancelForm');
    
    // Toggle course form visibility
    toggleFormBtn.addEventListener('click', function() {
        courseFormContainer.style.display = courseFormContainer.style.display === 'none' ? 'block' : 'none';
        // Reset form when showing
        if (courseFormContainer.style.display === 'block') {
            courseForm.reset();
            document.getElementById('courseId').value = '';
        }
    });
    
    cancelFormBtn.addEventListener('click', function() {
        courseFormContainer.style.display = 'none';
        courseForm.reset();
        document.getElementById('courseId').value = '';
    });
    
    // Handle form submission
    courseForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const courseId = document.getElementById('courseId').value;
        const courseData = {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            price: document.getElementById('price').value
        };
        
        try {
            let response;
            if (courseId) {
                // Update existing course
                response = await fetch(`/admin/courses/${courseId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(courseData)
                });
            } else {
                // Create new course
                response = await fetch('/admin/courses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(courseData)
                });
            }
            
            if (response.ok) {
                window.location.reload();
            } else {
                const error = await response.json();
                alert(error.message || 'Error saving course');
            }
        } catch (err) {
            console.error('Error:', err);
            alert('An error occurred while saving the course');
        }
    });
    
    // Set up edit buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseCard = this.closest('.course-card');
            const courseId = courseCard.dataset.id;
            const title = courseCard.querySelector('h3').textContent;
            const description = courseCard.querySelector('p').textContent;
            const price = courseCard.querySelector('p:nth-of-type(2)').textContent.replace('Price: $', '');
            
            document.getElementById('courseId').value = courseId;
            document.getElementById('title').value = title;
            document.getElementById('description').value = description;
            document.getElementById('price').value = price;
            
            courseFormContainer.style.display = 'block';
        });
    });
    
    // Set up delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async function() {
            if (confirm('Are you sure you want to delete this course?')) {
                const courseId = this.closest('.course-card').dataset.id;
                
                try {
                    const response = await fetch(`/admin/courses/${courseId}`, {
                        method: 'DELETE'
                    });
                    
                    if (response.ok) {
                        window.location.reload();
                    } else {
                        const error = await response.json();
                        alert(error.message || 'Error deleting course');
                    }
                } catch (err) {
                    console.error('Error:', err);
                    alert('An error occurred while deleting the course');
                }
            }
        });
    });
});