module.exports = (sequelize, dataTypes) => {
    let alias = 'Rol';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.TEXT,
            allowNull: false
        },

    };
    let config = {
        timestamps: false,
        tableName: 'roles'
    }
    const Rol = sequelize.define(alias, cols, config);

    Rol.associate = function (models) {
        Rol.hasMany(models.User, {
            as: 'users',
            foreignKey: 'roles_id'
        });
    };

    return Rol
};