document.addEventListener('DOMContentLoaded', function() {
    var citasAnteriores = [
        { fecha: '15/03/2023', hora: '10:00 AM', especialidad: 'Broncopulmonar', notas: 'Revisión anual' },
        { fecha: '22/03/2023', hora: '11:30 AM', especialidad: 'Cardiología', notas: 'Consulta de seguimiento' },
        { fecha: '29/03/2023', hora: '09:00 AM', especialidad: 'Dermatología', notas: 'Evaluación de la piel' },
        { fecha: '05/04/2023', hora: '10:15 AM', especialidad: 'Ginecología y Urología', notas: 'Examen de rutina' },
        { fecha: '12/04/2023', hora: '02:00 PM', especialidad: 'Kinesiología', notas: 'Sesión de terapia física' },
        { fecha: '19/04/2023', hora: '08:30 AM', especialidad: 'Nutrición', notas: 'Control de dieta' },
        { fecha: '26/04/2023', hora: '03:00 PM', especialidad: 'Odontología', notas: 'Limpieza dental' },
        { fecha: '03/05/2023', hora: '11:00 AM', especialidad: 'Oftalmología', notas: 'Examen de la vista' },
        { fecha: '10/05/2023', hora: '09:45 AM', especialidad: 'Pediatría General', notas: 'Vacunación anual' },
        { fecha: '17/05/2023', hora: '04:00 PM', especialidad: 'Traumatología', notas: 'Revisión de fractura' }
    ];

    var tbody = document.querySelector('#tablaCitas tbody');

    // Elimina las citas anteriores (si las hubiera)
    tbody.innerHTML = '';

    // Itera sobre las citas anteriores y crea una fila para cada una
    citasAnteriores.forEach(function(cita) {
        var tr = document.createElement('tr');
        tr.innerHTML = '<td>' + cita.fecha + '</td>' +
                       '<td>' + cita.hora + '</td>' +
                       '<td>' + cita.especialidad + '</td>' +
                       '<td>' + cita.notas + '</td>';
        tbody.appendChild(tr);
    });
});
