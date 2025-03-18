document.addEventListener("DOMContentLoaded",function(){
    const form=document.querySelector(".contactForm form");
    form.addEventListener("submit",function(event){
        event.preventDefault();

        const name=document.getElementById("formName").Value.trim();
        const email=document.getElementById("formEmail").Value.trim();
        const message=document.getElementById("message").Value.trim();

        if(name===""||email===""||message===""){
            showAlert("Please fill out all fields before submitting.!","Error");
            return;
        }
        if (!validateEmail(email)) {
            showAlert("Invalid email address!", "Error");
            return;
        }
        showAlert("Thank you, "+name+"!We will get back to you soon.","success")
        form.reset();

    });

    function validateEmail(email){
        const re=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    function showAlert(message,type){
        const alerBox=document.createElement("div");
        alerBox.textContent=message;
        alertBox.className='alert ${type}';
        document.body.appendChild(alertBox);

        setTimeout(()=>{
            alertBox.remove();
        },3000);
    }
});