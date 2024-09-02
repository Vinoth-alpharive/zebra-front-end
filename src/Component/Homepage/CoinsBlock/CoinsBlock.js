import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import coins1 from '../../../images/coin-4-1.png'
import coins2 from '../../../images/coin-4-2.png'
import coins3 from '../../../images/coin-4-3.png'
import coins4 from '../../../images/usdc.svg.png'
import graphimg from '../../../images/graph-img.png'
import redgraph from '../../../images/Vector1.png'


import './CoinsBlock.css'


const useStyles = makeStyles({

  bgbtn: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
    marginTop: '10px !important'
  },
  coinfourblock: {
    border: '1px solid #C0C9D0',
    borderRadius: '9px'
  }

});

const CoinsBlock = () => {

  const classes = useStyles();
  const [databtc, setDatabtc] = useState([])
  const [dataeth, setDataeth] = useState([])
  const [dataxrp, setDataxrp] = useState([])
  const [datatron, setDatatron] = useState([])


  const ws = new WebSocket("wss://stream.binance.com:9443/ws");
  const apiCall = {
    "method": "SUBSCRIBE",
    "params": [
      "btcusdt@ticker",
      "ethusdt@ticker",
      "xrpusdt@ticker",
      "trxusdt@ticker",
    ],
    "id": 1
  }

  const socket = () => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if (json.s === "ETHUSDT") {
          setDataeth(json)
        }
        else if (json.s === "XRPUSDT") {
          setDataxrp(json)
        }
        else if (json.s === "BTCUSDT") {
          setDatabtc(json)
        } else if (json.s === "TRXUSDT") {
          setDatatron(json)
        }

      } catch (err) {
        console.log(err);
      }
    };
  }



  useEffect(() => {
    socket()
    return () => ws.close();
  }, [])


  return (
    <div className='coins-block'>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className={classes.coinfourblock}>


          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <div className='coins-block-inner'>
              <div className='coins-block-left'>
                <div className='img-coin'><img src={coins1} alt="coins1" /></div>
                <p className='con-name-block'>Bitcoin</p>
                <span>${parseFloat(databtc.a) ? parseFloat(databtc.a) : "0"}</span>
              </div>
              <div className='coins-block-right'>
                {databtc.P > 0 ?
                  <div className='chart-block'><img src={graphimg} /></div> :
                  <div className='chart-block'><img src={redgraph} /></div>
                }
                {databtc.P > 0 ?
                  <div className='rate-percentage'>+{parseFloat(databtc.P) ? parseFloat(databtc.P) : "0"}%</div> :
                  <div className='rate-perneg'>{parseFloat(databtc.P) ? parseFloat(databtc.P) : "0"}%</div>
                }
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <div className='coins-block-inner'>
              <div className='coins-block-left'>
                <div className='img-coin'><img src={coins2} alt="coins1" /></div>
                <p className='con-name-block'>Ethereum</p>
                <span>${parseFloat(dataeth.a) ? parseFloat(dataeth.a) : "0"}</span>
              </div>
              <div className='coins-block-right'>
                {dataeth.P > 0 ?
                  <div className='chart-block'><img src={graphimg} /></div> :
                  <div className='chart-block'><img src={redgraph} /></div>
                }
                {dataeth.P > 0 ?
                  <div className='rate-percentage'>+{parseFloat(dataeth?.P ? dataeth?.P : 0)}%</div> :
                  <div className='rate-perneg'>{parseFloat(dataeth?.P ? dataeth?.P : 0)}%</div>
                }
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <div className='coins-block-inner'>
              <div className='coins-block-left'>
                <div className='img-coin'><img src={coins3} alt="coins1" /></div>
                <p className='con-name-block'>XRP</p>
                <span>${parseFloat(dataxrp.a) ? parseFloat(dataxrp.a) : "0"}</span>
              </div>
              <div className='coins-block-right'>
                {dataxrp.P > 0 ?
                  <div className='chart-block'><img src={graphimg} /></div> :
                  <div className='chart-block'><img src={redgraph} /></div>
                }
                {dataxrp.P > 0 ?
                  <div className='rate-percentage'>+{parseFloat(dataxrp.P) ? parseFloat(dataxrp.P) : "0"}%</div> :
                  <div className='rate-perneg'>{parseFloat(dataxrp.P) ? parseFloat(dataxrp.P) : "0"}%</div>
                }
              </div>
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>
            <div className='coins-block-inner last'>
              <div className='coins-block-left'>
                <div className='img-coin'><img src={coins4} alt="coins1" /></div>
                <p className='con-name-block'>TRON</p>
                <span>${parseFloat(datatron.a) ? parseFloat(datatron.a) : "0"}</span>
              </div>
              <div className='coins-block-right'>
                {datatron.P > 0 ?
                  <div className='chart-block'><img src={graphimg} /></div> :
                  <div className='chart-block'><img src={redgraph} /></div>
                }
                {datatron.P > 0 ?
                  <div className='rate-percentage'>+{parseFloat(datatron.P) ? parseFloat(datatron.P) : "0"}%</div> :
                  <div className='rate-perneg'>{parseFloat(datatron.P) ? parseFloat(datatron.P) : "0"}%</div>
                }
              </div>
            </div>
          </Grid>


        </Grid>
      </Box>

    </div>
  )
}

export default CoinsBlock

