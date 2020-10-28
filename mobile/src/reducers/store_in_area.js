let initState = [];
export default function(state = initState, action){
    switch(action.type){
        case "GET_STORES": {
            state = [...action.stores];
            return state;
        }

        default: return state;
    }
}