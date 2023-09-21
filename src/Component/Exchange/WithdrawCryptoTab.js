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
import WithdrawCryptoTabInner from './WithdrawCryptoTabInner';

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

export default function WithdrawCryptoTab() {
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

  const networkDetail = [

{'id':1,'name':'BNB Smart Chain(BEP20)', 'symbol':'BSC', 'address': '0xd2b08018c450a5afe13fef65b8cf80d9a824b66b1', 'expected_arrival':'15 network confirmations', 'expected_unlock':'15 network confirmations', 'minimum_deposit':'0.00000001 BUSD', 'selected_wallet':'Spot Wallet', 'contract_address':'Ending in','list_info':[
'Send only BUSD to this deposit address.',
'Ensure the network is BNB Smart Chain (BEP20).',
'Please note that deposits via smart contracts are not supported, with the exception of ETH via the ERC20 network or BNB via the BSC network.',
'Do not send NFTs to this address.'
], 'memo':'422399922'
},
{'id':2,'name':'Bitcoin', 'symbol':'BTC', 'address': '0xd2b08018c450a5afe13fef65b8cf80d9a824b66b2', 'expected_arrival':'15 network confirmations', 'expected_unlock':'15 network confirmations', 'minimum_deposit':'0.00000001 BUSD', 'selected_wallet':'Spot Wallet', 'contract_address':'Ending in','list_info':[
'Send only BUSD to this deposit address.',
'Ensure the network is BNB Smart Chain (BEP20).',
'Please note that deposits via smart contracts are not supported, with the exception of ETH via the ERC20 network or BNB via the BSC network.',
'Do not send NFTs to this address.'
], 'memo':'422399922'
},
{'id':3,'name':'BNB Beacon Chain(BEP2)', 'symbol':'BNB', 'address': '0xd2b08018c450a5afe13fef65b8cf80d9a824b66b3', 'expected_arrival':'15 network confirmations', 'expected_unlock':'15 network confirmations', 'minimum_deposit':'0.00000001 BUSD', 'selected_wallet':'Spot Wallet', 'contract_address':'Ending in','list_info':[
'Send only BUSD to this deposit address.',
'Ensure the network is BNB Smart Chain (BEP20).',
'Please note that deposits via smart contracts are not supported, with the exception of ETH via the ERC20 network or BNB via the BSC network.',
'Do not send NFTs to this address.'
], 'memo':'422399922'
},
{'id':4,'name':'BTC', 'symbol':'SEGWITBTC', 'address': '0xd2b08018c450a5afe13fef65b8cf80d9a824b66b4', 'expected_arrival':'15 network confirmations', 'expected_unlock':'15 network confirmations', 'minimum_deposit':'0.00000001 BUSD', 'selected_wallet':'Spot Wallet', 'contract_address':'Ending in','list_info':[
'Send only BUSD to this deposit address.',
'Ensure the network is BNB Smart Chain (BEP20).',
'Please note that deposits via smart contracts are not supported, with the exception of ETH via the ERC20 network or BNB via the BSC network.',
'Do not send NFTs to this address.'
], 'memo':'422399922'
},
{'id':5,'name':'Ethereum(ERC20)', 'symbol':'ETH', 'address': '0xd2b08018c450a5afe13fef65b8cf80d9a824b66b5', 'expected_arrival':'15 network confirmations', 'expected_unlock':'15 network confirmations', 'minimum_deposit':'0.00000001 BUSD', 'selected_wallet':'Spot Wallet', 'contract_address':'Ending in','list_info':[
'Send only BUSD to this deposit address.',
'Ensure the network is BNB Smart Chain (BEP20).',
'Please note that deposits via smart contracts are not supported, with the exception of ETH via the ERC20 network or BNB via the BSC network.',
'Do not send NFTs to this address.'
]
}
      
  ]


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='tabheadwithdraw'>
          <Tab label="Send To Address" {...a11yProps(0)} />
          <Tab label="Send To Binance User" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className='tabwithdraw'>

      
      <Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
<Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Address"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
    

    </Box>
</Paper>



      <Paper className={classes.depositcoinpartpaperbottom} style={{marginTop:'40px !important'}}>
<Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Select Network"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <ArrowDropDownIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onClick={handleNetOpen}
        value={`${network.namenet} ${network.netsymb}`}
      />
      

      <Modal
        open={netopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
      >
        <Box sx={style} className={classes.modalcoinselectbox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
             Select coin to deposit <CancelIcon onClick={handleNetClose} />
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
            <p className='network-content'>Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.</p>
            <ul className='coin-list-menu'>
                <li id='1' onClick={()=>handleSelectNetwork("BSC","BNB Smart Chain(BEP20)")}><div className='coin-img'><h3>BSC<span>BNB Smart Chain (BEP20)</span></h3></div></li>
                <li id='2' onClick={()=>handleSelectNetwork("BTC","Bitcoin")}><div className='coin-img'><h3>BTC<span>Bitcoin</span></h3></div></li>
                <li id='3' onClick={()=>handleSelectNetwork("BNB","BNB Beacon Chain(BEP2)")}><div className='coin-img'><h3>BNB<span>BNB Beacon Chain (BEP2)</span></h3></div></li>
                <li id='4' onClick={()=>handleSelectNetwork("SEGWITBTC","BTC")}><div className='coin-img'><h3>SEGWITBTC<span>BTC(SegWit)</span></h3></div></li>
                <li id='5' onClick={()=>handleSelectNetwork("ETH","Ethereum(ERC20)")}><div className='coin-img'><h3>ETH<span>Ethereum (ERC20)</span></h3></div></li>
            </ul>
          </Typography>
        </Box>
      </Modal>

    </Box>
</Paper>

<div className='withdraw-address-dtl'>

<div className='deatil-withdraw-inner'><h4>BTC balance</h4><h3>0 BTC</h3></div>
<div className='deatil-withdraw-inner'><h4>Minimum withdrawal</h4><h3>0.0000086 BTC</h3></div>
<div className='deatil-withdraw-inner'><h4>Network fee</h4><h3>0.0000043 ~ 0.0002 BTC</h3></div>
<div className='deatil-withdraw-inner'><h4>24h remaining limit</h4><h3>8,000,000.00 BUSD/8,000,000.00 BUSD</h3></div>

</div>

      </TabPanel>


      <TabPanel value={value} index={1} className='binance-address-send'>

      <WithdrawCryptoTabInner/>

      </TabPanel>


    </Box>
  );
}