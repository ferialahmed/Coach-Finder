export default{
    allCoaches(state){
        return state.coaches;
    },
    hasCoaches(state){
        return state.coaches.length > 0;
    },
    isCoach(state, _, _2, rootGetters){
        return state.coaches.some(coach => coach.id === rootGetters.stateId)
    },
    shouldUpdate(state){
        if(!state.lastFetch) return true;
        const currentTimeStamp = new Date().getTime();
        return (currentTimeStamp - state.lastFetch )/1000 > 60
    }
}