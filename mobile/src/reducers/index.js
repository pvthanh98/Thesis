import { combineReducers } from 'redux';
import author from './author';
import auth from './authenticate';
export default combineReducers({
    author: author,
    auth
});