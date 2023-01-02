export default{
    addCoach(state,payload){
        state.coaches.push(payload)
    },
    setCoaches(state, payload){
        state.coaches = payload;
    },
    setLastFetch(state){
        state.lastFetch  = new Date().getTime(); 
    }
}