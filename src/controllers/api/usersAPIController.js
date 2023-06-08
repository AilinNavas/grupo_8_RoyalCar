const db = require('../../database/models');

const userApiController = {
    list: async (req, res) => {
        try {
            const users = await db.User.findAll({ attributes: ['id', 'name', 'last_name', 'email'] });
            const allUsers = users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    detail: `http://localhost:3000/api/users/${user.id}`
                };
            });
            let dataToSend = {
                meta: {
                    status: 200,
                    url: 'http://localhost:3000/api/users'
                },
                data: {
                    count: users.length,
                    users: allUsers
                }
            }

            res.json(dataToSend);

        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la información' });
        }
    },
    detail: async (req, res) => {
        try {
            const user = await db.User.findByPk(req.params.id,
                { attributes: ['name', 'last_name', 'email', 'avatar'] });

            const data = {
                name: user.name,
                last_name: user.last_name,
                email: user.email,
                avatar: `public/images/users/${user.avatar}`
            }
            const dataToSend = {
                meta: {
                    status: 200,
                    url: 'http:localhost:3000/api/users/:id'
                },
                data
            }
            res.json(dataToSend);

        } catch (error) {
            res.status(500).json({ error: 'Error al procesar la información' });
        }
    }
};

module.exports = userApiController;
