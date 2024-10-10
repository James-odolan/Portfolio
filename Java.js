document.addEventListener("DOMContentLoaded", function () {
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 && 
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const rows = document.querySelectorAll(".comic-row");
    rows.forEach((row) => {
        if (isInViewport(row)) {
            const img = row.querySelector("img");
            if (row.querySelector(".left2")) {
                gsap.to(img, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                });
            } else {
                gsap.to(img, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                });
            }
        }
    });

    gsap.utils.toArray(".comic-image-container.right2 img").forEach((img) => {
        gsap.to(img, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scrollTrigger: {
                trigger: img,
                start: "top 75%",
                end: "bottom 70%",
                scrub: true,
            },
        });
    });

    gsap.utils.toArray(".comic-image-container p").forEach((text) => {
        gsap.from(text, {
            opacity: 0,
            y: 20,
            scrollTrigger: {
                trigger: text,
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        });
    });
});


