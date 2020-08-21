export const auth = (token) => {
  return async (dispatch, getState) => {
    const authenticatedPropmise = await fetch('/api/user/me', {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: token.replace('token=', 'Bearer '),
      },
      method: 'GET',
    });
    const authenticatedUser = await authenticatedPropmise.json();

    try {
      const usersCompanyPropmise = await fetch('/api/company/me', {
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: token.replace('token=', 'Bearer '),
        },
        method: 'GET',
      });
      const companyInfo = await usersCompanyPropmise.json();

      dispatch({
        type: 'AUTHENTICATE_USER',
        authenticatedUser: { ...authenticatedUser, companyInfo },
      });
    } catch (err) {
      dispatch({ type: 'AUTHENTICATE_USER', authenticatedUser });
    }
  };
};

export const getMyCompanyInfo = async (token) => {
  const usersCompanyPropmise = await fetch('/api/company/me', {
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: token.replace('token=', 'Bearer '),
    },
    method: 'GET',
  });
  const companyInfo = await usersCompanyPropmise.json();
  console.log(companyInfo);
  return companyInfo;
};
