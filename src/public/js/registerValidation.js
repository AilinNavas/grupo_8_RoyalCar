window.addEventListener('load', function () {
    const form = document.querySelector('form');
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm_password');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const allErrorLabels = document.querySelectorAll('.msg-error');


        allErrorLabels.forEach(element => {
            element.innerHTML = '';
        });
        const errors = [];

        //Validacion nombre y apellido
        if (form.name.value.length == 0 || form.name.value.length <= 2) {
            errors.push({
                name: "name",
                message: "Debes ingresar tu nombre de al menos 2 letras"
            });
            form.name.classList.add('field-error');

        } else {
            form.name.classList.remove('field-error');
            form.name.classList.add('is-valid');

        }
        if (form.last_name.value.length == 0 || form.last_name.value.length <= 2) {
            errors.push({
                name: "last_name",
                message: "Debes ingresar tu apellido de al menos 2 letras"
            });
            form.last_name.classList.add('field-error');

        } else {
            form.last_name.classList.remove('field-error');
            form.last_name.classList.add('is-valid');

        }
        //Validacion de email
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
        //Validacion de imagen de perfil
        if (!form.avatar.value) {
            errors.push({
                name: "avatar",
                message: "Debes seleccionar una imagen de perfil",
            });
            form.avatar.classList.add('field-error');
            form.avatar.classList.remove('is-valid');
        } else {
            form.avatar.classList.remove('field-error');
            form.avatar.classList.add('is-valid');

            const imageUser = document.getElementById('Perfil');
            const fileExt = imageUser.files[0].name.split('.').pop().toLowerCase();
            const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (!acceptedExtensions.includes(fileExt)) {
                errors.push({
                    name: "avatar",
                    message: `Los formatos de imagen permitidos son ${acceptedExtensions.join(', ')}`,
                });
                form.avatar.classList.add('field-error');
                form.avatar.classList.remove('is-valid');
            }
        }
        //Validacion de rol
        if (!form.roles.value) {
            errors.push({
                name: "roles",
                message: "Debes seleccionar tu rol"
            });
            form.roles.classList.add('field-error');
        } else {
            form.roles.classList.remove('field-error');
            form.roles.classList.add('is-valid');
        }

        //Validacion de contraseña

        const passwordValue = passwordField.value;
        const confirmPasswordValue = confirmPasswordField.value;

        function isPassword(password) {
            return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
        }

        if (passwordValue.trim() === '') {
            errors.push({
                name: 'password',
                message: 'Debes ingresar una contraseña'
            });
            passwordField.classList.add('field-error');
        } else if (!isPassword(passwordValue)) {
            errors.push({
                name: 'password',
                message: 'La contraseña debe tener al menos 8 caracteres y ser alfanumérica'
            });
            passwordField.classList.add('field-error');
            confirmPasswordField.classList.add('field-error');
            passwordField.value = '';
            confirmPasswordField.value = '';
        } else {
            passwordField.classList.remove('field-error');
            passwordField.classList.add('is-valid');
        }

        if (confirmPasswordValue.trim() === '') {
            errors.push({
                name: 'confirm_password',
                message: 'Debes confirmar tu contraseña'
            });
            confirmPasswordField.classList.add('field-error');
        } else if (passwordValue !== confirmPasswordValue) {
            errors.push({
                name: 'confirm_password',
                message: 'Las contraseñas no coinciden'
            });
            confirmPasswordField.classList.add('field-error');
            confirmPasswordField.value = '';
        } else {
            confirmPasswordField.classList.remove('field-error');
            confirmPasswordField.classList.add('is-valid');
        }


        errors.forEach((error) => {
            const errorLabel = document.getElementById("error-" + error.name);
            errorLabel.innerHTML = error.message;
        });
        if (errors.length === 0) {
            form.submit();
        }
    });



}
)
