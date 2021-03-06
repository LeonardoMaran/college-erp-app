import { combineReducers } from 'redux';
import adminReducer from './adminReducer';
import studentReducer from './studentReducer';
import teacherReducer from './teacherReducer';
import dataReducer from './dataReducer';

export default combineReducers({
    adminReducer, studentReducer, teacherReducer, dataReducer
});