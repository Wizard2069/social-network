import React from 'react';
import { Switch } from 'react-router-dom';
import { PrivateRoute } from '@sn-htc/social-network-frontend/components-routes';
import { AUTHORITIES } from '@sn-htc/social-network-frontend/config-constants';
import Protected from './Protected';

const PrivateRoutesContainer = () => {
  return (
    <Switch>
      <PrivateRoute exact path='/protected' hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
        <Protected />
      </PrivateRoute>
    </Switch>
  );
};

export default PrivateRoutesContainer;
