document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('historialMedico');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío real del formulario
        
        // Si llegamos a este punto, significa que todos los campos "required" son válidos.
        alert('Los antecedentes médicos han sido enviados.');

        // Aquí podrías añadir el código para manejar los datos del formulario
        // como enviarlos a un servidor o a una base de datos.
        
        // Luego puedes limpiar el formulario si es necesario o redirigir al usuario
        form.reset();
    });
});