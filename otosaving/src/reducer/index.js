import { combineReducers } from 'redux';
import stores from './store';
import services from './service';
import myservice from './myservice';
import mystore from './mystore';
import categories from './category';
import store_detail from './store_detail'
export default combineReducers({
    stores,
    services,
    myservice,
    mystore,
    categories,
    store_detail
});

