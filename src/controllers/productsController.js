const path = require('path');
const db = require('../database/models');
const { validationResult } = require('express-validator');



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
			const resultValidation = validationResult(req);

			if (resultValidation.errors.length > 0) {
				const brands = await db.Brand.findAll();
				const colors = await db.Color.findAll();
				return res.render('formCreate', { errors: resultValidation.mapped(), oldData: { ...req.body }, brands, colors });
			};

			const image = req.file ? req.file.filename : 'default-image.png';
			const productToCreate = {
				model: req.body.model,
				year: req.body.year,
				description: req.body.description,
				price: req.body.price,
				image,
				products_brands_id: req.body.products_brands_id
			};
			console.log(productToCreate);
			const productCreated = await db.Product.create(productToCreate);
			console.log(productCreated);

			const productColors = req.body.color?.map(color => ({ products_id: productCreated.id, colors_id: color }))
			console.log(productColors);

			await db.ProductHasColor.bulkCreate(productColors);

			res.redirect('/products');

		} catch (error) {
			console.log(error)
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

			const resultValidation = validationResult(req);

			if (resultValidation.errors.length > 0) {
				const brands = await db.Brand.findAll();
				const colors = await db.Color.findAll();
				return res.render("productEdit", { errors: resultValidation.mapped(), oldData: { ...req.body }, brands, colors });
			};

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

			await db.ProductHasColor.destroy({ where: { products_id: id } });

			await db.Product.destroy({ where: { id } });

			res.redirect('/products');
		}
		catch (error) {
			res.send(error)
		}

	},
	productCart: (req, res) => {
		res.render ('productCart');
	},
	

}
module.exports = controller;

