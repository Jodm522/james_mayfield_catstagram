import axios from "axios";
import FormData from 'form-data';
// import {fs} from 'file-system';

export default {
login(context, payload){
    return new Promise((res, rej)=>{axios({
        method: 'post',
        url:'http://catstagram.lofty.codes/api/users/login/',
        data: {
          "email": payload.email,
          "password": payload.password,
          "first_name": "",
          "last_name": ""
        }
      }).then((response)=>{
       context.commit('setuser',{
        email : payload.email
        
       },
       res(response))
      }).catch((error)=>{
        rej(error)
      })
    })
      
      

},
signup(context, payload){

    return new Promise((res, rej)=>{axios({
        method: 'post',
url:'http://catstagram.lofty.codes/api/users/',
data: {
  "email": payload.email,
  "password": payload.password,
  "first_name": payload.firstName,
  "last_name": payload.lastName
}
      }).then((response)=>{
        res(response)

      }).catch((error)=>{
        rej(error)
      })
    })
},

// I know this isn't a great place to do this, 
// but I feel like it's not worth it to make a whole new store for it
upload(context, payload){
const form = new FormData()
form.append("name", payload.name)
form.append("image",payload.image, payload.image.name)

  return new Promise((res, rej)=>{axios.post(
    'http://catstagram.lofty.codes/api/posts/', form).then((response)=>{
      res(response)
    }).catch((error)=>{
      rej(error)
    })
  })
}

}
