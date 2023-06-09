import React, { MutableRefObject, useEffect, useRef } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { useHistory, useLocation } from 'react-router-dom';
import './OktaSignInWidget.scss';
import './OktaSignInWidgetCustom.scss';

export const OktaSignInWidget = ({ config, onSuccess, onError }) => {
  const location = useLocation();
  const history = useHistory();
  const widgetRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    if (!widgetRef.current) {
      return;
    }

    const widget = new OktaSignIn(config);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current
      })
      .then(onSuccess)
      .catch(onError);

    widget.on('afterRender', (context) => {
      if (context.controller === 'primary-auth') {
        if (location.pathname === '/') {
          const signupLink = widgetRef.current?.querySelector('.registration-link');
          signupLink?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push('/signin/register');
          });
          const forgotPassLink = widgetRef.current?.querySelector('.link.js-forgot-password');
          forgotPassLink?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push('/signin/forgot-password');
          });
        }
      } else {
        const backLink = widgetRef.current?.querySelector('.auth-footer .link');
        if (backLink?.innerHTML.includes('sign in')) {
          backLink?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            history.push('/signin');
          });
        }
      }
    });

    widget.on('afterError', (context, error) => {
      console.log(error.message);
    });

    return () => widget.remove();
  }, [config, onSuccess, onError, history, location]);

  return (
    <div className='auth-wrapper' ref={widgetRef} />
  );
};

export default OktaSignInWidget;
