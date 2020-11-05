const INITIAL_STATE = {
    isSignin : false,
    isStore: false
}
const authorReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case "SIGN_IN":
            return { 
                isSignin : true,
                isStore: action.isStore
            } 
        case "SIGN_OUT":
            return {
                isSignin : false,
                isStore: false
            } 
    }
    return state;
};

export default authorReducer;