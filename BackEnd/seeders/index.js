/**
 * seeder.js
 * @description :: functions that seeds mock data to run the application
 */

const bcrypt = require('bcrypt');
const User = require('../model/user');
const authConstant = require('../constants/authConstant');

/* seeds default users */
async function seedUser() {
  try {
    let userToBeInserted = {};
    let found ;

    // User Data Initialize
    userToBeInserted = {
      'password': 'user@12345',
      'isDeleted': false,
      'email': 'user@gmail.com',
      'name':"user",
      'contact.phone': 1234567890,
      'isActive': true,
      'userType': authConstant.USER_TYPES.User
    };
   
 
     found = await User.findOne({'email': 'user@gmail.com' });

    if(found){
     delete userToBeInserted['password']
    await User.findOneAndUpdate( { 'email': 'user@gmail.com' }, userToBeInserted);
    } else{
     await User.create( userToBeInserted);
    }
   

    // Client Data Initialize
    userToBeInserted = {
        'password': 'client@12345',
        'isDeleted': false,
        'email': 'client@gmail.com',
        'name':"client",
        'contact.phone': 1234567891,
        'isActive': true,
        'userType': authConstant.USER_TYPES.Client
      };
    
   
       found = await User.findOne({'email': 'client@gmail.com' });
  
      if(found){
        delete userToBeInserted['password']
       await User.findOneAndUpdate( { 'email': 'client@gmail.com' }, userToBeInserted);
      } else{
         await User.create( userToBeInserted);
      }


      // Operator Data Initialize
      userToBeInserted = {
        'password': 'operator@12345',
        'isDeleted': false,
        'email': 'operator@gmail.com',
        'name':"operator",
        'contact.phone': 1234567892,
        'isActive': true,
        'userType': authConstant.USER_TYPES.Operator
      };
    
   
       found = await User.findOne({'email': 'operator@gmail.com' });
  
      if(found){
        delete userToBeInserted['password']
      await User.findOneAndUpdate( { 'email': 'operator@gmail.com' }, userToBeInserted);
      } else{
     await User.create( userToBeInserted);
      }


    // Admin Data Initialize
    userToBeInserted = {
      'password': 'admin@12345',
      'isDeleted': false,
      'email': 'admin@gmail.com',
      'name':"admin",
      'contact.phone': 1234567893,
      'isActive': true,
      'userType': authConstant.USER_TYPES.Admin
    };
  
   
    found = await User.findOne({'email': 'admin@gmail.com' });

   if(found){
    delete userToBeInserted['password']
   await User.findOneAndUpdate( { 'email': 'admin@gmail.com' }, userToBeInserted);
   } else{
  await User.create( userToBeInserted);
   }


    console.info('Users seeded 🍺');
  } catch (error) {
    console.log('User seeder failed due to ', error.message);
  }
}


   
async function seedData(allRegisterRoutes) { 
  await seedUser(); 
  
};
module.exports = seedData;