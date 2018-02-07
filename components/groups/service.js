const GroupsDao = require('./private/mongoDao');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');

class GroupsService {
 constructor(){}

  getGroups(query) {
    query = query || {};
    return new Promise ((resolve, reject) => {
      GroupsDao.getData(query)
      .then (data => {
        resolve(data);
      }).catch(err => {
        reject(Utility.GenerateErrorMessage(
          Utility.ErrorTypes.NO_SHOP_LIST));
      });
    });
  }
  insertGroup(group) {

   return new Promise ((resolve, reject) => {
     return GroupsDao.insertData(group)
     .then(data => {
       return resolve(data)
     }).catch (err => {
       reject(Utility.GenerateErrorMessage(
       Utility.ErrorTypes.ERROR_CREATION_SHOPLIST));
     });
   });
  }

  updateproducts(id,shop) {
      return new Promise((resolve, reject) => {
        ProductsDao.updateData(id, shop)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(Utility.GenerateErrorMessage(
          Utility.ErrorTypes.USER_UPDATE_ERROR));
        });
      });
  }

  deleteGroup(id) {
      return new Promise((resolve, reject) => {
          console.log("111");
          GroupsDao.deleteData(id)
          .then(data => {
            resolve(data);
          }).catch(err => {
            reject(Utility.GenerateErrorMessage(
              Utility.ErrorTypes.ERROR_IN_DELETING));
          });
      });
  }
}

module.exports = new GroupsService();
