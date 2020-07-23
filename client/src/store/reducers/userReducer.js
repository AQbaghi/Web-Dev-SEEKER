import { initState } from './initState.js';

const userReducer = (state = initState, action) => {
  if (action.type === 'CREATE_USER_ACCOUNT') {
    state = {
      ...state,
      userAccount: action.userAccount,
    };
    document.cookie = `token=${state.userAccount.token}`;
  }

  if (action.type === 'LOGIN_USER_ACCOUNT') {
    state = {
      ...state,
      userAccount: action.userAccount,
    };
    document.cookie = `token=${state.userAccount.token}`;
  }

  if (action.type === 'CATCH_ERROR') {
    if (action.userAccount) {
      action.errorMessage = action.userAccount;
    }
    state = {
      ...state,
      error: action.errorMessage,
    };
  }
  return state;
};

export default userReducer;
