// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    // initContactForm(); // Removed - not used
    initScrollAnimations();
    initGoogleAnalytics();
    initWhatsAppTracking();
    initMobileOptimizations();
    initTouchOptimizations();
    initServicesCarousel();
});

// Smooth scrolling for anchor links
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

// Contact form functionality removed - now using direct WhatsApp buttons

// Scroll animations
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
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .feature, .hero-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Google Analytics tracking
function initGoogleAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Track button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('btn-whatsapp') ? 'whatsapp' : 
                             this.classList.contains('btn-primary') ? 'primary' : 'outline';
            
            trackEvent('button_click', {
                button_text: buttonText,
                button_type: buttonType,
                page_section: getPageSection(this)
            });
        });
    });
    
    // Track phone clicks
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_click', {
                phone_number: this.getAttribute('href').replace('tel:', ''),
                page_section: getPageSection(this)
            });
        });
    });
    
    // Track WhatsApp clicks
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('whatsapp_click', {
                page_section: getPageSection(this)
            });
        });
    });
}

// WhatsApp tracking
function initWhatsAppTracking() {
    // Track WhatsApp floating button
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function() {
            trackConversion('whatsapp_float_click', {
                page_section: 'floating_button'
            });
        });
    }
}

// Track events
function trackEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
}

// Track conversions
function trackConversion(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL',
            event_category: 'engagement',
            event_label: eventName,
            value: 1,
            ...parameters
        });
    }
}

// Get page section for tracking
function getPageSection(element) {
    const section = element.closest('section');
    if (section) {
        return section.className.split(' ')[0] || 'unknown';
    }
    return 'unknown';
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc2626' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Utility functions
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
    // Handle resize events
}, 250);

window.addEventListener('resize', debouncedResize);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Mobile optimizations
function initMobileOptimizations() {
    // Prevent zoom on input focus (iOS)
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });
        
        input.addEventListener('blur', function() {
            if (window.innerWidth < 768) {
                const viewport = document.querySelector('meta[name="viewport"]');
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
            }
        });
    });
    
    // Optimize scroll performance on mobile
    let ticking = false;
    function updateScrollPosition() {
        // Add any scroll-based animations here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Prevent horizontal scroll on mobile
    document.body.style.overflowX = 'hidden';
}

// Touch optimizations
function initTouchOptimizations() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.btn, .contact-method, .whatsapp-float');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        }, { passive: true });
        
        button.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });
    
    // Improve form usability on mobile
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add proper input types for mobile keyboards
        if (input.type === 'tel') {
            input.setAttribute('inputmode', 'tel');
        } else if (input.type === 'email') {
            input.setAttribute('inputmode', 'email');
        }
        
        // Add proper autocomplete attributes
        if (input.name === 'name') {
            input.setAttribute('autocomplete', 'name');
        } else if (input.name === 'phone') {
            input.setAttribute('autocomplete', 'tel');
        } else if (input.name === 'email') {
            input.setAttribute('autocomplete', 'email');
        }
    });
    
    // Optimize WhatsApp button for mobile
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add haptic feedback if available
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
            
            // Track the click
            trackEvent('whatsapp_click', {
                button_location: this.classList.contains('whatsapp-float') ? 'floating' : 'inline',
                page_section: getPageSection(this)
            });
        });
    });
}

