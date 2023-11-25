function generarLinkMeet() {
    const letras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let link = 'https://meet.google.com/';
    for (let i = 0; i < 10; i++) {
      link += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    return link;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    // Recuperar los datos de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const especialidad = urlParams.get('especialidad');
    const medico = urlParams.get('medico');
    const fecha = urlParams.get('fecha');
    const hora = urlParams.get('hora'); // Agregar esta línea
    const link = generarLinkMeet(); // Generar un link aleatorio de Google Meet

    
        // Mostrar los datos en la página
    document.getElementById('especialidad').textContent = `Especialidad: ${especialidad}`;
    document.getElementById('medico').textContent = `Médico: ${medico}`;
    document.getElementById('fecha').textContent = `Fecha: ${fecha}`;
    document.getElementById('hora').textContent = `Hora: ${hora}`; // Asegúrate de tener un elemento con id="hora" en tu HTML para esto.
    document.getElementById('link').textContent = link; // Mostrar el link generado
  });
  