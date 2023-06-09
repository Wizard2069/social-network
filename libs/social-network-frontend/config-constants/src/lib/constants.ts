import { environment } from '@sn-htc/social-network-frontend/config-env';

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER'
};

export const oktaAuthConfig = {
  issuer: `https://${environment.oktaDomain}/oauth2/default`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/signin/callback',
};

export const oktaSignInConfig = {
  baseUrl: `https://${environment.oktaDomain}`,
  clientId: environment.oktaClientId,
  redirectUri: window.location.origin + '/signin/callback',
  logo: 'https://res.cloudinary.com/htcompany-cloud/image/upload/v1634139856/social-network/logo/htc_ikzdrw.png',
  i18n: {
    'en': {
      'primaryauth.username.placeholder': 'Email',
      'password.forgot.email.or.username.placeholder': 'Email',
      'password.forgot.email.or.username.tooltip': 'Email',
      'account.unlock.email.or.username.placeholder': 'Email',
      'account.unlock.email.or.username.tooltip': 'Email'
    }
  },
  features: {
    router: true,
    registration: true,
    showPasswordToggleOnSignInPage: true,
    selfServiceUnlock: true,
    multiOptionalFactorEnroll: true,
    scrollOnError: false,
    autoPush: true
  },
  authParams: {
    scopes: ['openid', 'email', 'profile', 'groups', 'offline_access']
  }
};
