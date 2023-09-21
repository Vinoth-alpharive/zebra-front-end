import React, { useState } from 'react'
import logobittr from '../images/logo.svg'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import AppsIcon from '@mui/icons-material/Apps';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import { createMuiTheme, ThemeProvider } from "@mui/material/styles";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import './HeaderNew.css'
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GridViewIcon from '@mui/icons-material/GridView';
import SpokeIcon from '@mui/icons-material/Spoke';
import WidgetsIcon from '@mui/icons-material/Widgets';
import UpdateIcon from '@mui/icons-material/Update';
import TuneIcon from '@mui/icons-material/Tune';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import qrcode from '../images/qrcode.png'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HeadCurrency from './HeadCurrency';
const theme = createMuiTheme({});



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
    maxWidth: '4.333333% !important',
    height: '81px'
  },
  headtwo: {
    display: 'flex',
    paddingLeft: '0px !important'
  }

});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  zIndex: 999,
  borderRadius: '5px'
};


const HeaderNew = () => {


  const [modalopen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };


  const [anchorE2, setAnchorE2] = useState(null);
  const [walletopen, setWalletOpen] = useState(false);

  const handleWalletOpen = (event) => {
    setAnchorE2(event.currentTarget);
    setWalletOpen(true);
  };



  const [anchorE3, setAnchorE3] = useState(null);
  const [orderopen, setOrderOpen] = useState(false);

  const handleOrderOpen = (event) => {
    setAnchorE3(event.currentTarget);
    setOrderOpen(true);
  };



  const [anchorE4, setAnchorE4] = useState(null);
  const [qropen, setQROpen] = useState(false);

  const handleQROpen = (event) => {
    setAnchorE4(event.currentTarget);
    setQROpen(true);
  };


  const handleClose = (e) => {
    if (e.currentTarget.localName !== "ul") {
      const menu = document.getElementById("simple-menu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }

    setOpen(false);
  };

  theme.props = {
    MuiList: {
      onMouseLeave: (e) => {
        handleClose(e);
      }
    }
  };


  const walletmenu = (e) => {
    if (e.currentTarget.localName !== "ul") {
      const menu = document.getElementById("wallet-menu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }
    setWalletOpen(false);
  };

  theme.props = {
    MuiList: {
      onMouseLeave: (e) => {
        walletmenu(e);
      }
    }
  };


  const ordermenu = (e) => {
    if (e.currentTarget.localName !== "ul") {
      const menu = document.getElementById("order-menu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }

    setOrderOpen(false);
  };

  theme.props = {
    MuiList: {
      onMouseLeave: (e) => {
        ordermenu(e);
      }
    }
  };




  const qrmenu = (e) => {
    if (e.currentTarget.localName !== "ul") {
      const menu = document.getElementById("qr-menu").children[2];
      const menuBoundary = {
        left: menu.offsetLeft,
        top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
        right: menu.offsetLeft + menu.offsetHeight,
        bottom: menu.offsetTop + menu.offsetHeight
      };
      if (
        e.clientX >= menuBoundary.left &&
        e.clientX <= menuBoundary.right &&
        e.clientY <= menuBoundary.bottom &&
        e.clientY >= menuBoundary.top
      ) {
        return;
      }
    }

    setQROpen(false);
  };

  theme.props = {
    MuiList: {
      onMouseLeave: (e) => {
        qrmenu(e);
      }
    }
  };


  const menuList = [

    {
      'title': <AppsIcon />,
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 1',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Buy Crpto',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 2',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Markets',
      'path': '',
    },
    {
      'title': '        Trade',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 3',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Derivatives',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 4',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Earn',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 5',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Finance',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 6',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        NFT',
      'path': ''
    },
    {
      'title': '        Institutional',
      'path': '',
      'sub': [
        {
          'titlesub': 'menu 7',
          'pathsub': ''
        }
      ]
    },
    {
      'title': '        Feed',
      'path': ''
    }
  ]

  const classes = useStyles();

  return (

    <div className='header-landing-all'>
      <Box sx={{ flexGrow: 1 }}>

        <Grid container spacing={2}>

          <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className={classes.headone}>
            <Item className={classes.logopart}>
              <img src={logobittr} alt="company-logo" />
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={7} xl={7} className={classes.headtwo} id="head-menu-id">



            <ThemeProvider theme={theme}>
              {menuList?.map((menutit) => (
                <>
                  <Button
                    id="menubutton1"
                    aria-owns={open ? "simple-menu" : null}
                    aria-haspopup="true"
                    onMouseOver={menutit?.sub?.length !== undefined ? handleOpen : ""}
                    onMouseLeave={handleClose}
                    style={{ zIndex: 1301 }}
                  >
                    {menutit.title}
                    {menutit?.sub ? <ArrowDropDownIcon /> : ""}
                  </Button>
                  {/* {console.log(menutit?.sub?.length!==undefined)} */}
                  {

                    menutit?.sub?.map((item, i) => {
                      return (

                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          open={open}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center"
                          }}
                          style={{
                            height: '300px'
                          }}
                        >

                          <li>{item.titlesub}</li>

                        </Menu>
                      )
                    })
                  }


                </>

              ))}




            </ThemeProvider>

            <Item>

            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={1} xl={1} className={classes.headtfour}></Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.headthree}>
            <ul className='right-menus-head'>
              <li><Link to='/wallet'>Wallet</Link></li>
              {/* <li>
        <ThemeProvider theme={theme}>

   <>
       <Button
          id="menubutton1"
          aria-owns={walletopen ? "wallet-menu" : null}
          aria-haspopup="true"
          onMouseOver={handleWalletOpen}
          onMouseLeave={walletmenu}
          style={{ zIndex: 1301 }}
        >
          Wallet <ArrowDropDownIcon/> 
        </Button>
                
        <Menu
        id="wallet-menu"
        anchorEl={anchorE2}
        open={walletopen}
        onMouseLeave={walletmenu}
        anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
        }}
        transformOrigin={{
        vertical: "top",
        horizontal: "center"
        }}
        >
  
           <li><Link><GridViewIcon/>Overview</Link></li>
           <li><Link><SpokeIcon/>Fiat and Spot</Link></li>
           <li><Link><WidgetsIcon/>Margin</Link></li>
           <li><Link><UpdateIcon/>Futures</Link></li>
           <li><Link><TuneIcon/>Options</Link></li>
           <li><Link><MonetizationOnIcon/>Earn</Link></li>
           <li><Link><AccountBalanceWalletIcon/>Funding Wallet</Link></li>
           <li><Link><CurrencyExchangeIcon/>Transaction History</Link></li>
           <li><Link><SwitchAccountIcon/>Account Statement</Link></li>
           <li><Link><CheckCircleOutlineIcon/>Verification</Link></li>

        </Menu>

        </>

      </ThemeProvider>
        </li> */}

              <li>

                <ThemeProvider theme={theme}>

                  <>
                    <Button
                      id="menubutton2"
                      aria-owns={orderopen ? "order-menu" : null}
                      aria-haspopup="true"
                      onMouseOver={handleOrderOpen}
                      onMouseLeave={ordermenu}
                      style={{ zIndex: 1301 }}
                    >
                      Order <ArrowDropDownIcon />
                    </Button>

                    <Menu
                      id="order-menu"
                      anchorEl={anchorE3}
                      open={orderopen}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                    >

                      <li><Link><GridViewIcon />Spot Order</Link></li>
                      <li><Link><SpokeIcon />Marin Order</Link></li>
                      <li><Link><WidgetsIcon />Options Order</Link></li>
                      <li><Link><UpdateIcon />P2P Order</Link></li>
                      <li><Link><TuneIcon />Earn History</Link></li>
                      <li><Link><MonetizationOnIcon />Buy Crypto History</Link></li>
                      <li><Link><AccountBalanceWalletIcon />Loan History</Link></li>
                      <li><Link><CurrencyExchangeIcon />Convert History</Link></li>
                      <li><Link><SwitchAccountIcon />Launchpad History</Link></li>
                      <li><Link><CheckCircleOutlineIcon />Payment History</Link></li>

                    </Menu>

                  </>

                </ThemeProvider>

              </li>

              <li><Link><AccountCircleIcon /></Link></li>
              <li><Link><NotificationsActiveIcon /></Link></li>
              <li>


                <ThemeProvider theme={theme}>

                  <>
                    <Button
                      id="menubutton2"
                      aria-owns={qropen ? "qr-menu" : null}
                      aria-haspopup="true"
                      onMouseOver={handleQROpen}
                      onMouseLeave={qrmenu}
                      style={{ zIndex: 1301 }}
                    >
                      <QrCodeScannerIcon />
                    </Button>

                    <Menu
                      id="qr-menu"
                      anchorEl={anchorE4}
                      open={qropen}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                      }}
                    >

                      <div className='qrcode'>
                        <div className='qrcode-img'><img src={qrcode} alt='qr-code-img' /></div>
                        <h3>Scan to Download App IOS & Android</h3>
                        <button>More Download Options</button>
                      </div>

                    </Menu>

                  </>

                </ThemeProvider>

              </li>
              <li><Link><LanguageIcon /></Link></li>
              <li>
                <Button onClick={handleModalOpen}>USD</Button >
                <Modal
                  open={modalopen}
                  onClose={handleModalClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} id="currency-country-block">
                    <HeadCurrency />
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
                  </Box>
                </Modal>
              </li>
              <li><Link><DarkModeIcon /></Link></li>
            </ul>
            <Item>

            </Item>
          </Grid>

        </Grid>

      </Box>

    </div>
  )

}

export default HeaderNew
