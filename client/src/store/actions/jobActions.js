//add pagination details here

export const getJobsFromDB = () => {
  return async (dispatch, getState) => {
    const jobsPromise = await fetch('/api/job/all-job?limit=10&skip=0?');
    const jobs = await jobsPromise.json();

    dispatch({ type: 'GET_JOBS', jobs: jobs });
  };
};

export const getJobDetailsFromDB = (ownProps) => {
  return async (dispatch, getState) => {
    const jobPromise = await fetch(
      `/api/job/info/${ownProps.match.params._id}`
    );
    const jobPostDetails = await jobPromise.json();
    dispatch({ type: 'GET_JOB_POST_DETAILS', jobPostDetails: jobPostDetails });
  };
};

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
    ownProps.history.push('/');
  };
};

export const auth = (token) => {
  return async (dispatch, getState) => {
    const authenticatedPropmise = await fetch('/api/user/me', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'GET',
    });
    const authenticatedUser = await authenticatedPropmise.json();

    dispatch({ type: 'AUTHENTICATE_USER', authenticatedUser });
  };
};
