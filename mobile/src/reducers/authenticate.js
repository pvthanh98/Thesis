const INITIAL_STATE = {
    user_token: null,
    isSignin : false
}
const authorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "SIGN_IN":
            return {
                user_token: action.user_token,
                isSignin : true
            } 
        case "SIGN_OUT":
            return {
                user_token: null,
                isSignin : false
            } 
    }
    return state;
};

export default authorReducer;