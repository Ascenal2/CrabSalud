document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('form-sugerencias');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        var nombre = document.getElementById('nombre').value;
        var email = document.getElementById('email').value;
        var mensaje = document.getElementById('mensaje').value;

        console.log('Sugerencia o Reclamo Enviado:', { nombre, email, mensaje });
        // Aquí puedes añadir lógica para enviar estos datos a un servidor
        
        alert('Su sugerencia o reclamo ha sido enviado.');
        form.reset();
    });

    // Función para limitar los caracteres en el área de texto
    function limitarCaracteres(textarea) {
        var numCaracteres = textarea.value.length;
        var contador = document.getElementById('contador-caracteres');
        
        if (numCaracteres > 100) {
            // Limita el texto a los primeros 60 caracteres
            textarea.value = textarea.value.substring(0, 100);
            numCaracteres = 100;
        }

        contador.textContent = numCaracteres + '/100 caracteres';
    }

    // Evento para manejar la entrada en el área de texto
    document.getElementById('mensaje').addEventListener('input', function() {
        limitarCaracteres(this);
    });
});
