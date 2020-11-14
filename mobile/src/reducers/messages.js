let initState = {
    info: {
        customer: "",
        store:""
    },
    content: []
}
export default function(state = initState, action){
    
    switch(action.type){
        case "UPDATE_MESSAGES": {
            return {
                info: {...action.messages.info},
                content: [...action.messages.content]
            };
        }
        default: return state;
    }
}