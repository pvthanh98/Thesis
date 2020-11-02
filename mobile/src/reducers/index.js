import { combineReducers } from 'redux';
import author from './author';
import auth from './authenticate';
import store_in_area from './store_in_area';
import messages from './messages';
import message_list from './message_list';
import customer_bill from './customer_bill';
export default combineReducers({
    auth,
    store_in_area,
    messages,
    message_list,
    customer_bill
});