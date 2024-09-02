import React, { useEffect } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import Swapping from './Swapping';
import './Swap.css'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  sidebarcls: {
    background: '#010712 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    overflow: 'hidden',
    position: 'relative'
  },
  headercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: 'transparent !important',
    borderBottom: '1px solid #373c3e',
    '@media (max-width: 991.98px)': {
      padding: '20px 10px !important',
    }
  },
  coinsblock: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: '#181a1a !important',
    height: 'calc(100vh - 68px)',
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
      height: 'auto !important'
    }
  },
  footercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '30px 55px !important',
    backgroundImage: `url(${footerbg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: '0px',
    '& nav': {
      '& li': {
        '& a': {
          color: '#C0C9D0 !important'
        }
      }
    },
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
    }
  }
});

const Swap = () => {
  useEffect(() => {
    document.title = "Zebra Exchange | Swap"
  }, [])

  const classes = useStyles();

  return (
    <div className='swaping-page'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
            <Item className={classes.headercls}>
              <Header />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.coinsblock}>
              <Swapping />
            </Item>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Item className={classes.footercls}>
              <Footer />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Swap
