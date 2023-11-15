function validarRut(rut) {
    let [cuerpo, dv] = rut.split('-');
    if (!cuerpo || dv === undefined || cuerpo.length < 2) return false; // Rut demasiado corto o sin DV
    dv = dv.toUpperCase(); // Convertir a mayúscula
  
    // Calcular Dígito Verificador
    let suma = 0;
    let factor = 2;
  
    // Para cada dígito del cuerpo del RUT
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += factor * parseInt(cuerpo.charAt(i), 10);
      factor = (factor === 7) ? 2 : factor + 1;
    }
  
    // Calcular el 11 - (suma % 11)
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 10) {
      dvEsperado = 'K';
    } else if (dvEsperado === 11) {
      dvEsperado = '0';
    } else {
      dvEsperado = dvEsperado.toString();
    }
  
    // Comparamos el dígito verificador
    return dv === dvEsperado;
  }
  
  
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    const input = document.getElementById('username');
    
    form.addEventListener('submit', function (e) {
      const value = input.value;
      const isEmail = value.includes('@') && value.includes('.'); // Una comprobación básica de email
      const isRut = validarRut(value);
  
      if (!isEmail && !isRut) {
        e.preventDefault(); // Detén el envío del formulario
        input.setCustomValidity('Por favor, ingresa un correo electrónico o RUT válido.');
        input.reportValidity(); // Muestra el mensaje de error
      } else {
        input.setCustomValidity(''); // Limpia el mensaje de error si todo está bien
      }
    });
  
    input.addEventListener('input', function () {
      // Esto es necesario para restablecer el estado de validación en cada entrada del usuario
      input.setCustomValidity('');
    });
  });
  