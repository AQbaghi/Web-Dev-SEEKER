const initState = {
  userAccount: {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    ownesCompany: null,
    _id: null,
  },
  jobPosts: [],
  jobPostDetails: {
    job: {
      requiredSkills: [],
      responsabilities: [],
      advantages: [],
      _id: null,
      catagory: null,
      jobTitle: null,
      jobDescription: null,
      salary: null,
      location: null,
      JobOwner: null,
      companyName: null,
      createdAt: null,
      updatedAt: null,
      __v: 0,
    },
    companyInfo: {
      _id: null,
      companyName: null,
      description: null,
      location: null,
      owner: null,
      createdAt: null,
      updatedAt: null,
      __v: 0,
    },
  },
  error: {},
};

const rootReducer = (state = initState, action) => {
  if (action.type === 'GET_JOBS') {
    state = {
      ...state,
      jobPosts: action.jobs,
    };
  }

  if (action.type === 'GET_JOB_POST_DETAILS') {
    state = {
      ...state,
      jobPostDetails: action.jobPostDetails,
    };
  }

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

  if (action.type === 'AUTHENTICATE_USER') {
    state = {
      ...state,
      userAccount: action.authenticatedUser,
    };
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

export default rootReducer;
