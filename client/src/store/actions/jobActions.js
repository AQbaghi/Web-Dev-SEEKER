import { getMyCompanyInfo } from './authActions.js';
//add pagination details here

export const getJobsFromDB = (ownProps) => {
  return async (dispatch, getState) => {
    console.log(ownProps);
    const jobsPromise = await fetch(
      `/api/job/all-job${ownProps.location.search}`
    );
    console.log(ownProps.location.search);
    const jobs = await jobsPromise.json();

    dispatch({ type: 'GET_JOBS', jobs: jobs });
  };
};

export const getMyCompanyJobsFromDB = (owner) => {
  return async (dispatch, getState) => {
    console.log(owner);
    const jobsPromise = await fetch(`/api/job/my-jobs`, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: document.cookie.replace('token=', 'Bearer '),
      },
      method: 'POST',
      body: JSON.stringify({
        _id: owner,
      }),
    });
    const jobs = await jobsPromise.json();
    console.log(jobs);

    dispatch({ type: 'GET_MY_JOBS', jobs: jobs });
  };
};

export const getJobDetailsFromDB = (ownProps) => {
  return async (dispatch, getState) => {
    const jobPromise = await fetch(
      `/api/job/info/${ownProps.match.params._id}`
    );
    const jobPostDetails = await jobPromise.json();
    let companyId = await getMyCompanyInfo(document.cookie);
    console.log();
    dispatch({
      type: 'GET_JOB_POST_DETAILS',
      jobPostDetails: { ...jobPostDetails, verifiedCompanyId: companyId },
    });
  };
};
