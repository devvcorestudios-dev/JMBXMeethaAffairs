document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. FILTERING LOGIC ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update Active Button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter Cards
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
    }

    // --- 2. PAGE LOAD INTRO ANIMATION (COLLABORATION) ---
    const introOverlay = document.getElementById('intro-overlay');
    const collabWrapper = document.querySelector('.intro-collab-wrapper');

    if (introOverlay && typeof gsap !== 'undefined') {
        // Tells GSAP to unhide the wrapper right as it takes control
        if (collabWrapper) gsap.set(collabWrapper, { visibility: "visible" });
        
        const introTl = gsap.timeline({
            onComplete: () => {
                introOverlay.style.display = 'none';
            }
        });

        // The Cinematic Animation with the 1-second hold
        introTl.from("#intro-jmb", { x: -200, opacity: 0, duration: 1.5, ease: "power3.out" })
               .from("#intro-meetha", { x: 200, opacity: 0, duration: 1.5, ease: "power3.out" }, "<")
               .from("#intro-x", { scale: 5, opacity: 0, duration: 1.2, ease: "back.out(1.5)" }, "-=1")
               .to(".intro-collab-wrapper", { scale: 1.05, duration: 1.2, ease: "power1.inOut", yoyo: true, repeat: 1 })
               .to(introOverlay, { opacity: 0, duration: 1.5, ease: "power2.inOut", delay: 1 });
               
    } else if (introOverlay) {
        // Fallback: If GSAP fails to load, instantly hide the black screen
        introOverlay.style.display = 'none';
    }
           
    // --- 3. BOTTOM NAV & SIDE DRAWER COMBINED LOGIC ---
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const sideDrawer = document.getElementById('side-drawer');
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeDrawerBtn = document.getElementById('close-drawer-btn');

    // Handle Active States for Bottom Nav
    if (bottomNavItems.length > 0) {
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
    }

    // Handle Side Drawer Open/Close
    function toggleDrawer() {
        if (sideDrawer && drawerOverlay) {
            sideDrawer.classList.toggle('active');
            drawerOverlay.classList.toggle('active');
        }
    }

    if (openMenuBtn && closeDrawerBtn && drawerOverlay) {
        openMenuBtn.addEventListener('click', (e) => { 
            e.preventDefault(); 
            toggleDrawer(); 
        });
        closeDrawerBtn.addEventListener('click', toggleDrawer);
        drawerOverlay.addEventListener('click', toggleDrawer);
    }

  // 1. Grab ALL the buttons using their class, not an ID
    const addToBoxBtns = document.querySelectorAll('.card-action'); 
    
    const popupOverlay = document.getElementById('popupOverlay');
    const closeBtn = document.getElementById('closeBtn');

    // 2. Loop through every button and attach your opening logic
    addToBoxBtns.forEach(btn => {
        btn.addEventListener('click', (e) => { 
            e.preventDefault(); // Stops the page from jumping if the button is an <a> tag
            popupOverlay.classList.add('active');
        });
    });

    // Your closing logic was already perfect!
    closeBtn.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay){
            popupOverlay.classList.remove('active');
        }
    });

});