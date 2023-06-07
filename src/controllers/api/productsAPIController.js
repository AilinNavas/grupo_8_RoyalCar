const db = require('../../database/models');

const productApiController = {
    list: async (req, res) => {
        try {
            let products = await db.Product.findAll();
            let brands = await db.Brand.findAll();

            let processedProducts = products.map((product) => product.dataValues);
            let processedBrands = brands.map((brand) => brand.dataValues);

            let namesBrands = [];
            let countBrands = [];
            let idBrands = [];

            processedBrands.forEach((brand) => {
                idBrands.push(brand.id);
                namesBrands.push(brand.name);
                countBrands.push(0);
            })
            let count = 0;

            idBrands.forEach((brandId) => {
                count = 0;
                processedProducts.forEach((product) => {
                    if (product.products_brands_id == brandId) {
                        count = count + 1;
                        countBrands[brandId - 1] = count;
                    }
                })
            })
             const countByBrandsProcessed = namesBrands.map((nameBrand, index) => {
                 return `${nameBrand}: ${countBrands[index]}`;
               });
            //  let countBrandsProcessed = [];
            //  for (let i = 0; i < namesBrands.length; i++) {
            //      countBrandsProcessed.push(namesBrands[i] + ':  ' + countBrands[i]);
            //  }

            processedProducts.forEach((product) => {
                delete product.year;
                delete product.price;
                delete product.image;
                delete product.products_brands_id;
                product.detailUrl = `http://localhost:3000/api/products/${product.id}`
            })
            let dataToSend = {
                countProducts: products.length,
                countByBrand: countByBrandsProcessed,
                brandsCount: countBrands.length,
                products: processedProducts,
                status: 200
            }

            return res.status(200).json(dataToSend);


        } catch (error) {
            return res.status(500).json({ error: 'Error al procesar la información' });
        }


    },
    detail: (req, res) => {
        res.send('hola desde /api/products/:id')
    }

};

module.exports = productApiController;