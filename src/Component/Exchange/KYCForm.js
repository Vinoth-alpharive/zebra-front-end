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
import './KYCForm.css'
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import baseURL from './flagcode.json'
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import Idfrontimg   from '../images/id-card-front-circle.png'
import Idbackimg   from '../images/id-card-back-circle.png'
import idselfieimg  from '../images/profile-circle.png'
import fileuploadimg   from '../images/notes-card-circle.png'




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
      color: '#ccc',
      '& input':{
        border:'1px solid #ccc',
        borderRadius: '5px',
        marginBottom:'0px',
        width:'100%',
        color:'#ccc !important'
      },
      '& label': {
        color:'#ccc',
        background: '#000 !important'
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



  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    height: 400
  };

const KYCForm = () => {
  
  const classes = useStyles();

  const [datepickr, setDatePickr] = useState(dayjs('2014-08-18T21:11:54'));

  const handleDateChange = (newValue) => {
    setDatePickr(newValue);
  };


  const [countryopen, setCountryOpen] = React.useState(false);
  const handleCountryOpen = () => setCountryOpen(true);
  const handleCountryClose = () => setCountryOpen(false);
  

  const[coin, setCoin] =useState({image:'',name:'',code:''});

  const handleSelectCoin = (country)=>{
    setCoin({image: country.code, name: country.name, code: country.dial_code})
    handleCountryClose()
  }

  const [gender, setGender] = React.useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };



  return (
    <div className='kyc-form-portion'>

<Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

<Grid container spacing={2} className={classes.tabpartmarket}>

<Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>  

<Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
<Item className={classes.loginwhole}>

  <h2 className='alpha-login-text'>KYC Verification</h2>

  <h3 className='sub-heading-part'>Personal Information</h3>


  <Grid container spacing={2} className={classes.tabpartmarket}>


  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
     
     <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="First Name(Please use Real Name)"
        variant="outlined"
        className={classes.logintextbox}
      />

      <p style={{color: 'rgb(255 153 0)',margin: '0px',fontWeight: '600'}}>Note: Name must match the information in the ID Card/Passport</p>

  </Grid>
    
  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

  <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Last Name"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>
  

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
     
     <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Phone Number"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart'>

  {/* <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Gender"
        variant="outlined"
        className={classes.logintextbox}
      /> */}

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleGenderChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon/>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
      </FormControl>

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart'>
     
     {/* <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Date of birth"
        variant="outlined"
        className={classes.logintextbox}
      /> */}

<LocalizationProvider fullWidth dateAdapter={AdapterDayjs} >

        <MobileDatePicker
          label="Date mobile"
          fullWidth
          inputFormat="DD/MM/YYYY"
          value={datepickr}
          onChange={handleDateChange}
          renderInput={(params) => <TextField  fullWidth {...params} />}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon/>
              </InputAdornment>
            ),
          }}
        />

</LocalizationProvider>

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='country-get-box-modal'>

  <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Country"
        variant="outlined"
        className={classes.logintextbox}
        onClick={handleCountryOpen}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon/>
            </InputAdornment>
          ),
        }}
value={`${coin.name}`}
      />

<Modal
        open={countryopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
        he
      >
        <Box sx={style} className={classes.modalcoinselectbox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Select area code <CancelIcon onClick={handleCountryClose} />
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

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
     
     <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="State"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

  <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="City"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
     
     <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Zip/Postal Code"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

  <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Telegram Username"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='address-box'>

  <TextField
      fullWidth
      required
        id="input-with-icon-textfield"
        label="Address"
        variant="outlined"
        className={classes.logintextbox}
      />

  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
  <p style={{color: 'rgb(255 153 0)',margin: '0px',fontWeight: '600'}}>Note: Please type carefully and fil out the form with your personal details. You are not allowed to edit the details once you have submitted the application</p>
  </Grid>

  </Grid>

  <h3 className='sub-heading-part'>ID Proof Details</h3>


<Grid container spacing={2} className={classes.tabpartmarket}>


<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart'>
   

<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ID document type</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="ID document type"
          onChange={handleGenderChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon/>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={10}>Adhaar Card</MenuItem>
          <MenuItem value={20}>Pan Card</MenuItem>
          <MenuItem value={30}>Driving License</MenuItem>
          <MenuItem value={30}>Voter's ID</MenuItem>
        </Select>
      </FormControl>

</Grid>
  
<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

<TextField
    fullWidth
    required
      id="input-with-icon-textfield"
      label="ID document number"
      variant="outlined"
      className={classes.logintextbox}
    />

</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart'>

{/* <TextField
    fullWidth
    required
      id="input-with-icon-textfield"
      label="Expiry date"
      variant="outlined"
      className={classes.logintextbox}
    /> */}

<LocalizationProvider fullWidth dateAdapter={AdapterDayjs} >

        <MobileDatePicker
          label="Expiry date"
          fullWidth
          inputFormat="DD/MM/YYYY"
          value={datepickr}
          onChange={handleDateChange}
          renderInput={(params) => <TextField  fullWidth {...params} />}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon/>
              </InputAdornment>
            ),
          }}
        />

