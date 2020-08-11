import { initState } from './initState.js';

const authReducer = (state = initState, action) => {
  if (action.type === 'AUTHENTICATE_USER') {
    state = {
      ...state,
      userAccount: action.authenticatedUser,
    };
  }

  console.log(action.authenticatedUser);
  return state;
};

export default authReducer;
