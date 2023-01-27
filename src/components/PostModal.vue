<script setup>
import { MqResponsive } from "vue3-mq";
</script>


<template>
    <MqResponsive target="phone">
        <div class="postModalContainer">
        <div class="titleContainer">{{ title }}</div>

        <div class="imageContainer">
            <v-lazy-image v-bind:src="`${imageURL}`"
         onerror="this.onerror=null; this.src ='/src/assets/images/loss.jpg'"
        class="postImage"/>
        </div>
        <div class="commentsBarContainer">
            <div class="commentBarSpacer"></div>
            <div class="commentsTitle">Comments</div>
            <div class="commentBarSpacer">
                <img class="newCommentButton" src="../assets/images/darkplus.png" @click="commentsActive =!commentsActive"/>
            </div>
        </div>
        
        
        <div class="commentsContainer">
            <div class="singleCommentContainer" v-for="comment in comments" >
                <img alt="Catstagram Logo" class="dummyProfile" src="../assets/images/darkmodeCat.png"/>
                <div class="usernameComment">
                <div class="usernameHolder">Username</div>
                <div class="textHolder">{{comment.text}}</div>
                </div>
            </div>
        </div>
        <div v-if="commentsActive" class="newCommentContainer">
            <div class="newCommentTitle">New Comment</div>
            <div class="commentArea">
            <textarea v-if ="!isSubmitting && !successfulSubmit" class="textArea" v-model="newComment"/>
            <div v-else-if="isSubmitting" class="loadingP commentUpload">Uploading...</div> 
            <p class ="commentCheck" v-else-if="successfulSubmit">
                
                <img class="successCheck" src="../assets/images/successCheck.png"/>
                </p>
            <div class="commentButtonBox">
            <button class="formButton" @click="commentsActive=false">Cancel</button>
            <button class="formButton" @click="submitComment" >Submit</button>
            </div>
            
         </div>
        </div>

</div>
    </MqResponsive>

    <MqResponsive :target = '["laptop","desktop","tablet"]'>
        <div class="postModalContainer-desktop">
        <div class="titleContainer-desktop">{{ title }}</div>

        <div class="imageContainer-desktop">
            <v-lazy-image v-bind:src="`${imageURL}`"
         onerror="this.onerror=null; this.src ='/src/assets/images/loss.jpg'"
        class="postImage-desktop"/>
        </div>
        <div class="commentsBarContainer-desktop">
            <div class="commentBarSpacer-desktop"></div>
            <div class="commentsTitle-desktop">Comments</div>
            <div class="commentBarSpacer-desktop">
                <img class="newCommentButton-desktop" src="../assets/images/darkplus.png" @click="commentsActive =!commentsActive"/>
            </div>
        </div>
        
        
        <div class="commentsContainer-desktop">
            <div class="singleCommentContainer-desktop" v-for="comment in comments" >
                <img alt="Catstagram Logo" class="dummyProfile-desktop" src="../assets/images/darkmodeCat.png"/>
                <div class="usernameComment-desktop">
                <div class="usernameHolder-desktop">Username</div>
                <div class="textHolder-desktop">{{comment.text}}</div>
                </div>
            </div>
        </div>
        <div v-if="commentsActive" class="newCommentContainer-desktop">
            <div class="newCommentTitle-desktop">New Comment</div>
            <div class="commentArea-desktop">
            <textarea v-if ="!isSubmitting && !successfulSubmit" class="textArea-desktop" v-model="newComment"/>
            <div v-else-if="isSubmitting" class="loadingP-desktop commentUpload-desktop">Uploading...</div> 
            <p class ="commentCheck-desktop" v-else-if="successfulSubmit">
                
                <img class="successCheck-desktop" src="../assets/images/successCheck.png"/>
                </p>
            <div class="commentButtonBox-desktop">
            <button class="formButton-desktop" @click="commentsActive=false">Cancel</button>
            <button class="formButton-desktop" @click="submitComment" >Submit</button>
            </div>
            
         </div>
        </div>

</div>
    </MqResponsive>
   
</template>

