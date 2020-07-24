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
