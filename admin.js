document.addEventListener('DOMContentLoaded', (event) => {
    // Selecciona todos los elementos con la clase 'status' que también contienen el texto 'OFFLINE'
    const statusElements = document.querySelectorAll('.status');
  
    // Añade la clase 'blinking' a cada servidor offline al cargar la página
    statusElements.forEach((statusElement) => {
        if (statusElement.classList.contains('offline')) {
            statusElement.classList.add('blinking');
        }
    });

    // Selecciona todos los botones de cambio de estado
    const toggleButtons = document.querySelectorAll('.toggle-status');

    // Añade un listener a cada botón
    toggleButtons.forEach((button) => {
        button.addEventListener('click', function() {
            // Cambia el estado de todos los servidores
            statusElements.forEach((statusElement) => {
                if (statusElement.classList.contains('offline')) {
                    statusElement.classList.replace('offline', 'online');
                    statusElement.textContent = 'ONLINE';
                    statusElement.classList.remove('blinking');
                } else {
                    statusElement.classList.replace('online', 'offline');
                    statusElement.textContent = 'OFFLINE';
                    statusElement.classList.add('blinking');
                }
            });
        });
    });
});
