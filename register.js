document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const rutInput = document.getElementById('rut');

    form.addEventListener('submit', function (e) {
        let isValid = true;
        const email = emailInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const rut = rutInput.value;

        // Validar email con un enfoque básico
        const isEmail = email.includes('@') && email.includes('.');
        if (!isEmail) {
            emailInput.setCustomValidity('Por favor, ingresa un correo electrónico válido.');
            isValid = false;
        } else {
            emailInput.setCustomValidity('');
        }

        // Validar RUT
        if (!validarRut(rut)) {
            rutInput.setCustomValidity('Por favor, ingresa un RUT válido.');
            isValid = false;
        } else {
            rutInput.setCustomValidity('');
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden.');
            isValid = false;
        } else {
            confirmPasswordInput.setCustomValidity('');
        }

        // Detener el envío del formulario si hay errores
        if (!isValid) {
            e.preventDefault();
            emailInput.reportValidity();
            rutInput.reportValidity();
            confirmPasswordInput.reportValidity();
        }
        console.log(rut);
    });

    // Limpiar el mensaje de validación en cada entrada del usuario
    emailInput.addEventListener('input', function () {
        emailInput.setCustomValidity('');
    });
    rutInput.addEventListener('input', function () {
        rutInput.setCustomValidity('');
    });
    confirmPasswordInput.addEventListener('input', function () {
        confirmPasswordInput.setCustomValidity('');
    });
});
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