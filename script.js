 document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);
            
            // --- PAGE LOAD INTRO ANIMATION (COLLABORATION) ---
            
            // 🌟 ADD THIS LINE: Tells GSAP to unhide the wrapper right as it takes control
            gsap.set(".intro-collab-wrapper", { visibility: "visible" });
            
            const introTl = gsap.timeline({
                onComplete: () => {
                    document.getElementById('intro-overlay').style.display = 'none';
                }
            });

            // 1. JMB slides in from the far left, Meetha from the far right
            introTl.from("#intro-jmb", { x: -200, opacity: 0, duration: 1.2, ease: "power3.out" })
                   .from("#intro-meetha", { x: 200, opacity: 0, duration: 1.2, ease: "power3.out" }, "<")
                   
            // 2. The 'X' punches in from the Z-axis
                   .from("#intro-x", { scale: 5, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, "-=0.6")
                   
            // 3. A subtle floating pulse for the whole group
                   .to(".intro-collab-wrapper", { scale: 1.05, duration: 0.8, ease: "power1.inOut", yoyo: true, repeat: 1 })
                   
            // 4. Fade out the overlay to reveal the site
                   .to("#intro-overlay", { opacity: 0, duration: 1, ease: "power2.inOut" });
           
            // --- BOTTOM NAV & SIDE DRAWER COMBINED LOGIC ---
            const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
            const drawerOverlay = document.getElementById('drawer-overlay');
            const sideDrawer = document.getElementById('side-drawer');
            const openMenuBtn = document.getElementById('open-menu-btn');
            const closeDrawerBtn = document.getElementById('close-drawer-btn');

            // 1. Handle Active States for Bottom Nav
            bottomNavItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    // Prevent default link jump IF it's the menu button
                    if (this.id === 'open-menu-btn') {
                        e.preventDefault();
                    } else {
                        // Only change active highlight for actual page links
                        bottomNavItems.forEach(nav => nav.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });

            // 2. Handle Side Drawer Open/Close
            function toggleDrawer() {
                sideDrawer.classList.toggle('active');
                drawerOverlay.classList.toggle('active');
            }

            // Ensure the button exists before attaching the listener to prevent JS errors
            if (openMenuBtn && closeDrawerBtn && drawerOverlay) {
                openMenuBtn.addEventListener('click', toggleDrawer);
                closeDrawerBtn.addEventListener('click', toggleDrawer);
                drawerOverlay.addEventListener('click', toggleDrawer);
            } else {
                console.error("Drawer elements are missing from the HTML.");
            }
           
                   // --- HERO ANIMATIONS ---
            const heroTimeline = gsap.timeline();
            heroTimeline.from(".hero-content > *", { y: 40, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" })
                        .from(".hero-image", { scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.8");

            // --- STACKED REVIEWS CAROUSEL ---
            const reviewsData = [
                { name: "Ananya S.", event: "Wedding Client", text: "The presentation was breathtaking. The rose-scented gulab jamuns were the highlight of our reception dessert table!", stars: 5 },
                { name: "Rajesh K.", event: "Corporate Partner", text: "Meetha Affairs elevated our Diwali corporate gifting. Elegant packaging and pure, authentic taste. Highly recommended.", stars: 5 },
                { name: "Simran M.", event: "Baby Shower", text: "We wanted a light pastel theme for our sweets and they delivered perfectly. The cherry blossom aesthetic on the boxes was stunning.", stars: 5 },
                { name: "Vikram P.", event: "Anniversary Celebration", text: "Incredible attention to detail. The Kaju Katlis with silver leaf tasted as luxurious as they looked.", stars: 4 }
            ];

            const container = document.getElementById('review-container');
            const indicatorsContainer = document.getElementById('rev-indicators');
            let currentIndex = 0;
            let autoPlayInterval;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            reviewsData.forEach((review, index) => {
                const card = document.createElement('div');
                card.className = "review-card";
                
                let starsHTML = Array(review.stars).fill('<i class="fa-solid fa-star"></i>').join('');
                
                card.innerHTML = `
                    <div class="stars">${starsHTML}</div>
                    <p class="review-text font-serif">"${review.text}"</p>
                    <div>
                        <h4 class="reviewer-name">${review.name}</h4>
                        <span class="reviewer-event">${review.event}</span>
                    </div>
                `;
                container.appendChild(card);

                const dot = document.createElement('button');
                dot.className = "dot";
                dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
                dot.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(dot);
            });

            const cards = document.querySelectorAll('.review-card');
            const dots = indicatorsContainer.querySelectorAll('.dot');

            function updateCarousel() {
                cards.forEach((card, i) => {
                    let offset = i - currentIndex;
                    if (offset < 0) offset += cards.length;

                    let scale = 1, y = 0, opacity = 1, blur = 0, zIndex = 10, visibility = "visible";

                    if (offset === 0) { scale = 1; y = 0; opacity = 1; blur = 0; zIndex = 30; } 
                    else if (offset === 1) { scale = 0.9; y = 30; opacity = 0.7; blur = 2; zIndex = 20; } 
                    else if (offset === 2) { scale = 0.8; y = 60; opacity = 0.4; blur = 4; zIndex = 10; } 
                    else { scale = 1.1; y = -40; opacity = 0; blur = 0; zIndex = 0; visibility = "hidden"; }

                    gsap.to(card, {
                        scale: scale, y: y, opacity: opacity, zIndex: zIndex,
                        filter: `blur(${blur}px)`,
                        autoAlpha: visibility === "hidden" ? 0 : opacity, 
                        duration: prefersReducedMotion ? 0 : 0.8,
                        ease: prefersReducedMotion ? "none" : "back.out(1.4)",
                        overwrite: true
                    });
                });

                // Update Indicators using Standard CSS class
                dots.forEach((dot, i) => {
                    if (i === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }

            function nextSlide() { currentIndex = (currentIndex + 1) % cards.length; updateCarousel(); }
            function prevSlide() { currentIndex = (currentIndex - 1 + cards.length) % cards.length; updateCarousel(); }
            function goToSlide(index) { currentIndex = index; updateCarousel(); resetAutoPlay(); }

            document.getElementById('rev-next').addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
            document.getElementById('rev-prev').addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

            container.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
                if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
            });

            function startAutoPlay() { if (!prefersReducedMotion) autoPlayInterval = setInterval(nextSlide, 4500); }
            function stopAutoPlay() { clearInterval(autoPlayInterval); }
            function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

            container.addEventListener('mouseenter', stopAutoPlay);
            container.addEventListener('mouseleave', startAutoPlay);
            container.addEventListener('focusin', stopAutoPlay);
            container.addEventListener('focusout', startAutoPlay);

            updateCarousel();
            startAutoPlay();

            // --- TAILORED OCCASIONS TAB LOGIC ---
            const tabBtns = document.querySelectorAll('.tab-btn');
            const tabPanes = document.querySelectorAll('.tab-pane');

            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons and panes
                    tabBtns.forEach(b => b.classList.remove('active'));
                    tabPanes.forEach(p => p.classList.remove('active'));

                    // Add active class to clicked button
                    btn.classList.add('active');

                    // Find matching pane and activate it
                    const targetId = 'tab-' + btn.getAttribute('data-tab');
                    document.getElementById(targetId).classList.add('active');
                });
            });
// --- 🌟 FIXED 2: HORIZONTAL CAROUSEL ARROWS LOGIC (Was Missing) 🌟 ---
    const carouselWrappers = document.querySelectorAll('.carousel-wrapper');
    carouselWrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.horizontal-carousel');
        const leftBtn = wrapper.querySelector('.left-arrow');
        const rightBtn = wrapper.querySelector('.right-arrow');
        
        const scrollAmount = 300; // How far it scrolls per click

        if(leftBtn && rightBtn && track) {
            leftBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            
            rightBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
    });

        });
