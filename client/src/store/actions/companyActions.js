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

    try {
      console.log(companyInfo.owner);
      const companyAvatarPromise = await fetch(
        `/api/company/me/avatar/${companyInfo.owner}`,
        {
          method: 'POST',
          body: formInfo.formData,
        }
      );
      console.log(companyAvatarPromise);
      const companyAvatar = await companyAvatarPromise.json();
      console.log(companyAvatar);

      dispatch({
        type: 'START_COMPANY_WITH_AVATAR',
        companyInfo: { ...companyInfo, companyAvatar },
      });
    } catch (err) {
      dispatch({ type: 'START_COMPANY', companyInfo });
      console.log(companyInfo);
    }

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
    console.log(jobPost);
    dispatch({ type: 'POST_JOB', jobPost });

    ownProps.history.push('/');
  };
};
