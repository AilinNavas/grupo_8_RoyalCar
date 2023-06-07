window.onload = function () {
  const form = document.getElementById('form-login');
  const email = document.getElementById('email');
  const passwordField = document.getElementById('passwordInput');
  const passwordButton = document.getElementById('togglePasswordButton');
  console.log(passwordButton)

  email.focus();

  // passwordButton.addEventListener('click', () => {
  //   if (passwordField.type === 'password') {
  //     passwordField.type = 'text';
  //      passwordButton.textContent = 'Ocultar';
  //   } else {
  //     passwordField.type = 'password';
  //      passwordButton.textContent = 'Ver';
  //   }
  // });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const allErrorLabels = document.querySelectorAll("msg-error");
    allErrorLabels.forEach(element => {
      element.innerHTML = "";
    })
    const errors = []

    // Email
    if (!form.email.value) {
      errors.push({
        name: "email",
        message: "Debes completar con tu email"
      });
      form.email.classList.add('field-error');
    } else {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(form.email.value)) {
        errors.push({
          name: "email",
          message: "Debes ingresar un correo electrónico válido",
        });
        form.email.classList.remove('is-valid');
        form.email.classList.add('field-error');
      } else {
        form.email.classList.remove('field-error');
        document.getElementById('error-email').innerHTML = '';
        form.email.classList.add('is-valid');
      }
    }

    // Contraseña
    if (!form.password.value) {
      errors.push({
        name: "password",
        message: "Debes ingresar tu contraseña",
      });
      form.password.classList.remove("is-valid");
      form.password.classList.add('field-error');
    } else {
      form.password.classList.remove('field-error');
      document.getElementById('error-password').innerHTML = '';
      form.password.classList.add("is-valid");
    }

    // Mostrar errores de campos vacios
    errors.forEach((error) => {
      const errorLabel = document.getElementById("error-" + error.name);
      errorLabel.innerHTML = error.message;
    });
    if (errors.length === 0) {
      form.submit();
    }
  });
}
