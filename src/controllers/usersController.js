const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const  {check, validationResult, body} = require("express-validator");
const User = require("../models/User");

const usersFilePath = path.join(__dirname, '../database/users.json');
 function getUsers() {
	return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
 }


const controller = {
	register: (req, res) => {
		res.render(path.join(__dirname, '../views/register.ejs'))
	},

	createUser: (req, res) => {

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
		fs.writeFileSync(usersFilePath , JSON.stringify(users, null, 2));
		res.redirect('login');
	},
	

	login: (req, res) => {
		res.render(path.join(__dirname, '../views/login.ejs'))
	},

	 // todos los usuarios
	 findAll: async function(){
        return getUsers();
    },
    // buscar un usuario por id
	findByPk: function (id) {
		let allUser = this.findAll();
		let userFound = allUser.find(oneUser => oneUser.id === id);
		return userFound;
	},
	// buscar un usuario por email
	findByField: function (field, text) {
		let allUser = this.findAll();
		let userFound = allUser.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	// loginProcess: (req, res) => {
	// 	let userToLogin = controller.findByField("email", req.body.email);

	// 	if (userToLogin) {
	// 		let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
	// 		if (isOkThePassword) {
	// 			return res.redirect("profile");
	// 		}
	// 		return res.render('login', {
	// 			errors: {
	// 				password: {
	// 					msg: "La informacion es incorrecta..."
	// 				}
	// 			}
	// 		});
			
	// 	}
	// 	 return res.render('login', {
	// 	errors: {
	// 	 		email: {
	// 			msg: "No se encuentra este email..."
	// 			}
	// 		}
	// 	});
	// },

	loginProcess: async function(req, res){
		let errors = validationResult(req);

		if(errors.isEmpty()){
			let users = controller. findAll();

			for(let i = 0; i< users.length; i++){
				if (users[i].email == req.body.email){
					if(bcrypt.compareSync(req.body.password, users[i].password)){
						let userToLogin = users[i];
						break;
					}
				}
			}

			if ( !userToLogin  ) {
				return res.render ('login', {errors: [
					{msg: 'Credenciales invalidas'}
				]})
				
			}

			req.session.loggedInUser = userToLogin;
			res.redirect('profile');

		}else {
			return res.render('login', {errors: errors.errors});
		}
			 
	},

	profile: (req, res) => {
		res.render(path.join(__dirname, '../views/profile.ejs'))
	},


};

module.exports = controller;