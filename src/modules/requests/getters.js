export default{
    getRequests(state,_, _2, rootGetters){
        const coachId = rootGetters.stateId
        return state.requests.filter(req => coachId === req.id);
    },
    shouldUpdate(state){
        if(!state.lastFetch) return true;
        const currentTimeStamp = new Date().getTime();
        
        return (currentTimeStamp - state.lastFetch )/1000 > 60;
    }
}