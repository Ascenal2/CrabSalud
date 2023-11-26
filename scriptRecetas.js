document.addEventListener('DOMContentLoaded', function() {
    var recetasMedicas = [
        { nombre: 'Paracetamol 500 mg', fecha: '10/01/2023', medico: 'Dr. García', id: '1' },
        { nombre: 'Amoxicilina 500 mg', fecha: '15/02/2023', medico: 'Dra. Torres', id: '2' },
        { nombre: 'Ibuprofeno 400 mg', fecha: '20/03/2023', medico: 'Dr. Vázquez', id: '3' },
        { nombre: 'Loratadina 10 mg', fecha: '05/04/2023', medico: 'Dra. Méndez', id: '4' },
        { nombre: 'Omeprazol 20 mg', fecha: '15/05/2023', medico: 'Dr. Ruiz', id: '5' }
    ];

    var listaRecetas = document.getElementById('lista-recetas');

    recetasMedicas.forEach(function(receta) {
        var div = document.createElement('div');
        div.className = 'receta';
        div.innerHTML = `
            <div class="receta-info">
                <h2>${receta.nombre}</h2>
                <p>Fecha de emisión: ${receta.fecha}</p>
                <p>Prescrito por: ${receta.medico}</p>
            </div>
            <button onclick="verReceta(${receta.id})">Ver Receta</button>
        `;
        listaRecetas.appendChild(div);
    });
});

function verReceta(id) {
    alert('Se mostraría la receta médica con ID: ' + id);
    // Aquí, puedes agregar lógica para mostrar los detalles de la receta seleccionada
}
