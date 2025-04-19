/**
 * nfc-loader.js
 * Script para controlar la animación de carga del sistema de control de acceso
 */

// Mensajes de estado que se mostrarán durante la carga
const statusMessages = [
    "Conectando con el servidor...",
    "Verificando credenciales...",
    "Cargando datos de estudiantes...",
    "Inicializando sistema de control de acceso...",
    "¡Listo para escanear tarjetas!"
];

// Elemento que muestra el mensaje de estado
const statusElement = document.querySelector('.status-message');
// Elemento de la barra de progreso
const progressFill = document.querySelector('.progress-fill');
// Contenedor principal del loader
const loaderContainer = document.querySelector('.loader-container');

// Índice del mensaje actual
let messageIndex = 0;
// Tiempo total de carga en milisegundos (5 segundos)
const totalLoadTime = 5000;
// Tiempo entre cambios de mensaje
const messageChangeInterval = totalLoadTime / statusMessages.length;

/**
 * Actualiza el mensaje de estado
 */
function updateStatusMessage() {
    if (messageIndex < statusMessages.length) {
        statusElement.textContent = statusMessages[messageIndex];
        messageIndex++;
    }
}

/**
 * Simula la carga del sistema
 */
function simulateLoading() {
    // Actualiza el primer mensaje inmediatamente
    updateStatusMessage();
    
    // Actualiza los mensajes en intervalos
    const messageTimer = setInterval(() => {
        updateStatusMessage();
        
        // Detiene el timer cuando se han mostrado todos los mensajes
        if (messageIndex >= statusMessages.length) {
            clearInterval(messageTimer);
        }
    }, messageChangeInterval);
    
    // Oculta el loader cuando se completa la carga
    setTimeout(() => {
        hideLoader();
    }, totalLoadTime);
}

/**
 * Oculta el loader y muestra el contenido principal
 */
function hideLoader() {
    // Agrega clase para animar la salida del loader
    loaderContainer.classList.add('loaded');
    
    // Después de la animación, oculta completamente el loader
    setTimeout(() => {
        // Si el loader está en un iframe o como overlay, lo elimina
        if (window.parent !== window) {
            // Está en un iframe, notifica al padre
            window.parent.postMessage('loaderComplete', '*');
        } else {
            // Está en la misma página, oculta el loader y muestra el contenido
            loaderContainer.style.display = 'none';
            document.body.classList.add('content-loaded');
        }
    }, 500); // Tiempo de la animación de salida
}

/**
 * Inicializa el loader
 */
function initLoader() {
    // Añade estilos CSS para la transición de salida
    const style = document.createElement('style');
    style.textContent = `
        .loader-container.loaded {
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        body.content-loaded .content {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Inicia la simulación de carga
    simulateLoading();
}

// Inicia el loader cuando el DOM está completamente cargado
document.addEventListener('DOMContentLoaded', initLoader);

/**
 * Función para integrar el loader en cualquier página
 * @param {Object} options - Opciones de configuración
 */
function showNfcLoader(options = {}) {
    const defaults = {
        container: document.body,
        autoHide: true,
        loadTime: 5000,
        onComplete: null
    };
    
    const settings = { ...defaults, ...options };
    
    // Crea un iframe con el loader
    const iframe = document.createElement('iframe');
    iframe.src = 'loader/nfc-loader.html';
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '9999';
    iframe.style.backgroundColor = 'var(--color-bg-tertiary, #eee)';
    
    // Agrega el iframe al contenedor
    settings.container.appendChild(iframe);
    
    // Escucha el mensaje del iframe cuando la carga esté completa
    window.addEventListener('message', function(event) {
        if (event.data === 'loaderComplete' && settings.autoHide) {
            // Oculta el iframe con una animación
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                // Elimina el iframe
                iframe.remove();
                
                // Ejecuta la función de callback si existe
                if (typeof settings.onComplete === 'function') {
                    settings.onComplete();
                }
            }, 500);
        }
    });
    
    // Devuelve una función para ocultar manualmente el loader
    return {
        hide: function() {
            iframe.style.opacity = '0';
            iframe.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                iframe.remove();
            }, 500);
        }
    };
}

// Exporta la función para uso global
window.showNfcLoader = showNfcLoader;
