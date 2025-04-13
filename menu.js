// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Variables para el menú móvil
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    // Función para abrir el menú
    function openMenu() {
        mobileMenuContainer.classList.add('open');
        mobileMenuOverlay.classList.add('open');
        console.log('Menú abierto');
    }

    // Función para cerrar el menú
    function closeMenu() {
        mobileMenuContainer.classList.remove('open');
        mobileMenuOverlay.classList.remove('open');
        console.log('Menú cerrado');
    }

    // Eventos para cerrar el menú
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMenu);
    }
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMenu);
    }

    // Variables para el deslizamiento
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minHorizontalSwipe = 50;
    const maxVerticalSwipe = 100;

    // Agregar detector de deslizamiento para todo el documento
    document.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].screenY;
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].screenY;

        // Calcular distancias de deslizamiento
        const horizontalSwipe = touchEndX - touchStartX;
        const verticalSwipe = Math.abs(touchEndY - touchStartY);

        // Verificar si el menú está abierto
        const isMenuOpen = mobileMenuContainer.classList.contains('open');

        // Si el deslizamiento es principalmente horizontal (para evitar conflictos con el scroll)
        if (verticalSwipe < maxVerticalSwipe) {
            // Deslizamiento de izquierda a derecha para abrir el menú desde cualquier parte de la pantalla
            if (horizontalSwipe > minHorizontalSwipe && !isMenuOpen) {
                openMenu();
            }

            // Deslizamiento de derecha a izquierda para cerrar el menú
            if (horizontalSwipe < -minHorizontalSwipe && isMenuOpen) {
                closeMenu();
            }
        }
    }, { passive: true });
});
