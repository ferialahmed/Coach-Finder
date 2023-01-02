let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth',{
        ...payload,
        mode:'login'
    })
  },

  async signup(context, payload) {
    return context.dispatch('auth',{
        ...payload,
        mode:'signup'
    })
  },

  async auth(context,payload){
    const mode = payload.mode;
    let url;

    //Incase of login with an existing account
    if(mode === 'login')
    {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCJQ3J8MgVGLz5VsqanzjEHTAublO5FxIo'
    }
    //Incase of signup with a new account
    else
    {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCJQ3J8MgVGLz5VsqanzjEHTAublO5FxIo'
    }
    const response = await fetch(
        url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      
      const responseData = await response.json();
      if (!response.ok) {
        const error = new Error(responseData['error'].message || 'failed to authenticate.');
        throw error;
      }
      //calculate expiration date for token
      const expiresIn = +responseData.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expiresIn;

      //setting token and userId in local storage for auto login
      localStorage.setItem('token', responseData.idToken);
      localStorage.setItem('userId', responseData.localId);
      localStorage.setItem('tokenExpiration', expirationDate);
      
      //auto logout when token expires
      timer = setTimeout(function(){
        context.dispatch('autoLogout');
      },expiresIn);

      context.commit('setUser', {
        id: responseData.localId,
        token: responseData.idToken, 
      });
  },

  autoLogin(context)
  {
    const token =  localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if(expiresIn < 0) return
    timer = setTimeout(function(){
        context.dispatch('autoLogout');
    }, expiresIn);

    if(token && userId){
    context.commit('setUser',{
        token,
        id:userId  
    })
    }
  }, 

  logout(context)
  {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      id: null,
      expiration: null,
    });  
  },

  autoLogout(context)
  {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};
