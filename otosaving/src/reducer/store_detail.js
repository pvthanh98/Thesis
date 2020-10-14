let initState = null;
export default function(state = initState, action){
    switch(action.type){
        case "GET_STORE_DETAIL": {
            state = {...action.store_detail};
            return state;
        }
        default: return state;
    }
}