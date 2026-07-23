function locomotiveAnimations() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// Enable smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            locoScroll.scrollTo(targetElement);
        }
    });
});

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});





// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimations();

function navbarAnimation() {
    gsap.to("#nav-part1 svg", {
        transform: "translateY(-100%)",
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0%",
            end: "top -5%",
            scrub: true,
            // markers:true
        }
    })
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
            trigger: "#page1",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub: true,
        }
    })
}
navbarAnimation();

function videoconAnimation() {
    // Disabled as the video is now styled and controlled directly within the glassmorphism layout
}
videoconAnimation();

function loadingAnimation() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // HeroBadge
    gsap.fromTo("#hero-badge", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
    // H1
    gsap.fromTo("#hero-heading", 
        { opacity: 0, scale: 0.98 }, 
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
    // P
    gsap.fromTo("#hero-paragraph", 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
    // BottomLeftCard
    gsap.fromTo("#bottom-left-card", 
        { x: -20, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
    // BottomRightCorner
    gsap.fromTo("#bottom-right-corner", 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );
}
loadingAnimation();

function cursorAnimation() {
    document.addEventListener("mousemove", function(dets){
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
        })
    })
    
    document.querySelectorAll(".child").forEach(function(elem) {
        elem.addEventListener("mouseenter", function() {
            const cursor = document.querySelector("#cursor");
            const bgColor = elem.getAttribute("data-color");
    
            gsap.to(cursor, {
                backgroundColor: bgColor,
                transform: 'translate(-50%,-50%) scale(1)'
            });
            
        });
        elem.addEventListener("mouseleave", function() {
            const cursor = document.querySelector("#cursor");
    
            gsap.to(cursor, {
                backgroundColor: 'transparent',
                transform: 'translate(-50%,-50%) scale(0)'
            });
        });
    })
}
cursorAnimation();

function horizontalSlider() {
    const sliderWrapper = document.querySelector("#slider-section .slider-wrapper");
    const slides = document.querySelectorAll("#slider-section .slide");
    const sidebarSubtext = document.querySelector("#slider-section .sidebar-item p:not(#header)");
    if (!sliderWrapper || slides.length === 0) return;

    let maxScroll = sliderWrapper.scrollWidth - window.innerWidth;

    gsap.to(sliderWrapper, {
        x: -maxScroll,
        ease: "none",
        scrollTrigger: {
            trigger: "#slider-section",
            scroller: "#main",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${maxScroll}`,
            invalidateOnRefresh: true,
            onUpdate: () => {
                let closestSlide = null;
                let minDistance = Infinity;

                slides.forEach(slide => {
                    const rect = slide.getBoundingClientRect();
                    const centerPosition = (rect.left + rect.right) / 2;
                    const distanceFromCenter = centerPosition - window.innerWidth / 2;
                    const absDist = Math.abs(distanceFromCenter);

                    if (absDist < minDistance) {
                        minDistance = absDist;
                        closestSlide = slide;
                    }

                    // Scale effect as slide approaches center
                    let scale;
                    if (distanceFromCenter > 0) {
                        scale = Math.min(1.3, 1 + (1 - absDist / window.innerWidth) * 0.3);
                    } else {
                        scale = Math.max(0.8, 1 - (absDist / window.innerWidth) * 0.3);
                    }

                    gsap.set(slide, { scale: Math.max(0.85, Math.min(1.25, 1.25 - (absDist / (window.innerWidth * 0.6)) * 0.4)) });

                    // Center text appearance animation
                    const slideContent = slide.querySelector('.slide-content');
                    if (slideContent) {
                        // Text fully appears when close to center (within 300px)
                        const centerRatio = Math.max(0, 1 - absDist / (window.innerWidth * 0.25));
                        gsap.set(slideContent, {
                            opacity: centerRatio,
                            y: (1 - centerRatio) * 20
                        });
                    }
                });

                // Dynamically update sidebar subtext to highlight active centered service
                if (closestSlide && sidebarSubtext && minDistance < window.innerWidth * 0.3) {
                    const serviceName = closestSlide.getAttribute('data-service');
                    if (serviceName) {
                        sidebarSubtext.innerHTML = `Active Service: <br /><strong>${serviceName}</strong>`;
                    }
                }
            }
        }
    });

    window.addEventListener('resize', () => {
        maxScroll = sliderWrapper.scrollWidth - window.innerWidth;
    });
}
horizontalSlider();