<script>
import axios from 'axios'
import VLazyImage from "v-lazy-image";
import { MqResponsive } from "vue3-mq";
export default{
    props:['pk'],
    components: {
    "v-lazy-image": VLazyImage,
    MqResponsive
  },
    data(){
    return{
        title:null,
        comments:null,
        imageURL:null,
        commentsActive:false,
        isSubmitting: false,
        successfulSubmit: false,
        newComment:""
    }

    },
    methods:{
        getPosts(){
      axios.get(`http://catstagram.lofty.codes/api/posts/${this.pk}/`).then((res)=>{
          return res.data
        }).then((data)=>{
            console.log(data)
        this.title = data.name
        this.comments = data.comments
        this.imageURL = `http://catstagram.lofty.codes/media/${data.image}`
        }).catch(error=>{
          console.log(error)
        })
    },
    async submitComment(){
        // console.log("here")
        await this.$store.dispatch('uploadComment',{
            text: this.newComment,
            entry: this.pk
        }).then(()=>{this.isSubmitting=false, this.successfulSubmit=true, setTimeout(() => {
            this.commentsActive=false
            this.successfulSubmit=false
        }, 2000);})
    },
    },
    watch:{
        pk:function(){
            this.getPosts()
        },
        
  }


}
</script>

<style>
.postModalContainer{
    padding-left:2vh;
    padding-right: 2vh;
    margin: auto;
display: flex;
flex-direction: column;
top:15vw;
height:70vh;
aspect-ratio: 16/9;
max-width: 90vw;
background-color: #181818; 
border-radius: 10px;
border:1px solid rgb(75, 74, 74);
align-items: center;
overflow-y: scroll;

}
.titleContainer{
    /* background-color: aliceblue; */
    font-size: 5vw;
    color:rgb(218, 98, 13);
    font-weight: 500;
    height:5vh;
    width:81vw;
    text-align: center;
    overflow: hidden;
text-overflow: ellipsis;
}
.imageContainer{
    display: flex;
    background-color: black;
    height:50%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border:1px solid rgb(75, 74, 74);
    
}
.postImage {
    /* background-color: aqua; */
    height:100%;
    /* width: 36vw; */
    margin: auto;
    border-radius: 8px;
}

