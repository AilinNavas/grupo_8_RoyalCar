module.exports = (sequelize, dataTypes) => {
    let alias = 'Brand';
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
        tableName: 'products_brands'
    }
    const Brand = sequelize.define(alias, cols, config);

    return Brand
};