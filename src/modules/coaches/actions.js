export default {
  registerCoach(context, data) {
    const token = context.rootGetters.token;
    
    fetch(
      `https://getcoach-12e57-default-rtdb.firebaseio.com/coaches/${context.rootGetters.stateId}.json?auth=${token}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.ok) {
        context.commit('addCoach', {
          ...data,
          id: context.rootGetters.stateId,
        });
      }else{
        throw new Error('Error in saving data');
      }
    })
  },

  setCoaches(context, payload) {
    if(!payload.forceUpdate && !context.getters.shouldUpdate) return false;
    const coaches = [];
    return new Promise((resolve,reject) => {
      fetch('https://getcoach-12e57-default-rtdb.firebaseio.com/coaches.json')
        .then((res) => {
          if(res.ok) {
            resolve();
            return res.json()
          }
          else{reject(new Error(res.message || 'failed to fetch data'))}
        })
        .then((data) => {
          for (const key in data) {
            const coach = {
              id: key,
              firstName: data[key].firstName,
              lastName: data[key].lastName,
              description: data[key].description,
              hourlyRate: data[key].hourlyRate,
              areas: data[key].areas,
            };
            coaches.push(coach);
          }
          context.commit('setCoaches', coaches);
          context.commit('setLastFetch');
        })
        
    });
  },
};
