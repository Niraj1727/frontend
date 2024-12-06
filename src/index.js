import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="191122575521-mfvre30eo7jemq5727ahpld3ekoohuhm.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
