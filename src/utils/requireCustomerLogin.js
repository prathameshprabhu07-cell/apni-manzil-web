import { auth } from '../firebase';

export const requireCustomerLogin = (navigate, actionName = 'continue') => {
  const user = auth.currentUser;

  if (!user) {
    const goToLogin = window.confirm(
      'Please Login or Register to ' +
        actionName +
        '.\n\nClick OK for Login / Register.'
    );

    if (goToLogin) {
      navigate('/login');
    }

    return false;
  }

  return true;
};