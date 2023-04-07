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
	}

};

module.exports = controller;