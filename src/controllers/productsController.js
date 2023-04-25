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
		const image = req.file ? req.file.filename : 'default-image.png';
		const products = getProducts();
		const newProduct = {
			id: products[products.length - 1].id + 1,
			brand: req.body.brand,
			model: req.body.model,
			year: req.body.year,
			description: req.body.description,
			price: req.body.price,
			color: req.body.color,
			image
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');
	},

	productCart: (req, res) => {
		res.render(path.join(__dirname, '../views/productCart'))
	},

	productDetail: (req, res) => {
		const id = req.params.id;
		const products = getProducts();
		const product = products.find(element => element.id == id);
		res.render('detail', { product });
	},


	edit: (req, res) => {
		const id = req.params.id;
		const products = getProducts();
		const product = products.find(element => element.id == id);
		
		res.render('productEdit', { productToEdit: product });
	},
	update: (req, res) => {
		const id = req.params.id;
		const products = getProducts();
		const productIndex = products.findIndex(element => element.id == id);
		const image = req.file ? req.file.filename : products[productIndex].image;
		products[productIndex] = {
			...products[productIndex],
			brand: req.body.brand,
			model: req.body.model,
			year: req.body.year,
			power: req.body.power,
			price: req.body.price,
			color: req.body.color,
			image

		};

		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');



	},
	destroy: (req, res) => {
		const products = getProducts();
	
		const productIndex = products.findIndex(element => element.id == req.params.id);
		products.splice(productIndex, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		
		res.redirect('/products');
	}

}
	module.exports = controller;

