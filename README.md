# 🌐 Landing Page - Accidentes y Defensa

> Landing page moderna y optimizada para abogados especialistas en accidentes y reclamos a aseguradoras en Mendoza, Argentina.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Security](https://img.shields.io/badge/Security-🔒-green?style=for-the-badge)](SECURITY.md)

## 🚀 Características Principales

- ✅ **Diseño Moderno**: Interfaz limpia y profesional optimizada para conversiones
- ✅ **100% Responsive**: Adaptable a todos los dispositivos (móvil, tablet, desktop)
- ✅ **Ultra Rápida**: Optimizada para velocidad de carga y Core Web Vitals
- ✅ **SEO Optimizada**: Meta tags, estructura semántica y sitemap incluidos
- ✅ **PWA Ready**: Funciona como aplicación web progresiva
- ✅ **Analytics**: Integración con Google Analytics y Google Ads
- ✅ **WhatsApp Integration**: Botones de contacto directo a WhatsApp
- ✅ **Seguridad**: Sistema de seguridad multicapa implementado

## 📱 Demo en Vivo

> **Nota**: Para ver la web en funcionamiento, descarga los archivos y abre `index.html` en tu navegador.

## 🎯 Secciones Incluidas

1. **Header**: Navegación con botón de llamada prominente
2. **Hero**: Título principal con estadísticas de credibilidad
3. **Servicios**: Grid de servicios especializados (carrusel en móviles)
4. **CTA**: Sección de llamada a la acción principal
5. **Garantía**: Credibilidad y confianza con 20+ años de experiencia
6. **Contacto**: Métodos de contacto y botones de WhatsApp
7. **Footer**: Información adicional

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Variables CSS, Grid, Flexbox, animaciones
- **JavaScript ES6+**: Funcionalidades interactivas y carrusel
- **Google Fonts**: Tipografía Inter
- **PWA**: Service Worker y manifest
- **Security**: Headers HTTP, validación, rate limiting

## 📁 Estructura del Proyecto

```
├── index.html              # Página principal
├── css/
│   ├── styles.css          # Estilos CSS modernos
│   └── mobile-optimizations.css  # Optimizaciones móviles
├── js/
│   ├── script.js           # JavaScript principal
│   └── security.js         # Módulo de seguridad
├── manifest.json           # Configuración PWA
├── sw.js                   # Service Worker
├── robots.txt              # Configuración para motores de búsqueda
├── sitemap.xml             # Mapa del sitio
├── .htaccess               # Configuración de seguridad Apache
├── security-config.json    # Configuración de seguridad
├── SECURITY.md             # Documentación de seguridad
└── README.md               # Este archivo
```

## 🚀 Instalación y Uso

### Opción 1: Visualización Local
```bash
# 1. Clona o descarga el repositorio
git clone [URL_DEL_REPOSITORIO]

# 2. Abre index.html en tu navegador
open index.html
```

### Opción 2: Servidor Local
```bash
# Con Python 3
python -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

## ⚙️ Configuración

### Google Analytics
```html
<!-- Reemplaza GA_MEASUREMENT_ID en index.html línea 35 -->
<script>
    gtag('config', 'TU_GA_MEASUREMENT_ID');
</script>
```

### WhatsApp
- **Número configurado**: +54 2615 60-5482
- **Mensajes predefinidos** para cada tipo de caso
- **Botón flotante** siempre visible

### Contacto
- **Email**: contacto@accidentesydefensa.com
- **Teléfono**: +54 2615 60-5482
- **Dirección**: La Pampa 70, Ciudad de Mendoza

## 📊 Métricas de Performance

- **LCP**: < 2.5 segundos
- **FID**: < 100ms
- **CLS**: < 0.1
- **Velocidad**: 3-5x más rápida que WordPress
- **Mobile Score**: 95+ en PageSpeed Insights

## 🔒 Seguridad

Este proyecto incluye un sistema de seguridad robusto:

- ✅ **Headers de Seguridad HTTP**
- ✅ **Protección XSS**
- ✅ **Rate Limiting**
- ✅ **Validación de Inputs**
- ✅ **Monitoreo de Seguridad**

Ver [SECURITY.md](SECURITY.md) para detalles completos.

## 🎨 Personalización

### Colores
```css
:root {
    --primary-color: #1e40af;    /* Azul corporativo */
    --whatsapp-color: #25d366;   /* Verde WhatsApp */
    --accent-color: #f59e0b;     /* Naranja de acento */
}
```

### Fuentes
- **Familia**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700

## 📱 Responsive Design

- **Mobile First**: Optimizado para móviles
- **Breakpoints**: 320px, 768px, 1024px, 1200px
- **Carrusel**: Servicios en carrusel para móviles
- **Touch Optimized**: Botones y áreas táctiles optimizadas

## 🚀 Despliegue

### Netlify (Recomendado)
1. Conecta tu repositorio de GitHub
2. Deploy automático
3. URL pública inmediata

### Vercel
1. Importa el repositorio
2. Deploy con un clic
3. URL personalizable

### Servidor Tradicional
1. Sube archivos vía FTP/SFTP
2. Configura dominio
3. Instala certificado SSL

## 📈 Conversión

### Optimizaciones Implementadas
- **CTAs múltiples** estratégicamente ubicados
- **Trust signals** (20+ años, 2000+ casos)
- **Urgencia visual** con animaciones
- **Flujo directo** a WhatsApp

### Métricas Esperadas
- **+25% CTR** en botones WhatsApp
- **+15% tiempo** en página
- **+30% conversiones** por trust signals

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- **Email**: [tu-email@ejemplo.com]
- **WhatsApp**: [tu-numero]
- **Respuesta**: 24 horas

---

**Desarrollado con ❤️ para Accidentes y Defensa - Abogados en Mendoza**

*Optimizado para generar más clientes y conversiones.*
