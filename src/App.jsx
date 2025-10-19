import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Calendar from './components/Home/Calendar';
import Day from './components/Home/Day';
import SignUpPage from './components/auth/SignUpPage';
import SignInPage from './components/auth/SignInPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import "./App.css"
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route
        path="/sign-in/sso-callback"
        element={
          <AuthenticateWithRedirectCallback
            signUpFallbackRedirectUrl="/sign-up"
            signInFallbackRedirectUrl="/sign-in"
          />
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<Calendar />} />
        <Route path="view" element={<Day />} />
      </Route>

    </Routes>
  );
}

export default App;
