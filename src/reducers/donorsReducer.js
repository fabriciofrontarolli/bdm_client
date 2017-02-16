import { createReducer, updateState } from '../utils';

const INITIAL_STATE = {
  donors: [],
};

export default createReducer(INITIAL_STATE, {
  ['SET_DONORS']: (state, donors) => updateState(state, {
    donors
  })
});
