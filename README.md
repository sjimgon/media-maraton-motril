# 🏃‍♂️ Media Maratón Ciudad de Motril - Web Oficial

![Estado](https://img.shields.io/website?url=https%3A%2F%2Fmediamaraton.motril.es&label=Estado)
![Astro](https://img.shields.io/badge/Astro-4.0-orange?style=flat&logo=astro)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-Serverless-green?style=flat&logo=node.js)

Web oficial desarrollada para la **Media Maratón Ciudad de Motril**. Este proyecto moderniza la presencia digital del evento, ofreciendo una experiencia centrada en el usuario, tiempos de carga ultrarrápidos y funcionalidades dinámicas integradas en una arquitectura estática.

🔗 **Demo en vivo:** [mediamaraton.motril.es](https://mediamaraton.motril.es/)

---

## 📋 Características Principales

* **⚡ Rendimiento Óptimo:** Arquitectura "Zero JS by default" gracias a Astro. La web sirve HTML estático y solo hidrata los componentes interactivos necesarios.
* **📱 Diseño Responsivo (Mobile First):** Interfaz adaptada a corredores que consultan desde el móvil, maquetada con Tailwind CSS.
* **🌤️ Módulo Meteorológico Inteligente:** Conexión con la API de *OpenWeatherMap*. Filtra automáticamente los datos para mostrar solo la previsión de la hora de la carrera (11:00 AM) durante los días del evento.
* **⏳ Cuenta Regresiva:** Componente interactivo que calcula en tiempo real el tiempo restante hasta el evento.
* **📩 Sistema de Contacto Seguro:** Formulario funcional gestionado con *Serverless Functions* y **Nodemailer**, protegiendo el buzón institucional del Ayuntamiento.
* **🧩 Arquitectura de Componentes:** Uso de componentes reutilizables (`Cards`, `Botones` polimórficos, `Iconos`, `LogoSlider`) para mantener la coherencia visual y el principio DRY.

---

## 🛠️ Stack Tecnológico

* **Frontend Framework:** [Astro](https://astro.build/)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
* **Lenguaje:** JavaScript (ES6+) / HTML5
* **Backend (Serverless):** Node.js endpoints (`src/pages/api/`)
* **Librerías Clave:**
    * `nodemailer`: Gestión de correos para el formulario de contacto.
* **Diseño:** Figma (Prototipado UI/UX ).
* **Despliegue:** Vercel + Configuración DNS (CNAME) para dominio institucional.

---

## 📂 Estructura del Proyecto

```text
/
├── public/             # Archivos estáticos (imágenes, fuentes, documentos descargables)
├── src/
│   ├── components/     # Bloques UI reutilizables (Header, Footer, Card, Botones...)
│   ├── layouts/        # Plantillas maestras (LayoutMaster.astro)
│   ├── pages/          # Rutas de la web
│   │   └── api/        # Endpoints de servidor (clima.js, enviarSugerencia.js)
│   ├── utils/          # Lógica de negocio (procesarClima.js)
│   └── styles/         # Estilos globales y configuración de fuentes
└── astro.config.mjs    # Configuración del framework
🚀 Instalación y Despliegue Local

☁️ Despliegue
El proyecto está optimizado para desplegarse en Vercel:

Conectar el repositorio de GitHub a Vercel.

Configurar las Variables de Entorno en el panel de Vercel (Settings > Environment Variables).

Vercel detectará automáticamente el framework Astro y ejecutará el build.

✒️ Autor
Sergio Jiménez - Desarrollo Frontend y Diseño UI/UX
Desarrollado para el Área de Deportes del Ayuntamiento de Motril