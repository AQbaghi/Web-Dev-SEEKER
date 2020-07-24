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

    dispatch({ type: 'AUTHENTICATE_USER', authenticatedUser });
  };
};
