import { initState } from './initState.js';

const companyReducer = (state = initState, action) => {
  if (action.type === 'START_COMPANY') {
    state = {
      ...state,
      companyInfo: action.companyInfo,
      userAccount: action.authenticatedUser,
    };
  }
  if (action.type === 'CATCH_COMPANY_ERROR') {
    state = {
      ...state,
      error: { error: 'A Company with the name you entered already Exists.' },
    };
  }

  return state;
};

export default companyReducer;
