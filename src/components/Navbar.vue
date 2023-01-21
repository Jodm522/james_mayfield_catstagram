<script setup>
import LoginSignupModal from './LoginSignupModal.vue';
import PostLogoutModal from './PostLogoutModal.vue';
import { $vfm, VueFinalModal, ModalsContainer } from 'vue-final-modal';

</script>

<template>
<div class="navbarAndMenu">
    <div class="navBarContainer">
    <img alt="Catstagram Logo" class="navbarLogo" src="../assets/images/darkmodeCat.png"/>
    <div class="navbarTitle">Catstagram</div>
    <img v-if="!isAuthenticated" alt="menuButton" class="navbarMenuButton" src="../assets/images/menuIcon.svg" @click="menuModalToggle"/>
    <img v-else alt="menuButton" class="navbarMenuButton" src="../assets/images/darkplus.png" @click="postModalToggle"/>
</div>


<VueFinalModal class="menuContainer" v-model="showMenuModal">
    <LoginSignupModal @close-modal="menuModalToggle" />
</VueFinalModal>    
<VueFinalModal class="menuContainer" v-model="showPostModal">
    <PostLogoutModal @close-modal="postModalToggle" />
</VueFinalModal>    

</div>

</template>

<script>
export default{
    components: {
    VueFinalModal,
    ModalsContainer,
    LoginSignupModal
}, 
computed:{
    isAuthenticated(){
        return this.$store.getters.isAuthenticated
    }
},
    data: ()=>({
        showMenuModal:false,
        showPostModal: false,
        
    }),
    methods:{
        menuModalToggle(){
          this.showMenuModal= this.showMenuModal == true ? false : true
        },
        postModalToggle(){
          this.showPostModal= this.showPostModal == true ? false : true
        }
    }
}

</script>
<style scoped>
.navBarContainer{
    width:100vw;    
    height:10vw;
    margin: 0 auto;
    position:fixed;           
  z-index:250;  
  border-bottom: 1px solid rgb(75, 74, 74);
  background-color: #181818;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}

.navbarLogo{
    height:80%;
    margin: 0 auto;
    margin-top: 1%
}
.navbarMenuButton{
    height:80%;
    margin: 0 auto;
    margin-top: 1%
}
.navbarTitle{
    width:75%;
    margin:0 auto;
    display: flex;
    justify-content: center;
    /* margin-top: 1%; */
    font-size: 6.5vw;
    color: rgb(218, 98, 13);
    font-weight: 500;
}
.menuContainer{
    top:10vw;
}

</style>