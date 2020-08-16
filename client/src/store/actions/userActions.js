import { auth } from './authActions.js';

export const signupUserAccount = (formInfo, ownProps) => {
  return async (dispatch, getState) => {
    //check if verification code === the verification code in the database
    console.log('lololoooooololll');
    console.log(formInfo.verificationCode);
    const verificationCodeInDatabasePromise = await fetch(
      '/api/users/verifyemail/check',
      {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        method: 'DELETE',
        body: JSON.stringify({
          email: formInfo.email,
          verificationCode: formInfo.verificationCode,
        }),
      }
    );
    const verificationCodeInDatabase = await verificationCodeInDatabasePromise.json();
    console.log('hoping...');
    console.log(verificationCodeInDatabase);
    console.log(formInfo.email);
    console.log(formInfo.verificationCode);
    if (
      verificationCodeInDatabase.verificationCode !== formInfo.verificationCode
    ) {
      console.log('dont you dare');
      return;
    }

    console.log('wooohoooooooooooooooooooo');
    ownProps.history.push('/');
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
    console.log(userAccount);

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

    if (formInfo.formData) {
      //profile picture upload
      const userAvatarPromise = await fetch(
        `/api/users/me/avatar/${userAccount.user._id}`,
        {
          method: 'POST',
          body: formInfo.formData,
        }
      );

      const userAvatar = await userAvatarPromise.json();
      console.log(userAvatar);

      dispatch({
        type: 'UPLOAD_AVATAR_AND_CREATE_USER',
        user: { userAccount, userAvatar },
      });
    }

    dispatch(auth(userAccount.token));
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
    ownProps.history.push('/');
  };
};
