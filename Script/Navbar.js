// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector(".nav-container");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    let lastScrollTop = 0;
    let isMenuOpen = false;

    if (!navbar || !mobileMenuBtn || !navLinks) return;

    // Toggle mobile menu
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            navLinks.classList.toggle('active');
            
            // Update menu icon
            const menuIcon = mobileMenuBtn.querySelector('i');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide', isMenuOpen ? 'x' : 'menu');
                lucide.createIcons(); // Refresh icons
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                isMenuOpen = false;
                navLinks.classList.remove('active');
                const menuIcon = mobileMenuBtn.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            }
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    isMenuOpen = false;
                    navLinks.classList.remove('active');
                    const menuIcon = mobileMenuBtn.querySelector('i');
                    if (menuIcon) {
                        menuIcon.setAttribute('data-lucide', 'menu');
                        lucide.createIcons();
                    }
                }
            });
        });
    }

    // Hide/show navbar on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100 && !isMenuOpen) {
            // Scrolling down & not at the top & menu is closed
            navbar.classList.add('hidden');
        } else {
            // Scrolling up or at the top or menu is open
            navbar.classList.remove('hidden');
        }
        
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Initialize intersection observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe all sections except hero for fade-in effect
    document.querySelectorAll("section:not(.hero)").forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(20px)";
        section.style.transition = "all 0.6s ease-out";
        fadeInObserver.observe(section);
    });
});

// Ensure the page scrolls to the top on refresh
window.onload = function () {
    // Use setTimeout to ensure this happens after any other onload events
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 0);
    
    // If the URL contains a hash, clear it to prevent automatic scrolling to sections
    if (window.location.hash) {
        // Remove the hash but don't refresh the page
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}