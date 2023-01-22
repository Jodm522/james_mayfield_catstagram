


<template>
    <div class="loginSignupFormContainer">
<div class="loginSignUpButtons">
    
    <div class="LoginSignupSelector" v-bind:class="[loginIsActive? `selected`: 'unselected']" @click="toggleLogin">Login</div>
    <div class="LoginSignUpSelector" v-bind:class="[signupIsActive? `selected`: 'unselected']" @click="toggleSignup">Sign up</div>
    <!-- <div @click="closeModal">{{ showMenuModal }}</div> -->
</div>

<div v-if="loginIsActive" class="loginFormContainer">
<form @submit.prevent>

    <div class="form-control">
     <input id = "username" type="text" placeholder="Your Email" v-model="loginEmail"/>   
        </div>

     <div class="form-control passwordBlock">
     <input id = "password" v-bind:type="[passwordIsVisible? `text` : `password`]" placeholder="Password" v-model="loginPassword"/>   
   <div class="passwordVisibilityContainer">
    <input class="checkbox" type="checkbox" @click="changePasswordVisibility"/> 
   <label for="checkbox"> Show password</label>
   </div>
     <div class="loginErrorContainer"><div v-if="loginError" class="loginAlert">{{ loginAlert }}</div></div>
</div>
<p v-if="isLoading" class="loadingP" >Authenticating...</p>
<p v-else-if="loginSuccessful">
<img class="successCheck" src="../assets/images/successCheck.png"/>
</p>
<div v-else class="formButtonContainer">
    
    <button class="formButton" @click="submitLogin">Login</button>
    <button class="formButton" @click="closeModal">Cancel</button>
    </div>
</form>



</div>

<div v-if="signupIsActive" class="signupFormContainer">
    <form @submit.prevent>
<div v-if="!signupNamesValidated" class="signupStepContainer" >
    
    <input class="nameArea" id = "firstName" type="text" placeholder="First Name" v-model="signupFirstName"/> 
    <input class="nameArea" id = "lastName" type="text" placeholder="Last Name" v-model="signupLastName"/> 
    <div class="signupPasswordVisibilityContainer"></div>
    <div class="signupErrorContainer"><div v-if="nameSignupError" class="loginAlert">{{nameAlert}}</div></div>

    <div class="signupFormButtonContainer">
    <button class="signupFormButton" @click="closeModal">Cancel</button>
    <button class="signupFormButton" @click="validateNames">Next</button>
    </div>
    
</div>

<div  v-if="signupNamesValidated && !signupEmailValidated" class="form-control signupStepContainer">
 <input class="signupEmail" id = "email" type="text" placeholder="Your Email" v-model="signupEmail"/>   
 <input class="signupEmail" id = "emailDupe" type="text" placeholder="Confirm Email" v-model="signupEmailReEnter"/>
 <div class="signupPasswordVisibilityContainer"></div>
 <div class="signupErrorContainer"><div v-if="emailSignupError" class="loginAlert">{{ emailAlert }}</div></div>

    <div class="SignupFormButtonContainer">
    <button class="signupFormButton" @click="signupNamesValidated= false">Back</button>
    <button class="signupFormButton" @click="validateEmails">Next</button>
    </div>  
    </div>
 <div v-if="signupEmailValidated" class="form-control signupStepContainer">
 <input class="signupPassword" id = "password" v-bind:type="[passwordIsVisible? `text` : `password`]" placeholder="Password" v-model="signupPassword"/> 
 <input class="signupPassword" id = "password" v-bind:type="[passwordIsVisible? `text` : `password`]" placeholder="Verify Password" v-model="signupPasswordReEnter"/>  

<div class="signupPasswordVisibilityContainer">
<input class="checkbox" type="checkbox" @click="changePasswordVisibility"/> 
<label for="checkbox"> Show passwords</label>
</div>
 <div class="signupErrorContainer"><div v-if="passwordSignupError" class="loginAlert">{{ passwordAlert }}</div></div>
 <p v-if="isLoading" class="loadingP" >Authenticating...</p>
 <p v-else-if="loginSuccessful">
<img class="successCheck" src="../assets/images/successCheck.png"/>
</p>
<div v-else class="signupPasswordButtonContainer">
<button class="signupFormButton" @click="signupEmailValidated= false">Back</button>
<button class="signupFormButton" @click="validatePasswords">Sign up</button>
</div>
</div>
</form>
</div>



</div>
</template>


