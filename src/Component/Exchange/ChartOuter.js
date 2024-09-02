import React from 'react'
import ChartOuterTab from './ChartOuterTab'
import ChartOuterTabMobile from './ChartOuterTabMobile'

const ChartOuter = ({ pairs, tr }) => {
  return (
    <div>
      <ChartOuterTab pairs={pairs} />
      <ChartOuterTabMobile pairs={pairs} tr={tr} />
    </div>
  )
}

export default ChartOuter
