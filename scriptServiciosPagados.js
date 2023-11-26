document.addEventListener('DOMContentLoaded', function() {
    var serviciosPagados = [
        { servicio: 'Consulta General', fecha: '15/02/2023', monto: getRandomPrice() },
        { servicio: 'Examen de Laboratorio', fecha: '22/02/2023', monto: getRandomPrice() },
        { servicio: 'Radiografía', fecha: '01/03/2023', monto: getRandomPrice() },
        { servicio: 'Ecografía', fecha: '10/03/2023', monto: getRandomPrice() },
        { servicio: 'Vacunación', fecha: '20/03/2023', monto: getRandomPrice() }
    ];

    var serviciosLista = document.getElementById('servicios-lista');

    serviciosPagados.forEach(function(servicio) {
        var div = document.createElement('div');
        div.className = 'servicio';
        div.innerHTML = `
            <div class="servicio-info">
                <h2>${servicio.servicio}</h2>
                <p>Fecha de pago: ${servicio.fecha}</p>
                <p>Monto pagado: ${formatPrice(servicio.monto)} CLP</p>
            </div>
            <button onclick="verDetalleServicio('${servicio.servicio}')">Ver Detalles</button>
        `;
        serviciosLista.appendChild(div);
    });
});

function getRandomPrice() {
    // Retorna un precio aleatorio entre 30.000 y 50.000 CLP
    return Math.floor(Math.random() * (50000 - 30000 + 1) + 30000);
}

function formatPrice(price) {
    // Formatea el precio como un número con separadores de miles
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function verDetalleServicio(servicio) {
    // Lógica para mostrar detalles del servicio
    alert('Detalles del servicio pagado: ' + servicio);
}
