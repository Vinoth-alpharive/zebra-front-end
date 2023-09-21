import React, { useState } from 'react'
import './Header.css'
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import logo from '../images/logo.svg'
import bitcoinicon from '../images/bitcoin-icon.png'
import increase from '../images/increase.png'
import decrease from '../images/decrease.png'
import { Link } from "react-router-dom";
import lighticon from '../images/light-icon.png'
import settingicon from '../images/setting-icon.png'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ErrorIcon from '@mui/icons-material/Error';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LaunchIcon from '@mui/icons-material/Launch';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



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

  logopart: {
    background: 'transparent !important',
    border: 'none',
    boxShadow: 'none !important',
    width: '50%',
    display: 'flex',
    alignItems: 'center',

    '& img': { width: '100%' }
  },
  headone: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '4.333333% !important'
  },
  coinspecificstatus: {
    background: 'transparent !important',
    border: 'none',
    boxShadow: 'none !important',
    height: '100%'
  },
  headmenu: {
    background: 'transparent !important',
    border: 'none',
    boxShadow: 'none !important',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  bodymaincontain: {
    justifyContent: 'space-between'
  },
  headtwo: {
    paddingLeft: '0px !important',
    position: 'relative',
    left: '-30px'
  },
  bodymain: {
    '@media (max-width: 767.98px)': {
      display: 'none',
    }
  }

});

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));



const ITEM_HEIGHT = 50;
const ITEM_WIDTH = 520;

