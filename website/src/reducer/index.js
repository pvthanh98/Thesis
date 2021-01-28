import { combineReducers } from 'redux';
import stores from './store';
import services from './service';
import myservice from './myservice';
import mystore from './mystore';
import categories from './category';
import store_detail from './store_detail'
import chat_toggle from './chattoggle';
import messages from './messages';
import message_store_list from './massage_store_list';
import message_store from './messages_store';
import bills from './bills';
import customer_bills from './customer/bill';
import message_list from './message_list';
export default combineReducers({
    stores,
    services,
    myservice,
    mystore,
    categories,
    store_detail,
    chat_toggle,
    messages,
    message_store_list,
    message_store,
    bills,
    customer_bills,
    message_list
});