<script>
export default{
    props:['showMenuModal'],
    data(){
        
        return{
            //Switching between login and signup in the modal
            loginIsActive: true,
            signupIsActive: false,
            //Password visibilities
            passwordIsVisible: false,
            //Storing login values to be passed along
            loginEmail:"",
            loginPassword:"",
            //Error handling
            loginError:false,
            loginAlert:"Wrong email or password",
            //Storing signup values to be validated & passed along
            signupEmail:"",
            signupEmailReEnter:"",
            signupPassword:"",
            signupPasswordReEnter:"",
            signupFirstName:"",
            signupLastName:"",
            //Used to decide whic step we're at in the signup process
            signupNamesValidated:false,
            signupEmailValidated:false,
            signupPasswordValidated:false,
            //Signup error handling
            nameSignupError:false,
            nameAlert:"",
            emailSignupError:false,
            emailAlert:"",
            passwordSignupError:false,
            passwordAlert:"",
            //UX enhancer 
            isLoading: false,
            loginSuccessful:false

        }
    
  },
methods:{
    closeModal(){
        this.$emit('closeModal')
    },
    toggleLogin(){
        this.loginIsActive = true
        this.signupIsActive = false
        this.loginError = false
        this.signupErrors=false
    },
    toggleSignup(){
        this.loginIsActive = false
        this.signupIsActive = true
        this.loginError = false
        this.signupErrors=false
    },
    changePasswordVisibility(){
        if(this.passwordIsVisible){
            this.passwordIsVisible = false
        }
        else{
            this.passwordIsVisible = true
        }
    },
    async submitSignup(){
        this.passwordSignupError=false
        this.isLoading=true
       await this.$store.dispatch('signup',{
        email: this.signupEmail,
        password: this.signupPassword,
        firstName: this.signupFirstName,
        lastName: this.signupLastName
         })
         .then((res)=>{console.log(res),this.isLoading=false, this.successfulLogin()})
         .catch((error)=>{console.log(error),this.loginError= true, this.isLoading= false, this.passwordSignupError = true, this.passwordAlert="Error- Please try a new email address"})
    },
    async submitLogin(){
        this.loginError= false
        this.isLoading = true
        await this.$store.dispatch('login',{
            email: this.loginEmail,
            password: this.loginPassword
        }).then((res)=>{console.log(res);this.isLoading = false, this.successfulLogin()})
        .catch((error)=>{console.log(error),this.loginError= true, this.isLoading= false})
    },
    cancelButtonClicked(){
        this.loginError = !this.loginError
       
    },
    validateNames(){
        this.nameSignupError= false
        this.nameAlert=""
        if(this.signupFirstName.trim() === ''){
            this.nameAlert= "First name is required"
            this.nameSignupError = true
        }
        else if(this.signupLastName.trim() === ''){
            this.nameAlert = "Last name is required" 
            this.nameSignupError = true
        }
        else{
            this.signupNamesValidated = true; 
            this.nameAlert=""
            this.nameSignupError= false
        }
        
    },
    validateEmails(){
        this.emailSignupError = false
        this.emailAlert= ""
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.signupEmail))){
            this.emailSignupError = true
            this.emailAlert = ("Please enter a valid email")
            
        }
        else if(this.signupEmail !== this.signupEmailReEnter){
            this.emailSignupError = true
            this.emailAlert = ("Emails do not match")
        }
        else{
            this.signupEmailValidated = true
            this.emailSignupError = false
            this.emailAlert = ""
        } 
    },
    validatePasswords(){
        this.passwordAlert = ""
        this.passwordSignupError=false
        if(this.signupPassword.trim() ===''){
            this.passwordSignupError=true
            this.passwordAlert = "Please enter a password"
        }
        else if(this.signupPasswordReEnter.trim() ===''){
            this.passwordSignupError=true
            this.passwordAlert = "Please confirm password"
        }
        else if(this.signupPassword !== this.signupPasswordReEnter){ 
            this.passwordSignupError= true
            this.passwordAlert = "Passwords do not match"
        }
        else(this.submitSignup())
    },
    successfulLogin(){
        this.loginSuccessful=true
        setTimeout(()=>{this.closeModal()}, 2000)
    }
    }
}

</script>
<style>
.loginSignupFormContainer{
    margin: auto;
display: flex;
flex-direction: column;
top:15vw;
height:30vh;
aspect-ratio: 16/9;
max-width: 90vw;
background-color: #181818; 
/* background-color: aqua; */
border-radius: 10px;
border:1px solid rgb(75, 74, 74);
}

