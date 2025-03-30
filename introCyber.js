document.addEventListener("DOMContentLoaded", function() {
    const loginForm= document.querySelector(".modal-content form");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");


    const createErrorElement= (message) => {
        const error= document.createElement("span");
        error.className= "error-message";
        error.textContent= message;

        return error;
    };

    const validateUsername=(username)=>{
        const regex= /^[a-zA-Z0-9]{4,20}$/;
        if (!regex.test(username)) {
            return "Username must be 4-20 characters long and can only contain letters and numbers.";
        }
        return null;
    };
    const validateEmail=(email)=>{
        const regex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return "Invalid email.!!";
        }
        return null;

    };
    const validatePassword=(password)=>{
        if(password.length < 8) {
            return "Password must be at least 8 characters long.";
        }
        if(!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter.";
        }
        if(!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter.";
        }
        if(!/[0-9]/.test(password)) {
            return "Password must contain at least one number.";
        }
        return null;
    };

    const addInputValidation= (input, validateFn) => {
        input.addEventListener("input", function()  {
            const existingError= input.parentElement.querySelector(".error-message");
            if (existingError) {
                existingError.remove();
            }

            const error = validateFn(input.value);
            if (error) {
                const errorElement= createErrorElement(error);
                input.parentElement.appendChild(errorElement);
                input.classList.add("error");
            }else{
                input.classList.remove("error");
            }

        });
    };
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("log");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
        document.querySelectorAll(".error-message").forEach(error=>error.remove());
        document.querySelectorAll(".error").forEach(input=>input.classList.remove("error"));
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }


    addInputValidation(usernameInput, validateUsername);
    addInputValidation(emailInput, validateEmail);
    addInputValidation(passwordInput, validatePassword);

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const usernameError= validateUsername(usernameInput.value);
        const emailError= validateEmail(emailInput.value);
        const passwordError= validatePassword(passwordInput.value);

        document.querySelectorAll(".error-message").forEach(error=>error.remove());
        document.querySelectorAll(".error").forEach(input=>input.classList.remove("error"));

        if(usernameError|| emailError || passwordError) {
            if(usernameError) {
                usernameInput.parentElement.appendChild(createErrorElement(usernameError));
                usernameInput.classList.add("error");
            }
            if(emailError) {
                emailInput.parentElement.appendChild(createErrorElement(emailError));
                emailInput.classList.add("error");
            }
            if(passwordError) {
                passwordInput.parentElement.appendChild(createErrorElement(passwordError));
                passwordInput.classList.add("error");
            }
            return;
        }
        console.log("Form submitted successfully!");
        modal.style.display = "none";
        this.reset();
    });
});