function navigateToSignUp(){
    window.location.href = "signup.html";
}
document.getElementById("signupform").addEventListener("submit", function(event){
    event.preventDefault();
    alert("Sign Up Successful");
    signUp();
});