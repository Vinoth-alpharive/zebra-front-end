import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import './AccountCreated.css'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from "react-router-dom";




const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 400
};


const useStyles = makeStyles({

  logintextbox: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginTop: '15px !important',
    marginBottom: '15px !important',
    '& input': {
      color: '#ccc'
    }
  },
  loginwhole: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    textAlign: 'left !important',
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
  },

  marketpart: {
    background: 'transparent !important',
    boxShadow: 'none !important',

    '& h3': {
      color: '#ababab',
      fontSize: '14px',
      textAlign: 'left',
      marginBottom: '30px',
      marginTop: '0px'
    }
  },
  tabpartmarketitem: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginRight: '0px !important',
    marginLeft: '0px !important',
    paddingBottom: '19%',

    '& button': {
      fontSize: '16px',
      paddingTop: '10px !important',
      paddingBottom: '10px !important',
      marginRight: '10px'
    }
  },

  tabpartmarketgrid: {
    marginRight: '0px !important',
    marginLeft: '0px !important',
    marginTop: '50px !important',
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

  depositcoinpartpaperbottom: {
    background: 'transparent !important',
    boxShadow: 'none !important',
    marginTop: '40px'
  },

  modalcoinselectbox: {
    background: 'rgb(30, 35, 41) !important',
    border: 'none !important',
    borderRadius: '10px',
    '& h2': {
      color: '#fff !important',
      fontSize: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },

  searchboxwallet: {
    background: 'transparent !important',
    border: '1px solid rgb(86 84 84)',
    marginBottom: '30px',
    marginTop: '30px',
    color: '#fff',
    '& input': {
      color: '#fff',
    },
    '& button': {
      color: '#fff',
    }
  }

});


const AccountCreated = () => {

  const classes = useStyles();
  const navigate = useNavigate();

  const [depositopen, setDepositOpen] = React.useState(false);
  const handleDepositOpen = () => setDepositOpen(true);
  const handleDepositClose = () => setDepositOpen(false);

  const [countryverify, setCountryVerify] = React.useState(false);
  const handleCountryVerifyOpen = () => setCountryVerify(true);
  const handleCountryVerifyClose = () => setCountryVerify(false);

  const [coin, setCoin] = useState({ image: '', name: '', code: '' });

  const handleSelectCoin = (country) => {
    setCoin({ image: country.code, name: country.name, code: country.dial_code })
    handleDepositClose()
  }

  return (
    <div className='PhoneNoVerify login-page'>



      <Snackbar
        autoHideDuration={2000}
        message="Phone Number Verified"
        severity="success"
        anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
      />


      <Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

        <Grid container spacing={2} className={classes.tabpartmarket}>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Item className={classes.loginwhole}>

              <h2 className='alpha-login-text'>Account Created</h2>

              <p className='color-change'>Verify your identification to enjoy your Alpha journey</p>

              <div className='verify-acc-flex top-block'>
                <div className='icon-block-1'><TaskAltIcon /></div>
                <div className='icon-block-body'><h3>Created Account</h3><p>You have completed your registration</p></div>
              </div>

              <div className='verify-acc-flex bottom-block'>
                <div className='icon-block-11'><ContactMailIcon /></div>
                <div className='icon-block-body'><h3>Account Verification</h3><p>Verify your account in few mins</p></div>
              </div>

              <Button onClick={() => navigate("/kyc-verification")} className='verify-now-button' fullWidth variant="contained">Verify Now</Button>
              {/* onClick={handleDepositOpen} */}


              {/* <Modal
        open={depositopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
        he
      >
        <Box sx={style} className={classes.modalcoinselectbox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Let's get you verified <CancelIcon onClick={handleDepositClose} />
          </Typography>
          

          <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Residency"
        variant="outlined"
        className={classes.logintextbox}
        onClick={handleCountryVerifyOpen}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {coin.image &&
              <img src={`https://flagicons.lipis.dev/flags/4x3/${(coin.image).toLocaleLowerCase()}.svg`} class='geticon-img'/>}
            </InputAdornment>
          ),
        }}
value={`       ${coin.name}`}
      />



<Modal
        open={countryverify}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
        he
      >
<Box sx={style} className={classes.modalcoinselectbox}>
<Typography id="modal-modal-title" variant="h6" component="h2">
         <CancelIcon onClick={handleCountryVerifyClose} />
          </Typography>
            
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul className='coin-list-menu country-detailed-list country-verify'>
              {baseURL?.map((country)=>(
                <li onClick={()=>handleSelectCoin(country)}>
                  <div className='coin-img country-img'>
                    <div className='coin-img-inner country-dtls'>
                      <div className='flag-image-code'><img src={`https://flagicons.lipis.dev/flags/4x3/${(country.code).toLocaleLowerCase()}.svg`}/></div>
                      <h3>{country.name}</h3></div>
                    <h4>{country.dial_code}</h4>
                  </div>
                </li>
              ))}
                </ul>
          </Typography>
          </Box>
</Modal>


        </Box>
      </Modal> */}



            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>

        </Grid>

      </Box>



    </div>
  )
}

export default AccountCreated
