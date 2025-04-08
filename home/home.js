function navigateToSignUp(){
    window.location.href = "signup.html";
}

document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll(".scroll-reveal, .c1, .c2, .c3, .css1, .css2, .css3, .net1, .net2, .net3");

    function checkScroll() {
        let scrollPosition = window.scrollY + window.innerHeight;
        
        animatedElements.forEach((element) => {
            let elementPosition = element.offsetTop;
            
            if (scrollPosition > elementPosition + 50) {
                element.classList.add("show");
            } else if (window.scrollY + 50 < elementPosition) { 
                element.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll(); 
});

