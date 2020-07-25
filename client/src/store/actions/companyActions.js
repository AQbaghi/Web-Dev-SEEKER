export const startCompany = (formInfo, ownProps) => {
  return async (dispatch, getState) => {
    const token = document.cookie;

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

    dispatch({ type: 'START_COMPANY', companyInfo });

    ownProps.history.push('/');
  };
};
