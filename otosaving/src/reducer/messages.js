let initState = [];
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_MESSAGES": {
            return [...action.messages];
        }
        default: return state;
    }
}