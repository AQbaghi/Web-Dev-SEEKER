import { initState } from './initState.js';

const jobReducer = (state = initState, action) => {
  if (action.type === 'GET_JOBS') {
    state = {
      ...state,
      jobPosts: action.jobs,
    };
  }

  if (action.type === 'GET_MY_JOBS') {
    state = {
      ...state,
      myCompanyJobs: action.jobs,
    };
  }

  if (action.type === 'GET_JOB_POST_DETAILS') {
    state = {
      ...state,
      jobPostDetails: action.jobPostDetails,
    };
  }

  return state;
};

export default jobReducer;
