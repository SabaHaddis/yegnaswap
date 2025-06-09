document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        // Toggle Nav
        navLinks.classList.toggle('nav-active');
        
        // Prevent body scrolling when menu is open
        document.body.classList.toggle('no-scroll');

        // Animate Hamburger Icon
        hamburger.classList.toggle('toggle');
    });
    
    // Close nav when a link is clicked
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                document.body.classList.remove('no-scroll');
                hamburger.classList.remove('toggle');
            }
        });
    });
});

let count = localStorage.getItem('visitCount') || 0;
count++;
localStorage.setItem('visitCount', count);
document.getElementById('visitorCount').innerText = `You've visited this site ${count} times.`;

 const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {

            const wasActive = item.classList.contains('active');

            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    const backToTopBtn = document.getElementById('backToTop');

window.onscroll = () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
};

backToTopBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

