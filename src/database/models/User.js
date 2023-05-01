module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        last_name: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: dataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        avatar: {
            type: dataTypes.TEXT,
            unique: true
        },
        roles_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }


    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'users'
    }
    const User = sequelize.define(alias, cols, config);

    return User
};