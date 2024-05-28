import React from 'react';
import '../css/login_css/Login.scss';
import { Button } from '@mui/material';
import { signInWithRedirect } from 'firebase/auth';
import { auth, provider } from '../../../../app/firebase';

function login() {
  const signIn = () => {
    signInWithRedirect(auth, provider).catch((err) => {
      alert(err.ChatMessage);
    });
  };

  return (
    <div className="login">
      <div className="loginLogo">
        <img src="/images/discordIcon.png" alt=""></img>
      </div>

      <Button onClick={signIn}>ログイン</Button>
    </div>
  );
}

export default login;
