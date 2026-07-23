import React from 'react'
import Aside from '../components/Aside'
import CountSection from '../components/CountSection'

export default function Dashboard() {
  return (
    <div className='pt-20 pb-5 px-5 w-full h-screen flex md:gap-5 gap-3'>
      <Aside/>
      <CountSection/>
    </div>
  )
}
