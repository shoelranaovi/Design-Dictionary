import React from 'react'
import { Link } from 'react-router-dom'

function ComponentList() {
  return (
    <div className='flex flex-col gap-2' >   <Link to={"/components/sidebar"}>Sidebar</Link>
    <Link to={"/components/product"}>product</Link>
    <Link to={"/components/rating"}>Review</Link>
    <Link to={"/components/card"}>Card</Link>
    <Link to={"/components/community"}>Community</Link>
    <Link to={"/authlist"}>Auth components</Link>
    <Link to={"/components/navbar"}>navbar</Link>
    <Link to={"/components/button"}>button</Link>
    <Link to={"/components/slider"}>Slider</Link>
    
    </div>
  )
}

export default ComponentList