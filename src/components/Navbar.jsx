import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-between bg-violet-700 text-white w-[100vw] py-2'> 
        <div className="logo">
            <span className='font-bold text-xl mx-9 '>Itask</span>
        </div>
        
        <ul className="flex gap-8 mx-7">

            <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-50'> Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
