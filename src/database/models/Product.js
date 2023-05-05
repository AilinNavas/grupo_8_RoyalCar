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
        timestamps: false,
        tableName: 'products'
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
      Product.belongsTo(models.Brand, {
         as: 'brand',
         foreignKey: 'products_brands_id'
      });
      Product.belongsToMany(models.Color, {
        as: 'colors',
        through: 'products_has_colors',
        foreignKey: 'products_id',
        otherKey: 'colors_id',
        timestamps: false
     });
};

    return Product
};