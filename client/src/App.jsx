import React from 'react'
import './App.css'
import Todolists from './components/Todolists'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
export default function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/todolists' element={<Todolists />} />
    </Routes>
    </>
  )
}
