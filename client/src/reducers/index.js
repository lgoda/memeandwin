import { combineReducers } from 'redux';
import authReducer from './authReducer';
import memeReducer from './memeReducer';

export default combineReducers({
  auth: authReducer,
  memeImage: memeReducer
});
