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