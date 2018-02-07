const Utility = require('./../../services/utility');

class BaseDao {
  constructor(collection) {
    this.collection = collection;
  }

  getData(query) {
    if (!this.collection) {
        return (Utility.generateErrorMessage(
          Utility.ErrorTypes.UNKNOWN_ERROR) //TODO change error type
        );
    }
    query = query || {};
    console.log(this.collection);
    return this.collection.find(query);
  }

  insertData(query) {
    if (!query) {
      return (Utility.generateErrorMessage(
        Utility.ErrorTypes.UNKNOWN_ERROR) //TODO change error type
      );
    }
    return this.collection.create(query);
  }

  updateData(id, query) {
    if (!query) {
      return (Utility.generateErrorMessage(
        Utility.ErrorTypes.UNKNOWN_ERROR) //TODO change error type
      );
    }
    console.log(query);
    return this.collection.update({_id: id}, {$set: query});
  }

  deleteData(id) {

    return this.collection.findOneAndRemove({_id: id});
  }
}

module.exports = BaseDao;
