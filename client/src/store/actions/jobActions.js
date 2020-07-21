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

export const signupUserAccount = (formInfo) => {
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
    dispatch({ type: 'CREATE_USER_ACCOUNT', userAccount });
  };
};
