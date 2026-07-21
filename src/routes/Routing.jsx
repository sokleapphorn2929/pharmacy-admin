import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import TestingApi from '../pages/TestingApi'

export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/login" replace/>}/>
            <Route index path='/login' element={<Login/>}/>
            <Route path='/testing' element={<TestingApi/>}/>
        </Routes>
    </BrowserRouter>
  )
}
