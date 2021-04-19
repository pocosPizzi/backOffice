import React from 'react';
import { Login, LoginForm } from 'react-admin';

const MyLoginPage = () => (
  <Login
    style={{
      backgroundImage:
        'radial-gradient(circle at 50% 14em, #124999 10%, #124999 60%, #124999 70%)',
    }}
    loginForm={<LoginForm />}
  />
);

export default MyLoginPage;
