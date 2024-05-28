'use client';
import Sidibar from '../../../features/main/components/sidebar/Sidebar';
import { store } from '../../../features/main/store';
import { Provider } from 'react-redux';
import Chat from '@/features/main/components/chat/Chat';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../features/main/hooks';
import { auth } from '../../firebase';
import { login, logout } from '../../../features/main/slice/userSlice';
import useServerCollection from '@/features/main/hooks/useServerCollection';
import Top from '@/features/main/components/Top';
import SecondTop from '@/features/main/components/SecondTop';

export default function Home() {
  return (
    <>
      <React.StrictMode>
        <Provider store={store}>
          {/* <Sidibar />
          <Chat /> */}
          <SecondTop />
        </Provider>
      </React.StrictMode>
    </>
  );
}
