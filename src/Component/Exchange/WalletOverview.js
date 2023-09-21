import React from 'react'
import FooterNew from './FooterNew'
import HeaderNew from './HeaderNew'
import WalletOverviewBody from './WalletOverviewBody'
import './Wallet.css'

const WalletOverview = () => {
  return (
    <div className='wallet-page'>

      <HeaderNew/>
      <WalletOverviewBody/>
      <FooterNew/>

    </div>
  )
}

export default WalletOverview
