import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Calendar from './components/Home/Calendar'
import Day from './components/Home/Day'
import SignUpPage from './components/auth/SignUpPage'
import SignInPage from './components/auth/SignInPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route exact path='/' Component={Home}>
        <Route exact path='/' element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }></Route>
        <Route exact path='/view' element={
          <ProtectedRoute>
            <Day />
          </ProtectedRoute>
        }></Route>
      </Route>
    </Routes>
  )
}

export default App