const Header = () => {

  const classes = useStyles();

  const [anchordot, setAnchorDot] = React.useState(null);
  const [isAdvertisementActive, setIsAdvertisementActive] = useState(false)
  const [isMoreActive, setIsMoreActive] = useState(false)



  const opendot = Boolean(anchordot);
  const handleClickDot = (event) => {
    setAnchorDot(event.currentTarget);
  };
  const handleCloseDot = () => {
    setAnchorDot(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEll, setAnchorEll] = React.useState(null);


  const openEll = Boolean(anchorEll);
  const handleClickEll = (event) => {
    setAnchorEll(event.currentTarget);
  };
  const handleCloseEll = () => {
    setAnchorEll(null);
  };




  return (
    <div>

      <div className='mobile-header'>
        <div className='logo'><img src={logo} alt={logo} /></div>
        <div className='header-socket-running-trade'>
          <div class="market-app--market-name"><div class="market-name-label">Bitcoin (BTC-USD)</div><div class="market-info"><div class="last-fill"><span class="currency-formatter"><span class="prefix-glyph currency">$</span><span class="value"><span class="satoshi ">23,216.618<span class=""></span></span></span></span></div><div class="estimate">(≈ <div class="estimate-item"><span>₿1.00000000</span></div>)</div></div></div>
        </div>

        <div className='menu-btn header-menu-btn'>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
          >
            <MenuIcon />
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            className='menu-header-mobile'
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem className={classes.dropmenuauto}>

              <div className='mobile-widget-settings'>
                <div className='dark-light-mode-mob'><WbSunnyIcon /></div>
                <div className='customize-btn-mob'><Button variant="contained" startIcon={<SettingsIcon />}>Customize</Button></div>
              </div>

            </MenuItem>
            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              INSTANT BUY & SELL
            </MenuItem>
            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              MARKET
            </MenuItem>
            {/* <Divider sx={{ my: 0.5 }} /> */}
            <MenuItem className={classes.dropmenuauto} >
              <div className='dropdown-menus' onClick={() => { setIsAdvertisementActive(!isAdvertisementActive) }}>
                HELP <div className='drop-arow-menu-sub'>
                  {
                    isAdvertisementActive ?
                      <ExpandLessIcon className={classes.dropicon} />
                      :
                      <ExpandMoreIcon className={classes.dropicon} />
                  }

                </div>
              </div>
            </MenuItem>
            {
              isAdvertisementActive &&
              <div className='submenu-drop' >

                <div className='dropdown-menus-sub'>
                  <ul>
                    <li>Support Center</li>
                    <li>Contact Us</li>
                    <li>Fees</li>
                    <li>Website Status</li>
                  </ul>
                </div>

              </div>
            }
            <MenuItem className={classes.dropmenuauto} >
              <div className='dropdown-menus' onClick={() => { setIsMoreActive(!isMoreActive) }}>
                More <div className='drop-arow-menu-sub'>
                  {
                    isMoreActive ?
                      <ExpandLessIcon className={classes.dropicon} />
                      :
                      <ExpandMoreIcon className={classes.dropicon} />
                  }

                </div>
              </div>
            </MenuItem>
            {
              isMoreActive &&
              <div className='submenu-drop' >

                <div className='dropdown-menus-sub'>
                  <ul>
                    <li>About</li>
                    <li>News</li>
                    <li>Privacy</li>
                    <li>Terms and Conditions</li>
                    <li>Cookies</li>
                    <li>API Documentation</li>
                    <li>Follow us on Twitter</li>
                    <li>Like us on Facebook</li>
                  </ul>
                </div>

              </div>
            }
            <Divider sx={{ my: 0.5 }} />
            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              SIGN UP
            </MenuItem>
            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              LOGIN
            </MenuItem>
          </StyledMenu>
        </div>


      </div>

      <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>

        <Grid container spacing={2} className={classes.bodymaincontain}>

          <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className={classes.headone}>
            <Item className={classes.logopart}>
              <img src={logo} alt={logo} />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={7} xl={7} className={classes.headtwo}>
            <Item className={classes.coinspecificstatus}>
              <div className='coinblock'>

                <div className='bitblock'>
                  <div className='bit-img'><img src={bitcoinicon} alt={bitcoinicon} /></div>
                  <div className='btc-usd'><span>BTC<span className='quote-badge'>USD</span></span><p>Bitcoin</p></div>
                </div>

                <div className='bitincrese'>
                  <div className='bitincrese-value'><span>$30,00,00</span><img src={increase} alt={increase} /></div>
                  <p>Last (₿1.00000000)</p>
                </div>

                <div className='bitdecrse'>
                  <div className='bitdecrse-value'><span>-0.67%</span><img src={decrease} alt={decrease} /></div>
                  <p>24h chg</p>
                </div>

                <div className='bithigh'>
                  <div className='bithigh-value'><span>$23,070.041</span></div>
                  <p>24h high (₿1.01330613)</p>
                </div>

                <div className='bithigh'>
                  <div className='bithigh-value'><span>$22,316.000</span></div>
                  <p>24h low (₿0.98018636)</p>
                </div>

                <div className='bithigh'>
                  <div className='bithigh-value'><span>$1,601,496.07</span></div>
                  <p>24h vol (₿1.01330613)</p>
                </div>

              </div>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4} className={classes.headthree}>
            <Item className={classes.headmenu}>
              <nav className='head-menu-part'>
                <li><Link to='/buy-sell'>Instant Buy & Sell</Link></li>
                <li><Link to='/market'>Market</Link></li>
                <li><Link to='/discover'>Discover</Link></li>
                <li><Link to='/signup'>Sign Up</Link></li>
                <li><Link to='/login'>Log In</Link></li>

                <li className='darklight-list'><Link><WbSunnyIcon /></Link></li>
                {/* <Link onClick={e => switchTheme(e)}>{theme === "dark" ?  <NightlightIcon/> : <WbSunnyIcon/> }</Link> */}
                {/* <img src={lighticon} alt={lighticon}/> */}
                <li className='setting-list'>

                  <div aria-label="more"
                    id="long-button"
                    aria-controls={opendot ? 'long-menu' : undefined}
                    aria-expanded={opendot ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClickDot}
                  ><img src={settingicon} alt={settingicon} /></div>

                  <Menu
                    id="long-menu"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchordot}
                    open={opendot}
                    onClose={handleCloseDot}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 10,
                        width: ITEM_WIDTH,
                        background: '#18222f',
                        flexDirection: 'column',
                        boxShadow: '0 0 0 1px rgb(0 0 0 / 50%), 0 5px 15px 0 rgb(0 0 0 / 15%), inset 0 0 0 1px rgb(255 255 255 / 10%)',
                        padding: '3px 0',
                        borderRadius: '2px',
                        left: 'auto !important',
                        right: '0px !important',
                        borderRadius: '5px'
                      },
                    }}
                  >

                    {/* {options.map((option) => (
          <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleCloseDot} className={classes.tradehistrymenu}>
            {option}
          </MenuItem>
        ))} */}

                    <div className='settings-block-head'>

                      <div className='rowhead-setting'>
                        <ErrorIcon /> These settings only take effect on the trading page.
                      </div>

                      <div className='rowone-setting settings-optn-flex'>
                        <div style={{ paddingRight: '50px' }}>
                          <span>Show private balances</span>
                          <p>Manage the visibility of your private balances on the trading page.</p>
                        </div>
                      </div>

                      <div className='rowtwo-setting settings-optn-flex'>
                        <div style={{ paddingRight: '50px' }}>
                          <span>Layout</span>
                          <p>Change the position and order of panels on the trading page.</p>
                        </div>


                        <div className='auto-btn' id="inner-drop-button">
                          <Button
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            Compact
                          </Button>
                          <StyledMenu
                            id="demo-customized-menu"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button',
                            }}
                            // PaperProps={{
                            // style:{ background: '#18222f !important',
                            //   boxShadow: '0 0 0 1px rgb(0 0 0 / 50%), 0 5px 15px 0 rgb(0 0 0 / 15%), inset 0 0 0 1px rgb(255 255 255 / 10%)',
                            //   padding: '3px 0',
                            //   borderRadius: '2px'}
                            // }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            className="inner-menu-drop-right"
                          >
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Compact
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Modern
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Legacy
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Panaromic
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Multi-Task
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              View Only
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                              Chart Only
                            </MenuItem>
                          </StyledMenu>
                        </div>


                      </div>

                      <div className='rowthree-setting settings-optn-flex'>

                        <div style={{ paddingRight: '50px' }}>
                          <span>Currency </span>
                          <p>Set the currency to calculate estimates on the trading page.</p>
                        </div>

                        <div className='auto-btn' id="inner-drop-button">
                          <Button
                            id="demo-customized-button-E2"
                            aria-controls={openEll ? 'demo-customized-menu-E2' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openEll ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClickEll}
                            endIcon={<KeyboardArrowDownIcon />}
                          >
                            BTC
                          </Button>
                          <StyledMenu
                            id="demo-customized-menu-E2"
                            MenuListProps={{
                              'aria-labelledby': 'demo-customized-button-E2',
                            }}
                            // PaperProps={{
                            // style:{ background: '#18222f !important',
                            //   boxShadow: '0 0 0 1px rgb(0 0 0 / 50%), 0 5px 15px 0 rgb(0 0 0 / 15%), inset 0 0 0 1px rgb(255 255 255 / 10%)',
                            //   padding: '3px 0',
                            //   borderRadius: '2px'}
                            // }}
                            anchorE2={anchorEll}
                            openE2={openEll}
                            onCloseE2={handleCloseEll}
                            className="inner-menu-drop-right"
                          >
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              BTC
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              USDT
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              ETH
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              USD
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              EUR
                            </MenuItem>
                            <MenuItem className={classes.dropmenuauto} onClick={handleCloseEll} disableRipple>
                              USDC
                            </MenuItem>
                          </StyledMenu>
                        </div>

                      </div>

                      <div className='rowfour-setting settings-optn-flex'>
                        <div style={{ paddingRight: '50px' }}>
                          <span>Clear chart cache</span>
                          <p>Clear the cache to free up memory if the application is slowing down.</p>
                        </div>
                        <div id="inner-drop-button-clear">
                          <Button className={classes.clearcache} variant="contained" endIcon={<DeleteIcon />}>
                            Clear
                          </Button>
                        </div>
                      </div>

                      <div className='link1-setting dis-flex-cmn'>
                        <span>Chart preferences</span>
                        <span className='redirect-icon'><KeyboardArrowRightIcon /></span>
                      </div>

                      <div className='link2-setting dis-flex-cmn'>
                        <span>Keyboard Shortcuts</span>
                        <span className='launch-icon'><LaunchIcon /></span>
                      </div>

                      <div className='link3-setting dis-flex-cmn'>
                        <span>Privacy</span>
                        <span className='launch-icon'><LaunchIcon /></span>
                      </div>

                      <div className='link4-setting dis-flex-cmn'>
                        <span>Terms and Conditions</span>
                        <span className='launch-icon'><LaunchIcon /></span>
                      </div>

                      <div className='link5-setting dis-flex-cmn'>
                        <span>Cookies</span>
                        <span className='launch-icon'><LaunchIcon /></span>
                      </div>

                    </div>


                  </Menu>

                </li>




              </nav>
            </Item>
          </Grid>

        </Grid>

      </Box>


    </div>
  )
}

export default Header

