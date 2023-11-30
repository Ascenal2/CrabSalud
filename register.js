document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const rutInput = document.getElementById('rut');

    // Validar la contraseña
    function validarContrasena(contrasena) {
        const longitudValida = contrasena.length >= 8;
        const tieneMayuscula = /[A-Z]/.test(contrasena);
        const tieneMinuscula = /[a-z]/.test(contrasena);
        const tieneNumero = /[0-9]/.test(contrasena);
        const tieneSimbolo = /[\W_]/.test(contrasena); // \W es cualquier carácter no alfanumérico, y _ es el guion bajo

        return longitudValida && tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Evita el envío predeterminado del formulario

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

        // Validar que la contraseña cumpla con los requisitos
        if (!validarContrasena(password)) {
            passwordInput.setCustomValidity('La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.');
            isValid = false;
        } else {
            passwordInput.setCustomValidity('');
        }

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Las contraseñas no coinciden.');
            isValid = false;
        } else {
            confirmPasswordInput.setCustomValidity('');
        }

        if (isValid) {
            window.location.href = 'index.html'; // Redirige a index.html
        } else {
            emailInput.reportValidity();
            rutInput.reportValidity();
            passwordInput.reportValidity();
            confirmPasswordInput.reportValidity();
        }
    });

    // Limpiar el mensaje de validación en cada entrada del usuario
    emailInput.addEventListener('input', function () {
        emailInput.setCustomValidity('');
    });
    rutInput.addEventListener('input', function () {
        rutInput.setCustomValidity('');
    });
    passwordInput.addEventListener('input', function () {
        passwordInput.setCustomValidity('');
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
  
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += factor * parseInt(cuerpo.charAt(i), 10);
      factor = (factor === 7) ? 2 : factor + 1;
    }
  
    let dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 10) {
      dvEsperado = 'K';
    } else if (dvEsperado === 11) {
      dvEsperado = '0';
    } else {
      dvEsperado = dvEsperado.toString();
    }
  
    return dv === dvEsperado;
}
