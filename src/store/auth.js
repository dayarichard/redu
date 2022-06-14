import { AUTHENTICATED, NOT_AUTHENTICATED } from './actions'

const setToken = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("lastLoginTime", new Date(Date.now()).getTime());
};
  
export const getToken = () => {
    const now = new Date(Date.now()).getTime();
    const timeAllowed = 1000 * 60 * 30;
    const timeSinceLastLogin = now - localStorage.getItem("lastLoginTime");
    if (timeSinceLastLogin < timeAllowed) {
        return localStorage.getItem("token");
    }
};

// const deleteToken = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("lastLoginTime");
// }



export const loginUser = (token) => {
    return  (dispatch) => {    
            
            dispatch({ type: AUTHENTICATED, payload: token })
        
   };
};
  
export const logoutUser = () => {
    return (dispatch) => {
        //deleteToken();
        dispatch({ type: NOT_AUTHENTICATED,payload:'' })
    }
     
}

