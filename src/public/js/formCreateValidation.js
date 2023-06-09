window.onload = function () {
    let formulario = document.querySelector('form-container');
    let titulo = document.querySelector('h1')
    titulo.innerHTML = 'Crear nuevo producto';


    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE CREACION DE PRODUCTOS------------------//    
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const allErrorLabels = document.querySelectorAll('.error-message');
        allErrorLabels.forEach(element => {
            element.innerHTML = '';
        });
        const errors = [];

        //validaciones Generales Por Campos vacios
        function validations(name, message) {
            if (!form[name].value) {
                errors.push({ name, message });
                form[name].classList.add('field-error');
            }
            else {
                form[name].classList.remove('field-error');
                form[name].classList.add('is-valid');
            }
        }
        validations('brands', 'Seleccionar tu Marca');
        validations('model', 'El campo modelo no puede estar vacio');
        validations('year', 'Por favor seleciona el año ');
        validations('price', 'El campo precio no debe estar vacio');
        
        //Validaciones Description
        if (form.description.value.length == 0 || form.description.value.length <= 20) {
            errors.push({
                name: "description",
                message: "La descripcion debe tener al menos 20 caracteres"
            });
            form.description.classList.add('field-error');

        } else {
            form.description.classList.remove('field-error');
            document.getElementById('error-description').innerHTML = ''
            form.description.classList.add('is-valid');
        }

        //Validaciones campo Imagen del Producto
        if (!form.imgFile.value) {
            errors.push({
                name: "imgFile",
                message: "Debes seleccionar una imagen del Producto",
            });
            form.imgFile.classList.add('field-error');
            form.imgFile.classList.remove('is-valid');
        } else {
            form.imgFile.classList.remove('field-error');
            document.getElementById('error-imgFile').innerHTML = '';
            form.imgFile.classList.add('is-valid');

            const imageUser = document.getElementById('Perfil');
            const fileExt = imageUser.files[0].name.split('.').pop().toLowerCase();
            const acceptedExtensions = ['jpg', 'jpeg', 'png', 'gif'];

            if (!acceptedExtensions.includes(fileExt)) {
                errors.push({
                    name: "imgFile",
                    message: `Los formatos de imagen permitidos son ${acceptedExtensions.join(', ')}`,
                });
                form.imgFile.classList.add('error-imgFile');
                form.imgFile.classList.add('field-error');
                form.imgFile.classList.remove('is-valid');
            }
        }

        //Validaciones Del Checkbox Colores
        const colorsField = document.querySelectorAll('.colorsSelector')
        let countChecked = 0;
        colorsField.forEach((element) => {
            if (element.checked == true) {
                countChecked++;
            }
        })
        if (countChecked == 0) {
            document.getElementById("colors").innerHTML = 'Seleccionar un color'
            document.getElementById("colors").classList.add('field-error')
        } else {
            document.getElementById("colors").classList.remove('field-error');
            document.getElementById("colors").innerHTML = 'Colores disponibles';
        }

        errors.forEach(error => {
            const errorLabel = document.getElementById('error-' + error.name);
            errorLabel.innerHTML = error.message;
        });
        if (errors.length === 0) {
            form.submit();
        }
    });
}