import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../images/logo-footer.png'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import '../Header/Header.css'
import twit from '../../images/twit.png'
import insta from '../../images/insta.png'
import facebook from '../../images/facebook.png'
import linked from '../../images/linked-in-zebra.png'
import consts from '../../Constansts';



const useStyles = makeStyles({

  bgbtn: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
  }

});

const Footer = () => {

  const classes = useStyles();
  const navigate = useNavigate()
  const c = () => {
    navigate(`/exchange/${consts.default_pair}`)
    window.location.reload(false);
  }

  return (
    <div className='header-part footer-part'>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>


          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <div className='logo-part'><Link to='/'><img src={logo} /></Link></div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <nav>
              <ul className='header-menus'>

                {/* <li><Link to='/exchange'>Exchange</Link></li> */}
                <li><div><button className='back' onClick={c}>Exchange</button></div> </li>
                <li><Link to='/staking'>Staking</Link></li>
                <li><Link to='/swap'>Swap</Link></li>
                <li><Link to='/application'>Application</Link></li>
              </ul>
            </nav>
          </Grid>


          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <div className='footer-social-icon'>
              <ul className='footer-social-list'>
                <li><Link target='_blank' to='https://twitter.com/Zebraswap_io'><img src={twit} alt='twiter' /></Link></li>
                <li><Link target='_blank' to='https://www.instagram.com/zebraswap/'><img src={insta} alt='instagram' /></Link></li>
                <li><Link target='_blank' to='https://www.facebook.com/profile.php?id=100091439475142'><img src={facebook} alt='facebook' /></Link></li>
                <li><Link target='_blank' to='https://www.linkedin.com/company/92567711/admin/?feedType=following'><img src={linked} alt='linkedin' /></Link></li>
              </ul>
            </div>
          </Grid>


        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0}>


          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <p className='copyrights'>Copyright 2023 DimoDex</p>
          </Grid>

        </Grid>
      </Box>

    </div>
  )
}

export default Footer
