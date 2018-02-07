const ShopListsDao = require('./private/mongoDao');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');

class ShopListsService {
 constructor(){}

  getShopLists(query) {
    query = query || {};
    return new Promise ((resolve, reject) => {
      ShopListsDao.getData(query)
      .then (data => {
        resolve(data);
      }).catch(err => {
        reject(Utility.GenerateErrorMessage(
          Utility.ErrorTypes.NO_SHOP_LIST));
      });
    });
  }

  insertShopLists(ShopList) {

    if (ShopList.list_name.length < AppConstants.LIST_NAME_MIN_LENGTH || ShopList.list_name.length > AppConstants.LIST_NAME_MAX_LENGTH) {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_LIST_NAME_LENGTH));
  }
   return new Promise ((resolve, reject) => {
     return ShopListsDao.insertData(ShopList)
     .then(data => {
       return resolve(data)
     }).catch (err => {
       reject(Utility.GenerateErrorMessage(
       Utility.ErrorTypes.ERROR_CREATION_SHOPLIST));
     });
   });
}


//  updateShoplists()
updateShoplists(id,shop) {
    return new Promise((resolve, reject) => {
      ShopListsDao.updateData(id, shop)
      .then(data => {
        resolve(data);
      }).catch(err => {
        reject(Utylity.GenerateErrorMessage(
        Utylity.ErrorTypes.USER_UPDATE_ERROR));
      });
    });
}

deleteShopLists(id) {
    return new Promise((resolve, reject) => {
        console.log("111");
        ShopListsDao.deleteData1(id)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(Utylity.GenerateErrorMessage(
            Utylity.ErrorTypes.ERROR_IN_DELETING));
        });
    });
}
}

module.exports = new ShopListsService();
