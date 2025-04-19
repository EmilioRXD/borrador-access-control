// Datos de ejemplo - En producción, estos datos vendrían de una API o base de datos
const studentsData = [
    {
        id: 1,
        cedula: 'V-12345678',
        nombre: 'Carlos',
        apellido: 'Rodríguez',
        carrera: 'Ingeniería Informática',
        estadoPago: 'pagado'
    },
    {
        id: 2,
        cedula: 'V-23456789',
        nombre: 'María',
        apellido: 'González',
        carrera: 'Ingeniería Civil',
        estadoPago: 'pagado'
    },
    {
        id: 3,
        cedula: 'V-34567890',
        nombre: 'José',
        apellido: 'Pérez',
        carrera: 'Arquitectura',
        estadoPago: 'pagado'
    },
    {
        id: 4,
        cedula: 'V-45678901',
        nombre: 'Laura',
        apellido: 'Díaz',
        carrera: 'Medicina',
        estadoPago: 'pagado'
    },
    {
        id: 5,
        cedula: 'V-56789012',
        nombre: 'Andrés',
        apellido: 'Martínez',
        carrera: 'Derecho',
        estadoPago: 'pagado'
    }
];

// Para simular una base de datos más grande
function generateMoreStudents(count) {
    const carreras = ['Ingeniería Informática', 'Ingeniería Civil', 'Arquitectura', 'Medicina', 'Derecho', 'Administración', 'Contaduría', 'Economía'];
    const estadosPago = ['pagado', 'pendiente'];
    const nombres = ['Juan', 'Pedro', 'Ana', 'Luis', 'Carmen', 'Miguel', 'Sofia', 'Elena', 'Roberto', 'Gabriela'];
    const apellidos = ['García', 'López', 'Fernández', 'Torres', 'Ramírez', 'Sánchez', 'Hernández', 'Jiménez', 'Morales', 'Castro'];
    
    const generatedStudents = [];
    
    for (let i = 0; i < count; i++) {
        const id = studentsData.length + i + 1;
        const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
        const randomApellido = apellidos[Math.floor(Math.random() * apellidos.length)];
        const randomCarrera = carreras[Math.floor(Math.random() * carreras.length)];
        const randomEstadoPago = estadosPago[Math.floor(Math.random() * estadosPago.length)];
        
        generatedStudents.push({
            id: id,
            cedula: `V-${Math.floor(10000000 + Math.random() * 90000000)}`,
            nombre: randomNombre,
            apellido: randomApellido,
            carrera: randomCarrera,
            estadoPago: randomEstadoPago
        });
    }
    
    return generatedStudents;
}

// Generar estudiantes adicionales para demostración
const allStudents = [...studentsData, ...generateMoreStudents(95)]; // Total: 100 estudiantes

// Variables de estado para la paginación y filtrado
let currentPage = 1;
let itemsPerPage = 10;
let filteredStudents = [...allStudents];
let activeFilters = {
    search: '',
    carrera: 'all',
    estadoPago: 'all'
};

// Elementos DOM
const studentsContainer = document.getElementById('students-container');
const searchInput = document.getElementById('student-search');
const advancedFiltersToggle = document.getElementById('advanced-filters-toggle');
const advancedFiltersPanel = document.getElementById('advanced-filters-panel');
const applyFiltersBtn = document.getElementById('apply-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const filterButtons = document.querySelectorAll('.filter-button');
const perPageSelect = document.getElementById('per-page-select');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const paginationPages = document.getElementById('pagination-pages');
const pageStartEl = document.getElementById('page-start');
const pageEndEl = document.getElementById('page-end');
const totalStudentsEl = document.getElementById('total-students');
const studentsCountEl = document.getElementById('students-count');

// Función para renderizar estudiantes
function renderStudents() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const studentsToShow = filteredStudents.slice(startIndex, endIndex);
    
    // Limpiar contenedor
    studentsContainer.innerHTML = '';
    
    if (studentsToShow.length === 0) {
        studentsContainer.innerHTML = '<div class="no-results">No se encontraron estudiantes con los criterios de búsqueda.</div>';
        return;
    }
    
    // Renderizar cada estudiante
    studentsToShow.forEach(student => {
        const isPendingPayment = student.estadoPago === 'pendiente';
        const accordionItem = document.createElement('div');
        accordionItem.className = `accordion-item${isPendingPayment ? ' payment-pending' : ''}`;
        
        accordionItem.innerHTML = `
            <div class="accordion-header">
                <div class="accordion-title">
                    <span class="user-name">${student.nombre} ${student.apellido}</span>
                </div>
                <div class="accordion-actions">
                    ${isPendingPayment ? '<div class="status-container status-pending-container"><span class="status-indicator status-pending"></span><span>Pago Pendiente</span></div>' : ''}
                    <button class="accordion-edit-btn"><i class='bx bx-pencil'></i></button>
                    <button class="accordion-toggle"><i class='bx bx-chevron-down'></i></button>
                </div>
            </div>
            <div class="accordion-content">
                <div class="user-data-grid">
                    <div class="user-data-item">
                        <div class="data-label">Cédula:</div>
                        <div class="data-value">${student.cedula}</div>
                    </div>
                    <div class="user-data-item">
                        <div class="data-label">Nombre:</div>
                        <div class="data-value">${student.nombre}</div>
                    </div>
                    <div class="user-data-item">
                        <div class="data-label">Apellido:</div>
                        <div class="data-value">${student.apellido}</div>
                    </div>
                    <div class="user-data-item">
                        <div class="data-label">Carrera:</div>
                        <div class="data-value">${student.carrera}</div>
                    </div>
                    ${isPendingPayment ? `
                    <div class="user-data-item">
                        <div class="data-label">Estado de pago:</div>
                        <div class="data-value payment-text">Pendiente - Acceso temporal</div>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        studentsContainer.appendChild(accordionItem);
    });
    
    // Actualizar contadores
    updateCounters();
    
    // Reiniciar eventos de acordeón
    setupAccordionEvents();
}

