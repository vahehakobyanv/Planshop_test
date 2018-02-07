const express = require('express');
const GroupsRouter = express.Router();
const GroupsService = require('./service');
const Utility = require('./../../services/utility');

GroupsRouter.get('/', (req, res) => {
    // if (!req.query.key) {
    //     return res.send(Utility.GenerateErrorMessage(
    //       Utility.ErrorTypes.PERMISSION_DENIED)
    //     );
    // }
    let group = {};
    if(req.query.id){
        product._id = req.query.id
    }
    GroupsService.getGroups(group).then(data => {
        return res.send(data);
    });
});

GroupsRouter.post('/', (req, res) => {
    let groupname = req.body.groupname;
   let groupowner = req.body.groupowner;
   let shoplists = req.body.shoplists;
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
  let group = {
      groupname: groupname,
      groupowner: groupowner,
      shoplists: shoplists
    };

    GroupsService.insertGroup(group)
      .then(data => {
        return res.send(data);
    }).catch(err => {
        return res.send(err);
    });
});

// ProductsRouter.put('/:id', (req, res) => {
//
//     let id = req.params.id;
//     let shoplist = {};
//     if (req.body.name) {
//         shoplist.name = req.body.name;
//     }
//     if (req.body.group) {
//         shoplist.group = req.body.group;
//     }
//     if (req.body.importance) {
//         shoplist.importance = req.body.importance;
//     }
//
//     ProductsService.updateproducts(id, shoplist).then(data => {
//          return res.send(data);
//      }).catch(err => {
//          res.send(err)
//      });
//
// });

GroupsRouter.delete('/:id', (req, res) => {
    let id = {
        _id: req.params.id
    };
    GroupsService.deleteGroup(id).then(data => {
        if(!data) {
            return res.send(Utility.GenerateErrorMessage(
              Utility.ErrorTypes.ERROR_IN_SHOPLIST_DELETING));
        }
        return res.send(data);
    }).catch(err =>{
        res.send(err);
    });
})

module.exports = GroupsRouter;
