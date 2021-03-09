import {combineReducers} from 'redux';
import movieReducer from './movie';

const indexReducer = combineReducers({
  movie: movieReducer,
});

export default indexReducer;
