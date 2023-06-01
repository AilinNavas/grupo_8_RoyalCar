window.addEventListener('load', function () {
    const form = document.querySelector('form .form');
    const nameField = document.getElementById('nombre');
    const lastNameField = document.getElementById('apellido');
    const emailField = document.getElementById('email');
    const fileField = document.getElementById('Perfil');
    const rolField = document.getElementById('rol');
   

    nameField.focus();

    form.addEventListener('submit', (e) => {
        e.preventDefault()

    const validateEmptyField = (e) => {

        const field = e.target;
        const fieldValue = e.target.value;
        if (fieldValue.length == 0 || fieldValue.length <= 2) {
            field.classList.add('field-error');
            field.nextElementSibling.classList.add('is-invalid');
            field.nextElementSibling.innerHTML = `Debes ingresar tu ${field.id}`;
        } else {
            field.classList.remove('field-error');
            field.classList.add('is-valid');
            field.nextElementSibling.classList.remove('is-invalid');
            field.nextElementSibling.innerHTML = '';
        }
    };
    nameField.addEventListener('blur', validateEmptyField);
    lastNameField.addEventListener('blur', validateEmptyField);
    emailField.addEventListener('blur', validateEmptyField);

    const validateEmailFormat = (e) => {
        const field = e.target;
        const fieldValue = e.target.value;
        const regex = new RegExp('^\\w+([.-]\\w+)*@\\w+([.-]\\w+)*\\.\\w{2,4}$');

        if (fieldValue.trim().length > 5 && !regex.test(field.value)) {
            field.classList.add('field-error');
            field.nextElementSibling.classList.add('is-invalid');
            field.nextElementSibling.innerHTML = 'Debes ingresar un formato de email válido'
        } else {
            field.classList.remove('field-error');
            field.classList.add('is-valid');
            field.nextElementSibling.classList.remove('is-invalid');
            field.nextElementSibling.innerHTML = '';
        }

    };
    emailField.addEventListener('input', validateEmailFormat);


    fileField.addEventListener('change', (e) => {
        const field = e.target;
        const fileExt = e.target.files[0].name.split('.').pop().toLowerCase();
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if (!acceptedExtensions.includes(fileExt)) {
            field.classList.add('field-error');
            field.nextElementSibling.innerHTML = `Los formatos de imagen permitidos son ${acceptedExtensions.join(', ')}`;
        } else {
            field.classList.remove('field-error');
            field.classList.add('is-valid');
            field.nextElementSibling.classList.remove('is-invalid');
            field.nextElementSibling.innerHTML = ''
        }

    })

    const validateRolField = (e) => {
        const field = e.target;
        const fieldValue = e.target.value;
        if (fieldValue.length == 0) {
            field.classList.add('field-error');

        } else {
            field.classList.remove('field-error');
            field.classList.add('is-valid');
        }
    };
    rolField.addEventListener('change', validateRolField);
    //Validacion de contraseña
    const validarContraseña = () => {
        const passwordValue = form.password.value;
        const confirmPasswordValue = form.confirm_password.value;
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!regex.test(passwordValue)) {
            form.password.classList.add('field-error');
            form.confirm_password.classList.add('field-error');
            form.confirm_password.nextElementSibling.innerHTML = 'La contraseña debe tener al menos 8 caracteres y ser alfanumérica';
        } else if (passwordValue !== confirmPasswordValue) {
            // errors.push({ name: 'password', message: 'Error en el campo de password' });
            form.password.classList.add('field-error');
            form.confirm_password.classList.add('field-error');
            form.confirm_password.nextElementSibling.innerHTML = 'Las contraseñas no coinciden';
        } else {
            form.password.classList.remove('field-error');
            form.password.classList.add('is-valid');
            form.confirm_password.classList.remove('field-error');
            form.confirm_password.classList.add('is-valid');
            form.confirm_password.nextElementSibling.innerHTML = '';
        }
    };

    form.password.addEventListener('input', validarContraseña);
    form.confirm_password.addEventListener('input', validarContraseña);
});

});


















