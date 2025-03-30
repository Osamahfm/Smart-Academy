document.addEventListener("DOMContentLoaded", function() {
   
});
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
    const greetingDiv=document.getElementById("greeting");
    const greatingMessage="Welcome to Coursey!";
    greetingDiv.textContent=greetingMessage;
    greetingDiv.style.textAlign="center";
    greetingDiv.style.fontSize="24px";
    greetingDiv.style.margin="20px 0";

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
const courses=[
    {
        id:1,
        title:"Problem Solving",
        description:"Learn how to solve problems effectively.",
        category:"Programming",
    },
    {
        id:2,
        title:"Web Development Frontend",
        description:"Build responsive and interactive websites.",
        category:"Software Development",

    },
    {
        id:3,
        title:"Mobile App Development",
        description:"Create mobile applications for Android and iOS.",
        category:"Software Development",
    },
    {
        id:4,
        title:"Object-Oriented Programming",
        description:"Understand the principles of OOP.",
        category:"Computer Science",
    },
    {
        id:5,
        title:"Intro To Cybersecurity",
        description:"Learn the basics of cybersecurity.",
        category:"Cybersecurity",
    },
    {
        id:6,
        title:"Certified Ethical Hacking",
        description:"Become a certified ethical hacker.",
        category:"Cybersecurity",
    },
    {
        id:7,
        title:"Cyber Security Specialization",
        description:"Deep dive into cybersecurity concepts.",
        category:"Cybersecurity",
    },
    {
        id:4,
        title:"Data Structures and Algorithms",
        description:"Learn about data structures and algorithms.",
        category:"Computer Science",
    },
    {
        id:11,
        title:"Web Development Backend",
        description:"Build server-side applications.",
        category:"Software Development",

    }


];

document.getElementById("searchButton").addEventListener("click", performSearch); 
document.getElementById("searchCourses").addEventListener("keypress",function(e){
    if(e.key==="Enter"){
        performSearch();

    }
})
function perfornSearch(){
    const searchInput=document.getElementById("searchCourses").value.toLowerCase();
    const Searchresults=courses.filter(course=>
        course.title.toLowerCase().includes(searchInput)||
        course.description.toLowerCase().includes(searchQuery)||
        course.category.toLowerCase().includes(searchQuery)

    );
    displaySearchResults(searchResults);

}
function displaySearchResults(results){
    let resultsContainer=document.getElementById("searchResults");
    if(!resultsCntainer){
        resultsContainer=document.createElement("div");
        resultsContainer.id="searchResults";
        document.querySelector(".navbar").appendChild(resultsContainer);

    }
    resultsContainer.innerHTML="";
    if(results.length===0){
        resultsContainer.innerHTML="<p>No results found.</p>";
        return;
    }
    const resultsHTML=results.map(course=>`
        <div class="course-item">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p>Category: ${course.category}</p>
        </div>
    `).join("");

    resultsContainer.innerHTML=resultsHTML;
}
