window.addEventListener('load', function () {
    const form = document.querySelector('form');

    form.name.focus();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    const nameField = document.getElementById('nombre');
    const lastNameField = document.getElementById('apellido');
    const emailField = document.getElementById('email');
    const fileField = document.getElementById('Perfil');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm_password');

    const validateEmptyField = (e) => {
        const field = e.target;
        const fieldValue = e.target.value;
        if (fieldValue.length === 0 || fieldValue.length <= 2) {
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
    }

    nameField.addEventListener('blur', validateEmptyField);
    lastNameField.addEventListener('blur', validateEmptyField);
    emailField.addEventListener('blur', validateEmptyField);

    emailField.addEventListener('input', validateEmailFormat);

    fileField.addEventListener('change', (e) => {
        const field = e.target;
        const fileExt = e.target.files[0].name.split('.').pop().toLowerCase();
        const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
        if(!acceptedExtensions.includes(fileExt)) {
            field.classList.add('field-error');
            field.nextElementSibling.innerHTML = `Los formatos de imagen permitidos son ${acceptedExtensions.join(', ')}`;
        } else {
            field.classList.remove('field-error');
            field.classList.add('is-valid');
            field.nextElementSibling.classList.remove('is-invalid');
            field.nextElementSibling.innerHTML = '' 
        }
    })
});











