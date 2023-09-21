import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Header from '../Header/Header';
import LeftSide from '../Exchange/LeftSide';
import RightSide from '../Exchange/RightSide';
import MidPart from '../Exchange/MidPart';
import './Exchange.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

  container: { marginTop: '0px !important', paddingTop: '0px !important' },
  root: { marginTop: '0px !important', paddingTop: '0px !important' },
  item: { paddingTop: '0px !important', marginTop: '0px !important' },

  head: {
    background: '#18222F !important'
  },
  headinner: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: 'transparent !important',
    borderBottom: '1px solid #373c3e',
    '@media (max-width: 991.98px)': {
      padding: '20px 10px !important',
    }
  },
  tabpart: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginTop: '0px'
  },
  tradepart: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginTop: '0px',
    '& div': {
      borderBottom: 'none !important',
      marginTop: '0px'
    }
  },
  craeteacc: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginTop: '0px',
    '@media (max-width: 767.98px)': {
      marginTop: '20px',
    },
  },
  tradepartmiddle: {
    paddingLeft: '1px !important',
    height: '100vh',
    '@media (max-width: 1199.98px)': {
      paddingLeft: '15px !important',
      paddingRight: '2px !important',
      height: 'auto'
    }
  },
  craeteaccright: {
    paddingLeft: '1px !important',
    '@media (max-width: 991.98px)': {
      paddingLeft: '15px !important',
      paddingRight: '2px !important',
      paddingTop: '0px !important',
    }
  },

});

const Exchange = () => {


  const classes = useStyles();

  const [pairs, setpairs] = useState()
  const [tr, settr] = useState(false)
  const pairsSelected = (e) => {
    setpairs((e))
  }

  const trades = (e) => {
    // console.log(e, 'e')
    settr(e)
  }

  return (


    <div className="bittrex-homepage-exchange">

      <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className={classes.head}>
            <Item className={classes.headinner}>
              <Header />
            </Item>
          </Grid>

        </Grid>

        {/* <div className='statusaskbidmain'><BidAskMobileStatus/></div> */}

        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='carouselgrid'>
            <Item className={classes.tabpart}>
              <LeftSide pairsSelected={pairsSelected} />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.tradepartmiddle}>
            <Item className={classes.tradepart}>
              <MidPart tr={tr} />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.craeteaccright}>
            <Item className={classes.craeteacc}>
              <RightSide pairs={pairs} trades={trades} />
            </Item>
          </Grid>

        </Grid>
      </Box>

    </div>

  )
}

export default Exchange
