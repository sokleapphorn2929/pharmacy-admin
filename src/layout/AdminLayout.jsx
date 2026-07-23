import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';

export default function AdminLayout() {
  return (
    <div className='pt-20 pb-5 md:px-5 px-2 w-full h-screen flex md:gap-5 gap-3'>
      <Aside />
      
      <div className='w-full h-full flex flex-col'>
        <Outlet />
      </div>
    </div>
  );
}