// Función para actualizar contadores y paginación
function updateCounters() {
    const totalStudents = filteredStudents.length;
    const startItem = totalStudents === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalStudents);
    
    // Actualizar contadores
    pageStartEl.textContent = startItem;
    pageEndEl.textContent = endItem;
    totalStudentsEl.textContent = totalStudents;
    studentsCountEl.textContent = totalStudents;
    
    // Actualizar paginación
    updatePagination();
}

// Función para actualizar controles de paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    
    // Habilitar/deshabilitar botones de navegación
    prevPageBtn.disabled = currentPage <= 1;
    nextPageBtn.disabled = currentPage >= totalPages;
    
    // Generar números de página
    paginationPages.innerHTML = '';
    
    // Limitar el número de botones de página mostrados
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Ajustar si estamos cerca del final
    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }
    
    // Botón para la primera página si no es visible
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.className = 'page-number';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => goToPage(1));
        paginationPages.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.textContent = '...';
            paginationPages.appendChild(ellipsis);
        }
    }
    
    // Botones de página numerados
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-number${i === currentPage ? ' active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => goToPage(i));
        paginationPages.appendChild(pageBtn);
    }
    
    // Botón para la última página si no es visible
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'page-ellipsis';
            ellipsis.textContent = '...';
            paginationPages.appendChild(ellipsis);
        }
        
        const lastPageBtn = document.createElement('button');
        lastPageBtn.className = 'page-number';
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener('click', () => goToPage(totalPages));
        paginationPages.appendChild(lastPageBtn);
    }
}

// Función para ir a una página específica
function goToPage(page) {
    currentPage = page;
    renderStudents();
    
    // Desplazarse al inicio del contenedor
    document.querySelector('.accordion-container').scrollIntoView({ behavior: 'smooth' });
}

// Función para aplicar filtros
function applyFilters() {
    // Obtener valores de los filtros
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Obtener filtro de carrera seleccionado
    let carreraFilter = 'all';
    document.querySelectorAll('.filter-button').forEach(btn => {
        if (btn.classList.contains('active')) {
            const text = btn.textContent.trim();
            if (text === 'Todos') carreraFilter = 'all';
            else if (text === 'Informática') carreraFilter = 'Ingeniería Informática';
            else if (text === 'Civil') carreraFilter = 'Ingeniería Civil';
            else if (text === 'Pagos Pendientes') carreraFilter = 'all'; // Este es un caso especial
        }
    });
    
    // Obtener estado de pago desde botones de filtro
    let estadoPagoFilter = 'all';
    document.querySelectorAll('.filter-button').forEach(btn => {
        if (btn.classList.contains('active') && btn.textContent.trim() === 'Pagos Pendientes') {
            estadoPagoFilter = 'pendiente';
        }
    });
    
    // Obtener filtros avanzados si están visibles
    if (advancedFiltersPanel.style.display === 'block') {
        // Carrera
        const carreraCheckboxes = document.querySelectorAll('.filter-group:nth-child(1) input[type="checkbox"]:checked');
        if (carreraCheckboxes.length === 1 && carreraCheckboxes[0].value !== 'all') {
            const value = carreraCheckboxes[0].value;
            if (value === 'informatica') carreraFilter = 'Ingeniería Informática';
            else if (value === 'civil') carreraFilter = 'Ingeniería Civil';
            else if (value === 'arquitectura') carreraFilter = 'Arquitectura';
            else if (value === 'medicina') carreraFilter = 'Medicina';
            else if (value === 'derecho') carreraFilter = 'Derecho';
        }
        
        // Estado de pago
        const pagoCheckboxes = document.querySelectorAll('.filter-group:nth-child(2) input[type="checkbox"]:checked');
        if (pagoCheckboxes.length === 1 && pagoCheckboxes[0].value !== 'all') {
            estadoPagoFilter = pagoCheckboxes[0].value;
        }
    }
    
    // Actualizar filtros activos
    activeFilters = {
        search: searchTerm,
        carrera: carreraFilter,
        estadoPago: estadoPagoFilter
    };
    
    // Aplicar filtros
    filteredStudents = allStudents.filter(student => {
        // Filtro de búsqueda
        const matchesSearch = searchTerm === '' || 
            student.nombre.toLowerCase().includes(searchTerm) || 
            student.apellido.toLowerCase().includes(searchTerm) || 
            student.cedula.toLowerCase().includes(searchTerm) ||
            student.carrera.toLowerCase().includes(searchTerm);
        
        // Filtro de carrera
        const matchesCarrera = carreraFilter === 'all' || student.carrera === carreraFilter;
        
        // Filtro de estado de pago
        const matchesEstadoPago = estadoPagoFilter === 'all' || student.estadoPago === estadoPagoFilter;
        
        return matchesSearch && matchesCarrera && matchesEstadoPago;
    });
    
    // Restablecer a la primera página
    currentPage = 1;
    
    // Renderizar estudiantes filtrados
    renderStudents();
}

