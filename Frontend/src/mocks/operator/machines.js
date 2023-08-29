import { PLATFORM_TOKEN } from "../../config/constants";

class MachinesApi {

  create(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const ressponse = await fetch(`${process.env.REACT_APP_HOST}/operator/machine/create`,{
          method:'POST',
          headers:{
            'Content-Type':"application/json",
            'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.OPERATOR)}`
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



    async list(page=1,limit=10,filters={}, sort="") {

        const obj =   {
            "query": {},
          "options": {
            "collation":{"locale": "en" },
            "sort": sort,
            "populate": "",
            "projection": "",
            "lean": false,
            "leanWithId": true,
            "page": page,
            "limit": limit,
            "pagination": true,
            "useEstimatedCount": false,
            "useCustomCountFn": false,
            "forceCountFn": false,
            "read": {},
            "options": {}
          },
          "isCountOnly": false
        }
      console.log(process.env.REACT_APP_HOST)
         return new Promise( async (resolve, reject) => {
        try {
          const ressponse = await fetch(`${process.env.REACT_APP_HOST}/operator/machine/list`,{
            method:'POST',
            headers:{
              'Content-Type':"application/json",
              'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.OPERATOR)}`
            },
            body:JSON.stringify(obj)
           
          });
          const user = await ressponse.json();
          resolve(user);
        } catch (err) {
          console.error(err);
          reject(new Error('Internal server error'));
        }
      });
    }

    async get(id) {
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/operator/machine/get/${id}`,{
              method:'GET',
              headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.OPERATOR)}`
              }
             
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

    


      count() {
        return new Promise(async (resolve, reject) => {
          try {
            const ressponse = await fetch(`${process.env.REACT_APP_HOST}/operator/machine/count`,{
              method:'POST',
              headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${localStorage.getItem(PLATFORM_TOKEN.OPERATOR)}`
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


export const machinesApi = new MachinesApi();