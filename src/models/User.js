const fs = require("fs");
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/users.json');

const User={
       
    getData: function() {
        return JSON.parse(fs.readFileSync(this.usersFilePath, 'utf-8'));
    },
    // todos los usuarios
    findAll: function(){
        return this.getData();
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
}
module.exports= User;
