let initState = false;
export default function(state = initState, action){
    switch(action.type){
        case "SET_CHAT_TOGGLE": {
            state= action.state;
            return state;
        }

        default: return state;
    }
}