document.addEventListener('DOMContentLoaded', (event) => {
    const statusElements = document.querySelectorAll('.status');
    const customAlert = document.getElementById('custom-alert');
    const confirmButton = document.getElementById('confirm-change');
    const cancelButton = document.getElementById('cancel-change');

    // Función para cambiar los estados de los servidores
    const changeStates = () => {
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
    };

    // Añade la clase 'blinking' a cada servidor offline al cargar la página
    statusElements.forEach((statusElement) => {
        if (statusElement.classList.contains('offline')) {
            statusElement.classList.add('blinking');
        }
    });

    // Añade un listener al botón para mostrar la alerta personalizada
    const toggleButton = document.querySelector('.toggle-status');
    toggleButton.addEventListener('click', function() {
        // Muestra la alerta personalizada
        customAlert.classList.remove('hidden');

        // Deshabilita el botón de confirmación y comienza la cuenta regresiva
        confirmButton.disabled = true;
        let timeLeft = 5; // Tiempo de espera de 5 segundos
        confirmButton.textContent = `Espera (${timeLeft})`; // Actualiza el texto del botón

        // Actualiza el botón cada segundo
        const countdownInterval = setInterval(() => {
            timeLeft -= 1;
            confirmButton.textContent = `Espera (${timeLeft})`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                confirmButton.textContent = 'Confirmar';
                confirmButton.disabled = false;
            }
        }, 1000); // Intervalo de 1 segundo
    });

    // Listener para el botón de confirmación
    confirmButton.addEventListener('click', function() {
        if (!this.disabled) {
            changeStates();
            customAlert.classList.add('hidden');
        }
    });

    // Listener para el botón de cancelación
    cancelButton.addEventListener('click', function() {
        customAlert.classList.add('hidden');
        confirmButton.disabled = false;
        confirmButton.textContent = 'Confirmar';
        clearInterval(countdownInterval); // Asegúrate de que la variable countdownInterval esté definida fuera de cualquier función si es necesario
    });
});
