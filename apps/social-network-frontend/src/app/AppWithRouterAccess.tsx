import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { LoginCallback, Security } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Login } from '@sn-htc/social-network-frontend/feature-auth';
import { oktaAuth, oktaSignInConfig } from '@sn-htc/social-network-frontend/config-constants';
import PrivateRoutesContainer from './PrivateRoutesContainer';
import { Home } from '@sn-htc/social-network-frontend/feature-home';

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/signin');
  };

  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
    history.go(0);
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signin' render={() => <Login config={oktaSignInConfig} />} />
        <Route path='/signin/callback' component={LoginCallback} />
        <PrivateRoutesContainer />
        <Route path='*' render={() => <h1>Not Found</h1>} />
      </Switch>
    </Security>
  );
};

export default AppWithRouterAccess;
