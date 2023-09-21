import React from 'react'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles({

  
  });

const EarnCryptoBanner = () => {
  
    const classes = useStyles();

  return (
    <div>

    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} className={classes.coinfourblock}>


    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
    <div className='crypto-banner-txt'>
    <h2>Earn with Zebra</h2>
    <p>Want to make your Crypto work for you? Start earning with Zebra's top pools and farms today</p>
    </div>
    </Grid>

    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
        
    </Grid>

    </Grid>
    </Box>
      
    </div>
  )
}

export default EarnCryptoBanner
