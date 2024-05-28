'use client';
import React, { useEffect } from 'react';
import Sidibar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import './css/top_css/SecondTop.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from '../utils/ErrorfallBack';
import { useAppDispatch, useAppSelector } from '../hooks';
import { login } from '../slice/userSlice';
import { auth, db } from '@/app/firebase';
import useServerCollection from '../hooks/useServerCollection';
import { initializeServerInfo } from '../slice/serverSlice';
import { setChannelInfo } from '../slice/channelSlice';
import useCollection from '../hooks/useCollection';

const SecondTop = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { doucuments: servers } = useServerCollection('servers');
  const { doucuments: channels } = useCollection('servers', 'channels');
  const serverId = useAppSelector((state) => state.server.serverId);
  const channelId = useAppSelector((state) => state.channel.channelId);

  useEffect(() => {
    // 再読み込み時のみ実行される処理
    if (servers.length > 0 && serverId == null) {
      dispatch(
        initializeServerInfo({
          serverId: servers[0].id,
          serverName: servers[0].server.serverName,
        })
      );
    }
  }, [servers]);

  useEffect(() => {
    if (channels.length > 0 && channelId == null) {
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
      }
    });
  }, [dispatch]);

  return (
    <div className="SecondeTop">
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Sidibar />
      </ErrorBoundary>
      <Chat />
    </div>
  );
};

export default SecondTop;
