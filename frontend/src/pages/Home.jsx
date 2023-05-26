import React from 'react'
import { googleCheckInRoute } from '../API/Routes';
import R from "../assets/R.png";

function Home() {
    const GoogleAuth =() => {
        window.open(
            googleCheckInRoute,
            "_self"
        );
    }
  return (
    <div className=" flex items-center h-screen bg-[#FFB4B4] justify-center">
        <div className='flex flex-col items-center justify-center'>
            <h1 className='text-3xl p-10 text-[#212A3E] font-bold tracking-[15px]'>SCHOOL MANAGEMENT SYSTEM</h1>
            <button className="flex rounded-md bg-[#BA94D1] animate-pulse ring-[#7F669D] px-4 gap-10 tracking-[10px] p-2 hover:ring-4" onClick={GoogleAuth}>
                <img src={R} className='h-10 w-10'  />
                <h1 className='font-bold text-2xl'>CLICK HERE TO SIGN IN</h1>
            </button>
        </div>
    </div>
  )
}

export default Home;