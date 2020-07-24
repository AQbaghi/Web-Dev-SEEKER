import { combineReducers } from 'redux';
import authReducer from './authReducer.js';
import companyReducer from './companyReducers.js';
import jobReducer from './jobReducers.js';
import userReducer from './userReducer.js';

const rootReducer = combineReducers({
  auth: authReducer,
  companyReducer: companyReducer,
  job: jobReducer,
  user: userReducer,
});

export default rootReducer;
