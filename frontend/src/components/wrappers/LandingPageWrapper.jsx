import React from 'react'

const LandingPageWrapper = ({element}) => {
  return (
    <div className="grid w-screen h-screen grid-cols-2">
    <div className="relative w-full h-screen bg-red-500">
      <img
        src="/login_landing.jpg"
        className="w-auto h-screen overflow-hidden"
      ></img>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
    <div className="flex flex-col items-center justify-center w-full h-screen bg-yellow-50 ">
        {element}
    </div>
    </div>
  )
}

export default LandingPageWrapper
