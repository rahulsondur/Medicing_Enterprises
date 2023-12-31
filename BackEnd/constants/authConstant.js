/**
 * authConstant.js
 * @description :: constants used in authentication
 */

const JWT = {
    USERAPP_SECRET: 'myjwtuserappsecret',
    CLIENT_SECRET: 'myjwtclientsecret',
    OPERATOR_SECRET: 'myjwtoperatorsecret',
    ADMIN_SECRET: 'myjwtadminsecret',
    EXPIRES_IN: 10000
  };
  
  const USER_TYPES = {
    User: 1,
    Client:2,
    Operator:3,
    Admin: 4,

  };
  

  const PLATFORM = {
    USERAPP: 1,
    ClIENT:2,
    OPERATOR:3,
    ADMIN: 4,
  };
  
  let LOGIN_ACCESS = {
    [USER_TYPES.User]: [PLATFORM.USERAPP],
    [USER_TYPES.Client]: [PLATFORM.ClIENT],
    [USER_TYPES.Operator]: [PLATFORM.OPERATOR],
    [USER_TYPES.Admin]: [PLATFORM.ADMIN],
  };
  
  const FORGOT_PASSWORD_WITH = {
    LINK: {
      sms: false,
      email: true
    },
    EXPIRE_TIME: 10
  };
  
  const MAX_LOGIN_RETRY_LIMIT = 5;
  const LOGIN_REACTIVE_TIME = 2;
  

  module.exports = {
    JWT,
    USER_TYPES,
    PLATFORM,
    MAX_LOGIN_RETRY_LIMIT,
    LOGIN_REACTIVE_TIME,
    LOGIN_ACCESS,
    FORGOT_PASSWORD_WITH
  };