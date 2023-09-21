import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import {Button} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import './PhoneNoVerify.css'
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
      boxShadow: 'none !important',
      marginTop: '15px !important',
      marginBottom: '15px !important',
      '& input': {
        color:'#ccc'
      }
    },
    loginwhole: {
      background: 'transparent !important',
      boxShadow: 'none !important',
      textAlign: 'left !important',
      '& input':{
        border:'1px solid #ccc',
        borderRadius: '5px',
        marginBottom:'0px'
      },
      '& label': {
        color:'#ccc'
      },
      '& button': {
        fontSize:'16px',
        paddingTop: '8px',
        paddingBottom: '8px',
        marginTop: '20px',
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
        color:'#ccc',
      },
      '& p': {
        color:'#ccc',
      }
    },
  
    marketpart: {
      background: 'transparent !important',
      boxShadow: 'none !important',
  
      '& h3' : {
          color: '#ababab',
          fontSize: '14px',
          textAlign: 'left',
          marginBottom: '30px',
          marginTop: '0px'
      }
  },
  tabpartmarketitem : {
      background: 'transparent !important',
      boxShadow: 'none !important',
      marginRight: '0px !important',
      marginLeft:'0px !important',
      paddingBottom:'19%',
  
      '& button' : {
          fontSize: '16px',
          paddingTop: '10px !important',
          paddingBottom: '10px !important',
          marginRight:'10px'
      }
  },
  
  tabpartmarketgrid : {
      marginRight: '0px !important',
      marginLeft:'0px !important',
      marginTop:'50px !important',
      paddingLeft: '0px !important'
  },
  
  depositcoinpart: {
      background: 'transparent !important',
      boxShadow: 'none !important'
  },
  depositcoinpartpaper: {
      background: 'transparent !important',
      boxShadow: 'none !important',
      marginTop: '10px'
  },
  
  depositcoinpartpaperbottom:{
    background: 'transparent !important',
      boxShadow: 'none !important',
      marginTop: '40px'
  },
  
  modalcoinselectbox: {
      background: 'rgb(30, 35, 41) !important',
      border:'none !important',
      borderRadius: '10px',
      '& h2': {
          color:'#fff !important',
          fontSize:'24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
      }
  },
  
  searchboxwallet:{
      background :'transparent !important',
      border: '1px solid rgb(86 84 84)',
      marginBottom:'30px',
      marginTop:'30px',
      color: '#fff',
      '& input': {
        color: '#fff',
      },
      '& button': {
        color: '#fff',
      }
    }
  
  });


const PhoneNoVerify = () => {

    const classes = useStyles();
    const navigate = useNavigate();

  return (
    <div className='PhoneNoVerify login-page'>


<Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

<Grid container spacing={2} className={classes.tabpartmarket}>

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>  

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
  
<Item className={classes.loginwhole}>

  <h2 className='alpha-login-text'>Phone Verification</h2>

  <p className='color-change'>Please enter the 6-digit verification code sent to (phone number). The Code is valid for 30 minutes</p>

  <div className='otp-entercode'>

   <input type="text" />
   <input type="text" />
   <input type="text" />
   <input type="text" />
   <input type="text" />
   <input type="text" />

  </div>

  <Button className='create-alpha-accnt'>Resend Code</Button>

  <Button onClick={()=>navigate("/accountcreated")} fullWidth variant="contained">Submit</Button>

</Item>

</Grid>

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>  

</Grid>

</Box>


      
    </div>
  )
}

export default PhoneNoVerify
