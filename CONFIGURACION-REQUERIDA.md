# ⚠️ CONFIGURACIÓN REQUERIDA PARA PRODUCCIÓN

## 🚨 **ANTES DE SUBIR A PRODUCCIÓN, DEBES CONFIGURAR:**

### **1. Google Analytics 4 (OBLIGATORIO)**
- Ve a [Google Analytics](https://analytics.google.com)
- Crea una nueva propiedad
- Copia tu **Measurement ID** (formato: G-XXXXXXXXXX)
- Reemplaza `G-XXXXXXXXXX` en `index.html` línea 44 y 48

### **2. Google Ads Conversion Tracking (OBLIGATORIO)**
- Ve a [Google Ads](https://ads.google.com)
- Crea una conversión para WhatsApp
- Copia tu **Google Ads ID** (formato: AW-XXXXXXXXXX)
- Copia tu **Conversion Label** (formato: xxxxxxxxxxxxxxxx)
- Reemplaza en `js/conversion-tracking.js`:
  - `googleAdsId: 'AW-XXXXXXXXXX'`
  - `whatsapp: 'XXXXXXXXXX'`

### **3. Número de WhatsApp (VERIFICAR)**
- Verifica que el número `+542615605482` sea correcto
- Aparece en 4 lugares del sitio

### **4. Dominio (VERIFICAR)**
- Cambia `https://accidentesydefensa.com/` por tu dominio real
- Aparece en meta tags de Open Graph y Twitter

## ✅ **ARCHIVOS LISTOS PARA PRODUCCIÓN:**
- ✅ HTML optimizado
- ✅ CSS responsive
- ✅ JavaScript funcional
- ✅ Seguridad implementada
- ✅ SEO optimizado
- ✅ Favicon incluido
- ✅ .htaccess configurado

## 🚀 **PASOS FINALES:**
1. Configurar Google Analytics y Google Ads
2. Verificar número de WhatsApp
3. Cambiar dominio en meta tags
4. Subir archivos al servidor
5. Verificar funcionamiento

## 📞 **SOPORTE:**
Si necesitas ayuda con la configuración, contacta al desarrollador.
