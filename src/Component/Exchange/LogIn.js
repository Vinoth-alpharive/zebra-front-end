import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { Button, Snackbar } from '@mui/material';
import './LogIn.css'
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import qrcode from '../images/qrcode.png'
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

  logintextbox: {
    background: 'transparent !important',
    boxShadow: 'none !important'
  },
  loginwhole: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    '& input': {
      border: '1px solid #ccc',
      borderRadius: '5px',
      marginBottom: '0px'
    },
    '& label': {
      color: '#ccc'
    },
    '& button': {
      fontSize: '16px',
      paddingTop: '8px',
      paddingBottom: '8px',
      marginTop: '20px'
    }
  },
  qrlogin: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& h3': {
      color: '#ccc',
    },
    '& p': {
      color: '#ccc',
    }
  }

});

const LogIn = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/signup");
  }

  return (
    <div className='login-page'>

      <Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

        <Grid container spacing={2} className={classes.tabpartmarket}>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
            <Item className={classes.loginwhole}>

              <h2 className='alpha-login-text'>Alpha Login</h2>

              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Email / Phone Number"
                variant="outlined"
                className={classes.logintextbox}
              />

              <TextField
                fullWidth
                id="input-with-icon-textfield"
                label="Password"
                variant="outlined"
                className={classes.logintextbox}
                style={{ marginTop: '15px' }}
              />

              <Button fullWidth variant="contained">Login</Button>

              <Button className='forgot-pass-alpha-accnt'>Forgot password?</Button>

              <div className='or-hr'><span>or</span></div>

              <Button className='button-block' fullWidth variant="contained" startIcon={<GoogleIcon />}>
                Continue with Google
              </Button>

              <Button className='button-block' fullWidth variant="contained" startIcon={<AppleIcon />}>
                Continue with Apple
              </Button>

              <Button onClick={handleNavigate} className='create-alpha-accnt'>Create a Alpha Account</Button>

            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.qrlogingrid}>
            <Item className={classes.qrlogin}>
              <div className='qr-img'><img src={qrcode} alt='qr-code-img' /></div>
              <h3>Log in with QR code</h3>
              <p>Scan this code with the Alpha mobile app to log in instantly.</p>
            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={3} xl={3}></Grid>

        </Grid>

      </Box>

    </div>
  )
}

export default LogIn
