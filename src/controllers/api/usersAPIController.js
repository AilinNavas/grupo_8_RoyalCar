const db = require('../../database/models');

const userApiController = {
    list: (req, res) => {
        db.User.findAll( {
            attributes : ['id' , 'name', 'last_name' , 'email']
        })
            .then((users) => {
                const allUsers = users.map((user) => {
                    return {
                        id : user.id,
                        name : user.name,
                        email: user.email,
                        detail : `http://localhost:3000/api/users/${user.id}` 
                    };
                });
                res.json({
                    count:users.length,
                    users: allUsers
                })
            }).catch((error) => {
                res.send(error)
            });
    },
    detail: (req, res) => {
      db.User.findByPk(req.params.id,
         { attributes : ['name', 'last_name' , 'email', 'avatar']
      })
      .then(user => {
        res.json({
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            avatar : `public/images/users/${user.avatar}`
        })
      })
    }
};

module.exports = userApiController;