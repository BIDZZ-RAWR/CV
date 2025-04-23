document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.classList.add('fade-in');
        section.style.animationDelay = `${index * 0.2}s`;
    });

    // Add slide-in animation to list items
    const listItems = document.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.classList.add('slide-in');
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Create menu button and overlay
    const menuBtn = document.createElement('div');
    menuBtn.classList.add('menu-btn');
    menuBtn.innerHTML = `
        <svg viewBox="0 0 100 80" width="20" height="20" fill="#ffffff">
            <rect width="100" height="15"></rect>
            <rect y="30" width="100" height="15"></rect>
            <rect y="60" width="100" height="15"></rect>
        </svg>
    `;
    document.body.appendChild(menuBtn);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    // Create and setup mobile navigation
    const setupMobileNav = () => {
        const existingNav = document.querySelector('.mobile-nav');
        if (existingNav) {
            existingNav.remove();
        }

        if (window.innerWidth <= 768) {
            const nav = document.createElement('nav');
            nav.classList.add('mobile-nav');
            
            const sections = document.querySelectorAll('.section h2');
            sections.forEach(section => {
                const button = document.createElement('button');
                button.textContent = section.textContent;
                button.addEventListener('click', () => {
                    section.scrollIntoView({ behavior: 'smooth' });
                    closeMenu();
                });
                nav.appendChild(button);
            });

            document.body.appendChild(nav);

            // Menu toggle functionality
            menuBtn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', closeMenu);
        }
    };

    function toggleMenu() {
        const nav = document.querySelector('.mobile-nav');
        const isOpen = nav.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        const nav = document.querySelector('.mobile-nav');
        nav.classList.add('active');
        overlay.classList.add('active');
        menuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        const nav = document.querySelector('.mobile-nav');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        menuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            setupMobileNav();
        }, 250);
    });

    // Initial setup
    setupMobileNav();

    // Smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add ripple effect to sections
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Dynamic content loading simulation
    const header = document.querySelector('.header');
    header.style.opacity = '0';
    
    setTimeout(() => {
        header.style.transition = 'opacity 1s ease-in';
        header.style.opacity = '1';
    }, 100);

    // Interactive hover effects for container
    const container = document.querySelector('.container');
    container.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = container.getBoundingClientRect();
        
        const x = (clientX - left) / width;
        const y = (clientY - top) / height;
        
        const gradient = `
            linear-gradient(
                135deg,
                rgba(0, 0, 0, ${0.95 + y * 0.05}),
                rgba(26, 26, 26, ${0.95 + x * 0.05})
            )
        `;
        
        container.style.background = gradient;
    });

    // Reset container background on mouse leave
    container.addEventListener('mouseleave', () => {
        container.style.background = '#000000';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.mobile-nav.active')) {
            closeMenu();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const nav = document.querySelector('.mobile-nav');
        
        if (nav) {
            if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right
                openMenu();
            } else if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left
                closeMenu();
            }
        }
    }

    // Prevent zoom on double tap (mobile)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});