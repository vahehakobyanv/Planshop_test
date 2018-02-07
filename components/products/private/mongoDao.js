const mongoose = require('mongoose');

const BaseDao = require('./../../core/BaseDao');
const connect = require('./../../core/DbConnection');
const model = require('./model');


class ProductsDao extends BaseDao {
    constructor() {
      super(connect.model('products'));
    }
    deleteData1(id) {
        console.log(id);
        this.collection.findOne({_id: id},(err,data) =>{
            if(data.isDeleted == false){
                console.log(data);
               console.log(data.id +" ");
                return this.collection.update({_id: data.id},{$set: {isDeleted: true}});
            }
            else {
                return res.send(data);
            }
        })
    }

}

module.exports = new ProductsDao();
