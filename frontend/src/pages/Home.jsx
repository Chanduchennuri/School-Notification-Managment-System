import React from 'react'
import { googleCheckInRoute } from '../API/Routes';

function Home() {
    const GoogleAuth =() => {
        window.open(
            googleCheckInRoute,
            "_self"
        );
    }
  return (
    <div className=" flex items-center h-screen bg-[#FFB4B4] justify-center">
        <div>
            <button className=" font-bold text-3xl animate-pulse tracking-[15px] p-2 hover:underline underline-offset-8" onClick={GoogleAuth}>
                CLICK HERE TO SIGN IN
            </button>
        </div>
    </div>
  )
}

export default Home;