// Función para restablecer filtros
function resetFilters() {
    // Limpiar campo de búsqueda
    searchInput.value = '';
    
    // Restablecer filtros rápidos
    document.querySelectorAll('.filter-button').forEach((btn, index) => {
        btn.classList.toggle('active', index === 0); // Activar solo "Todos"
    });
    
    // Restablecer filtros avanzados
    document.querySelectorAll('#advanced-filters-panel input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = checkbox.value === 'all';
    });
    
    // Aplicar filtros restablecidos
    activeFilters = {
        search: '',
        carrera: 'all',
        estadoPago: 'all'
    };
    
    filteredStudents = [...allStudents];
    currentPage = 1;
    renderStudents();
}

// Función para configurar eventos de acordeón
function setupAccordionEvents() {
    document.querySelectorAll('.accordion-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const accordionItem = button.closest('.accordion-item');

            // Cerrar otros items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== accordionItem) {
                    item.classList.remove('active');
                    const otherContent = item.querySelector('.accordion-content');
                    otherContent.style.maxHeight = null;
                    item.querySelector('.accordion-toggle').innerHTML = '<i class="bx bx-chevron-down"></i>';
                }
            });

            // Abrir/cerrar el item actual
            accordionItem.classList.toggle('active');
            const content = accordionItem.querySelector('.accordion-content');

            if (accordionItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
                button.innerHTML = '<i class="bx bx-chevron-up"></i>';
            } else {
                content.style.maxHeight = null;
                button.innerHTML = '<i class="bx bx-chevron-down"></i>';
            }
        });
    });
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    // Eventos de búsqueda
    searchInput.addEventListener('input', () => {
        // Aplicar filtros después de un breve retraso para evitar muchas actualizaciones
        clearTimeout(searchInput.timer);
        searchInput.timer = setTimeout(() => {
            applyFilters();
        }, 300);
    });
    
    // Eventos de filtros rápidos
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Si es el botón de "Todos", desactivar los demás
            if (button.textContent.trim() === 'Todos') {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');
            } else {
                // Desactivar el botón "Todos"
                filterButtons.forEach(btn => {
                    if (btn.textContent.trim() === 'Todos') {
                        btn.classList.remove('active');
                    }
                });
                
                // Alternar el estado del botón actual
                button.classList.toggle('active');
            }
            
            applyFilters();
        });
    });
    
    // Eventos de filtros avanzados
    advancedFiltersToggle.addEventListener('click', () => {
        advancedFiltersPanel.style.display = advancedFiltersPanel.style.display === 'block' ? 'none' : 'block';
    });
    
    applyFiltersBtn.addEventListener('click', () => {
        applyFilters();
        advancedFiltersPanel.style.display = 'none';
    });
    
    resetFiltersBtn.addEventListener('click', () => {
        resetFilters();
        advancedFiltersPanel.style.display = 'none';
    });
    
    // Eventos de paginación
    perPageSelect.addEventListener('change', () => {
        itemsPerPage = parseInt(perPageSelect.value);
        currentPage = 1;
        renderStudents();
    });
    
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });
    
    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    });
    
    // Inicializar
    renderStudents();
});
