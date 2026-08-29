 document.addEventListener("DOMContentLoaded", () => {
            // --- FILTERING LOGIC ---
            const filterBtns = document.querySelectorAll('.filter-btn');
            const menuCards = document.querySelectorAll('.card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const filterValue = btn.getAttribute('data-filter');
                    
                    menuCards.forEach(card => {
                        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    });
                });
            });

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

            bottomNavItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    if (this.id === 'open-menu-btn') {
                        e.preventDefault();
                    } else {
                        bottomNavItems.forEach(nav => nav.classList.remove('active'));
                        this.classList.add('active');
                    }
                });
            });

            function toggleDrawer() {
                if (sideDrawer && drawerOverlay) {
                    sideDrawer.classList.toggle('active');
                    drawerOverlay.classList.toggle('active');
                }
            }

            if (openMenuBtn && closeDrawerBtn && drawerOverlay) {
                openMenuBtn.addEventListener('click', toggleDrawer);
                closeDrawerBtn.addEventListener('click', toggleDrawer);
                drawerOverlay.addEventListener('click', toggleDrawer);
            }
        });