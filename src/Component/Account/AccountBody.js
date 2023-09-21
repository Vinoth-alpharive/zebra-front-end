import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CloseIcon from '@mui/icons-material/Close';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import AccountInnerab from './AccountInnerab';

import coins1 from '../../images/coin-4-1.png'
import coins2 from '../../images/coin-4-4.png'
import coins3 from '../../images/coin-4-2.png'
import coins4 from '../../images/coin-4-3.png'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


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
    marginLeft: theme.spacing(1),
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
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

  accountleft: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    background: 'transparent !important'
  },
  accountright: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    background: 'transparent !important'
  },

  toolbarsearch: {
    justifyContent: 'space-between !important',
    minHeight: '46px !important',
    width: '100% !important',
    padding: '0px !important',
    '& input': {
      width: '100% !important',
      padding: '0px !important',
      color: '#787E87 !important'
    },
    '& >div': {
      width: '100% !important',
      justifyContent: 'space-between !important',
      display: 'flex',
      alignItems: 'center !important',
      marginLeft: '0px !important',
      background: '#373C3E',
      borderRadius: '9px',
      padding: '10px',
      marginTop: '15px',
      '& svg': {
        color: '#787E87 !important'
      }
    }
  },
  accountrighttransaction: {
    paddingLeft: '20px'
  },
  accountright: {
    paddingLeft: '20px !important',
    background: 'transparent !important',
    boxShadow: 'none !important',
    borderLeft: '1px solid #373C3E'
  },
  tabinnerpanel: {
    '& >div': {
      padding: '0px !important',
      marginTop: '20px'
    }
  }

});

const AccountBody = () => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [moreOpt, setMoreOpt] = useState(true);
  const [newId, setNewId] = useState();

  const openMoreHandler = (id) => {
    setMoreOpt(false)
    setNewId(id)
  }

  const closeMoreHandler = () => {
    setMoreOpt(true)
  }

  const coinsbalance =
    [
      { id: 1, coinimg: coins1, coinsymbol: "BTC", coinname: "Bitcoin", amount: 0.9, coinval: "19,029", coinhrs: 2.09 },
      { id: 2, coinimg: coins2, coinsymbol: "XDC", coinname: "XDC", amount: 0.9, coinval: "19,029", coinhrs: 2.09 },
      { id: 3, coinimg: coins3, coinsymbol: "ETH", coinname: "Ethereum", amount: 0.9, coinval: "19,029", coinhrs: 2.09 },
      { id: 4, coinimg: coins4, coinsymbol: "XRP", coinname: "XRP", amount: 0.9, coinval: "19,029", coinhrs: 2.09 },
    ]

  return (
    <div className='account-page-body'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>

          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <Item className={classes.accountleft}>

              <div className='balance-head-search'>
                <div className='balance-head-left'><h3>Balance</h3><h2>$89,301</h2></div>
                <div className='balance-head-right'>
                  <Toolbar className={classes.toolbarsearch}>
                    <Search>

                      <StyledInputBase
                        placeholder="Look for Token"
                        inputProps={{ 'aria-label': 'search' }}
                      />
                      <SearchIcon />
                    </Search>
                  </Toolbar>
                </div>
              </div>

              {coinsbalance?.map((coindtl) => (


                <div className='coin-detail-balance' key={coindtl.id}>

                  <Grid container spacing={0} className='coin-detail-balance-specific'>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                      <div className='coins-club'>
                        <div className='coins-club-img'><img src={coindtl.coinimg} alt={coindtl.coinname} /></div>
                        <div className='token-symb-name'>
                          <span className='span-token-symbl token-amount-head'>{coindtl.coinsymbol}</span>
                          <span className='span-token-name'>{coindtl.coinname}</span>
                        </div>
                      </div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                      <div className='token-amount-inner'><span className='token-amount-head'>Amount</span><span className='token-amount-value'>{coindtl.amount}</span></div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                      <div className='token-amount-inner'><span className='token-amount-head'>Value</span><span className='token-amount-value'>${coindtl.coinval}</span></div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                      <div className='token-amount-inner'><span className='token-amount-head'>24h Change</span><span className='token-amount-value-badge'>{coindtl.coinhrs}%</span></div>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={2} xl={2} className='button-more-outer'>
                      <Button className='more-button' variant="outlined" endIcon={<AddIcon />} onClick={() => openMoreHandler(coindtl.id)}>More</Button>
                    </Grid>

                  </Grid>


                  <div className='more-options-balance' id={!moreOpt && newId === coindtl.id ? 'active-id' : ''}>

                    <Button className='deposit-hover' variant="outlined" startIcon={<ArrowUpwardIcon />}>
                      Deposit
                    </Button>

                    <Button className='withdraw-hover' variant="outlined" startIcon={<ArrowDownwardIcon />}>
                      Withdraw
                    </Button>

                    <Button className='tradeswap-hover' variant="outlined" startIcon={<StarIcon />}>
                      Trade
                    </Button>

                    <Button className='tradeswap-hover' variant="outlined" startIcon={<SwapVerticalCircleIcon />}>
                      Swap
                    </Button>

                    <div className='balance-more-close' onClick={() => closeMoreHandler()}><CloseIcon /></div>


                  </div>

                </div>


              ))}



            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={5} xl={5} className={classes.accountrighttransaction}>
            <Item className={classes.accountright}>
              <div className='transaction-head-search'>
                <h3>Transactions</h3>
                <Button className='search-transaction' variant="outlined" startIcon={<SearchIcon />}>
                </Button>
              </div>

              <div className='account-tabs-outer'>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Deposits" {...a11yProps(0)} />
                      <Tab label="Withdraw" {...a11yProps(1)} />
                      <Tab label="Exchange" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <TabPanel className={classes.tabinnerpanel} value={value} index={0}>
                    <AccountInnerab />
                  </TabPanel>
                  <TabPanel className={classes.tabinnerpanel} value={value} index={1}>
                    Item Two
                  </TabPanel>
                  <TabPanel className={classes.tabinnerpanel} value={value} index={2}>
                    Item Three
                  </TabPanel>
                </Box>
              </div>


            </Item>
          </Grid>

        </Grid>
      </Box>
    </div>
  )
}

export default AccountBody
