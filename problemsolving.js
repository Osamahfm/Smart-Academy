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
