import { combineReducers } from 'redux';
import author from './author';
import auth from './authenticate';
import store_in_area from './store_in_area';
export default combineReducers({
    auth,
    store_in_area
});