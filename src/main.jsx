import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes';
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { FirebaseAuthProvider } from "./components/auth/FirebaseAuthProvider.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    signInFallbackRedirectUrl="/sign-in"
    signUpFallbackRedirectUrl="/sign-up"
    signInForceRedirectUrl="/"
    signUpForceRedirectUrl="/"
    appearance={{
      baseTheme: dark,
      elements: {
        card: {
          background: 'rgba(20, 20, 20, 0.45)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        headerTitle: {
          fontWeight: '700',
          fontSize: '2rem',
          color: '#FFF',

        },
        formButtonPrimary: {
          background: 'linear-gradient(90deg, #8a5cf680 0%, #22d3ee63 100%)',
          color: '#FFF',
          boxShadow: '0 4px 14px 0 rgba(139,92,246,0.39)',
          borderRadius: '1rem',
          fontSize: '1rem',
          padding: '0.75rem 1.5rem',
        },
        formFieldInput: {
          background: 'rgba(255,255,255,0.10)',
          color: '#FFF',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255,255,255,0.12)',
          padding: '0.75rem 1rem',
        },
        variables: {
          colorPrimary: '#8b5cf6',
          colorBackground: 'transparent',
          fontFamily: 'Inter, "Segoe UI", sans-serif'
        },
        footer: {
          display: "none"
        }
      }
    }}
  >
    <FirebaseAuthProvider>
      <Router>
        <App />
      </Router >
    </FirebaseAuthProvider>
  </ClerkProvider>
);
