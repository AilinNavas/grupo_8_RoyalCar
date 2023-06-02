window.addEventListener('load', function () {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const allErrorLabels = document.querySelectorAll('.msg-error');


        allErrorLabels.forEach(element => {
            element.innerHTML = '';
        });
        const errors = [];

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

        if (form.avatar.value) {
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
            } else {
                form.avatar.classList.remove('field-error');
                form.avatar.classList.add('is-valid');
            }
        } else {
            form.avatar.classList.remove('field-error');
            form.avatar.classList.remove('is-valid');
        }
        if (!form.roles.value) {
            errors.push({
                name: "roles",
                message: "Debes seleccionar tu rol"
            });
            form.roles.classList.add('field-error');
        } else {
            form.roles.classList.remove('field-error');
            form.roles.classList.add('is-valid')
        }



        // const validatePassword = () => {
        //     const passwordField = document.getElementById('password');
        //     const confirmPasswordField = document.getElementById('confirm_password');
        //     const passwordValue = passwordField.value;
        //     const confirmPasswordValue = confirmPasswordField.value;
        //     const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        //     if (!regex.test(passwordValue)) {
        //         errors.push({
        //             name: 'password',
        //             message: 'La contraseña debe tener al menos 8 caracteres y ser alfanumérica'
        //         });
        //         passwordField.classList.add('field-error');
        //         confirmPasswordField.classList.add('field-error');
        //     } else if (passwordValue !== confirmPasswordValue) {
        //         errors.push({
        //             name: 'password',
        //             message: 'Las contraseñas no coinciden'
        //         });
        //         passwordField.classList.add('field-error');
        //         confirmPasswordField.classList.add('field-error');
        //     } else {
        //         passwordField.classList.remove('field-error');
        //         passwordField.classList.add('is-valid');
        //         confirmPasswordField.classList.remove('field-error');
        //         confirmPasswordField.classList.add('is-valid');
        //     }
        // };

        // passwordField.addEventListener('input', validatePassword);
        // confirmPasswordField.addEventListener('input', validatePassword);


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
