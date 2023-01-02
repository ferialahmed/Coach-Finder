export default{
    setUser(state, payload){
        state.userId = payload.id;
        state.token = payload.token;
        state.autoLogout = false;
    },
    setAutoLogout(state){
        state.autoLogout = true;
    }

}