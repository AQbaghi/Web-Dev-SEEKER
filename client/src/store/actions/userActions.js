import { auth } from './authActions.js';

export const signupUserAccount = (formInfo, ownProps) => {
  return async (dispatch, getState) => {
    const userAccountPropmise = await fetch('/api/users/signup', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        firstName: formInfo.firstName,
        lastName: formInfo.lastName,
        email: formInfo.email,
        password: formInfo.password,
      }),
    });
    const userAccount = await userAccountPropmise.json();

    //error checking
    if (userAccount.keyValue) {
      const errorMessage = {
        keyValue: userAccount.keyValue,
        message: 'email already taken',
      };
      dispatch({ type: 'CATCH_ERROR', errorMessage });
      return;
    }

    //check for response error
    if (userAccount.message) {
      dispatch({ type: 'CATCH_ERROR', userAccount });
      return;
    }

    dispatch({ type: 'CREATE_USER_ACCOUNT', userAccount });
    dispatch(auth(document.cookie));
    ownProps.history.push('/');
  };
};

export const loginUserAccount = (formInfo, ownProps) => {
  return async (dispatch, getState) => {
    const userAccountPropmise = await fetch('/api/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: formInfo.email,
        password: formInfo.password,
      }),
    });
    const userAccount = await userAccountPropmise.json();

    //check for response error
    if (userAccount.error) {
      dispatch({ type: 'CATCH_ERROR', userAccount });
      return;
    }

    dispatch({ type: 'LOGIN_USER_ACCOUNT', userAccount });
    dispatch(auth(document.cookie));
    ownProps.history.push('/');
  };
};

//display my profile details
export const getMyProfileFromDb = () => {
  return async (dispatch, getState) => {
    const token = document.cookie;

    //getting my profile details along with my jobs if any
    const myProfilePropmise = await fetch('/api/company/me', {
      headers: {
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'GET',
    });
    const myProfile = await myProfilePropmise.json();

    dispatch({ type: 'GET_MY_COMPANY', myProfile });
  };
};
