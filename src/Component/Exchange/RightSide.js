import React, { useState } from 'react'
import './RightSide.css'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import RightTradeTabOuter from './RightTradeTabOuter';
import TradeHistory from './TradeHistory';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: '3px',
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.58)',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      '&:focus': {
        width: '100%',
      },
    },
  },
}));

const useStyles = makeStyles({

  inputsearch: {
    background: '#18222F !important',
    borderRadius: '0px !important'
  },
  inputsearchbox: {
    width: '100%'
  },
  mtb: {
    marginLeft: '0px',
    // '@media (max-width: 767.98px)': {
    //   display: 'none',
    // }
    // height: '100vh'
  },
  // mtt: {
  //   height: '60vh'
  // }

});

const RightSide = ({ pairs, trades }) => {
  const [da, setda] = useState()
  const trade = (status) => {
    setda(status)
    trades(status)
  }

  const classes = useStyles();

  return (
    <>
      <div className={classes.mtt}><RightTradeTabOuter pairs={pairs} trade={trade} /></div>
      <div className={classes.mtb}><TradeHistory da={da} /></div>
    </>
  )
}

export default RightSide
