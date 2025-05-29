import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function GoogleButton() {
  return (
    <div>
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log('Login Success:', credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
        ux_mode="popup"
        prompt="select_account"
        theme="filled_blue"
        size="large"
        text="signin_with"
        shape="pill"
        width="250"
      />
    </div>
  );
}

export default GoogleButton;
