import React from 'react'
import FooterNew from './FooterNew'
import HeaderNew from './HeaderNew'
import './WithdrawCrypto.css'
import WithdrawCryptoBody from './WithdrawCryptoBody'

const WithdrawCrypto = () => {
  return (
    <div className='withdrawcrypto-page'>

      <HeaderNew/>
      <WithdrawCryptoBody/>
      <FooterNew/>

    </div>
  )
}

export default WithdrawCrypto
