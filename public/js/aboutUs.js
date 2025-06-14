document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(".course-card, .team-member");

    function checkScroll() {
        let scrollPosition = window.scrollY + window.innerHeight;
        
        animatedElements.forEach((element) => {
            let elementPosition = element.offsetTop;
            
            if (scrollPosition > elementPosition + 50) {
                element.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", checkScroll);
    checkScroll();

  
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'translateY(-10px)';
        });
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'translateY(0)';
        });
    });
});


const style = document.createElement('style');
style.textContent = `
    .course-card,
    .team-member {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .course-card.show,
    .team-member.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
