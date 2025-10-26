// dropdown.js
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  // si no hay dropdowns, nada que hacer
  if (!dropdowns.length) return;

  // Click fuera: cierra todo
  document.addEventListener('click', () => {
    dropdowns.forEach(d => d.classList.remove('active'));
  });

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');

    // botón puede no existir (defensivo)
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      // cerrar otros
      dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('active'); });
      // alternar este
      dropdown.classList.toggle('active');
    });

    // evitar que un click dentro del contenido cierre todo (por si hay enlaces)
    if (content) {
      content.addEventListener('click', (e) => e.stopPropagation());
      // cerrar al salir con el ratón (desktop)
      content.addEventListener('mouseleave', () => dropdown.classList.remove('active'));
    }
  });
});