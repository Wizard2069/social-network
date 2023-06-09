import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './components/OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

export const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = async (tokens) => {
    await oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.error('error logging in', err);
  };

  if (!authState) {
    return null;
  }

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }} /> :
    <div className='auth-login' data-test='okta-auth'>
      <OktaSignInWidget
        config={config}
        onSuccess={onSuccess}
        onError={onError}
      />
    </div>;
};
