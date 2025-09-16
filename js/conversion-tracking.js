// ========================================
// GOOGLE ADS CONVERSION TRACKING
// ========================================

// Configuration - Replace with your actual IDs
const CONVERSION_CONFIG = {
    // Google Analytics 4 ID
    ga4Id: 'G-XXXXXXXXXX',
    
    // Google Ads Conversion IDs
    googleAdsId: 'AW-XXXXXXXXXX',
    
    // Conversion Labels
    conversions: {
        whatsapp: 'XXXXXXXXXX', // WhatsApp conversion label
        phone: 'XXXXXXXXXX',    // Phone call conversion label
        form: 'XXXXXXXXXX'      // Form submission conversion label
    }
};

// ========================================
// CONVERSION TRACKING FUNCTIONS
// ========================================

// Track WhatsApp conversion
function trackWhatsAppConversion(source = 'unknown') {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            send_to: `${CONVERSION_CONFIG.googleAdsId}/${CONVERSION_CONFIG.conversions.whatsapp}`,
            value: 1.0,
            currency: 'ARS',
            transaction_id: generateTransactionId()
        });
        
        // GA4 Event
        gtag('event', 'whatsapp_conversion', {
            event_category: 'conversion',
            event_label: source,
            value: 1
        });
    }
    
    console.log(`WhatsApp conversion tracked from: ${source}`);
}

// Track phone call conversion - REMOVED (client requested to remove phone calls)
// function trackPhoneConversion(source = 'unknown') {
//     if (typeof gtag !== 'undefined') {
//         gtag('event', 'conversion', {
//             send_to: `${CONVERSION_CONFIG.googleAdsId}/${CONVERSION_CONFIG.conversions.phone}`,
//             value: 1.0,
//             currency: 'ARS',
//             transaction_id: generateTransactionId()
//         });
//         
//         // GA4 Event
//         gtag('event', 'phone_conversion', {
//             event_category: 'conversion',
//             event_label: source,
//             value: 1
//         });
//     }
//     
//     console.log(`Phone conversion tracked from: ${source}`);
// }

// Track form submission conversion
function trackFormConversion(source = 'unknown') {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            send_to: `${CONVERSION_CONFIG.googleAdsId}/${CONVERSION_CONFIG.conversions.form}`,
            value: 1.0,
            currency: 'ARS',
            transaction_id: generateTransactionId()
        });
        
        // GA4 Event
        gtag('event', 'form_conversion', {
            event_category: 'conversion',
            event_label: source,
            value: 1
        });
    }
    
    console.log(`Form conversion tracked from: ${source}`);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Generate unique transaction ID
function generateTransactionId() {
    return 'conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Enhanced click tracking with conversion
function trackClickWithConversion(element, conversionType, source) {
    // Track the click
    if (typeof gtag !== 'undefined') {
        gtag('event', 'click', {
            event_category: 'engagement',
            event_label: `${conversionType}_${source}`,
            value: 1
        });
    }
    
    // Track conversion after a short delay (to ensure page load)
    setTimeout(() => {
        switch(conversionType) {
            case 'whatsapp':
                trackWhatsAppConversion(source);
                break;
            // case 'phone': // REMOVED - client requested to remove phone calls
            //     trackPhoneConversion(source);
            //     break;
            case 'form':
                trackFormConversion(source);
                break;
        }
    }, 1000);
}

// ========================================
// AUTO-INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    // Track WhatsApp button clicks
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function() {
            const source = getSourceFromElement(this);
            trackClickWithConversion(this, 'whatsapp', source);
        });
    });
    
    // Track phone button clicks - REMOVED (client requested to remove phone calls)
    // const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    // phoneButtons.forEach(button => {
    //     button.addEventListener('click', function() {
    //         const source = getSourceFromElement(this);
    //         trackClickWithConversion(this, 'phone', source);
    //     });
    // });
});

// Get source section from element
function getSourceFromElement(element) {
    const section = element.closest('section');
    if (section) {
        return section.className.replace('section', '').trim() || 'unknown';
    }
    return 'unknown';
}

// ========================================
// MANUAL TRACKING FUNCTIONS
// ========================================

// Call these functions manually when needed
window.trackWhatsAppConversion = trackWhatsAppConversion;
window.trackPhoneConversion = trackPhoneConversion;
window.trackFormConversion = trackFormConversion;
