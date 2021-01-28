let initState ={
    unread: null,
    messages: []
}
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_MESSAGE_LIST": {
            return {
                unread: action.messages.unread,
                messages: action.messages.messages
            }
        }
        default: return state;
    }
}