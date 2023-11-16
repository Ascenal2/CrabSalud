document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('forgotPasswordForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita que el formulario se envíe de manera predeterminada

        const emailInput = document.getElementById('email');
        if(emailInput.value.includes('@') && emailInput.value.includes('.')) {
            // Aquí, podrías agregar una lógica adicional si necesitas validar el correo electrónico más a fondo
            showMessage('Se ha enviado un correo para poder reiniciar tu contraseña.');
        } else {
            showMessage('Por favor, ingresa un correo electrónico válido.', true);
        }
    });
});

function showMessage(message) {
    let messageDiv = document.getElementById('message');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'message';
        document.body.insertBefore(messageDiv, document.body.firstChild);
    }

    messageDiv.textContent = message;
    messageDiv.style.display = 'block'; // Muestra el mensaje

    // Reinicia la clase visible para asegurar que la animación se ejecute.
    messageDiv.classList.remove('visible');

    // Pequeño retraso para asegurar que la animación se ejecute después de que se hagan los cambios.
    setTimeout(() => {
        messageDiv.classList.add('visible');
    }, 10);
}

