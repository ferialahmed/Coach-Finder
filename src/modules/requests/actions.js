export default{
    async addRequest(context,data){
        const coachId = data.id;
        const response = await fetch(`https://getcoach-12e57-default-rtdb.firebaseio.com/requests/${coachId}.json`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
        })
        const responseData = response.json();
        if(!response.ok){
            throw new Error(responseData.message || 'Failed sending Request');
        }
        context.commit('addRequest', {...data, id:coachId})
    },
    async loadRequests (context){
        const token = context.rootGetters.token;
        if(!context.getters.shouldUpdate) return;
        const userId = context.rootGetters.stateId;
        const requests = [];
        const response = await fetch(`https://getcoach-12e57-default-rtdb.firebaseio.com/requests/${userId}.json?auth=${token}`);
        const responseData = await response.json();
        if(!response.ok){
            throw new Error(responseData.message || 'Failed to get Requests')
        }
        for(let key in responseData){
            console.log(key, responseData[key]);
            const request = {
                id: userId,
                email: responseData[key].email,
                message: responseData[key].message
            }
            requests.push(request);
        }
        console.log(requests);
        context.commit('setRequests', requests);
        context.commit('setLastFetch');
    }
}