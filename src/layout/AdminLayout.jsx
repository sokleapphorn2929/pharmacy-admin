import React from 'react';
import { Outlet } from 'react-router-dom';
import Aside from '../components/Aside';

export default function AdminLayout() {
  return (
    <div className='pt-20 pb-5 md:px-5 px-2 h-screen w-screen flex md:gap-5 gap-3 overflow-hidden box-border'>
      {/* Sidebar - fixed shrink behavior */}
      <Aside />
      
      {/* Main Content Wrapper */}
      <div className='flex-1 h-full flex flex-col min-w-0'>
        <Outlet />
      </div>
    </div>
  );
}