.loginSignUpButtons{
    margin: 0 auto;
    /* padding-top: .5vh; */
    height:1vh;
    /* background-color: aqua; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width:50%;
    font-size: 5vw;
    /* background-color: aqua; */
}
.selected{
    border-bottom: 2px solid rgb(75, 74, 74);
    color:rgb(218, 98, 13);
    font-weight: 500;
    padding-bottom: 4vh;
}
.unselected, .selected{
    height: 3.8vh;
    width: 20vw;
    text-align: center;
    padding-bottom: .2vh;
}
.loginFormContainer, .signupFormContainer{
    top:1vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    margin-top: 2vh;
}


.checkbox{
    background:black;
    accent-color: rgb(218, 98, 13);
    margin-right: 1vw;
}

input[type=text], input[type=password]{
    background-color: rgb(75, 74, 74);
    border-radius: 8px;
    color: #d1cece;
    height: 4vh;
    font-weight: 300;
    font-size: 2vh;
    margin-top: 1vh;
    box-shadow: none;
    border: 1px solid rgb(218, 98, 13);
}

.passwordVisibilityContainer{
 display: flex;
 flex-direction: row;
 justify-content: center;
 margin-bottom: 5%;
}
.formButtonContainer{
    display: block;
    position:absolute;
    flex-direction: row;
    justify-content: center;
    left: 15%;
    padding-top: 10%;
    margin-top: 0;
    height: 10vh;
    aspect-ratio: 16/9;
    /* background-color: aqua; */
    /* z-index: 500000000; */
}
.formButton{
 height: 4.5vh;
 aspect-ratio: 1.64;
 min-width: min-content;
 font-size: 1.5vh;
 margin:5px;  
 border-radius:8px; 
 border: 1px solid rgb(218, 98, 13);
 background-color: rgb(75, 74, 74);
 color: #d1cece;
 font-weight: 600;
 text-align: center;
 justify-content: center;
 
}
.loginAlert{
    margin: auto;
    text-align: center;
    color: red;
    animation: blink  1s ;
    width: 65%;
    border-radius:8px
}
.loginErrorContainer{
    height: 2vh;
    /* background-color: aqua; */
}
.signupErrorContainer{
    /* padding: 10%; */
    height: 5vh;
    /* background-color: red; */
}
@keyframes blink{
    0% {background-color: red;}
    25%{background-color: #181818;}
    50% {background-color: red;}
    100%{background-color: #181818;}
}
.signupFormContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.namesContainer, .signupPasswordBlock{
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.signupStepContainer {
    text-align: center;
    margin-left: 2vw;
    margin-right: 2vw;
    animation: fadeIn 1s;
}
@keyframes fadeIn{
    0% { opacity: 0; }
  100% { opacity: 1; }
}
.signupInput{
    text-align: center;
}
.signupFormButton{
    height: 4.5vh;
 aspect-ratio: 1.7;
 min-width: min-content;
 font-size: 1.5vh;
 margin:5px;  
 border-radius:8px; 
 border: 1px solid rgb(218, 98, 13);
 background-color: rgb(75, 74, 74);
 color: #d1cece;
 font-weight: 600;
 text-align: center;
 justify-content: center;
 width:2vw;
}

.signupPasswordVisibilityContainer{
    /* background-color: aqua; */
    height: 4vh;
}
.loadingP{
    text-align: center;
    animation: rainbow 1s infinite;
}

.rainbow{
		animation: rainbow 2.5s linear;
		animation-iteration-count: infinite;
}


@keyframes rainbow{
		100%,0%{
			color: rgb(255,0,0);
		}
		8%{
			color: rgb(255,127,0);
		}
		16%{
			color: rgb(255,255,0);
		}
		25%{
			color: rgb(127,255,0);
		}
		33%{
			color: rgb(0,255,0);
		}
		41%{
			color: rgb(0,255,127);
		}
		50%{
			color: rgb(0,255,255);
		}
		58%{
			color: rgb(0,127,255);
		}
		66%{
			color: rgb(0,0,255);
		}
		75%{
			color: rgb(127,0,255);
		}
		83%{
			color: rgb(255,0,255);
		}
		91%{
			color: rgb(255,0,127);
		}
}
.successCheck{
    /* background-color: aqua; */
    display: flex;
    margin: auto;
    height:6vh;
    animation: 1.5s fadeSpin;
}
@keyframes fadeSpin{
    0% { opacity: 0; transform: rotate(180deg);}
    100%{ opacity: 1;}
}
</style>