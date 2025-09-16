// Security Module - Protección contra ataques comunes
(function() {
    'use strict';
    
    // Prevenir ataques de clickjacking
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // Detectar y prevenir ataques XSS
    function sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        return input
            .replace(/[<>]/g, '') // Remover < y >
            .replace(/javascript:/gi, '') // Remover javascript:
            .replace(/on\w+\s*=/gi, '') // Remover event handlers
            .trim();
    }
    
    // Validar URLs antes de redireccionar
    function isValidURL(url) {
        try {
            const urlObj = new URL(url);
            const allowedDomains = [
                'wa.me',
                'whatsapp.com',
                'accidentesydefensa.com',
                'google.com',
                'googletagmanager.com'
            ];
            return allowedDomains.some(domain => urlObj.hostname.includes(domain));
        } catch (e) {
            return false;
        }
    }
    
    // Interceptar todos los enlaces para validación
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            if (!isValidURL(e.target.href)) {
                e.preventDefault();
                console.warn('URL bloqueada por seguridad:', e.target.href);
                return false;
            }
        }
    });
    
    // Detectar intentos de inyección de código
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        const message = args.join(' ');
        if (message.includes('<script') || message.includes('javascript:')) {
            console.warn('Intento de inyección de código detectado y bloqueado');
            return;
        }
        originalConsoleLog.apply(console, args);
    };
    
    // Proteger contra ataques de timing
    let lastClickTime = 0;
    document.addEventListener('click', function(e) {
        const currentTime = Date.now();
        if (currentTime - lastClickTime < 100) {
            e.preventDefault();
            return false;
        }
        lastClickTime = currentTime;
    });
    
    // Detectar herramientas de desarrollo (opcional)
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.warn('Herramientas de desarrollo detectadas');
            }
        } else {
            devtools.open = false;
        }
    }, 500);
    
    // Proteger datos sensibles
    const sensitiveData = {
        phone: '+54 2615 60-5482',
        email: 'contacto@accidentesydefensa.com'
    };
    
    // Obfuscar datos en el DOM
    function obfuscateData() {
        const phoneElements = document.querySelectorAll('[href*="tel:"]');
        phoneElements.forEach(el => {
            el.setAttribute('data-phone', 'obfuscated');
        });
    }
    
    // Inicializar protecciones
    obfuscateData();
    
    // Detectar intentos de manipulación del DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.tagName === 'SCRIPT' && !node.src) {
                            console.warn('Script inline detectado y removido');
                            node.remove();
                        }
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Rate limiting para formularios (si los hay)
    const formSubmissions = new Map();
    const MAX_SUBMISSIONS = 3;
    const TIME_WINDOW = 60000; // 1 minuto
    
    function checkRateLimit(formId) {
        const now = Date.now();
        const submissions = formSubmissions.get(formId) || [];
        const recentSubmissions = submissions.filter(time => now - time < TIME_WINDOW);
        
        if (recentSubmissions.length >= MAX_SUBMISSIONS) {
            console.warn('Rate limit excedido para formulario:', formId);
            return false;
        }
        
        recentSubmissions.push(now);
        formSubmissions.set(formId, recentSubmissions);
        return true;
    }
    
    // Exportar funciones de seguridad
    window.SecurityModule = {
        sanitizeInput,
        isValidURL,
        checkRateLimit,
        sensitiveData
    };
    
    console.log('🔒 Módulo de seguridad cargado correctamente');
})();
