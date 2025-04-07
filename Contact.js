document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("loginModal");
    const btn = document.getElementById("log");
    const span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
function navigateToSignUp(){
    window.location.href = "signup.html";
}

document.getElementById("courseBtn").addEventListener("click", function () {
    let dropdown = this.parentElement;
    dropdown.classList.toggle("show");
});

document.addEventListener("click", function (event) {
    let dropdown = document.querySelector(".dropdown");
    if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});