import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Calendar from './components/Home/Calendar'
import Day from './components/Home/Day'
function App() {
  return (
    <Routes>
      <Route exact path='/' Component={Home}>
       <Route exact path='/' Component={Calendar}></Route>
       <Route exact path='/view' Component={Day}></Route>
      </Route>
    </Routes>
  )
}

export default App
