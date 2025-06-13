console.log("Login script loaded");

document.addEventListener('DOMContentLoaded', function () {
    const API_BASE = 'http://localhost:5050';

    const showRegisterButton = document.getElementById('showRegister');
    const showLoginButton = document.getElementById('showLogin');
    const container = document.getElementById('container');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Toggle between login and register forms
    showRegisterButton.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add("right-panel-active");
    });

    showLoginButton.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove("right-panel-active");
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        try {
            const response = await fetch(`${API_BASE}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            console.log('Login response:', data); // Debug log

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token
            localStorage.setItem('token', data.token);
            console.log('Stored token:', data.token); // Debug log
            console.log('Admin status:', data.isAdmin); // Debug log

            // Redirect based on admin status
            if (data.isAdmin) {
                window.location.href = '/api/admin/dashboard';
            } else {
                window.location.href = '/';
            }
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    });

    // Handle registration form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Register form submitted');
        const username = document.getElementById('reg-username').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const errorDiv = document.getElementById('registerError');
        errorDiv.style.display = 'none';
        errorDiv.textContent = '';

        if (!validateEmail(email)) {
            errorDiv.textContent = "Please enter a valid email address.";
            errorDiv.style.display = 'block';
            return;
        }

        try {
            const response = await fetch(`${API_BASE}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Registration successful
            alert('Registration successful! Please login.');
            container.classList.remove("right-panel-active");
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
}); 