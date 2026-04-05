// Main JS file
console.log('Misoro Landing Page Loaded');

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card, .reveal-on-scroll').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
    observer.observe(el);
});

// Add class for visible state
const style = document.createElement('style');
style.innerHTML = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Hero message animation removed per user request

// Global Carousel function for Before/After photos
window.moveCarousel = function(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel || carousel.dataset.isAnimating === 'true') return;
    
    const track = carousel.querySelector('.carousel-track');
    const items = track.querySelectorAll('.ba-item'); // includes clones
    if (items.length <= 1) return;
    
    let currentIndex = parseInt(carousel.getAttribute('data-index') || '1');
    currentIndex += direction;
    
    // Prevent multiple rapid clicks while animating
    carousel.dataset.isAnimating = 'true';
    
    // Animate to the new index
    track.style.transition = 'transform 0.4s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    carousel.setAttribute('data-index', currentIndex);

    // After animation completes, snap instantly if we hit a clone
    setTimeout(() => {
        if (currentIndex === 0) {
            track.style.transition = 'none';
            currentIndex = items.length - 2; 
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            carousel.setAttribute('data-index', currentIndex);
        } else if (currentIndex === items.length - 1) {
            track.style.transition = 'none';
            currentIndex = 1;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            carousel.setAttribute('data-index', currentIndex);
        }
        carousel.dataset.isAnimating = 'false';
    }, 400); // Wait exactly 400ms matching CSS transition duration
};

// Initialize Seamless Carousels & Auto-Play
document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Clones for Seamless Infinite Loop
    document.querySelectorAll('.ba-carousel').forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const items = Array.from(track.querySelectorAll('.ba-item'));
        if (items.length <= 1) return;

        // Clone first and last items
        const firstClone = items[0].cloneNode(true);
        const lastClone = items[items.length - 1].cloneNode(true);
        
        firstClone.classList.add('clone-item');
        lastClone.classList.add('clone-item');

        track.appendChild(firstClone);
        track.insertBefore(lastClone, items[0]);

        track.style.transition = 'none';
        track.style.transform = `translateX(-100%)`;
        carousel.setAttribute('data-index', '1');
    });

    // 2. Start Auto-Play Timers
    setInterval(() => {
        window.moveCarousel('carousel-1', 1);
    }, 4000);

    setTimeout(() => {
        setInterval(() => {
            window.moveCarousel('carousel-2', 1);
        }, 4000);
    }, 1000);

    // Show first page of Director's Column by default
    if (document.querySelector('.col-item')) {
        showColPage(1);
    }
});

// Pagination for Director's Column
window.showColPage = function(pageNum) {
    const items = document.querySelectorAll('.col-item');
    const buttons = document.querySelectorAll('#col-pagination .page-num');
    
    // Show/hide items
    items.forEach(item => {
        if (parseInt(item.dataset.page) === pageNum) {
            item.style.display = 'list-item';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Update active button
    buttons.forEach(btn => {
        if (parseInt(btn.innerText) === pageNum) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Store current page for relative navigation
    document.getElementById('col-pagination').dataset.currentPage = pageNum;
};

// Next/Prev navigation for Director's Column
window.moveColPage = function(direction) {
    const pagination = document.getElementById('col-pagination');
    let currentPage = parseInt(pagination.dataset.currentPage || '1');
    let targetPage = currentPage + direction;
    
    const maxPage = 10; // As requested
    if (targetPage < 1) targetPage = 1;
    if (targetPage > maxPage) targetPage = maxPage;
    
    showColPage(targetPage);
};

// Profile Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const profileModal = document.getElementById('profile-modal');
    const openProfileBtn = document.getElementById('open-profile-modal');
    const closeProfileBtn = document.getElementById('close-profile-modal');

    if (openProfileBtn && profileModal && closeProfileBtn) {
        openProfileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            profileModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });

        closeProfileBtn.addEventListener('click', () => {
            profileModal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        });

        // Close on overlay click
        profileModal.addEventListener('click', (e) => {
            if (e.target === profileModal) {
                profileModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});



