const mongoose = require('mongoose');

const BaseDao = require('./../../core/BaseDao');
const connect = require('./../../core/DbConnection');
const model = require('./model');


class GroupsDao extends BaseDao {
    constructor() {
      super(connect.model('groups'));
    }
}

module.exports = new GroupsDao();
