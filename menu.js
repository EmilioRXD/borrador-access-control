// Variables para el menú móvil
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenuContainer = document.querySelector('.mobile-menu-container');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileMenuClose = document.querySelector('.mobile-menu-close');

// Función para abrir el menú
function openMenu() {
    mobileMenuContainer.classList.add('open');
    mobileMenuOverlay.classList.add('open');
}

// Función para cerrar el menú
function closeMenu() {
    mobileMenuContainer.classList.remove('open');
    mobileMenuOverlay.classList.remove('open');
}

// Eventos para botones del menú
mobileMenuButton.addEventListener('click', openMenu);
mobileMenuClose.addEventListener('click', closeMenu);
mobileMenuOverlay.addEventListener('click', closeMenu);

// Sidebar toggle (menú de escritorio)
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");

closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// Soporte para gestos de deslizamiento
let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 50; // Distancia mínima para considerar un deslizamiento

// Detectar inicio del deslizamiento
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

// Detectar fin del deslizamiento
document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

// Manejar el deslizamiento
function handleSwipe() {
    // Calcular la distancia del deslizamiento
    const swipeDistance = touchEndX - touchStartX;
    
    // Si el deslizamiento es de derecha a izquierda cerca del borde izquierdo
    if (swipeDistance < -minSwipeDistance && touchStartX < 30) {
        closeMenu();
    }
    
    // Si el deslizamiento es de izquierda a derecha
    if (swipeDistance > minSwipeDistance && touchStartX < 30) {
        openMenu();
    }
}
