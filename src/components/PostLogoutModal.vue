<script setup>
import { MqResponsive } from "vue3-mq";
</script>

<template>
    <MqResponsive target = "phone">
         <div class="postLogoutFormContainer">
    <div className="postImageContainer">
        <div className = "postImageTitle">Post a new cat!</div>
        <form class="postLogoutForm" @submit.prevent="validateUpload">
            <input class="newPostTitle" id = "newPostTitle" type="text" placeholder="Give your post a name" v-model="newPostTitle"/>
            <div class="fileUploadContainer">
                <input class="newPostImage" type="file" accept="image/*" @change="uploadImage" />
            </div>
            
            <div class="uploadErrorHolder">
               <div v-if="uploadErrors" class="uploadAlert">
                {{ uploadErrorMessage }}
               </div> 
               <div v-if="isLoading" class="loadingP">Uploading...</div>    
            </div>
            <button v-if="!postSuccessful && !isLoading" class="formButton">Upload</button>
            <p v-else-if="postSuccessful">
                <img class="successCheck" src="../assets/images/successCheck.png"/>
                </p>
        </form>
        
    </div>

<div class="divider">
            <div class="dividerLine"></div>
            <div class="orHolder">Or</div>
            <div class="dividerLine"></div>
        </div>
        <div class="logoutButtonHolder">
            <button class="formButton">Logout</button>
            <button class="formButton" @click="closeModal">Cancel</button>
        </div>


</div>
    </MqResponsive>
    <MqResponsive :target = '["laptop","desktop","tablet"]'>
         <div class="postLogoutFormContainer-desktop">
    <div className="postImageContainer-desktop">
        <div className = "postImageTitle-desktop">Post a new cat!</div>
        <form class="postLogoutForm-desktop" @submit.prevent="validateUpload">
            <input class="newPostTitle-desktop" id = "newPostTitle" type="text" placeholder="Give your post a name" v-model="newPostTitle"/>
            <div class="fileUploadContainer-desktop">
                <input class="newPostImage-desktop" type="file" accept="image/*" @change="uploadImage" />
            </div>
            
            <div class="uploadErrorHolder-desktop">
               <div v-if="uploadErrors" class="uploadAlert">
                {{ uploadErrorMessage }}
               </div> 
               <div v-if="isLoading" class="loadingP-desktop">Uploading...</div>    
            </div>
            <button v-if="!postSuccessful && !isLoading" class="formButton-desktop">Upload</button>
            <p v-else-if="postSuccessful">
                <img class="successCheck-desktop" src="../assets/images/successCheck.png"/>
                </p>
        </form>
        
    </div>

<div class="divider">
            <div class="dividerLine"></div>
            <div class="orHolder">Or</div>
            <div class="dividerLine"></div>
        </div>
        <div class="logoutButtonHolder">
            <button class="formButton">Logout</button>
            <button class="formButton" @click="closeModal">Cancel</button>
        </div>


</div>
    </MqResponsive>
   
</template>
<script>
export default{
        components:{
            MqResponsive
        },
    data(){
        
        return{
          newPostTitle:"",  
          uploadErrorMessage:"",
          uploadErrors:false,
          isLoading:false,
          selectedFile:null,
          postSuccessful:false
        }
        
    },
    methods:{
        closeModal(){
            this.$emit('closeModal')
        },
        async submitUpload(){
            this.isLoading=true

            await this.$store.dispatch('upload',{
                name:this.newPostTitle,
                image:this.selectedFile
            }).then(()=>{this.isLoading=false, this.postSuccessful=true, setTimeout(() => {
                this.postSuccessful = false 
                this.closeModal();
            }, 2000);})
            .catch((error)=>{console.log(error);this.isLoading=false;
            this.uploadErrors=true;
            this.uploadErrorMessage="We encountered an issue, please try again later." })
        },
        validateUpload(){
            this.uploadErrors=false;
         
            if(this.newPostTitle.trim() === ''){
                this.uploadErrors=true     
                this.uploadErrorMessage="Title cannot be empty"
            }
            else if(!this.selectedFile){
          
                this.uploadErrors=true
                this.uploadErrorMessage="You must choose a photo to upload"
            }
            else if(this.selectedFile.type.slice(0,6)!=="image/"){
           
                this.uploadErrors=true
                this.uploadErrorMessage="File must be an image"
            }
            else this.submitUpload()
            
        },
        uploadImage(e){
           this.selectedFile = e.target.files[0]
        }

    }
}
</script>
<style>



