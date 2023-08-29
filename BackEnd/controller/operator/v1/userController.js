

const User = require('../../../model/user');
const dbService = require("../../../utils/dbServices");
const userSchemaKey = require('../../../utils/validation/userValidation');
const validation = require('../../../utils/validateRequest');
const ObjectId = require('mongodb').ObjectId;
const common = require('../../../utils/comon');

 /**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
 const getLoggedInUserInfo = async (req, res) => {
  try {
    const query = {
      _id: req.user.id,
      isDeleted: false
    };
    query.isActive = true;
    let foundUser = await dbService.findOne(User, query);
    if (!foundUser) {
      return res.recordNotFound();
    }
    return res.success({ data: foundUser });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};


 

/**
 * @description : find document of User from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found User. {status, message, data}
 */
const getUser = async (req,res) => {
  try {
    if (!req.params.id) {
      return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
    }
    let query = {};
    if (!ObjectId.isValid(req.params.id)) {
      return res.validationError({ message : 'invalid objectId.' });
    }
    query._id = req.params.id;
    let options = {};
    let foundUser = await dbService.findOne(User,query, options);
    if (!foundUser){
      return res.recordNotFound();
    }
    return res.success({ data :foundUser });
  }
  catch (error){
    return res.internalServerError({ message:error.message });
  }
};

  /**
 * @description : update document of User with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User.
 * @return {Object} : updated User. {status, message, data}
 */
const updateUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
          }
        if(req.body.password)
        return res.validationError({ message: `Password is not update this method` });

        // if(req.params.id){
        //     if(req.user.id.toString()!==req.params.id)
        //         return res.unAuthorized({ message: 'Unautherized User' });
        //   }

      let dataToUpdate = { ...req.body, };
      let validateRequest = validation.validateParamsWithJoi(
        dataToUpdate,
        userSchemaKey.updateSchemaKeys
      );
      if (!validateRequest.isValid) {
        return res.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
      }
        // check data availble in database or not
    
        if(req.body.email){
          let checkUniqueFields = await common.checkUniqueFieldsInDatabase(User,['email'],dataToUpdate,'REGISTER');
          if (checkUniqueFields.isDuplicate){
            return res.validationError({ message : `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
          }
      }
      if(req.body.phone){
          let checkUniqueFields = await common.checkUniqueFieldsInDatabase(User,['phone'],dataToUpdate,'REGISTER');
        if (checkUniqueFields.isDuplicate){
          return res.validationError({ message : `${checkUniqueFields.value} already exists.Unique ${checkUniqueFields.field} are allowed.` });
        }
      }
  
      const query = { _id: req.params.id };
      let updatedUser = await dbService.updateOne(User, query, dataToUpdate);
      if (!updatedUser) {
        return res.recordNotFound();
      }
      return res.success({ data: updatedUser });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };

  /**
 * @description : deactivate document of User from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated document of User.
 * @return {Object} : deactivated User. {status, message, data}
 */
const deleteUser = async (req, res) => {
    try {
      if (!req.params.id) {
        return res.badRequest({ message: 'Insufficient request parameters! id is required.' });
      }
      // if(req.params.id){
      //   if(req.user.id.toString()!==req.params.id)
      //       return res.unAuthorized({ message: 'Unautherized User' });
      // }
      const query = { _id: req.params.id };
      let updatedUser = await dbService.deleteOne(User, query);
      if (!updatedUser) {
        return res.recordNotFound();
      }
      return res.success({ data: updatedUser });
    } catch (error) {
      return res.internalServerError({ message: error.message });
    }
  };

      


  module.exports = {
    getLoggedInUserInfo,
    getUser,
    updateUser,
    deleteUser
}