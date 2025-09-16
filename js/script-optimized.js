// ========================================
// OPTIMIZED SCRIPT - ACCIDENTES Y DEFENSA
// ========================================

// Configuration
const CONFIG = {
    phone: '+542615605482',
    whatsapp: 'https://wa.me/542615605482',
    googleAnalyticsId: 'G-XXXXXXXXXX'
};

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initGoogleAnalytics();
    initWhatsAppTracking();
    initServicesCarousel();
});

// ========================================
// SMOOTH SCROLLING
// ========================================
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.service-card, .feature, .hero-card');
    animateElements.forEach(el => observer.observe(el));
}

// ========================================
// GOOGLE ANALYTICS & CONVERSION TRACKING
// ========================================
function initGoogleAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
}

// Track WhatsApp clicks
function trackWhatsAppClick(source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            event_category: 'engagement',
            event_label: source,
            value: 1
        });
    }
}

// Track phone calls
function trackPhoneCall(source) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_call', {
            event_category: 'engagement',
            event_label: source,
            value: 1
        });
    }
}

// ========================================
// WHATSAPP TRACKING
// ========================================
function initWhatsAppTracking() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const source = this.closest('section')?.className || 'unknown';
            trackWhatsAppClick(source);
        });
    });
    
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    
    phoneButtons.forEach(button => {
        button.addEventListener('click', function() {
            const source = this.closest('section')?.className || 'unknown';
            trackPhoneCall(source);
        });
    });
}

// ========================================
// SERVICES CAROUSEL
// ========================================
function initServicesCarousel() {
    console.log('Initializing carousel, window width:', window.innerWidth);
    
    if (window.innerWidth > 767) {
        console.log('Desktop view - carousel not needed');
        return;
    }
    
    console.log('Mobile view - initializing carousel');
    
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    console.log('Carousel elements found:', {
        carouselTrack: !!carouselTrack,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        dotsContainer: !!dotsContainer
    });
    
    if (!carouselTrack || !prevBtn || !nextBtn || !dotsContainer) {
        console.log('Carousel elements not found');
        return;
    }
    
    const items = carouselTrack.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    let currentIndex = 0;
    
    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        console.log('Updating carousel, index:', currentIndex, 'translateX:', translateX);
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalItems - 1;
    }
    
    function goToSlide(index) {
        currentIndex = Math.max(0, Math.min(index, totalItems - 1));
        updateCarousel();
    }
    
    function nextSlide() {
        console.log('Next slide clicked, current index:', currentIndex, 'total items:', totalItems);
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    function prevSlide() {
        console.log('Prev slide clicked, current index:', currentIndex);
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Touch/swipe support
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    }, { passive: true });
    
    carouselTrack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const diffX = startX - currentX;
        const diffY = startY - currentY;
        
        if (Math.abs(diffX) > Math.abs(diffY)) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carouselTrack.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        
        isDragging = false;
    }, { passive: true });
    
    // Initialize
    updateCarousel();
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedResize = debounce(function() {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});
