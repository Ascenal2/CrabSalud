document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar-menu');
  
  // Toggle para el menú móvil
  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });

  // Evento para submenús en móviles
  const subMenuButtons = document.querySelectorAll('.navbar-item.has-submenu > a');

  subMenuButtons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      // Previene la navegación por defecto
      event.preventDefault();
      let subMenu = btn.nextElementSibling; // Selecciona el submenú correspondiente al botón
      
      // Verifica si el submenú ya está activo
      if (subMenu.classList.contains('active')) {
        subMenu.classList.remove('active');
      } else {
        // Cerrar todos los submenús abiertos primero
        document.querySelectorAll('.navbar-item.has-submenu .submenu.active').forEach(function (openMenu) {
          openMenu.classList.remove('active');
        });
        // Activar el submenú actual
        subMenu.classList.add('active');
      }
    });
  });

  // Inicialización del slider
  showSlides();
});

let slideIndex = 0;
let timer; // Guardar referencia al temporizador para poder cancelarlo

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  let indicators = document.getElementsByClassName("indicator");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  for (i = 0; i < indicators.length; i++) {
    indicators[i].className = indicators[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  indicators[slideIndex - 1].className += " active";

  // Restablecer el temporizador
  clearTimeout(timer);
  timer = setTimeout(showSlides, 7000); // Cambiar cada 7 segundos
}

function currentSlide(n) {
  slideIndex = n - 1; // Ajustar para el índice basado en cero
  showSlides(); // Mostrar el slide seleccionado
}
