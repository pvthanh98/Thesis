let initState = false;
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_MODAL_HISTORY": {
            state = action.state;
            return state;
        }

        default: return state;
    }
}