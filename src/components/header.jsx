import React from 'react'
import Battery from './icons/battery'
import Wifi from './icons/wifi'
import Clock from './icons/clock'
import SystemLoad from './icons/systemLoad'
const header = () => {
  return (
    <div className='text-white h-8 w-full bg-[#000000] flex justify-between px-10'>
        <div className='flex items-center gap-2'>
            <SystemLoad/>
        </div>
        <div className='flex items-center '>
            <Clock/>
        </div>
        <div className='h-full flex items-center gap-2'>
            <Wifi/>
            <Battery />
        </div>

    </div>
  )
}

export default header