const mongoose = require('mongoose');
const model = require('./model');
const BaseDao = require('./../../core/BaseDao');
const connect = require('./../../core/DbConnection');
const Utility = require('./../../../services/utility');



class ShopListsDao extends BaseDao {
  constructor() {
      super(connect.model('shoplists'));
  }
  deleteData1(id) {
      console.log(id);
      this.collection.findOne({_id: id},(err,data) =>{
          if(data.isActive == true){
              console.log(data);
             console.log(data.id +" ");
              return this.collection.update({_id: data.id},{$set: {isActive: false}});
          }
          else {
              return res.send(data);
          }
      })
  }
}
  module.exports = new ShopListsDao();
