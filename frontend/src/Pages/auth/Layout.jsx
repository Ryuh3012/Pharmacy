import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='bg-[#d4d1d1] w-screen h-screen'>
            <div className='flex justify-center items-center content w-full h-full '>
                {children}
            </div>
        </div>
    )
}

export default Layout

