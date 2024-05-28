'use client';
import LoginPage from './LoginPage/page';
// import './page.scss';
import { store } from '../features/main/store';
import { Provider } from 'react-redux';
import React from 'react';

export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <LoginPage></LoginPage>
      </Provider>
    </React.StrictMode>
  );
}
