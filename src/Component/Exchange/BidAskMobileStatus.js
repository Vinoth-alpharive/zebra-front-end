import React from 'react'
import { makeStyles } from '@mui/styles';
import SouthEastIcon from '@mui/icons-material/SouthEast';


const useStyles = makeStyles({

    statusaskbidinner: {
        boxShadow: 'none !important',
        background: 'transparent !important',
        paddingTop: '0px !important'
    },
    statusaskbidshadow: {
        boxShadow: 'none !important',
        background: 'transparent !important'
    }

});

const BidAskMobileStatus = () => {
 
const classes = useStyles();

  return (
    <div className='BidAskMobileStatus-cls'>


                <div className='flex-box-one flex-box-cmn'>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="bid-label market-info-label">Bid</div><div class="bid-value market-info-value"><span class="satoshi ">22,905.24<span class="value-padding">000000</span></span></div>
                    </div>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="ask-label market-info-label">Ask</div><div class="ask-value market-info-value"><span class="satoshi ">22,928.933<span class="value-padding">00000</span></span></div>
                    </div>
                </div>

                <div className='flex-box-two flex-box-cmn'>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="high-label market-info-label">High</div><div class="high-value market-info-value"><span class="satoshi ">23,704.351<span class="value-padding">00000</span></span></div>
                    </div>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="low-label market-info-label">Low</div><div class="low-value market-info-value"><span class="satoshi ">22,578.634<span class="value-padding">00000</span></span></div>
                    </div>
                </div>

                <div className='flex-box-three flex-box-cmn'>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="chg-label market-info-label">Chg</div><div class="chg-value market-info-value"><span class="market-info-value directional down">-3.08% <SouthEastIcon className='decrse-icon-neg'/></span></div></div>
                    <div className='flex-box-inner flex-box-cm'>
                    <div class="vol-label market-info-label">Vol</div><div class="vol-value market-info-value"><span class="satoshi ">3,495,854.5089<span class="value-padding"></span></span></div>
                    </div>
                </div>
      
    </div>
  )
}

export default BidAskMobileStatus
