// modificarPerfil.js
document.addEventListener('DOMContentLoaded', () => {
    const modificarPerfilForm = document.getElementById('modificar-perfil-form');
    const confirmModal = document.getElementById('confirm-modals');
    const confirmBtn = document.getElementById('confirm-btn');
    const closeBtn = document.getElementById('close-btn');

    modificarPerfilForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío automático del formulario

        // Mostrar el modal
        confirmModal.classList.remove('hidden-modal');

        // Iniciar cuenta regresiva
        let timeLeft = 5;
        confirmBtn.textContent = `Espera ${timeLeft} segundos...`;
        const countdownInterval = setInterval(() => {
            timeLeft -= 1;
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                confirmBtn.disabled = false;
                confirmBtn.textContent = 'Confirmar';
            } else {
                confirmBtn.textContent = `Espera ${timeLeft} segundos...`;
            }
        }, 1000);
    });

    confirmBtn.addEventListener('click', () => {
        alert('Los cambios han sido guardados exitosamente.');
        confirmModal.classList.add('hidden-modal');
    });

    closeBtn.addEventListener('click', () => {
        confirmModal.classList.add('hidden-modal');
    });
});
