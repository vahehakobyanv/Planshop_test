const UsersDao = require('./private/mongoDao');
const Utility = require('./../../services/utility');

class UsersService {
  constructor(){}

  getUsers() {
    return new Promise((resolve, reject) =>{
      //options = options || {};
      return  UsersDao.getData()
        .then(data => {
            resolve(data);
        }).catch(err => {
          reject(Utylity.GenerateErrorMessage(
            Utylity.ErrorTypes.SEARCH_ERROR));
        });
    });

  }

  insertUsers(user) {
    return new Promise((resolve, reject) => {
      UsersDao.inserData (
      user). then(data => {
        resolve(data);
      }).catch(err => {
        reject(Utylity.GenerateErrorMessage(
        Utylity.ErrorTypes.ERROR_CREATION_USER));
      });
    });
  }

  updateUsers(id, user) {
    return new Promise((resolve, reject) => {
      UsersDao.updateData(id, user)
      .then(data => {
        resolve(data);
      }).catch(err => {
        reject(Utylity.GenerateErrorMessage(
        Utylity.ErrorTypes.USER_UPDATE_ERROR));
      });
    });
  }

  deleteUsers(id) {
    return new Promise((resolve, reject) => {
        UsersDao.deleteData(id)
        .then(data => {
          resolve(data);
        }).catch(err => {
          reject(Utylity.GenerateErrorMessage(
            Utylity.ErrorTypes.ERROR_IN_DELETING));
        });
    });
  }

}



module.exports = new UsersService();
