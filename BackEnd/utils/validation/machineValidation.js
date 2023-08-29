/**
 * paymentValidation.js
 * @description :: validate each post and put request as per payment model
 */

const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('./comonFilterValidation');

/** validation keys and properties of payment */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  number: joi.number().integer().allow(0),

}).unknown(true);

/** validation keys and properties of payment for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  name: joi.string().allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  number: joi.number().integer().allow(0),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of payment for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
  isDeleted:joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
  isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
  number: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
  name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
  status: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select
    
}).unknown(true);
