import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import bannerimg from '../../../images/banner-img.png'
import './Banner.css'

const useStyles = makeStyles({

  bgbtn: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
    marginTop: '10px !important'
  }

});

const Banner = () => {

  const classes = useStyles();
  const [address, setAddress] = useState(null)

  const connectwallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [{ chainId: '0x1' }]
        });
        setAddress(addressArray[0])
        // const obj = {
        //   status: "👆🏽 Write a message in the text-field above.",
        //   address: addressArray[0],
        // };
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      console.log("dis connect");
    }
  };

  useEffect(() => {
    connectwallet()
  }, [address])

  return (
    <div className='banner-part'>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>


          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className='banner-content'>
              <h1>Join the<br /> World of Crypto <br /> with Zebra</h1>
              <span>Zebra makes it easy to get started, with a user-friendly platform that's perfect for everyone. </span>
              <span>Sign up today and start buying and selling over 200 cryptocurrencies!</span>
              {address === null ?
                <Button variant="contained" className={classes.bgbtn}>Connect wallet</Button> :
                <div></div>
              }
            </div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className='banner-img'><img src={bannerimg} /></div>
          </Grid>


        </Grid>
      </Box>

    </div>
  )
}

export default Banner
