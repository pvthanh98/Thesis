let initState = [];
export default function(state = initState, action){
    switch(action.type){
        case "GET_SERVICES": {
            state = [...action.services];
            return state;
        }
        default: return state;
    }
}