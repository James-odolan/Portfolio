document.addEventListener('DOMContentLoaded', function() {
    // --- First Script (Reveal blocks on scroll) ---
    const blocks = document.querySelectorAll('.reveal-block1');

    function revealOnScroll1() {
        const triggerBottom = window.innerHeight / 5 * 4;

        blocks.forEach(block => {
            const blockTop = block.getBoundingClientRect().top;

            if (blockTop < triggerBottom) {
                block.classList.add('visible');
            } else {
                block.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll1);
    revealOnScroll1(); // Initial check

    // --- Second Script (Slide functionality) ---
    let slideIndex = 0;

    function showSlides() {
        const slides = document.querySelectorAll('.slide');
        if (slideIndex >= slides.length) slideIndex = 0;
        if (slideIndex < 0) slideIndex = slides.length - 1;
        const slideWidth = slides[0].clientWidth;
        document.querySelector('.slides').style.transform = `translateX(${-slideWidth * slideIndex}px)`;
    }

    // Expose functions to the global scope
    window.nextSlide = function() {
        slideIndex++;
        showSlides();
    };

    window.prevSlide = function() {
        slideIndex--;
        showSlides();
    };

    // Initialize the first slide
    showSlides();

    // --- Third Script (Reveal elements on scroll with IntersectionObserver) ---
    const revealOnScroll2 = () => {
        const elements = document.querySelectorAll('.GYM-sites-section, .Gymopener, .soc-container, .GP-left, .new-row');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 150 && rect.bottom >= 0) { // Adjust the -150 value as needed
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    };

    // Initial check in case elements are already in view
    revealOnScroll2();

    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll2);

    // Use Intersection Observer for better performance
    const observerOptions = {
        root: null, // relative to viewport
        rootMargin: '0px 0px -150px 0px', // Adjust the bottom margin to control trigger point
        threshold: 0.1 // trigger when 10% of the element is visible
    };


});