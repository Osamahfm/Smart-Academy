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

        document.addEventListener("DOMContentLoaded", function () {
            const elements = document.querySelectorAll(".c1, .c2, .c3, .css1, .css2, .css3, .net1, .net2, .net3");

            function checkScroll() {
                elements.forEach((element) => {
                    const elementTop = element.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;

                    if (elementTop < windowHeight - 100) {
                        element.classList.add("show");
                    }
                });
            }

            window.addEventListener("scroll", checkScroll);
            checkScroll(); 

        });