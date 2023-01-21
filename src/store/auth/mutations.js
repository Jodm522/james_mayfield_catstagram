export default {
    setuser(state, payload){
        state.userEmail = payload.email
        state.authenticated = true
    },
    logOut(state){
        state.userEmail=null,
        state.authenticated=false
    }
}