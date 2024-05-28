'use client';
import React, { useEffect } from 'react';
import Sidibar from '../../features/main/components/sidebar/Sidebar';
import Chat from '../../features/main/components/chat/Chat';
import Login from '../../features/main/components/login/Login';
import { useAppDispatch, useAppSelector } from '../../features/main/hooks';
import { auth } from '../firebase';
import { login, logout } from '../../features/main/slice/userSlice';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from '../../features/main/utils/ErrorfallBack';
import { initializeServerInfo } from '@/features/main/slice/serverSlice';
import useServerCollection from '@/features/main/hooks/useServerCollection';
import Top from '@/features/main/components/Top';
import useCollection from '@/features/main/hooks/useCollection';
import { setChannelInfo } from '@/features/main/slice/channelSlice';

export default function LoginPage() {
  const user = useAppSelector((state) => state.user.user);
  const { doucuments: servers } = useServerCollection('servers');
  const { doucuments: channels } = useCollection('servers', 'channels');

  const dispatch = useAppDispatch();

  useEffect(() => {
    // 初期値を設定する
    if (servers.length > 0) {
      dispatch(
        initializeServerInfo({
          serverId: servers[0].id,
          serverName: servers[0].server.serverName,
        })
      );
    }
  }, [servers]);

  useEffect(() => {
    // 初期値を設定する
    if (channels.length > 0) {
      dispatch(
        setChannelInfo({
          channelId: channels[0].id,
          channelName: channels[0].channel.channelName,
        })
      );
    }
  }, [channels]);

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <>
      {user ? (
        <>
          <Top />
        </>
      ) : (
        <Login></Login>
      )}
    </>
  );
}
