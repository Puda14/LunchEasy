import React from 'react'
import Sidebar from '../Sidebar'
const LayoutWrapper = ({element}) => {
  return (
    <div className='w-screen h-screen flex flex-row'>
        <Sidebar />
        {element}

    </div>
  )
}

export default LayoutWrapper;
