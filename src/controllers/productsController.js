const path = require('path');
const fs = require('fs');
const db = require('../database/models');



const controller = {
	//(GET) Mostrar todos los productos
	products: (req, res) => {

		db.Product.findAll({ include: { all: true } })
			.then((products) => {
				res.render('products', { products });
			})
			.catch((err) => {
				res.send(err);
			});
	},
	productDetail: async (req, res) => {
		try {
			const id = req.params.id;
			const product = await db.Product.findOne({ include: ['brand', 'colors'], where: { id } });
			if (!product) {
				return res.status(404).json({ message: 'Producto no encontrado' });
			}
			res.render('detail', { product });
		} catch (error) {
			res.send(error);
		}
	},

	//(GET) Mostrar formulario de creacion de producto
	create: async (req, res) => {
		const brands = await db.Brand.findAll();

		const colors = await db.Color.findAll();

		res.render('formCreate', { brands, colors });
	},

	store: async (req, res) => {
		try {
			const image = req.file ? req.file.filename : 'default-image.png';
			const productToCreate = {
				model: req.body.model,
				year: req.body.year,
				description: req.body.description,
				price: req.body.price,
				image,
				products_brands_id: req.body.products_brands_id
			};
			
			const productCreated = await db.Product.create(productToCreate);

			const productColors = req.body.color?.map(color => ({ products_id: productCreated.id, colors_id: color }))

            await db.ProductHasColor.bulkCreate(productColors);

			res.send(productColors)

			res.redirect('/products'); 
		
		} catch (error) {
			res.send(error);
		}
	},


	edit: async (req, res) => {
		const id = req.params.id;

		const brands = await db.Brand.findAll();

		const colors = await db.Color.findAll();

		const product = await db.Product.findOne({ include: { all: true }, where: { id } });

		res.render("productEdit", { product, brands, colors });
	},


	update: async (req, res) => {
		try {
			const image = req.file ? req.file.filename : 'default-image.png';
			const productToUpdate = {
				model: req.body.model,
				year: req.body.year,
				description: req.body.description,
				price: req.body.price,
				color: req.body.color,
				image,
				products_brands_id: req.body.products_brands_id
			};

			await db.Product.update(productToUpdate, { where: { id: req.params.id }, force: true });
			res.redirect('/products');

		} catch (error) {
			res.send(error);
		}

	},
	destroy: async (req, res) => {

		try {
			const id = req.params.id;
			await db.Product.destroy({ where: { id } });
			res.redirect('/products');
		}
		catch (error) {
			res.send(error)
		}

	},
	productCart: (req, res) => {
		res.render(path.join(__dirname, 'productCart'))
	},

}
module.exports = controller;

