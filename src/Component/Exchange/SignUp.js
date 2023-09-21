import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import {Button,Snackbar} from '@mui/material';
import './SignUp.css'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import axios from "axios";
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import baseURL from './flagcode.json'
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ReactPuzzleConfirm from 'react-puzzle-confirm'
import "react-puzzle-confirm/react-puzzle-confirm.css";
import { useNavigate } from "react-router-dom";



const PuzzleWrapper = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  

  return showModal ? (
    <ReactPuzzleConfirm
      onClose={() => setShowModal(false)}
      onSuccess={() => navigate("/phonenoverify")}
      onFail={() => setShowModal(false)}
      title="Please fit the puzzle piece carefully"
      sliderTitle="Slide to complete the puzzle"
      failMessage="Failed"
      successMessage="Success"
      closeButtonLabel="Close"
      refrefButtonLabel="Refresh"
      disableRefreshIdleState={false}
    />
  ) : (
    <Button onClick={() => setShowModal(true)} className="show__modal" fullWidth variant="contained">Create Personal Account</Button>
  );
};

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
    '& input':{
      border:'1px solid #ccc',
      borderRadius: '5px',
      marginBottom:'0px'
    },
    '& label': {
      color:'#ccc',
      background:'#000 !important'
    },
    '& button': {
      fontSize:'16px',
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



const SignUp = () => {

  const classes = useStyles();

  const [depositopen, setDepositOpen] = React.useState(false);
  const handleDepositOpen = () => setDepositOpen(true);
  const handleDepositClose = () => setDepositOpen(false);
  

  const[coin, setCoin] =useState({image:'',name:'',code:''});

  const handleSelectCoin = (country)=>{
    setCoin({image: country.code, name: country.name, code: country.dial_code})
    handleDepositClose()
  }
  
  
  
  const [value, setValue] = useState(0);
  const [post, setPost] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 useEffect(() => {
   
      setPost(baseURL);
    
  }, []);

  

  return (
    <div className='login-page'>

<Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

<Grid container spacing={2} className={classes.tabpartmarket}>

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>  

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
<Item className={classes.loginwhole}>

  <h2 className='alpha-login-text'>Create Personal Account</h2>


     <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='signup-tab'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Email" {...a11yProps(0)} />
          <Tab label="Phone Number" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className='tabpanel-signup personal-phone-no-input'>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Personal Email"
        variant="outlined"
        className={classes.logintextbox}
      />

<TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Password"
        variant="outlined"
        className={classes.logintextbox}
        style={{marginTop:'15px'}}
      />

<TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Referral ID(Otional)"
        variant="outlined"
        className={classes.logintextbox}
        style={{marginTop:'15px'}}
      />

      <div className='chekbox-signup'><Checkbox defaultChecked size="small"/> I have read and agree to Binance's Terms of Service and Privacy Policy.</div>

      <Button fullWidth variant="contained">Create Personal Account</Button>
    
      </TabPanel>
      <TabPanel value={value} index={1} className='tabpanel-signup personal-phone-no-input'>

<Box>

<Grid container spacing={2} className={classes.tabpartmarket}>

<Grid item xs={12} sm={12} md={12} lg={3} xl={3} className='country-code-input'> 

     <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Dial Code"
        variant="outlined"
        className={classes.logintextbox}
        onClick={handleDepositOpen}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {coin.image&&
              <img src={`https://flagicons.lipis.dev/flags/4x3/${(coin.image).toLocaleLowerCase()}.svg`} class='geticon-img'/>}
            </InputAdornment>
          ),
        }}
value={`       ${coin.code}`}
      />

      <Modal
        open={depositopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
        he
      >
        <Box sx={style} className={classes.modalcoinselectbox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Select area code <CancelIcon onClick={handleDepositClose} />
          </Typography>

            <Paper className={classes.searchboxwallet}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
            >
            <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search coin name"
            inputProps={{ 'aria-label': 'search google maps' }}
            
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
            </IconButton>
            </Paper>
            
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ul className='coin-list-menu country-detailed-list'>
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


</Grid> 

<Grid item xs={12} sm={12} md={12} lg={9} xl={9} className='personal-phone-no-input'> 
      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Personal Phone Number"
        variant="outlined"
        className={classes.logintextbox}
      />
</Grid>

</Grid>

</Box>

<TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Password"
        variant="outlined"
        className={classes.logintextbox}
        style={{marginTop:'15px'}}
      />

<TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Referral ID(Otional])"
        variant="outlined"
        className={classes.logintextbox}
        style={{marginTop:'15px'}}
      />

<div className='chekbox-signup'><Checkbox defaultChecked size="small"/> I have read and agree to Binance's Terms of Service and Privacy Policy.</div>

      
<PuzzleWrapper />

    
      </TabPanel>

      

</Item>
</Grid>

{/* <Grid item xs={12} sm={12} md={12} lg={3} xl={3} className={classes.qrlogingrid}>
<Item className={classes.qrlogin}>
  <div className='qr-img'><img src={qrcode} alt='qr-code-img'/></div>
  <h3>Log in with QR code</h3>
  <p>Scan this code with the Alpha mobile app to log in instantly.</p>
</Item>
</Grid> */}

<Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid> 

</Grid>

</Box>
      
    </div>
  )
}

export default SignUp
