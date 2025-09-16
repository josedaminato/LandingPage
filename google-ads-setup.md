# 🎯 CONFIGURACIÓN DE GOOGLE ADS - TRACKING DE CONVERSIONES

## 📋 **PASOS PARA CONFIGURAR EL TRACKING**

### **1. Google Analytics 4 (GA4)**
1. Ve a [Google Analytics](https://analytics.google.com)
2. Crea una nueva propiedad para tu sitio web
3. Copia el **Measurement ID** (formato: G-XXXXXXXXXX)
4. Reemplaza `G-XXXXXXXXXX` en `index.html` línea 47

### **2. Google Ads Conversion Tracking**
1. Ve a [Google Ads](https://ads.google.com)
2. Ve a **Herramientas y configuración** > **Conversiones**
3. Crea 3 conversiones:

#### **Conversión 1: WhatsApp**
- **Nombre**: WhatsApp Contact
- **Categoría**: Contacto
- **Valor**: 1 ARS
- **Copia el ID de conversión** (formato: AW-XXXXXXXXXX)

#### **Conversión 2: Llamadas**
- **Nombre**: Phone Call
- **Categoría**: Contacto  
- **Valor**: 1 ARS
- **Copia el ID de conversión**

#### **Conversión 3: Formularios**
- **Nombre**: Form Submission
- **Categoría**: Contacto
- **Valor**: 1 ARS
- **Copia el ID de conversión**

### **3. Configurar el Código**
Edita `js/conversion-tracking.js` y reemplaza:

```javascript
const CONVERSION_CONFIG = {
    ga4Id: 'G-TU_ID_AQUI',           // Tu GA4 ID
    googleAdsId: 'AW-TU_ID_AQUI',    // Tu Google Ads ID
    conversions: {
        whatsapp: 'TU_LABEL_WHATSAPP',  // Label de conversión WhatsApp
        phone: 'TU_LABEL_PHONE',        // Label de conversión Teléfono
        form: 'TU_LABEL_FORM'           // Label de conversión Formulario
    }
};
```

## 🎯 **EVENTOS QUE SE TRACKAN AUTOMÁTICAMENTE**

### **Conversiones Automáticas:**
- ✅ Clics en botones de WhatsApp
- ✅ Clics en botones de teléfono
- ✅ Envío de formularios (si los agregas)

### **Eventos de Engagement:**
- ✅ Visualización de página
- ✅ Clics en secciones específicas
- ✅ Navegación del carrusel
- ✅ Scroll depth

## 📊 **MÉTRICAS IMPORTANTES**

### **Conversiones por Fuente:**
- **Hero Section**: Botones principales
- **CTA Section**: Llamada a la acción
- **Contact Section**: Información de contacto
- **Header**: Botón de llamada superior

### **Valor de Conversión:**
- **WhatsApp**: 1 ARS (configurable)
- **Teléfono**: 1 ARS (configurable)
- **Formulario**: 1 ARS (configurable)

## 🔧 **CONFIGURACIÓN AVANZADA**

### **Para optimizar aún más:**

1. **Valores dinámicos**: Modifica el valor según la fuente
2. **Attribution**: Configura ventanas de atribución
3. **Remarketing**: Activa listas de remarketing
4. **Audiences**: Crea audiencias personalizadas

### **Código de ejemplo para valores dinámicos:**
```javascript
// En conversion-tracking.js
function trackWhatsAppConversion(source = 'unknown') {
    const values = {
        'hero': 2.0,
        'cta': 1.5,
        'contact': 1.0
    };
    
    const value = values[source] || 1.0;
    
    gtag('event', 'conversion', {
        send_to: `${CONVERSION_CONFIG.googleAdsId}/${CONVERSION_CONFIG.conversions.whatsapp}`,
        value: value,
        currency: 'ARS'
    });
}
```

## ✅ **VERIFICACIÓN**

### **Para verificar que funciona:**
1. Abre la consola del navegador (F12)
2. Haz clic en un botón de WhatsApp
3. Deberías ver: `WhatsApp conversion tracked from: [source]`
4. En Google Ads, ve a **Conversiones** para ver los datos

## 🚀 **PRÓXIMOS PASOS**

1. **Configura los IDs** en el código
2. **Prueba las conversiones** en modo de prueba
3. **Monitorea los datos** en Google Ads
4. **Optimiza las campañas** basándote en los datos

---

**Nota**: Los datos pueden tardar hasta 24 horas en aparecer en Google Ads.
