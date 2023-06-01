const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const db = require('../database/models');



const controller = {
	// 	register:(req, res) => {
	// 		 db.Rol.findAll()
	// 		.then(function(roles){
	// 			res.render('register', { roles:roles });
	// 		})
	// 	},
	register: async (req, res) => {
		const roles = await db.Rol.findAll();

		res.render('register', { roles });
	},


	createUser: async (req, res) => {
		try {
			const resultValidation = validationResult(req);

			if (resultValidation.errors.length > 0) {
				const roles = await db.Rol.findAll();
				console.log(resultValidation.errors)
				return res.render('register', { errors: resultValidation.mapped(), oldData: {...req.body } ,roles});

			}
			const avatar = req.file ? req.file.filename : 'default-image.png';
			const usersToCreate = {
				name: req.body.name,
				last_name: req.body.last_name,
				email: req.body.email,
				avatar,
				roles_id: req.body.roles,
				password: bcrypt.hashSync(req.body.password, 10),
			};

			const usersCreated = await db.User.create(usersToCreate);

			res.redirect('login');

		} catch (error) {
			res.send(error);
		}



	},


	login: (req, res) => {
		db.User.findAll()
			.then(function (User) {
				res.render('login', { User })
			})
	},


	loginProcess: async (req, res) => {

		try {
			const email = req.body.email;
			const userToLogin = await db.User.findOne({ include: ['rol'], where: { email } });

			if (userToLogin) {
				let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					delete userToLogin.password;
					req.session.userLogged = userToLogin;

					if (req.body.remember_user) {
						res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
					}

					return res.redirect("profile");
				}
				return res.render('login', {
					errors: {
						password: {
							msg: "La informacion es incorrecta... Completa nuevamente el formulario"
						}
					}
				});
			}
			return res.render('login', {
				errors: {
					email: {
						msg: "No se encuentra este email..."
					}
				}
			});
		} catch (error) {
			res.send(error)
		}

	},
	profile: (req, res) => {
		res.render('profile', {
			user: req.session.userLogged

		});
	},

	edit: async (req, res) => {
		const id = req.params.id;

		const roles = await db.Rol.findAll();

		const user = await db.User.findOne({ include: { all: true }, where: { id } });

		res.render('userEdit', { user, roles });
	},


	update: async (req, res) => {
		try {
			const avatar = req.file ? req.file.filename : 'default-image.png';
			const userUpdate = {
				name: req.body.name,
				last_name: req.body.last_name,
				email: req.body.email,
				avatar,
				roles_id: req.body.roles,
				password: bcrypt.hashSync(req.body.password, 10),
			};

			await db.User.update(userUpdate, { where: { id: req.params.id }, force: true });
			res.redirect('profile');

		} catch (error) {
			res.send(error);
		}

	},



	logout: (req, res) => {
		res.clearCookie('userEmail');
		req.session.destroy();
		return res.redirect('/');
	},
	// guests: (req, res) => {
	// 	res.render('/')
	// },
	// usersList: (req, res) => {
	// 	res.render('/');
	// },



};

module.exports = controller;