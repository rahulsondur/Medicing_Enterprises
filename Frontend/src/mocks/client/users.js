import { PLATFORM_TOKEN } from "../../config/constants";

class UsersApi {
  
      me() {
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/client/user/me`,{
              method:'GET',
              headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.CLIENT)}`
              }
            });
            const user = await ressponse.json();
    
            resolve(user);
          } catch (err) {
            console.error(err);
            reject(new Error('Internal server error'));
          }
        });
      }

      update(id,data) {
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/client/user/update/${id}`,{
              method:'PUT',
              headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.CLIENT)}`
              },
              body:JSON.stringify(data)
            });
            const user = await ressponse.json();
    
            resolve(user);
          } catch (err) {
            console.error(err);
            reject(new Error('Internal server error'));
          }
        });
      }


      delete(id) {
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/client/user/delete/${id}`,{
              method:'DELETE',
              headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.CLIENT)}`
              }
            });
            const user = await ressponse.json();
    
            resolve(user);
          } catch (err) {
            console.error(err);
            reject(new Error('Internal server error'));
          }
        });
      }

}


export const userApi = new UsersApi();