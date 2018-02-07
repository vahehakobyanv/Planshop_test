const express = require('express');
const ProductsRouter = express.Router();
const ProductsService = require('./service');
const Utility = require('./../../services/utility');

ProductsRouter.get('/', (req, res) => {
    // if (!req.query.key) {
    //     return res.send(Utility.GenerateErrorMessage(
    //       Utility.ErrorTypes.PERMISSION_DENIED)
    //     );
    // }
    let product = {};
    if(req.query.id){
        product._id = req.query.id
    }
    ProductsService.getProducts(product).then(data => {
        return res.send(data);
    });
});

ProductsRouter.post('/', (req, res) => {
    let name = req.body.name;
   let group = req.body.group;
   let importance = req.body.importance;
   // if (!['dairy', 'fruits', 'meats', 'fish', 'sweets', 'juice', 'alcoholic'].includes(group)) {
   //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.ERROR_PRODUCTS_GROUP));
   // }
   //
   // if (!['very', 'middle', 'less'].includes(importance)) {
   //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.ERROR_IMPORTANCE));
   // }
   //
   // if (name.length > AppConstants.NAME_MAX_LENGTH || name.length < AppConstants.NAME_MIN_LENGTH) {
   //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_NAME_RANGE));
   // }
  let products = {
      name: name,
      group: group,
      importance: importance
    };

    ProductsService.insertProducts(products)
      .then(data => {
        return res.send(data);
    }).catch(err => {
        return res.send(err);
    });
});

ProductsRouter.put('/:id', (req, res) => {

    let id = req.params.id;
    let shoplist = {};
    if (req.body.name) {
        shoplist.name = req.body.name;
    }
    if (req.body.group) {
        shoplist.group = req.body.group;
    }
    if (req.body.importance) {
        shoplist.importance = req.body.importance;
    }

    ProductsService.updateproducts(id, shoplist).then(data => {
         return res.send(data);
     }).catch(err => {
         res.send(err)
     });

});

ProductsRouter.delete('/:id', (req, res) => {
    let id = {
        _id: req.params.id
    };
    ProductsService.deleteProducts(id).then(data => {
        if(!data) {
            return res.send(Utility.GenerateErrorMessage(
              Utility.ErrorTypes.ERROR_IN_SHOPLIST_DELETING));
        }
        return res.send(data);
    }).catch(err =>{
        res.send(err);
    });
})

module.exports = ProductsRouter;
