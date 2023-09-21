import React from 'react'
import FooterNew from './FooterNew'
import HeaderNew from './HeaderNew'
import MarketBody from './MarketBody'
import './Market.css'

const Market = () => {
  return (
    <div className='market-page'>

      <HeaderNew/>
      <MarketBody/>
      <FooterNew/>

    </div>
  )
}

export default Market
