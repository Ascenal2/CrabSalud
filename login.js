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
    const inputUsername = document.getElementById('username');
    const inputPassword = document.getElementById('password');
  
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // Detén el envío del formulario
  
      const username = inputUsername.value;
      const password = inputPassword.value;
      const isEmail = username.includes('@') && username.includes('.');
      const isRut = validarRut(username);
  
      if (!isEmail && !isRut) {
        inputUsername.setCustomValidity('Por favor, ingresa un correo electrónico o RUT válido.');
        inputUsername.reportValidity();
        return;
      }
  
      // Comprueba las credenciales y redirige según corresponda
      if ((isEmail || isRut) && password === 'paciente') {
        window.location.href = 'pacienteLogin.html'; // Redirige a la página de pacientes
      } else if ((isEmail || isRut) && password === 'admin') {
        window.location.href = '#adminLogin.html'; // Redirige a la página de administradores
      } else {
        inputPassword.setCustomValidity('Contraseña incorrecta.');
        inputPassword.reportValidity();
      }
    });
  
    // Restablece la validación en cada entrada del usuario
    inputUsername.addEventListener('input', function () {
      inputUsername.setCustomValidity('');
    });
    inputPassword.addEventListener('input', function () {
      inputPassword.setCustomValidity('');
    });
  });
  