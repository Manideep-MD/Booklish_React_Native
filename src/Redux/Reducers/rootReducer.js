import { combineReducers } from 'redux';
import bookDetailsReducer from '../BookDetails';
import UserDetailsReducer from '../UserDetails';

const rootReducer = combineReducers({
  BookDetails: bookDetailsReducer,
  UserDetails : UserDetailsReducer
});

export default rootReducer;