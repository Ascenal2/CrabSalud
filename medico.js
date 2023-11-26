// Funciones para generar datos aleatorios
const nombres = ["Alex", "Jamie", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Avery", "Riley", "Quinn"];
const apellidos = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

function generarNombreAleatorio() {
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    return `${nombre} ${apellido}`;
}

function generarFechaAleatoria() {
    const inicio = new Date();
    const fin = new Date(new Date().setDate(new Date().getDate() + 60)); // 60 días hacia adelante desde hoy
    return new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
}

function formatoFecha(fecha) {
    return fecha.toISOString().split('T')[0];
}

function generarHoraAleatoria() {
    const hora = Math.floor(Math.random() * (17 - 8 + 1)) + 8; // Hora entre 8 y 17
    const minutos = Math.random() > 0.5 ? '00' : '30';
    return `${hora.toString().padStart(2, '0')}:${minutos}`;
}

// Inicialización de citas vacía
const citas = [];

// Generación de 30 citas aleatorias
for (let i = 1; i <= 30; i++) {
    citas.push({
        id: i,
        paciente: generarNombreAleatorio(),
        fecha: formatoFecha(generarFechaAleatoria()),
        hora: generarHoraAleatoria()
    });
}

function generarDocumento(citaId) {
    const selectedOption = document.querySelector(`.generar-dropdown[data-id='${citaId}']`).value;
    const paciente = citas.find(c => c.id.toString() === citaId).paciente;

    if (selectedOption) {
        let mensaje = '';
        switch (selectedOption) {
            case 'recetas':
                mensaje = 'La receta ha sido enviada al correo del paciente.';
                break;
            case 'licencias':
                mensaje = 'La licencia ha sido enviada al correo del paciente.';
                break;
            case 'solicitudExamen':
                mensaje = 'La solicitud de examen ha sido enviada al correo del paciente.';
                break;
            default:
                mensaje = 'El documento ha sido enviado al correo del paciente.';
                break;
        }
        alert(`${mensaje} Paciente: ${paciente}`);
    } else {
        alert('Por favor, seleccione una opción para generar.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const citasTableBody = document.querySelector('table tbody');

    
    citas.forEach(cita => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cita.id}</td>
            <td>${cita.paciente}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>
                <select class="generar-dropdown" data-id="${cita.id}">
                    <option value="">Generar</option>
                    <option value="recetas">Recetas</option>
                    <option value="licencias">Licencias</option>
                    <option value="solicitudExamen">Solicitud de examen</option>
                </select>
                <button class="generar-btn" onclick="generarDocumento('${cita.id}')">Generar</button>
                <button class="cancelar-btn" data-id="${cita.id}">X</button>
            </td>
        `;
        citasTableBody.appendChild(tr);
    });

    // Evento para botones de cancelar
    document.querySelectorAll('.cancelar-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const citaId = event.target.dataset.id;
            alert(`Cita ID: ${citaId} cancelada`);
            event.target.closest('tr').remove();
        });
    });
});