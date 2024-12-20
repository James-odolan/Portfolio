/*global document, console, window, requestAnimationFrame, performance, setTimeout */

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    // Handle cursor dot and outline
    const cursorDot = document.querySelector("[data-cursor-dot]");
    const cursorOutline = document.querySelector("[data-cursor-outline]");

    if (cursorDot && cursorOutline) {
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        function updateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;

            cursorDot.style.left = mouseX + "px";
            cursorDot.style.top = mouseY + "px";

            cursorOutline.style.left = cursorX + "px";
            cursorOutline.style.top = cursorY + "px";

            requestAnimationFrame(updateCursor);
        }

        window.addEventListener("mousemove", function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        requestAnimationFrame(updateCursor);
    }
    
    function encodeWhatsAppLink() {
            return 'https://wa.link/8i6plx'; // The WhatsApp link you want to use
    }

    // Define the throttle function
    function throttle(fn, wait) {
        let time = Date.now();
        return function() {
            if ((time + wait - Date.now()) < 0) {
                fn();
                time = Date.now();
            }
        };
    }

    // Attach the throttled scroll event listener
    window.addEventListener("scroll", throttle(() => {
        // Handle other scroll-based logic here if needed
    }, 100));

    // Handle page reload by resetting scroll position
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        window.scrollTo(0, 0);
    }

    // Toggle navbar functionality
    function toggleNavbar() {
        const navbar = document.getElementById("navbar");
        if (navbar) {
            navbar.classList.toggle("expanded");
        } else {
            console.log("Navbar not found");
        }
    }

    // Handle navbar toggle on hamburger click
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
        hamburger.addEventListener("click", toggleNavbar);
    } else {
        console.log("Hamburger button not found");
    }

    // Cursor style changes on hover
    const clickableElements = document.querySelectorAll("a, .clickable-icon, button");
    clickableElements.forEach(function(element) {
        element.addEventListener("mouseover", function() {
            if (cursorDot && cursorOutline) {
                cursorDot.classList.add("hover");
                cursorOutline.classList.add("hover");
            }
        });

        element.addEventListener("mouseout", function() {
            if (cursorDot && cursorOutline) {
                cursorDot.classList.remove("hover");
                cursorOutline.classList.remove("hover");
            }
        });
    });

    // Create and append the transition element if not already present
    let transitionElement = document.getElementById("page-transition");
    if (!transitionElement) {
        transitionElement = document.createElement("div");
        transitionElement.id = "page-transition";
        document.body.appendChild(transitionElement);
    }

    // Function to handle page transition
    function handlePageTransition(event) {
        event.preventDefault();
        const targetHref = event.currentTarget.href;
        console.log("Transitioning to:", targetHref); // Debug log
        document.body.classList.add("transitioning");
        setTimeout(function() {
            window.location.href = targetHref;
        }, 800); // Duration of the transition (should match CSS transition time)
    }

    // Attach click event listener to all links
    document.querySelectorAll("a[href]").forEach(function(link) {
        link.addEventListener("click", function(event) {
            console.log("Link clicked:", event.currentTarget.href); // Debug log
            handlePageTransition(event);
        });
    });

    // Handle the reverse animation when the new page loads
    window.addEventListener("load", function() {
        // Ensure the page is fully loaded before starting the reverse animation
        document.body.classList.remove("transitioning");
        document.body.classList.add("loaded");

        // Optionally, remove the loaded class after the transition completes
        setTimeout(function() {
            document.body.classList.remove("loaded");
        }, 800); // Duration of the transition (should match CSS transition time)
    });

    // Page dissolve animation
    const overlay = document.getElementById("overlay");
    const content = document.getElementById("content");

    if (overlay) {
        // Ensure overlay is visible initially
        overlay.style.display = "block";
        overlay.style.opacity = "1";

        // Trigger the fade-out animation
        window.addEventListener("load", function() {
            setTimeout(function() {
                overlay.style.opacity = "0";
            }, 100); // Small delay to ensure the overlay is visible before starting fade-out

            overlay.addEventListener("transitionend", function() {
                overlay.style.display = "none";
            });
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const triggers = document.querySelectorAll('.lightbox-trigger');

    function openLightbox(src) {
        lightbox.style.display = 'flex'; // Show lightbox
        lightboxImg.src = src; // Set image source
    }

    function closeLightbox() {
        lightbox.classList.add('fade-out');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightbox.classList.remove('fade-out');
        }, 500); // Match the fade-out duration
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(event) {
            if (event.target === lightbox) { // Close if clicking outside the image
                closeLightbox();
            }
        });
    }

    // Integrate smooth scrolling functionality

    // Function to handle smooth scrolling
    function smoothScroll(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Apply smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });

    // Listen for the pageshow event, which is fired when navigating using the back button
    window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        // If the page was loaded from cache (via back button), reload the page
        window.location.reload(true); // true forces a full reload from the server
    }
});

});
