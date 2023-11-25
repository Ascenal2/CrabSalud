document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const especialidad = urlParams.get('especialidad');
    const medico = urlParams.get('medico');
    const fecha = urlParams.get('fecha');
    const hora = urlParams.get('hora'); // Agregar esta línea

    // Mostrar los datos en la página
    document.getElementById('especialidad').textContent = `Especialidad: ${especialidad}`;
    document.getElementById('medico').textContent = `Médico: ${medico}`;
    document.getElementById('fecha').textContent = `Fecha: ${fecha}`;
    document.getElementById('hora').textContent = `Hora: ${hora}`; // Asegúrate de tener un elemento con id="hora" en tu HTML para esto.
});
