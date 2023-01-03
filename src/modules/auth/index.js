import mutations  from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default{
    state(){
        return{
            userId: '',
            token: null,
            tokenExpiration: null,
            autoLogout: false
        }
    },
    mutations,
    actions,
    getters
}