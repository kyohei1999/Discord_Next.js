'use client';
import React, { useEffect } from 'react';
import Sidibar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import './css/top_css/Top.scss';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from '../utils/ErrorfallBack';

const Top = () => {
  return (
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Sidibar />
      </ErrorBoundary>
      <Chat />
    </div>
  );
};

export default Top;
