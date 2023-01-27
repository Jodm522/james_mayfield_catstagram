import axios from "axios";
import FormData from 'form-data';
// import { url } from "inspector";
// import {fs} from 'file-system';

export default {
login(context, payload){
  // console.log("HERE")
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
     context.commit('setuser',{
      email : payload.email
      
     },
     res(response))
    }).catch((error)=>{
      rej(error)
    })
  })
},



// I know this isn't a great place to put these, 
// but I feel like it's not worth it to make a whole new store for it
upload(context, payload){
const form = new FormData()
console.log(payload.name)
form.append("name", payload.name)
form.append("image",payload.image, payload.image.name)
console.log(form)
  return new Promise((res, rej)=>{axios(
   { method: 'post',
    url:'http://catstagram.lofty.codes/api/posts/',
     data:form})
     .then((response)=>{
      res(response)
    }).catch((error)=>{
      rej(error)
    })
  })
},







uploadComment(context, payload){
  // console.log(payload)
  return new Promise((res, rej)=>{axios({
    method: 'post',
    url:'http://catstagram.lofty.codes/api/comments/',
    data: {
      "text": payload.text,
      "entry": payload.entry
    }
    }).then((response)=>{
     res(response)
     console.log(response)
    }).catch((error)=>{
      rej(error)
      // console.log(error)
    })
  })

}






}


