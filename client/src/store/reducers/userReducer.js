import { initState } from './initState.js';

const userReducer = (state = initState, action) => {
  if (action.type === 'CREATE_USER_ACCOUNT') {
    state = {
      ...state,
      userAccount: action.userAccount,
    };
    document.cookie = `token=${state.userAccount.token}`;
  }

  if (action.type === 'UPLOAD_AVATAR_AND_CREATE_USER') {
    state = {
      ...state,
      userAccount: action.user.userAccount,
      userAvatar: action.user.userAvatar,
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

  if (action.type === 'GET_MY_PROFILE') {
    state = {
      ...state,
      myCompany: action.myCompany,
    };
  }

  if (action.type === 'ADD_PROFILE_PICTURE') {
    state = {
      ...state,
      userAccount: {
        ...state.userAccount,
        avatar: action.profilePicture,
      },
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
