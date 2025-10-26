// === wishlist.js ===
// Controla listas de deseos para Amparo, Manu o Casa.
// Funciona offline con localStorage.

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wishlist-form");
    const list = document.getElementById("wishlist-items");
    const carritoList = document.getElementById("carrito-items");
    const clearAllBtn = document.getElementById("clear-all");

    // Clave única para cada página (según su nombre)
    const listKey = document.body.dataset.listkey || "wishlist-general";
    const cartKey = listKey + "-carrito";

    // Cargar datos guardados
    let wishlist = JSON.parse(localStorage.getItem(listKey)) || [];
    let carrito = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Mostrar al cargar
    renderList();

    // === Añadir nuevo producto ===
    form.addEventListener("submit", e => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const enlace = form.enlace.value.trim();
        const imagen = form.imagen.value.trim();
        const precio = form.precio.value.trim();

        if (!nombre) return alert("Por favor, añade una descripción o nombre.");

        const nuevo = {
            id: Date.now(),
            nombre,
            enlace,
            imagen,
            precio
        };

        wishlist.push(nuevo);
        saveData();
        renderList();
        form.reset();
    });

    // === Renderizar lista ===
    function renderList() {
        list.innerHTML = wishlist.length
            ? ""
            : "<p class='empty'>No hay elementos aún.</p>";

        wishlist.forEach(item => {
            const li = document.createElement("li");
            li.classList.add("wishlist-item");

            li.innerHTML = `
                <div class="item-content">
                    ${item.imagen ? `<img src="${item.imagen}" alt="">` : ""}
                    <div class="item-info">
                        <p class="item-nombre">${item.nombre}</p>
                        ${item.precio ? `<p class="item-precio">${item.precio} €</p>` : ""}
                        ${item.enlace ? `<a href="${item.enlace}" target="_blank">Ver producto</a>` : ""}
                    </div>
                </div>
                <div class="item-actions">
                    <button class="add-cart">🛒</button>
                    <button class="delete">🗑️</button>
                </div>
            `;

            // Botón eliminar
            li.querySelector(".delete").addEventListener("click", () => {
                wishlist = wishlist.filter(x => x.id !== item.id);
                saveData();
                renderList();
            });

            // Botón al carrito
            li.querySelector(".add-cart").addEventListener("click", () => {
                carrito.push(item);
                localStorage.setItem(cartKey, JSON.stringify(carrito));
                alert(`${item.nombre} añadido a “Compres del mes”`);
            });

            list.appendChild(li);
        });
    }

    // === Guardar en localStorage ===
    function saveData() {
        localStorage.setItem(listKey, JSON.stringify(wishlist));
    }

    // === Vaciar lista ===
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", () => {
            if (confirm("¿Vaciar toda la lista?")) {
                wishlist = [];
                saveData();
                renderList();
            }
        });
    }
});