import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const useStyles = makeStyles({
  
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
      marginTop: '20px'
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
    },

    tabwithdraw: {
      padding:'0px !important',
      '& root':{
        padding:'0px !important',
      }
    }

});


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

export default function WithdrawCryptoTabInner() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();

  const [netopen, setNetOpen] = React.useState(false);
  const handleNetOpen = () => setNetOpen(true);
  const handleNetClose = () => setNetOpen(false);

  const[network, setNetwork] =useState({namenet:'', netsymb: ''});

  const handleSelectNetwork = (namenet,netsymb)=>{
    setNetwork({namenet,netsymb})
    handleNetClose()
  }



  return (
    <Box sx={{ width: '100%' }}>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className='tabheadwithdrawouter'>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='tabheadwithdrawinner'>
          <Tab label="Email" {...a11yProps(0)} />
          <Tab label="Phone" {...a11yProps(1)} />
          <Tab label="Pay ID" {...a11yProps(2)} />
          <Tab label="Binance ID" {...a11yProps(3)} />
        </Tabs>
      </Box>


      <TabPanel value={value} index={0} className='tabwithdrawinner send-to-bince-user'>

      
<Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
  <Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Recipient's Email"
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <ArrowDropDownIcon />
        //     </InputAdornment>
        //   ),
        // }}
        variant="outlined"
      />
    

    </Box>
</Paper>



      </TabPanel>


      <TabPanel value={value} index={1} className='tabwithdrawinner send-to-bince-user'>
        

      <Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
  <Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Recipient's Phone Number"
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <ArrowDropDownIcon />
        //     </InputAdornment>
        //   ),
        // }}
        variant="outlined"
      />
    

    </Box>
</Paper>
        
      </TabPanel>


      <TabPanel value={value} index={2} className='tabwithdrawinner send-to-bince-user'>
        

      <Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
  <Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Recipient's Pay ID"
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <ArrowDropDownIcon />
        //     </InputAdornment>
        //   ),
        // }}
        variant="outlined"
      />
    

    </Box>
</Paper>
        
      </TabPanel>

      <TabPanel value={value} index={3} className='tabwithdrawinner send-to-bince-user'>
        

      <Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
  <Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Recipient's Binance ID"
        // InputProps={{
        //   endAdornment: (
        //     <InputAdornment position="end">
        //       <ArrowDropDownIcon />
        //     </InputAdornment>
        //   ),
        // }}
        variant="outlined"
      />
    

    </Box>
</Paper>
        
      </TabPanel>


<div className='withdraw-address-dtl'>

<div className='deatil-withdraw-inner'><h4>BTC balance</h4><h3>0 BTC</h3></div>
<div className='deatil-withdraw-inner'><h4>Daily remaining limit</h4><h3>8,000,000 BUSD/8,000,000 BUSD</h3></div>

</div>


    </Box>
  );
}