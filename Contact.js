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
        category:"Web Development",

    },
    {
        id:3,
        title:"Introduction to Computer Science",
    },
    {
        id:4,
        title:"Data Structures and Algorithms",
        description:"Learn about data structures and algorithms.",
        category:"Programming",
    },

    {
        id:5,
        title:"Discrete Mathematics",
        description:"Learn about discrete mathematics.",
        category:"Mathematics",

    },
    {
        id:6,
        title:"computer Networks",
        description:"Learn about computer networks.",
        category:"Networking",
    },
    {
        id:7,
        title:"Database Management Systems",
        description:"Learn about database management systems.",
        category:"Database",
    },
    {
        id:8,
        title:"Algorithms Analysis and Design",
        description:"Learn about algorithms analysis and design.",
        category:"Programming",
    },
    {
        id:9,
        title:"Software Engineering",
        description:"Learn about software engineering.",
        category:"Software Engineering",

    },
    {
        id:10,
        title:"Operating Systems",
        description:"Learn about operating systems.",
        category:"Operating Systems",

    },
    {
        id:11,
        title:"Web Development Backend",
        description:"Build server-side applications.",
        category:"Web Development",

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
