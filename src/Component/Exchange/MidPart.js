import React from 'react'
import './MidPart.css'
import ChartOuter from './ChartOuter'
import OrderOuter from './OrderOuter'

const MidPart = ({ tr, pairs }) => {
  return (
    <div>
      <ChartOuter pairs={pairs} tr={tr} />
      <OrderOuter tr={tr} />
    </div>
  )
}

export default MidPart
