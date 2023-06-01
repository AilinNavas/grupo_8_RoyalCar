window.onload = function () {
  const form = document.getElementById('form-login');
  const email = document.getElementById('email')

  email.focus()

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
        form.email.classList.add('is-valid');
      }
    }

    // Contraseña
    if (!form.password.value) {
      errors.push({
        name: "password",
        message: "Tu contraseña no puede estar vacia",
      });
      form.password.classList.remove("is-valid");
      form.password.classList.add('field-error');
    } else {
      form.password.classList.remove('field-error');
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
