const ProductsDao = require('./private/mongoDao');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');

class ProductsService {
 constructor(){}

  getProducts(query) {
    query = query || {};
    return new Promise ((resolve, reject) => {
      ProductsDao.getData(query)
      .then (data => {
        resolve(data);
      }).catch(err => {
        reject(Utility.GenerateErrorMessage(
          Utility.ErrorTypes.NO_SHOP_LIST));
      });
    });
  }
  insertProducts(products) {

   return new Promise ((resolve, reject) => {
     return ProductsDao.insertData(products)
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
          reject(Utylity.GenerateErrorMessage(
          Utylity.ErrorTypes.USER_UPDATE_ERROR));
        });
      });
  }

  deleteProducts(id) {
      return new Promise((resolve, reject) => {
          console.log("111");
          ProductsDao.deleteData1(id)
          .then(data => {
            resolve(data);
          }).catch(err => {
            reject(Utylity.GenerateErrorMessage(
              Utylity.ErrorTypes.ERROR_IN_DELETING));
          });
      });
  }
}

module.exports = new ProductsService();
