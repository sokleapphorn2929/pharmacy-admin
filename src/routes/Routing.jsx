import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import TestingApi from '../pages/TestingApi'
import RootLayout from '../layout/RootLayout'
import Dashboard from '../pages/Dashboard'
import AdminLayout from '../layout/AdminLayout'
import Category from '../pages/Category'

export default function Routing() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/login" replace/>}/>
            <Route index path='/login' element={<Login/>}/>
            {/* <Route path='/testing' element={<TestingApi/>}/> */}
            <Route path='/admin' element={<RootLayout/>}>
              <Route element={<AdminLayout/>}>
                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='category' element={<Category/>}/>
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
