let initState = null;
export default function(state = initState, action){
    switch(action.type){
        case "GET_MYSTORE": {
            state = {...action.mystore};
            return state;
        }
        default: return state;
    }
}