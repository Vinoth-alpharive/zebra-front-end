import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo.png'
import logowhite from '../../images/logo-footer.png'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './Header.css'
import MenuIcon from '@mui/icons-material/Menu';
import mobmenulogo from '../../images/logo-footer.png'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '@mui/material';
import consts from '../../Constansts';

const useStyles = makeStyles({

  bgbtn: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
  },
  footercls: {
    marginTop: '0px !important',
  }

});

const Header = () => {

  const classes = useStyles();

  const [openMenu, setOpenMenu] = useState(true)
  const [metamaskadd, setMetamaskadd] = useState(null);
  const [wallet, setWallet] = useState(null);

  const navigate = useNavigate()

  const openMenuHandle = () => {
    setOpenMenu(false)
  }

  const closeMenuHandle = () => {
    setOpenMenu(true)
  }

  const wndow = window.location.href
  const endpoint = wndow.split("/");

  const connectwallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
          params: [{ chainId: '0x1' }]
        });
        setWallet(addressArray[0]);
        setMetamaskadd(addressArray[0]);
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
      setTimeout(() => {
        toast.error("Please Install Wallet", {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        })
      }, 100);
      window.open('https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn')
    }
  };

  useEffect(() => {
    connectwallet()
  }, [wallet])

  const c = () => {
    navigate(`/exchange/${consts.default_pair}`)
    window.location.reload(false);
  }
  return (

    <div className='header-part header-section'>
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className='header-container-block'>


          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            {
              (endpoint[3] === "exchange") || (endpoint[3] === "staking") || (endpoint[3] === "swap") || (endpoint[3] === "account") || (endpoint[3] === "kyc-verification") || (endpoint[3] === "farms") || (endpoint[3] === "liquidstaking") || (endpoint[3] === "voting") || (endpoint[3] === "community") || (endpoint[3] === "core") || (endpoint[3] === "communityvotenow") || (endpoint[3] === "makeproposal") ? <div className='logo-part'><Link to='/'><img src={logowhite} /></Link></div> : <div className='logo-part'><Link to='/'><img src={logo} /></Link></div>
            }
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className='menu-toggle-icon' onClick={() => openMenuHandle()}><MenuIcon /></div>
            <nav className='menu-block-header'>
              <ul className='header-menus'>

                <li><div><button className='back' onClick={c}>Exchange</button></div> </li>
                <li><Link to='/farms'>Farms</Link></li>
                <li><Link to='/swap'>Swap</Link></li>
                <li><Link to='/application'>Application</Link></li>
                {/* <li><Link to='/staking'>Staking</Link></li> */}
                <li><Link to='/liquidstaking'>Liquid Staking</Link></li>
                <li><Link to='/voting'>Voting</Link></li>



              </ul>
            </nav>
            <nav className='menu-block-header-mobile' id={!openMenu ? "active" : ""}>
              <div className='menu-mobile-close-part'>
                <div className='logo-part-menu'><Link to='/'><img src={mobmenulogo} /></Link></div>
                <div className='close-menu' onClick={() => closeMenuHandle()}><HighlightOffIcon /></div>
              </div>
              <ul className='header-menus'>
                <li><div><button className='back' onClick={c}>Exchange</button></div> </li>
                {/* <li><Link to='/exchange'>Exchange</Link></li> */}
                <li><Link to='/farms'>Farms</Link></li>
                <li><Link to='/swap'>Swap</Link></li>
                <li><Link to='/application'>Application</Link></li>
                {/* <li><Link to='/staking'>Staking</Link></li> */}
                <li><Link to='/liquidstaking'>Liquid Staking</Link></li>
                <li><Link to='/voting'>Voting</Link></li>
              </ul>
            </nav>
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            {metamaskadd === null ?
              <div className="connect-wallet"><Button variant="contained" className={classes.bgbtn} onClick={connectwallet}>Connect wallet</Button></div>
              : <div className='enable-wallet'><span class="green-light"></span><h2 className='add-font' style={{ color: "#596570" }} >{[wallet.slice(0, 10), ".....", wallet.slice(-10)]}</h2></div>
            }
          </Grid>


        </Grid>
      </Box>

    </div>
  )
}

export default Header
