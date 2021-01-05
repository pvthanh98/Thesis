import { combineReducers } from 'redux';
import author from './author';
import auth from './authenticate';
import store_in_area from './store_in_area';
import messages from './messages';
import message_list from './message_list';
import customer_bill from './customer_bill';
import modalHistory from './modalHistory';
//admin side
import mystore from './admin_side/mystore_info';
import message_store_list from './admin_side/massage_store_list';
import message_store from './admin_side/messages_store';
export default combineReducers({
    auth,
    store_in_area,
    messages,
    message_list,
    customer_bill,
    mystore,
    message_store_list,
    message_store,
    modalHistory
});