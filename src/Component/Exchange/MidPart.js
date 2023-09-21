import React from 'react'
import './MidPart.css'
import ChartOuter from './ChartOuter'
import OrderOuter from './OrderOuter'

const MidPart = ({ tr }) => {
  return (
    <div>
      <ChartOuter />
      <OrderOuter tr={tr} />
    </div>
  )
}

export default MidPart
