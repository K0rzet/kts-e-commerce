import { authStore } from '@/store/AuthStore';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RedirectIfAuth = () => {
  const accessToken = authStore.accessToken;
  console.log(accessToken);
  if (accessToken) {
    return <Navigate to="/profile" />;
  }
  return <Outlet />;
};

export default RedirectIfAuth;
