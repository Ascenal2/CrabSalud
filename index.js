  document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.navbar-menu');
    const subMenus = document.querySelectorAll('.navbar-item.has-submenu');
  
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
    });
  
    // Añadir oyentes de eventos para cada elemento de menú que tiene un submenú
    subMenus.forEach(function (item) {
      item.addEventListener('click', function (event) {
        // Esto evitará el comportamiento por defecto del enlace de anclaje
        //event.preventDefault();
        
        // Alternar la clase "active" en el elemento de lista padre del submenú
        item.classList.toggle('active');
  
        // Cerrar los demás submenús abiertos al abrir uno nuevo
        subMenus.forEach(function (subItem) {
          if (subItem !== item) {
            subItem.classList.remove('active');
          }
        });
      });
    });
  });