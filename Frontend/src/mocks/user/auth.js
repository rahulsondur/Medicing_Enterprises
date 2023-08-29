import { PLATFORM_TOKEN } from "../../config/constants";


class AuthApi {
    async login({ username, password }) {
      console.log(process.env.REACT_APP_HOST)
         return new Promise( async (resolve, reject) => {
        try {
          const ressponse = await fetch(`${process.env.REACT_APP_HOST}/userapp/auth/login`,{
            method:'POST',
            headers:{
              'Content-Type':"application/json"
            },
            body:JSON.stringify({username,password})
           
          });
          const user = await ressponse.json();
          localStorage.setItem(PLATFORM_TOKEN.USERAPP,user?.data?.token)
          resolve(user);
        } catch (err) {
          console.error(err);
          reject(new Error('Internal server error'));
        }
      });
    }

    async register(obj) {
       
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/userapp/auth/register`,{
              method:'POST',
              headers:{
                'Content-Type':"application/json"
              },
              body:JSON.stringify(obj)
             
            });
            const user = await ressponse.json();
            console.log(user)
             resolve(user);
            
          } catch (err) {
            console.error(err);
            reject(new Error('Internal server error'));
          }
        });
      }

   


}


export const authApi = new AuthApi();