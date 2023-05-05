module.exports = (sequelize, dataTypes) => {
    let alias = 'ProductHasColor';
    let cols = {
        products_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        colors_id: {
            type: dataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },

    };
    let config = {
        timestamps: false,
        tableName: 'products_has_colors'
    }
    const ProductHasColor = sequelize.define(alias, cols, config);

    return ProductHasColor
};