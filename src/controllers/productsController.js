const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../database/products.json');
function getProducts() {
	return JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
}



const controller = {
    //(GET) Mostrar todos los productos
    products: (req, res) => {
        const products = getProducts();
        res.render('products', { products });
    },
    
    //(GET) Mostrar formulario de creacion de producto
    formCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/formCreate'))
    },

    store: (req, res) => {
		
        const images = req.files.map(img => img.filename)
		const products = getProducts();
		const newProduct = {
			id: products[products.length - 1].id + 1,
			Marca: req.body.brand,
			Modelo: req.body.model,
			Año: req.body.year,
			Potencia: req.body.power,
			Precio: req.body.price,
            Color: req.body.color,
			images
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');
	},


    productCart: (req, res) => {
        res.render(path.join(__dirname, '../views/productCart'))
    },
    
    

    productEdit: (req, res) => {
        res.render(path.join(__dirname, '../views/productEdit'))
    },
     productDetail: (req, res) => {
         res.render(path.join(__dirname, '../views/productDetail'))
     },
    


};


module.exports = controller;

