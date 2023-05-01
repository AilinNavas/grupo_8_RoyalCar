module.exports = (sequelize, dataTypes) => {
    let alias = 'Color';
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
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'products_colors'
    }
    const Color = sequelize.define(alias, cols, config);
   Color.associate = function(models) {
        Color.belongsToMany(models.Product, {
            as: 'products',
            through: 'products_has_colors',
            foreignKey: 'colors_id',
            otherKey: 'products_id',
            timestamps: false
         });
    }

    return Color
};