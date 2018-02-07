const mongoose = require('mongoose');

const BaseDao = require('./../../core/BaseDao');
const connect = require('./../../core/DbConnection');
const model = require('./model');


class UsersDao extends BaseDao {
    constructor() {
      super(connect.model('users'));
    }

    
}

module.exports = new UsersDao();
