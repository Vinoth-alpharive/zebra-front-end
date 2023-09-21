import React from 'react'
import FooterNew from './FooterNew'
import HeaderNew from './HeaderNew'
import DepositCryptoBody from './DepositCryptoBody'
import './DepositCrypto.css'

const DepositCrypto = () => {
  return (
    <div className='depositcrypto-page'>

      <HeaderNew/>
      <DepositCryptoBody/>
      <FooterNew/>

    </div>
  )
}

export default DepositCrypto
