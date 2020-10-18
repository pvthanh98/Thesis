let initState = []
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_MESSAGE_STORE_LIST": {
            return [...action.messages]
        }
        default: return state;
    }
}