// Services Carousel
function initServicesCarousel() {
    // Only initialize carousel on mobile devices
    if (window.innerWidth > 767) {
        return; // Desktop view - no carousel needed
    }
    
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    
    if (!carouselTrack || !prevBtn || !nextBtn || !dotsContainer) {
        return; // Carousel not found
    }
    
    const items = carouselTrack.querySelectorAll('.carousel-item');
    const totalCards = items.length;
    let currentIndex = 0;
    let isReversing = false; // Track if we're going backwards
    
    // Create dots
    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    
    function updateCarousel() {
        const translateX = -currentIndex * 100;
        
        // Add smooth transition
        carouselTrack.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update buttons
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }
    
    function nextSlide() {
        if (isReversing) {
            // Going backwards: 4 -> 3 -> 2 -> 1
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                // Reached the beginning, start going forward again
                isReversing = false;
                currentIndex = 1;
            }
        } else {
            // Going forward: 1 -> 2 -> 3 -> 4
            if (currentIndex < totalCards - 1) {
                currentIndex++;
            } else {
                // Reached the end, start going backwards
                isReversing = true;
                currentIndex = totalCards - 2;
            }
        }
        updateCarousel();
    }
    
    function prevSlide() {
        // Manual navigation - go to previous slide
        if (currentIndex > 0) {
            currentIndex--;
            // If we're at the beginning, switch to forward mode
            if (currentIndex === 0) {
                isReversing = false;
            }
        } else {
            // Go to last slide
            currentIndex = totalCards - 1;
            isReversing = true;
        }
        updateCarousel();
    }
    
    function manualNextSlide() {
        // Manual navigation - restart auto-play timing
        nextSlide();
        lastAutoPlayTime = performance.now();
        startAutoPlay();
    }
    
    function manualPrevSlide() {
        // Manual navigation - restart auto-play timing
        prevSlide();
        lastAutoPlayTime = performance.now();
        startAutoPlay();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', manualNextSlide);
    prevBtn.addEventListener('click', manualPrevSlide);
    
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
        
        // Only handle horizontal swipes
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
                manualNextSlide();
            } else {
                manualPrevSlide();
            }
        }
        
        isDragging = false;
    }, { passive: true });
    
    // Keyboard navigation
    carouselTrack.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            manualPrevSlide();
        } else if (e.key === 'ArrowRight') {
            manualNextSlide();
        }
    });
    
    // Auto-play with precise timing
    let autoPlayTimeout;
    let autoPlayInterval;
    let lastAutoPlayTime = 0;
    const AUTO_PLAY_DELAY = 6000; // 6 seconds exactly
    
    function startAutoPlay() {
        // Clear any existing timers
        if (autoPlayTimeout) {
            clearTimeout(autoPlayTimeout);
        }
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
        
        // Calculate precise remaining time
        const now = performance.now();
        const timeSinceLastAutoPlay = now - lastAutoPlayTime;
        const remainingTime = Math.max(0, AUTO_PLAY_DELAY - timeSinceLastAutoPlay);
        
        // Use setTimeout for precise timing
        autoPlayTimeout = setTimeout(() => {
            nextSlide();
            lastAutoPlayTime = performance.now();
            
            // Continue with precise intervals using setTimeout
            scheduleNextSlide();
        }, remainingTime);
    }
    
    function scheduleNextSlide() {
        autoPlayTimeout = setTimeout(() => {
            // Verify timing precision
            const now = performance.now();
            const actualDelay = now - lastAutoPlayTime;
            
            // If there's a significant delay, adjust next timing
            if (Math.abs(actualDelay - AUTO_PLAY_DELAY) > 100) {
                console.log(`Timing adjustment: expected ${AUTO_PLAY_DELAY}ms, got ${actualDelay}ms`);
            }
            
            nextSlide();
            lastAutoPlayTime = now;
            scheduleNextSlide();
        }, AUTO_PLAY_DELAY);
    }
    
    function stopAutoPlay() {
        if (autoPlayTimeout) {
            clearTimeout(autoPlayTimeout);
        }
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    lastAutoPlayTime = performance.now();
    startAutoPlay();
    
    // Pause on hover/touch
    const carouselContainer = carouselTrack.closest('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
        carouselContainer.addEventListener('touchstart', stopAutoPlay);
        carouselContainer.addEventListener('touchend', () => {
            setTimeout(startAutoPlay, 3000);
        });
    }
    
    // Initialize
    updateCarousel();
    
    // Re-initialize on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 767) {
            // Desktop view - stop auto-play
            stopAutoPlay();
            return;
        }
        // Mobile view - restart auto-play
        startAutoPlay();
    });
}

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
