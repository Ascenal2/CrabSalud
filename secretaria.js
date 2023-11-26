// Funciones para generar datos aleatorios
function generarNombreAleatorio() {
    const nombres = ["Alex", "Jamie", "Sam", "Jordan", "Taylor", "Morgan", "Casey", "Avery", "Riley", "Quinn"];
    const apellidos = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
    const nombre = nombres[Math.floor(Math.random() * nombres.length)];
    const apellido = apellidos[Math.floor(Math.random() * apellidos.length)];
    return `${nombre} ${apellido}`;
}

function generarFechaAleatoria() {
    const inicio = new Date();
    const fin = new Date();
    fin.setDate(fin.getDate() + 30); // 30 días a partir de ahora
    const fecha = new Date(inicio.getTime() + Math.random() * (fin.getTime() - inicio.getTime()));
    return fecha.toISOString().split('T')[0];
}

function generarHoraAleatoria() {
    const hora = Math.floor(Math.random() * (17 - 8 + 1)) + 8; // Hora entre 8 y 17
    const minutos = Math.random() > 0.5 ? '00' : '30';
    return `${hora.toString().padStart(2, '0')}:${minutos}`;
}

function generarMedicoAleatorio() {
    const medicos = ["Dr. Pérez", "Dra. Sánchez", "Dr. Ramírez", "Dra. Morales"];
    return medicos[Math.floor(Math.random() * medicos.length)];
}

// Generar un conjunto de citas aleatorias
function generarCitasAleatorias(cantidad) {
    const citas = [];
    for (let i = 1; i <= cantidad; i++) {
        citas.push({
            id: i,
            paciente: generarNombreAleatorio(),
            medico: generarMedicoAleatorio(),
            fecha: generarFechaAleatoria(),
            hora: generarHoraAleatoria()
        });
    }
    return citas;
}

// Generar 30 citas
const citas = generarCitasAleatorias(30);

// Función para actualizar la tabla
function actualizarTabla() {
    const citasTableBody = document.querySelector('#tabla-citas tbody');
    citasTableBody.innerHTML = ''; // Limpiar la tabla
    citas.forEach(cita => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${cita.id}</td>
            <td>${cita.paciente}</td>
            <td>${cita.medico}</td>
            <td>${cita.fecha}</td>
            <td>${cita.hora}</td>
            <td>
                <button class="eliminar-btn" data-id="${cita.id}">✖</button>
            </td>
        `;
        citasTableBody.appendChild(tr);
    });

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll('.eliminar-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const citaId = this.dataset.id;
            const confirmar = confirm(`¿Estás seguro de que quieres eliminar la cita ID: ${citaId}?`);
            if (confirmar) {
                const index = citas.findIndex(c => c.id.toString() === citaId);
                if (index !== -1) {
                    citas.splice(index, 1);
                    actualizarTabla();
                }
            }
        });
    });
}

// Evento para cargar la tabla al iniciar
document.addEventListener('DOMContentLoaded', actualizarTabla);