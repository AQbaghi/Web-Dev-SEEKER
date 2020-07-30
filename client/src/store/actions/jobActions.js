//add pagination details here

export const getJobsFromDB = (ownProps) => {
  return async (dispatch, getState) => {
    console.log(ownProps.location);
    const jobsPromise = await fetch(
      `/api/job/all-job${ownProps.location.search}`
    );
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
