let initState = [];
export default function(state = initState, action){
    switch(action.type){
        case "GET_CATEGORY": {
            state = [...action.categories];
            return state;
        }

        default: return state;
    }
}