.postLogoutFormContainer{
    margin: auto;
display: flex;
flex-direction: column;
top:15vw;
height:40vh;
aspect-ratio: 16/9;
max-width: 90vw;
background-color: #181818; 
border-radius: 10px;
border:1px solid rgb(75, 74, 74);
}
.postImageContainer{
    height:70%;
    display: flex;
    flex-direction: column;
}
.postImageTitle{
    font-size: 5vw;
    text-align: center;
    border-bottom: 2px solid rgb(75, 74, 74);
    color:rgb(218, 98, 13);
    font-weight: 500;
    width:50%;
    margin:5px auto;
   
}
.postLogoutForm{
    display: flex;
    flex-direction: column;
    align-items: center;
    
}
input::file-selector-button {
 min-width: min-content;
 font-size: 1.5vh;
 margin:5px;  
 border-radius:8px; 
 border: 1px solid rgb(218, 98, 13);
 background-color: rgb(75, 74, 74);
 color: #d1cece;
 font-weight: 600;
 height: 4.5vh;
}
.fileUploadContainer{
    /* background-color: aqua; */
        width:100%;
        display: flex;
        flex-direction: row;
        left:23%
}
.uploadErrorHolder{
    /* background-color: red; */
    display: flex;

    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 100%;
}
.divider{
    /* background-color: aqua; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1vh;
 

}
.dividerLine{

    width:46%;
    border-bottom: 2px solid rgb(218, 98, 13);
    transform: translateY(-50%);
}
.orHolder{
    color:rgb(218, 98, 13);
    font-weight: 500;
    
}
.logoutButtonHolder{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: aqua; */
    height: 20%;
}
.uploadAlert{
    text-align: center;
    color: red;
    animation: blink  1s ;
    /* background-color: aqua; */
}
@keyframes blink{
    0% {background-color: red;}
    25%{background-color: #181818;}
    50% {background-color: red;}
    100%{background-color: #181818;}
}
/* DEsktop Setup */

.postLogoutFormContainer-desktop{
    margin: auto;
display: flex;
flex-direction: column;
top:15vw;
height:45vh;
aspect-ratio: 16/9;
max-width: 90vw;
background-color: #181818; 
border-radius: 10px;
border:1px solid rgb(75, 74, 74);
}
.postImageContainer-desktop{
    height:70%;
    display: flex;
    flex-direction: column;
}
.postImageTitle-desktop{
    font-size: 4vh;
    text-align: center;
    border-bottom: 2px solid rgb(75, 74, 74);
    color:rgb(218, 98, 13);
    font-weight: 500;
    width:50%;
    margin:5px auto;
   
}
.postLogoutForm-desktop{
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: aqua; */
    
}
input::file-selector-button{
 min-width: min-content;
 font-size: 1.5vh;
 margin:5px;  
 border-radius:8px; 
 border: 1px solid rgb(218, 98, 13);
 background-color: rgb(75, 74, 74);
 color: #d1cece;
 font-weight: 600;
 height: 4.5vh;
}
.fileUploadContainer-desktop{
        width:100%;
        display: flex;
        flex-direction: column;
       align-items: center;
       justify-self: center;
        
}
.uploadErrorHolder-desktop{
    /* background-color: red; */
    display: flex;

    justify-content: center;
    align-items: center;
    height: 5vh;
    width: 100%;
}
.divider-desktop{
    /* background-color: aqua; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 1vh;
 

}
.dividerLine-desktop{

    width:46%;
    border-bottom: 2px solid rgb(218, 98, 13);
    transform: translateY(-50%);
}
.orHolder-desktop{
    color:rgb(218, 98, 13);
    font-weight: 500;
    
}
.logoutButtonHolder-desktop{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background-color: aqua; */
    height: 20%;
}
.uploadAlert-desktop{
    text-align: center;
    color: red;
    animation: blink  1s ;
    /* background-color: aqua; */
}
@keyframes blink{
    0% {background-color: red;}
    25%{background-color: #181818;}
    50% {background-color: red;}
    100%{background-color: #181818;}
}
.newPostImage-desktop{
    display: flex;
    flex-direction: column;
    /* background-color: aqua; */
    align-items: center;
    justify-content: center;
    left:4vw;
}
</style>