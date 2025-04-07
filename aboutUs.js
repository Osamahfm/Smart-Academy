// Function to handle social media icon clicks
function openSocial(platform) {
    let url;
    
    switch(platform) {
        case 'facebook':
            url = 'https://www.facebook.com/yourtechlearnpage';
            break;
        case 'github':
            url = 'https://github.com/techlearn';
            break;
        case 'youtube':
            url = 'https://www.youtube.com/techlearnchannel';
            break;
        case 'linkedin':
            url = 'https://www.linkedin.com/company/techlearn';
            break;
        default:
            url = '#';
    }
    
    window.open(url, '_blank');
}

// Animation for course cards when they come into view
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Add current year to footer
    const yearElement = document.createElement('p');
    yearElement.textContent = `© ${new Date().getFullYear()} TechLearn. All rights reserved.`;
    document.querySelector('footer .container').prepend(yearElement);
});