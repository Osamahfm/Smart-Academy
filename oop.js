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
function enrollUser() {
    // Check if user is signed in
    const isSignedIn = localStorage.getItem('isSignedIn');

    if (isSignedIn === 'true') {
        alert('You have been enrolled!');
    } else {
        // Redirect to login page
        window.location.href = 'SignLog.html';
    }
}
