document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    // التحويل إلى نموذج التسجيل
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.add('right-panel-active');
        clearErrors();
    });

    // التحويل إلى نموذج تسجيل الدخول
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('right-panel-active');
        clearErrors();
    });

    // إرسال نموذج تسجيل الدخول
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showError(loginError, "Please enter both email and password.");
            return;
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
            } 
            else {
                showError(loginError, data.message || "Login failed.");
            }

        } catch (err) {
            showError(loginError, "Something went wrong. Please try again.");
        }
    });

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearErrors();

        const name = document.getElementById('reg-username').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const password = document.getElementById('reg-password').value.trim();

        if (!name || !email || !password) {
            showError(registerError, "All fields are required.");
            return;
        }

console.log("Register request body:", { name, email, password });


        try {
            const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });


            const data = await res.json();

            if (res.ok) {
                alert("Register successful! Please login.");
                document.getElementById('container').classList.remove('right-panel-active');
            } 
            else {
                showError(registerError, data.message || "Registration failed.");
            }

        } catch (err) {
            showError(registerError, "Something went wrong. Please try again.");
        }
    });

    // دالة لإخفاء الأخطاء
    function clearErrors() {
        loginError.style.display = 'none';
        loginError.style.color = 'red';
        registerError.style.display = 'none';
    }

    // دالة لعرض الخطأ
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
        element.style.color = 'red';
    }
});
