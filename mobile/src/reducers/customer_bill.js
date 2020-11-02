let initState = [];
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_CUSTOMER_BILLS": {
            state = [...action.bills];
            return state;
        }

        default: return state;
    }
}