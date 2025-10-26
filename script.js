// ==============================
// MENÚ DESPLEGABLE + PANELES
// ==============================

// Desplegar y cerrar submenús (Amparo, Manu, Casa)
document.querySelectorAll('.dropdown').forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    const content = dropdown.querySelector('.dropdown-content');
    if (content) content.addEventListener('click', e => e.stopPropagation());
});

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
});

// ==============================
// PANEL DE LISTAS
// ==============================

// Cuando se pulsa una opción del menú (Ej: Amparo > Es Precís)
document.querySelectorAll('.dropdown .dropdown-content a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('.html','');
        const panel = document.getElementById(targetId);

        // Cerrar todos los paneles antes de abrir otro
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));

        // Mostrar el panel seleccionado
        if(panel) panel.classList.add('active');
    });
});

// ==============================
// AÑADIR ELEMENTOS A LA LISTA
// ==============================

document.addEventListener('click', e => {
    if (e.target.classList.contains('add-btn')) {
        const panel = e.target.closest('.panel');
        const inputDesc = panel.querySelector('.input-desc').value.trim();
        const inputUrl = panel.querySelector('.input-url').value.trim();
        const inputImg = panel.querySelector('.input-img').value.trim();

        if (!inputDesc) return alert('Añade una descripción o nombre.');

        const list = panel.querySelector('.list');
        const item = document.createElement('div');
        item.className = 'list-item';
        item.innerHTML = `
            <span>${inputDesc}</span>
            ${inputUrl ? `<a href="${inputUrl}" target="_blank">🔗</a>` : ''}
            ${inputImg ? `<img src="${inputImg}" alt="imagen">` : ''}
            <button class="cart-btn">🛒</button>
            <button class="delete-btn">🗑️</button>
        `;
        list.appendChild(item);

        // Limpiar campos
        panel.querySelector('.input-desc').value = '';
        panel.querySelector('.input-url').value = '';
        panel.querySelector('.input-img').value = '';
    }

    // Eliminar elemento
    if (e.target.classList.contains('delete-btn')) {
        e.target.closest('.list-item').remove();
    }
});
const imgModal = document.getElementById('img-modal');
const modalImg = imgModal.querySelector('img');

// Cuando se hace clic en una miniatura
document.addEventListener('click', e => {
    if(e.target.closest('.list-item img')) {
        modalImg.src = e.target.src;
        imgModal.classList.add('active');
    }
});

// Cerrar modal al hacer clic fuera de la imagen
imgModal.addEventListener('click', e => {
    if(e.target === imgModal) {
        imgModal.classList.remove('active');
    }
});