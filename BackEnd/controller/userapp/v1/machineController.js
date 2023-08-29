/**
 * MachineController.js
 * @description : exports action methods for Machine.
 */

const Machine = require('../../../model/machine');
const MachineSchemaKey = require('../../../utils/validation/machineValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbServices');
const ObjectId = require('mongodb').ObjectId;
const utils = require('../../../utils/comon');
   

/**
 * @description : find all documents of Machine from collection based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, pagination, populate}, isCountOnly}
 * @param {Object} res : response contains data found from collection.
 * @return {Object} : found Machine(s). {status, message, data}
 */
const findAllMachine = async (req,res) => {
    try {
      let options = {};
      let query = {};
      let validateRequest = validation.validateFilterWithJoi(
        req.body,
        MachineSchemaKey.findFilterKeys,
        Machine.schema.obj
      );
      if (!validateRequest.isValid) {
        return res.validationError({ message: `${validateRequest.message}` });
      }
      if (typeof req.body.query === 'object' && req.body.query !== null) {
        query = { ...req.body.query };
      }
      if (req.body.isCountOnly){
        let totalRecords = await dbService.count(Machine, query);
        return res.success({ data: { totalRecords } });
      }
      if (req.body && typeof req.body.options === 'object' && req.body.options !== null) {
        options = { ...req.body.options };
      }
      let foundMachines = await dbService.paginate( Machine,query,options);
      if (!foundMachines || !foundMachines.data || !foundMachines.data.length){
        return res.recordNotFound(); 
      }
      return res.success({ data :foundMachines });
    } catch (error){
      return res.internalServerError({ message:error.message });
    }
  };


/**
 * @description : find document of Machine from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains document retrieved from table.
 * @return {Object} : found Machine. {status, message, data}
 */
const getMachine = async (req,res) => {
    try {
      let query = {};
      if (!ObjectId.isValid(req.params.id)) {
        return res.validationError({ message : 'invalid objectId.' });
      }
      query._id = req.params.id;
      let options = {};
      let foundMachine = await dbService.findOne(Machine,query, options);
      if (!foundMachine){
        return res.recordNotFound();
      }
      return res.success({ data :foundMachine });
    }
    catch (error){
      return res.internalServerError({ message:error.message });
    }
  };


  /**
 * @description : returns total number of documents of Machine.
 * @param {Object} req : request including where object to apply filters in req body 
 * @param {Object} res : response that returns total number of documents.
 * @return {Object} : number of documents. {status, message, data}
 */
const getMachineCount = async (req,res) => {
    try {
      let where = {};
      let validateRequest = validation.validateFilterWithJoi(
        req.body,
        MachineSchemaKey.findFilterKeys,
      );
      if (!validateRequest.isValid) {
        return res.validationError({ message: `${validateRequest.message}` });
      }
      if (typeof req.body.where === 'object' && req.body.where !== null) {
        where = { ...req.body.where };
      }
      let countedMachine = await dbService.count(Machine,where);
      return res.success({ data : { count: countedMachine } });
    } catch (error){
      return res.internalServerError({ message:error.message });
    }
  };

  


  module.exports = {
    findAllMachine,
    getMachine,
    getMachineCount
  };