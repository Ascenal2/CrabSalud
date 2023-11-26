document.addEventListener('DOMContentLoaded', function() {
    var licenciasMedicas = [
        { fecha: '15/03/2023', especialidad: 'Broncopulmonar', notas: 'Reposo de 5 días', urlPdf: 'licencia1.pdf' },
        { fecha: '22/03/2023', especialidad: 'Cardiología', notas: 'Reposo de 3 días', urlPdf: 'licencia2.pdf' },
        { fecha: '30/03/2023', especialidad: 'Dermatología', notas: 'Reposo de 7 días', urlPdf: 'licencia3.pdf' },
        { fecha: '05/04/2023', especialidad: 'Ginecología', notas: 'Reposo de 10 días', urlPdf: 'licencia4.pdf' },
        { fecha: '10/04/2023', especialidad: 'Traumatología', notas: 'Reposo de 14 días', urlPdf: 'licencia5.pdf' }
    ];

    var tbody = document.querySelector('#tablaLicencias tbody');

    licenciasMedicas.forEach(function(licencia, index) {
        var tr = document.createElement('tr');
        var btn = '<button onclick="mostrarPDF(\'' + licencia.urlPdf + '\')">Ver PDF</button>';

        tr.innerHTML = '<td>' + licencia.fecha + '</td>' +
                       '<td>' + licencia.especialidad + '</td>' +
                       '<td>' + licencia.notas + '</td>' +
                       '<td>' + btn + '</td>';
        tbody.appendChild(tr);
    });
});

function mostrarPDF(url) {
    // En un caso real, aquí podrías usar window.open(url) o mostrar un modal con el PDF
    alert('Se esta descargando la licencia Medica: ' + url);
}