.commentsContainer{
/* background-color: coral; */
width:90%;
height:35%
}
.singleCommentContainer{
    display: flex;
    flex-direction: row;
    /* align-items:; */
    /* justify-content: space-between; */
    height:8vh;
    border:2px solid rgb(75, 74, 74);
    margin:.5vh;
    border-radius: 8px;
    /* background-color: antiquewhite; */
}
.commentsBarContainer{
    /* background-color: aqua; */
    font-size: 5vw;
    color:rgb(218, 98, 13);
    font-weight: 500;
    height:6vh;
    width:95%;
    text-align: center;
    overflow: hidden;
 text-overflow: ellipsis;
 border-bottom: 2px solid rgb(218, 98, 13);
  position: sticky;
  top: 0px;
  z-index:200;
  background-color: #181818;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.commentBarSpacer{
    /* background-color: aqua; */

    height:97%;
    width: 10vw;
    align-items: center;
    justify-content: center;
    

}
.newCommentButton{
    width:6vw;
   margin-top: 1vh;
   margin-bottom: 1vh;
}
.commentsTitle{
    text-align: center;
    top: 1vh;
    font-size: 5vw;
}
.newCommentContainer{
    top:25vh;
    position: fixed;
    height: 30vh;
    width:85vw;
    background-color: #181818;
    z-index:201;
    border: 1px solid rgb(218, 98, 13);
    border-radius: 8px;
    
}
.newCommentTitle{
    font-size: 5vw;
    color:rgb(218, 98, 13);
    font-weight: 500;
    /* height:6vh; */
    width:50%;
    text-align: center;
 border-bottom: 2px solid rgb(218, 98, 13);
 margin:1vh auto;
  background-color: #181818;
 
 
}
.commentArea{
    width:95%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
}
.textArea{
    background-color: rgb(75, 74, 74);
    border-radius: 8px;
    color: #d1cece;
    width:95%;
    height: 16vh;
    font-weight: 300;
    font-size: 2vh;
    box-shadow: none;
    border: 1px solid rgb(218, 98, 13);

}
.dummyProfile{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: .5vh;
    margin-right: .5vh;
    height:6vh;
    
    /* background-color: aqua; */
}
.usernameComment{
    /* background-color: aqua; */
    width:75%;
    overflow-y: scroll;
    scrollbar-width: none;
}
.usernameHolder{
color: rgb(218, 98, 13);
/* border-bottom: 1px solid rgb(218, 98, 13); */
width:75%;
font-size: 3.5vw;
/* overflow: hidden; */
}
.textHolder{
    display: flex;
    font-size: 3vw;
    padding-left: 2vw;
  
}
.commentUpload{
    height: 16vh;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.commentCheck{
    height:16vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: aqua; */
}

/* desktop setup */

.postModalContainer-desktop{
    padding-left:2vh;
    padding-right: 2vh;
    margin: auto;
display: flex;
flex-direction: column;
top:5vw;
height:70vh;
aspect-ratio: 3/2;
background-color: #181818; 
border-radius: 10px;
border:1px solid rgb(75, 74, 74);
align-items: center;
overflow-y: scroll;
overflow-x: hidden;
text-overflow: ellipsis;
}
.titleContainer-desktop{
    /* background-color: aliceblue; */
    font-size: 6vh;
    color:rgb(218, 98, 13);
    font-weight: 500;
    height:18vh;
    text-align: center;
    overflow: hidden;

}
.imageContainer-desktop{
    display: flex;
    background-color: black;
    height:60%;
    width: 100%;
    justify-content: center;
    align-items: center;
    border:1px solid rgb(75, 74, 74);
    
}
.postImage-desktop{
    height:100%;
    margin: auto;
    border-radius: 8px;
}

.commentsContainer-desktop{
/* background-color: coral; */
width:90%;
height:10%
}
.singleCommentContainer-desktop{
    display: flex;
    flex-direction: row;
    /* align-items:; */
    /* justify-content: space-between; */
    /* height:8vh; */
    border:2px solid rgb(75, 74, 74);
    margin:.5vh;
    border-radius: 8px;
    /* background-color: antiquewhite; */
}
.commentsBarContainer-desktop{
    font-size: 5vw;
    color:rgb(218, 98, 13);
    font-weight: 500;
    width:95%;
    text-align: center;
    overflow: hidden;
    height: 15vh;
    border-bottom: 2px solid rgb(218, 98, 13);
    position: sticky;
    top: 0px;
    z-index:200;
    background-color: #181818;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.commentBarSpacer-desktop{
    /* background-color: aqua; */
    display: flex;
    height:97%;
    width: 10vw;
    align-items: center;
    justify-content: center;
    

}
.newCommentButton-desktop{
    width:5vh;
}
.commentsTitle-desktop{
    text-align: center;
    top: 1vh;
    font-size: 6vh;
    
}
.newCommentContainer-desktop{
    top:15vh;
    position: fixed;
    height: 50vh;
    aspect-ratio: 3/2;
    background-color: #181818;
    z-index:201;
    border: 1px solid rgb(218, 98, 13);
    border-radius: 8px;
    
}
.newCommentTitle-desktop{
    font-size: 5vh;
    color:rgb(218, 98, 13);
    font-weight: 500;
    /* height:6vh; */
    width:50%;
    text-align: center;
 border-bottom: 2px solid rgb(218, 98, 13);
 margin:1vh auto;
  background-color: #181818;
 
 
}
.commentArea-desktop{
    width:95%;
    display: flex;
    flex-direction: column;
    margin: auto;
    align-items: center;
}
.textArea-desktop{
    background-color: rgb(75, 74, 74);
    border-radius: 8px;
    color: #d1cece;
    width:95%;
    height: 20vh;
    font-weight: 300;
    font-size: 2vh;
    box-shadow: none;
    border: 1px solid rgb(218, 98, 13);

}
.dummyProfile-desktop{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: .5vh;
    margin-right: .5vh;
    height:6vh;
    
    /* background-color: aqua; */
}
.usernameComment-desktop{
    width:75%;
}
.usernameHolder-desktop{
color: rgb(218, 98, 13);
/* border-bottom: 1px solid rgb(218, 98, 13); */
width:75%;
font-size: 3vh;

}
.textHolder-desktop{
    display: flex;
    font-size: 2.5vh;
    padding-left: 2vw;
   overflow: hidden;
    text-overflow: ellipsis;
}
.commentUpload-desktop{
    height: 16vh;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}
.commentCheck-desktop{
    height:16vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: aqua; */
}
</style>
