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

    const registered=["Introduction to Computer Science"
        ,"Discrete Mathematics",
        "Web Development",
        "Computer Networks"
        ,"Algorithms Analysis AND Design"];
        function checkRegisteration(courseName){
            if(registered.includes(courseName)){
                window.location.href = "";
            }
            else{
                alert("You are not registered in this course. Please register first.");
            }
        }
});
function navigateToSignUp(){
    window.location.href = "signup.html";
}
