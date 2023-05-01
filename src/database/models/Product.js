module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          model: {
            type: dataTypes.TEXT,
            allowNull: false
          },
          year: {
            type: dataTypes.INTEGER,
            allowNull: false
          },
          description: {
            type: dataTypes.TEXT,
            allowNull: false
          },
          price: {
            type: dataTypes.DECIMAL(10, 2),
            allowNull: false
          },
          image: {
            type: dataTypes.TEXT,
            unique: true
          },
          products_brands_id: {
            type: dataTypes.INTEGER,
            allowNull: false
          }
    }


    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        tableName: 'products'
    }
    const Product = sequelize.define(alias, cols, config);

    return Product
};