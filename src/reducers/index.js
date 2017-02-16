import { combineReducers } from 'redux';
import donors              from './donorsReducer';

const donorsApp = combineReducers({
  donors
});

export default donorsApp;
