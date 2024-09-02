import React from 'react'
import './LeftSide.css'
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import LeftTradeTab from './LeftTradeTab';
import LeftTradeTable from './LeftTradeTable';
// import searchleft from '../images/search-left.png'

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
    borderRadius: '0px !important',

    '& svg': {
      fontSize: '18px'
    }
  },
  inputsearchbox: {
    width: '100%',
    fontSize: '13px !important',

    '& input': { paddingLeft: 'calc(1em + 42px) !important' }
  }

});

const LeftSide = ({ pairsSelected, fullPair }) => {

  const classes = useStyles();
  const pairsSelecteds = (e) => {
    // console.log(e, "e")
    pairsSelected(e)
  }

  const fullPairs = (e) => {
    fullPair(e)
  }

  return (
    <>
      {/* <Search className={classes.inputsearch}>
            <SearchIconWrapper>
              <SearchIcon style={{color:'rgba(255, 255, 255, 0.58)'}} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search markets..."
              inputProps={{ 'aria-label': 'search' }}
              className={classes.inputsearchbox}
            />
          </Search> */}

      <div className={classes.mtt}><LeftTradeTable pairsSelected={pairsSelecteds} fullPairs={fullPairs} /></div>
    </>
  )
}

export default LeftSide
