const express = require('express');
const ShopListsRouter = express.Router();
const ShopListsService = require('./service')

ShopListsRouter.get('/', (req, res) => {
    // if (!req.query.key) {
    //     return res.send(Utility.GenerateErrorMessage(
    //       Utility.ErrorTypes.PERMISSION_DENIED)
    //     );
    // }
    let shoplist = {};
    if(req.query.id){
        shoplist._id = req.query.id
    }
    ShopListsService.getShopLists(shoplist).then(data => {
        return res.send(data);
    });
});

ShopListsRouter.post('/', (req, res) => {
  let shoplist = {
      list_name: req.body.list_name,
    };

    ShopListsService.insertShopLists(shoplist)
      .then(data => {
        return res.send(data);
    }).catch(err => {
        return res.send(err);
    });
});

ShopListsRouter.put('/:id', (req, res) => {

    let id = req.params.id;
    let shoplist = {};
    if (req.body.list_name) {
        shoplist.list_name = req.body.list_name;
    }

    ShopListsService.updateShoplists(id, shoplist).then(data => {
         return res.send(data);
     }).catch(err => {
         res.send(err)
     });

});

ShopListsRouter.delete('/:id', (req, res) => {
    let id = {
        _id: req.params.id
    };
    ShopListsService.deleteShopLists(id).then(data => {
        if(!data) {
            return res.send(Utility.GenerateErrorMessage(
              Utility.ErrorTypes.ERROR_IN_SHOPLIST_DELETING));
        }
        return res.send(data);
    }).catch(err =>{
        res.send(err);
    });
})

module.exports = ShopListsRouter;
