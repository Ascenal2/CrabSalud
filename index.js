document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar-menu');
  const navbar = document.querySelector('.navbar'); // Selecciona el elemento .navbar
  const subMenus = document.querySelectorAll('.has-submenu');

    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        navbar.classList.toggle('align-start'); // Alternar la nueva clase aquí
    });

  // Añadir oyentes de eventos para cada elemento de menú que tiene un submenú
  subMenus.forEach(function (item) {
    let submenu = item.querySelector('.submenu');
    item.firstElementChild.addEventListener('click', function (event) {
      event.preventDefault(); // Evita que el enlace navegue a '#'
      
      // Si el submenú ya está abierto, ciérralo
      if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
      } else {
        // Cierra todos los submenús abiertos
        subMenus.forEach(function (subItem) {
          subItem.querySelector('.submenu').style.display = 'none';
        });
        // Abre el submenú correspondiente
        submenu.style.display = 'block';
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
  timer = setTimeout(showSlides, 700000); // Cambiar cada 7 segundos
}

function currentSlide(n) {
  slideIndex = n - 1; // Ajustar para el índice basado en cero
  showSlides(); // Mostrar el slide seleccionado
}