import { combineReducers } from 'redux';
import courseReducer from "./courseReducer";

// this would combine all the reducers
const rootReducer = combineReducers({
    courses: courseReducer
});

export default rootReducer;