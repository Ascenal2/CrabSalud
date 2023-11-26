document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.navbar-menu');
  const navbar = document.querySelector('.navbar'); // Selecciona el elemento .navbar
  const subMenus = document.querySelectorAll('.has-submenu');
  const chatbox = document.getElementById('chatbox');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendMessageButton = document.getElementById('send-message');
  const minimizeButton = document.getElementById('minimize-chat');
  const chatContent = document.querySelector('.chatbox-content');
  
  // Función para añadir un mensaje al chat
  function addMessage(author, text) {
      const messageElement = document.createElement('p');
      messageElement.textContent = text;
      messageElement.classList.add(author === 'user' ? 'user-message' : 'help-message');
      chatMessages.appendChild(messageElement);
  }

  // Evento para enviar mensaje
  sendMessageButton.addEventListener('click', () => {
      const message = chatInput.value.trim();
      if (message) {
          addMessage('user', message); // Agrega mensaje del usuario
          chatInput.value = '';
          setTimeout(() => { // Simula una respuesta automática
              addMessage('help', 'Gracias por tu mensaje. ¿En qué puedo ayudarte?');
          }, 1000);
      }
  });

  // Evento para minimizar/maximizar el chatbox
  minimizeButton.addEventListener('click', () => {
      chatContent.style.display = chatContent.style.display === 'none' ? 'flex' : 'none';
      chatbox.classList.toggle('minimized');
  });

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

  // Evento para cerrar los submenús al hacer clic fuera
  document.addEventListener('click', function (e) {
    // Verifica si el clic fue fuera de los submenús
    const isClickInsideMenu = e.target.closest('.navbar-item.has-submenu');
    if (!isClickInsideMenu) {
      // Cierra todos los submenús
      subMenus.forEach(function (item) {
        let submenu = item.querySelector('.submenu');
        submenu.style.display = 'none';
      });
    }
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
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  const missionContent = document.getElementById('missionContent');

  toggleButton.addEventListener('click', () => {
    missionContent.classList.toggle('expanded');
    
    if (toggleButton.textContent === "Saber más") {
      toggleButton.textContent = "Leer menos";
    } else {
      toggleButton.textContent = "Saber más";
    }
  });
});
