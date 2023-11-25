// Suponiendo que tienes datos para especialidades y médicos
const especialidades = {
    'Broncopulmonar Adulto': [
        'Ricardo Mendoza Soto',
        'Carla Pérez Gómez',
        'Juan Carlos Rodríguez López'
    ],
    'Broncopulmonar Infantil': [
        'María Fernanda Castillo',
        'José Luis Araya',
        'Andrea Muñoz Contreras'
    ],
    'Cirugía General': [
        'Dr. Andrés Montero Guzmán',
        'Dra. Sofía Barrera López',
        'Dr. Lucas Méndez Castro',
        'Dr. Fernando Gómez Rojas',
        'Dra. Valeria Soto Mancilla',
        'Dr. Diego Reyes Figueroa'
    ],
    'Cardiología': [
        'Dr. Gabriel Torres Pinto',
        'Dra. Paula Navarrete Cuevas'
    ],
    'Dermatología': [
        'Dr. Arturo Prado Fuentes',
        'Dra. Claudia Araya Maldonado',
        'Dr. Luis Guzmán Salas'
    ],
    'Ginecología y Urología': [
        'Dra. Ana María Castro',
        'Dra. Paula Vargas',
        'Dra. Irene Gutiérrez',
        'Dr. Carlos Rodríguez',
        'Dr. Juan Esteban Araya',
        'Dr. Roberto Núñez'
    ],
    'Kinesiología': [
        'José Martínez',
        'María González',
        'Carlos Pérez'
    ],
    'Nutrición': [
        'Andrea López',
        'Miguel Ángel Rodríguez',
        'Sofía Miranda'
    ],
    'Odontología': [
        'Dr. Felipe Castro',
        'Dra. Carolina Gutiérrez',
        'Dr. José Martínez'
    ],
    'Oftalmología': [
        'Dr. Alberto Sánchez',
        'Dra. Laura Ramírez',
        'Dr. Diego González'
    ],
    'Pediatría General': [
        'Dr. Luis Morales',
        'Dra. Carmen Gutiérrez',
        'Dr. Jorge Hernández'
    ],
    'Traumatología': [
        'Dr. Pedro González',
        'Dr. Alberto Martínez',
        'Dra. Julia Rojas'
    ]
};
const citasMedicos = {};

// Inicializar la estructura con todas las horas para cada médico
Object.values(especialidades).flat().forEach(medico => {
    citasMedicos[medico] = [];

    let fechaActual = new Date();
    let fechaFin = new Date();
    fechaFin.setMonth(fechaActual.getMonth() + 2);

    while (fechaActual <= fechaFin) {
        const horasDeTrabajo = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00','18:30'];
        horasDeTrabajo.forEach(hora => {
            const ocupado = Math.random() < 0.5;
            citasMedicos[medico].push({ fecha: fechaActual.toISOString().split('T')[0], hora, ocupado });
        });
        fechaActual.setDate(fechaActual.getDate() + 1);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const especialidadSelect = document.getElementById('especialidad');
    const medicoSelect = document.getElementById('medico');
    const fechaInput = document.getElementById('fecha');
    const horaSelect = document.getElementById('hora');
    const form = document.querySelector('.consulta-form');
    const botonAgendar = document.getElementById('agendarHora');

    // Configurar las opciones de especialidades
    Object.keys(especialidades).forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        especialidadSelect.appendChild(option);
    });

    // Manejar el cambio de especialidad
    especialidadSelect.addEventListener('change', event => {
        const medicos = especialidades[event.target.value] || [];
        medicoSelect.innerHTML = '<option value="">Seleccione un médico</option>';
        medicos.forEach(medico => {
            const option = document.createElement('option');
            option.value = medico;
            option.textContent = medico;
            medicoSelect.appendChild(option);
        });
        medicoSelect.disabled = medicos.length === 0;
    });

    // Función para actualizar las horas disponibles
    function actualizarHorasDisponibles() {
        const medicoSeleccionado = medicoSelect.value;
        const fechaSeleccionada = fechaInput.value;
        horaSelect.innerHTML = '<option value="">Seleccione una hora</option>';
        if (medicoSeleccionado && fechaSeleccionada) {
            const citasMedico = citasMedicos[medicoSeleccionado];
            citasMedico.filter(cita => cita.fecha === fechaSeleccionada)
                .forEach(cita => {
                    const option = document.createElement('option');
                    option.value = cita.hora;
                    option.textContent = cita.hora;
                    horaSelect.appendChild(option);
                });
        }
    }

    medicoSelect.addEventListener('change', actualizarHorasDisponibles);
    fechaInput.addEventListener('change', actualizarHorasDisponibles);

    // Manejar el evento submit del formulario
    form.addEventListener('submit', event => {
        event.preventDefault();
        const medicoSeleccionado = medicoSelect.value;
        const fechaSeleccionada = fechaInput.value;
        const horaSeleccionada = horaSelect.value;
        const citaEncontrada = citasMedicos[medicoSeleccionado].find(cita => cita.fecha === fechaSeleccionada && cita.hora === horaSeleccionada);

        if (citaEncontrada && citaEncontrada.ocupado) {
            alert(`La hora ${horaSeleccionada} del día ${fechaSeleccionada} no está disponible para el médico ${medicoSeleccionado}.`);
            botonAgendar.style.display = 'none';
        } else {
            alert(`La hora ${horaSeleccionada} del día ${fechaSeleccionada} está disponible para el médico ${medicoSeleccionado}.`);
            botonAgendar.style.display = 'block';
            const especialidadSeleccionada = especialidadSelect.options[especialidadSelect.selectedIndex].text;
            botonAgendar.onclick = function() {
                const url = `horaAgendada.html?especialidad=${encodeURIComponent(especialidadSeleccionada)}&medico=${encodeURIComponent(medicoSeleccionado)}&fecha=${encodeURIComponent(fechaSeleccionada)}&hora=${encodeURIComponent(horaSeleccionada)}`;
                window.location.href = url;
            };
            
        }
    });

    // Configuración del input de fecha
    const today = new Date();
    fechaInput.min = today.toISOString().split('T')[0];
    today.setMonth(today.getMonth() + 2);
    fechaInput.max = today.toISOString().split('T')[0];
});