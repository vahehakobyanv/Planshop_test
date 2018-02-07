const express = require('express');
const UsersRouter = express.Router();
const crypto = require('crypto');
const UserValidator = require('./../../services/validators/userValidator');
const EmailValidator = require('./../../services/validators/emailValidator');
const Utility = require('./../../services/utility');
const AppConstants = require('./../../settings/constants');
const UsersService = require('./service');

//GET
UsersRouter.get('/', (req, res) => {

    UsersService.getUsers().then(data => {
      return res.send(data);
    });
});

//POST
UsersRouter.post('/', (req, res) => {

      let username = req.body.username;
      let password = req.body.password;
      let name = req.body.name;
      let email = req.body.email;
      let age = req.body.age;


  let uv_response = UserValidator.validateUsername(username) ;
  if (uv_response != Utility.ErrorTypes.SUCCESS) {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.uv_response));
  }

  let pas_response = UserValidator.validatePassword(password)
  if (pas_response != Utility.ErrorTypes.SUCCESS) {
      return res.send(Utylity.GenerateErrorMessage(Utylity.ErrorTypes.pas_response));
  }
  let name_response = UserValidator.validateName(name)
  if (name_response != Utility.ErrorTypes.SUCCESS) {
    return  res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.name_response));
  }

  if (age < AppConstants.AGE_MIN_LENGTH || age > AppConstants.AGE_MAX_LENGTH) {
    return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_AGE_RANGE));
  }

  if (EmailValidator.validator(email) === false) {
    return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.EMAIL_ERROR));
  }

  password = crypto.createHash('md5').update(password + username).digest('hex');
let user = {
    username:username,
    password: password,
    name: name,
    email: email,
    age: age

}
  UsersService.insertUsers(user).then(data => {
      return res.send(data);
  }).catch(err => {
    return res.send(err);
  });

});

UsersRouter.put('/:id', (req, res) => {


    let user = {};
    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.name) {
        user.name = req.body.name;
    }
    if (req.body.age) {
        user.age = req.body.age;
    }
    if (req.body.email) {
        user.email = req.body.email;
    }
    if(req.body.password){
            res.send("If you want to change password make a put request '/api/users/password' ");
        }
    // let uv_response = UserValidator.validateUsername(userusername);
    // if (uv_response != Utility.ErrorTypes.SUCCESS) {
    //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.uv_response));
    // }
    //
    // let pas_response = UserValidator.validatePassword(password);
    // if (pas_response != Utility.ErrorTypes.SUCCESS) {
    //   return  res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.pas_response));
    // }
    //
    // if (name.length < AppConstants.NAME_MIN_LENGTH || name.length > AppConstants.NAME_MAX_LENGTH) {
    //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_NAME_RANGE));
    // }
    // if (age < AppConstants.AGE_MIN_LENGTH || age > AppConstants.AGE_MAX_LENGTH) {
    //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_AGE_RANGE));
    // }
    // if (EmailValidator.validator(email) === false) {
    //   return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.EMAIL_ERROR));
    // }
    //
    // password = crypto.createHash('md5').update(username + password).digest('hex');
    UsersService.updateUsers(req.params.id, user).then(data => {
      return res.send(data);
    });
});

 UsersRouter.delete('/:id', (req, res) => {
   if (!req.params.id) {
     return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.EMPTY_ID_DELETE));
   }
   UsersService.deleteUsers(req.params.id).then(data => {
      return res.send("Yes!!!!");
   });
 });

module.exports = UsersRouter;
