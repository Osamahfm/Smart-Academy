document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const showForgotPassword = document.getElementById('showForgotPassword');
    const backToLogin = document.getElementById('backToLogin');

    const loginFormContainer = document.querySelector('.sign-in-container');
    const registerFormContainer = document.querySelector('.sign-up-container');
    const forgotPasswordContainer = document.querySelector('.forgot-password-container');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');

    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');
    const resetError = document.getElementById('resetError');

    const forms = {
        login: loginFormContainer,
        register: registerFormContainer,
        forgot: forgotPasswordContainer
    };

    // General function to show a specific form and hide the others
    function switchForm(formToShow) {
        Object.values(forms).forEach(form => form.style.display = 'none');
        forms[formToShow].style.display = 'block';
        clearErrors();
    }

    showRegister.addEventListener('click', e => {
        e.preventDefault();
        switchForm('register');
    });

    showLogin.addEventListener('click', e => {
        e.preventDefault();
        switchForm('login');
    });

    showForgotPassword.addEventListener('click', e => {
        e.preventDefault();
        switchForm('forgot');
    });

    backToLogin.addEventListener('click', e => {
        e.preventDefault();
        switchForm('login');
    });

    // Handle Login Submit
    loginForm.addEventListener('submit', async e => {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            return showError(loginError, "Please enter both email and password.");
        }

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                alert("Login successful");
                window.location.href = '/home';
            } else {
                showError(loginError, data.message || "Login failed.");
            }
        } catch {
            showError(loginError, "Something went wrong. Please try again.");
        }
    });

    // Handle Register Submit
    registerForm.addEventListener('submit', async e => {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        if (!name || !email || !password) {
            return showError(registerError, "All fields are required.");
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();

            if (res.ok) {
                alert("Register successful! Please login.");
                switchForm('login');
            } else {
                showError(registerError, data.message || "Registration failed.");
            }
        } catch {
            showError(registerError, "Something went wrong. Please try again.");
        }
    });

    // Handle Forgot Password Submit
    forgotPasswordForm.addEventListener('submit', async e => {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('resetEmail').value.trim();
        const password = document.getElementById('newPassword').value.trim();

        if (!email || !password) {
            return showError(resetError, "Please fill in both fields.");
        }

        try {
            const res = await fetch('/api/auth/resetPassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                alert("Password updated successfully. Please login.");
                switchForm('login');
            } else {
                showError(resetError, data.message || "Update failed.");
            }
        } catch {
            showError(resetError, "Something went wrong. Please try again.");
        }
    });

    // Utility: Clear all error messages
    function clearErrors() {
        [loginError, registerError, resetError].forEach(el => {
            if (el) {
                el.style.display = 'none';
                el.textContent = '';
            }
        });
    }

    // Utility: Show a specific error message
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
            element.style.color = 'red';
        }
    }

    // Default to login form on load
    switchForm('login');
});
