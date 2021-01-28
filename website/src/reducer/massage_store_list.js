let initState ={
    unread: -1,
    messages: []
}
export default function(state = initState, action){
    switch(action.type){
        case "UPDATE_MESSAGE_STORE_LIST": {
            return {
                unread: action.messages.unread,
                messages: action.messages.messages
            }
        }
        default: return state;
    }
}