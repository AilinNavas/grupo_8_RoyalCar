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
    productCart: (req, res) => {
        res.render(path.join(__dirname, '../views/productCart.ejs'))
    },

    productCreate: (req, res) => {
        res.render(path.join(__dirname, '../views/productCreate.ejs'))
    },

    edit: (req, res) => {
        const id = req.params.id;
        const products = getProducts();
        const product = products.find(element => element.id == id);
        console.log(product);

        res.render('productEdit', { productToEdit: product });
    },
    update: (req, res) =>{
        const id = req.params.id;
        const products = getProducts();
        const productIndex = products.findIndex(element => element.id == id);
        const image = req.file ? req.file.filename : products[productIndex].Imagen;
        products[productIndex] = {
            ...products[productIndex],
            Marca: req.body.Marca,
            Modelo: req.body.Modelo,
            Año: req.body.Año,
            Potencia: req.body.Potencia,
            Precio: req.body.Precio,
            Color: req.body.Color,
            
        };
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		res.redirect('/products');

    },
    destroy: (req, res) => {
		const products = getProducts();
	
		const productIndex = products.findIndex(element => element.id == req.params.id);
		products.splice(productIndex, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
		// End
		res.redirect('/products');
	},

    productDetail: (req, res) => {
        res.render(path.join(__dirname, '../views/productDetail.ejs'))
    },

   

};


module.exports = controller;

