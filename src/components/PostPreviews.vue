<script setup>
</script>

<template>
    <div>
      <!-- Mobile Phone Setup -->
      <MqResponsive target = "phone">
<div id="mobilePostContainer">

      <div id="singleMobilePostCard" v-for="post in posts" @click="openPostModal(post.pk)">
        <v-lazy-image v-bind:src="`${post.imageURL}`"
         onerror="this.onerror=null; this.src ='/src/assets/images/loss.jpg'"
        id="singleMobilePostImage"/>
        <div id="singleMobilePostInfo">
          <div id="singleMobilePostTitle">{{post.name}}</div>
          <div id="singleMobileCommentNum">{{ post.numComments}} Comments</div>
        </div>
        
      </div>
    </div>
    </MqResponsive>
    <!-- Desktop Setup -->
    <MqResponsive target = "desktop">
<div id="desktopPostContainer">
      <div id="singleDesktopPostCard" v-for="post in posts">
        <div id="singleDesktopPostTitle">{{post.name}}</div>
        
      </div>
    </div>
    </MqResponsive>
      
    </div>
</template>


<script>
import axios from 'axios'
import { MqResponsive } from "vue3-mq";
import VLazyImage from "v-lazy-image";
const api = 'http://catstagram.lofty.codes/api/posts/'

export default{
  components: {
    "v-lazy-image": VLazyImage,
    MqResponsive
  },
  data(){
    return{
      singlePostPk:null
    }
  },
  methods:{
    getPosts(){
      //Fetch request to API 
      axios.get(api).then((res)=>{
        // Pull data from axios response
          return res.data
        }).then((data)=>{
         let results = []
        //  console.log(data)
          //Push items to an array 
          for(const item in data){
            results.push({
              pk: data[item].pk,
              name: data[item].name,
              imageURL:`http://catstagram.lofty.codes/media/${data[item].image}`, //Using this to have image URLs ready to go
              numComments: data[item].comments.length
            })
          }
          this.posts = results
        }).catch(error=>{
          console.log(error)
        })
    },
    openPostModal(pk){
     this.singlePostPk = pk
    }
  },
  beforeMount(){
    this.getPosts()

  }
}
</script>



<style scoped>
#mobilePostContainer{
/* background-color: aqua; */
width:100%;
margin: 0 auto;
margin-top:25px;
display: grid;
grid-template-columns:  repeat(2,50%);

}
#singleMobilePostCard{
  /* background-color: chocolate; */
  /* padding-top: 100%; */
  /* position: relative; */
  aspect-ratio: .65;
  width: 95%;
  height: 95%;
  margin: auto;
  border: 2px solid rgb(75, 74, 74); 
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
}
#singleMobilePostImage{
  /* background-color: blue; */
  margin: 0 auto;
  width:100%;
  height:60%;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  margin-bottom: 10px;
}

#singleMobilePostInfo{
  /* background-color: aqua; */
height:25%;
width:100%;
/* margin: 0 auto; */
/* padding: 10px; */
display: flex;
flex-direction: column;
justify-content: space-around;
font-size: 4.2vw;
}

#singleMobilePostTitle{
width: 90%;
height:55%;
margin:auto;
text-align: center;
overflow: hidden;
text-overflow: ellipsis;
color:rgb(218, 98, 13);;
/* padding: 10px; */
}

#singleMobileCommentNum{
width: 90%;
margin:auto;
text-align: center;
overflow: hidden;
text-overflow: ellipsis;
padding-top: 10px;
}



</style>
