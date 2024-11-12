import { combineReducers } from 'redux';
import courseReducer from "./courseReducer";
import authorReducer from './authorReducer';
import apiCallStatusReducer from './apiStatusReducer';

// this would combine all the reducers
const rootReducer = combineReducers({
    courses: courseReducer,
    authors: authorReducer,
    apiCallStatusReducer
});

export default rootReducer;