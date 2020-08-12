import { auth } from './authActions.js';

export const startCompany = (formInfo, ownProps) => {
  return async (dispatch, getState) => {
    const token = document.cookie;
    ownProps.history.push('/');

    //creating the company requiest
    const companyPropmise = await fetch('/api/company/create', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'POST',
      body: JSON.stringify({
        companyName: formInfo.companyName,
        description: formInfo.companyDescription,
        location: formInfo.location,
      }),
    });
    const companyInfo = await companyPropmise.json();

    if (companyInfo.keyPattern) {
      dispatch({
        type: 'CATCH_COMPANY_ERROR',
        companyName: companyInfo.keyValue.companyName,
      });
      return;
    }

    //if profile picture added dispatch to companyAvatar API
    if (formInfo.avatar) {
      const companyAvatarPromise = await fetch(
        `/api/company/me/avatar/${companyInfo.owner}`,
        {
          method: 'POST',
          body: formInfo.formData,
        }
      );
      const companyAvatar = await companyAvatarPromise.json();

      dispatch({
        type: 'START_COMPANY_WITH_AVATAR',
        companyInfo: { ...companyInfo, companyAvatar },
      });
      dispatch(auth(document.cookie));
      return;
    }
    //if profile picture added dispatch to just the company API
    dispatch({ type: 'START_COMPANY', companyInfo });
    dispatch(auth(document.cookie));
  };
};

export const cteareJobPost = (formState, ownProps) => {
  return async (dispatch, getState) => {
    const token = document.cookie;

    console.log(
      JSON.stringify({
        ...formState,
      })
    );

    //creating the company requiest
    const jobPostPropmise = await fetch('/api/job/post', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'POST',
      body: JSON.stringify({
        ...formState,
      }),
    });
    const jobPost = await jobPostPropmise.json();

    dispatch({ type: 'POST_JOB', jobPost });

    ownProps.history.push('/');
  };
};
