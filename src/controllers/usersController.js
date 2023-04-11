const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');


const usersFilePath = path.join(__dirname, '../database/users.json');
function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}


const controller = {
	register: (req, res) => {
		res.render('register');
	},

	createUser: (req, res) => {
		const resultValidation = validationResult(req);

		if (resultValidation.errors.length > 0) {
			res.render('register', { errors: resultValidation.mapped(), oldData: req.body });
		}

		const image = req.file ? req.file.filename : 'default-image.png';
		const users = getUsers();
		const newUsers = {
			id: users[users.length - 1].id + 1,
			name: req.body.name,
			last_name: req.body.last_name,
			email: req.body.email,
			image,
			category: req.body.category,
			password: bcrypt.hashSync(req.body.password, 10),
			confirm_password: bcrypt.hashSync(req.body.confirm_password, 10)

		};
		users.push(newUsers);
		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
		res.redirect('login');
	},


	login: (req, res) => {
		res.render(path.join(__dirname, '../views/login.ejs'))
	},
	// todos los usuarios
	findAll: function () {
		return getUsers();
	},
	// buscar un usuario por id
	findByPk: function (id) {
		let allUser = controller.findAll();
		let userFound = allUser.find(oneUser => oneUser.id === id);
		return userFound;
	},
	// buscar un usuario por email
	findByField: function (field, text) {
		let allUser = controller.findAll();
		let userFound = allUser.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	loginProcess: (req, res) => {
		let userToLogin = controller.findByField("email", req.body.email);

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
						msg: "La informacion es incorrecta..."
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
	},


	profile: (req, res) => {
		    res.render('profile', {
			user: req.session.userLogged

		});
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