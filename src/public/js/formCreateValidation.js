window.onload = function () {
    let formulario = document.querySelector('form-container');
    let titulo = document.querySelector('h1')
    titulo.innerHTML = 'Crear nuevo producto';


    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE CREACION DE PELICULAS------------------//    
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const allErrorLabels = document.querySelectorAll('.error-message');
        allErrorLabels.forEach(element => {
            element.innerHTML = '';
        });
        const errors = [];
        function validations(name, message) {
            if (!form[name].value) {
                errors.push({ name, message });
                form[name].classList.add('is-invalid');
            }
            else {
                form[name].classList.remove('is-invalid');
                form[name].classList.add('is-valid');
            }
        }
        validations('brands', ' Por favor selecciona una marca');
        validations('model', 'El campo modelo no puede estar vacio');
        validations('year', 'Por favor seleciona el año ');
        validations('description', 'Escribir una breve descripcion');
        validations('price', 'El campo precio no debe estar vacio');
        // validations('color.name', 'Seleciona por lo menos un color');
        validations('perfil', 'Seleccionar una imagen');

        errors.forEach(error => {
            const errorLabel = document.getElementById('error-' + error.name);
            errorLabel.innerHTML = error.message;
        });
        if (errors.length === 0) {
            form.submit();
        }
    });
}