const showRegisterButton = document.getElementById('showRegister');
const showLoginButton = document.getElementById('showLogin');
const container = document.getElementById('container');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

showRegisterButton.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.add("right-panel-active");
});

showLoginButton.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.remove("right-panel-active");
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
    } else {
        alert("Login successful!");
        // Here you can add code to handle the login process
    }
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const regUsername = document.getElementById('reg-username').value;
    const regEmail = document.getElementById('reg-email').value;
    const regPassword = document.getElementById('reg-password').value;

    if (regUsername === "" || regEmail === "" || regPassword === "") {
        alert("Please fill in all fields.");
    } else if (!validateEmail(regEmail)) {
        alert("Please enter a valid email address.");
    } else {
        alert("Registration successful!");
        // Here you can add code to handle the registration process
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}