</LocalizationProvider>


</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart'></Grid>



<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='DOCUMENT-TYPE-UPLOAD'>
  <div className='inner-doc'>
  <h3>ID Front Document</h3>
  <div className='image-front'><img src={Idfrontimg} alt='ID Front Document'/></div>
  <label htmlFor="uploadFront" className='upload-btn'>
  UPLOAD HERE
  </label>
  <input accept="image/png, image/jpeg, image/jpg" id="uploadFront" type='file' hidden={true} />
  </div>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='DOCUMENT-TYPE-UPLOAD'>
  <div className='inner-doc'>
  <h3>ID Back Document</h3>
  <div className='image-front'><img src={Idbackimg} alt='ID Back Document'/></div>
  <label htmlFor="uploadFront" className='upload-btn'>
  UPLOAD HERE
  </label>
  <input accept="image/png, image/jpeg, image/jpg" id="uploadFront" type='file' hidden={true} />
  </div>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='DOCUMENT-TYPE-UPLOAD'>
  <div className='inner-doc'>
  <h3>Selfie with ID Document</h3>
  <div className='image-front'><img src={idselfieimg} alt='Selfie with ID Document'/></div>
  <label htmlFor="uploadFront" className='upload-btn'>
  UPLOAD HERE
  </label>
  <input accept="image/png, image/jpeg, image/jpg" id="uploadFront" type='file' hidden={true} />
  </div>
</Grid>



</Grid>

<h3 className='sub-heading-part'>Proof Address</h3>

<Grid container spacing={2} className={classes.tabpartmarket}>


<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='datepicpart flex-column'>
   
   {/* <TextField
    fullWidth
    required
      id="input-with-icon-textfield"
      label="Proof of address"
      variant="outlined"
      className={classes.logintextbox}
    /> */}

<FormControl fullWidth className='id-type'>
        <InputLabel id="demo-simple-select-label">ID document type</InputLabel>
        <Select
          required
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="ID document type"
          onChange={handleGenderChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ArrowDropDownIcon/>
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value={10}>Utility bills (gas, electricity, water)</MenuItem>
          <MenuItem value={20}>Telephone / Internet bill (no cell phone bill)</MenuItem>
          <MenuItem value={30}>Pension statement</MenuItem>
          <MenuItem value={40}>Tax statement</MenuItem>
          <MenuItem value={50}>Certificate of registration</MenuItem>
          <MenuItem value={60}>Bank Confirmation</MenuItem>
        </Select>
      </FormControl>

<p className='color-dim'>The folowing documents are accepted</p>
<ul className='color-dim'>
<li>Utility bills (gas, electricity, water)</li>
<li>Telephone / Internet bill (no cell phone bill)</li>
<li>Pension statement</li>
<li>Tax statement</li>
<li>Certificate of registration</li>
<li>Bank Confirmation</li>
</ul>


</Grid>
  
<Grid item xs={12} sm={12} md={12} lg={6} xl={6} className='ID-document-number'>


<div className='inner-doc'>
  <h3>Residential document or phone document upload</h3>
  <div className='image-front'><img src={fileuploadimg} alt='Residential document or phone document upload'/></div>
  <label htmlFor="uploadFront" className='upload-btn'>
  UPLOAD HERE
  </label>
  <input accept='.pdf' id="uploadFront" type='file' hidden={true} />
  <p className='para-cmn' style={{paddingTop: '20px !important'}}>Please photograph the complete document. The document must contain the same address as your ID card</p>
  </div>


</Grid>


</Grid>

<Grid container spacing={2} className={classes.tabpartmarket}>


<Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='datepicpart flex-column'>
<p style={{color: 'rgb(255 153 0)',margin: '0px',fontWeight: '600', marginTop: '30px', marginBottom: '20px'}}>Note To avoid delays with verification process, please double-check to ensure the above requirements are fuly met. Chosen credentials must not be expired</p>

<ul className='color-dim'>
<li>I have read the Terms and Condition and AML-KYC</li>
<li>All the personal information I have entered is correct</li>
<li>I certify that, I am registering to participate in the Matrixchnge distribution event(s) in the capacity of an individual (and beneficial owner) and not as an agent or representative of a third party corporate entity</li>
</ul>
</Grid>

</Grid>


  </Item>
  </Grid>

  <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>  

  </Grid>

  </Box>
      
    </div>
  )
}

export default KYCForm
