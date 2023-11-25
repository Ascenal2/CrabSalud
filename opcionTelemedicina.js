// Suponiendo que tienes datos para especialidades y médicos
const especialidades = {
    'Broncopulmonar Adulto': [
        'Dr. Alejandro Fuentes Alarcón',
        'Dra. Carmen Ruiz Santos',
        'Dr. Roberto Álvarez Pino'
    ],
    'Broncopulmonar Infantil': [
        'Dra. Susana Herrera Ortega',
        'Dr. Felipe Mora Solís',
        'Dra. Laura Jiménez Cervantes'
    ],
    'Cirugía General': [
        'Dr. Mauricio Vargas Molina',
        'Dra. Patricia Naranjo Linares',
        'Dr. Omar Sánchez Arriaga',
        'Dra. Rosa Camacho Segura',
        'Dr. Enrique Díaz Durán',
        'Dra. Alejandra Méndez Delgado'
    ],
    'Cardiología': [
        'Dr. Eduardo Romero Fierro',
        'Dra. Daniela Castillo Vega'
    ],
    'Dermatología': [
        'Dra. Beatriz Gómez Toro',
        'Dr. Ángel Durán Campos',
        'Dra. Victoria Luna Escobar'
    ],
    'Ginecología y Urología': [
        'Dra. Silvia Paredes Miranda',
        'Dra. Mariana Valle Rojas',
        'Dra. Teresa Soto Mayor',
        'Dr. Álvaro Quintana Paz',
        'Dr. Samuel Ortega Díaz',
        'Dr. Martín Velasco García'
    ],
    'Kinesiología': [
        'Dra. Natalia Ramírez Vidal',
        'Dr. Cristian Torres León',
        'Dra. Elena Mendoza Casas'
    ],
    'Nutrición': [
        'Dr. Rodrigo Pérez Gálvez',
        'Dra. Claudia Domínguez Castro',
        'Dr. Marco Antonio Solís'
    ],
    'Odontología': [
        'Dr. Gustavo Ángel Ríos',
        'Dra. Patricia Salazar Mora',
        'Dr. Daniel Reyes Martín'
    ],
    'Oftalmología': [
        'Dr. Esteban Molina Figueroa',
        'Dra. Sandra Sánchez Prieto',
        'Dr. Leonardo García López'
    ],
    'Pediatría General': [
        'Dr. Hugo Martínez Estrada',
        'Dra. Adriana Flores Téllez',
        'Dr. César Augusto Marín'
    ],
    'Traumatología': [
        'Dra. Lorena Castillo Fuentes',
        'Dr. Iván Martínez Salgado',
        'Dra. Jimena Álvarez Hernández'
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
                const url = `horaAgendadaTelemedicina.html?especialidad=${encodeURIComponent(especialidadSeleccionada)}&medico=${encodeURIComponent(medicoSeleccionado)}&fecha=${encodeURIComponent(fechaSeleccionada)}&hora=${encodeURIComponent(horaSeleccionada)}`;
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