import React, {useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { styled, alpha } from '@mui/material/styles';
import './WithdrawCryptoBody.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import coin5 from '../images/coin-5.png'
import coin4 from '../images/coin-4.png'
import coin3 from '../images/coin-3.png'
import coin2 from '../images/coin-2.png'
import coin1 from '../images/coin-1.png'
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Link } from 'react-router-dom';
import {Button,Snackbar} from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import qrcode from '../images/qrcode.png'
import WithdrawCryptoTab from './WithdrawCryptoTab';




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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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


  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  
//  
// modalcoinselectbox

const WithdrawCryptoBody = () => {

const classes = useStyles();

  const [depositopen, setDepositOpen] = React.useState(false);
  const handleDepositOpen = () => setDepositOpen(true);
  const handleDepositClose = () => setDepositOpen(false);

  const[coin, setCoin] =useState({logo:'',symbol:'',name:''});

  const handleSelectCoin = (logo,symbol,name)=>{
    setCoin({logo,symbol,name})
    handleDepositClose()
  }
  
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

const [bnbpop, setBNBpop] = useState(true)

const [clipboardopen, setClipBoardOpen] = useState(false)
    const handleClipBoard = () => {
      setClipBoardOpen(true)
      navigator.clipboard.writeText(window.location.toString())
}

const [clipboardopenmemo, setClipBoardOpenMemo] = useState(false)
    const handleClipBoardMemo = () => {
      setClipBoardOpenMemo(true)
      navigator.clipboard.writeText(window.location.toString())
}

  return (
    <div>

<Box sx={{ flexGrow: 1 }} className={classes.tabpartmarketout}>

<Grid container spacing={2} className={classes.tabpartmarket}>

<Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
<Item>
</Item>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.tabpartmarketgrid}>
<Item className={classes.tabpartmarketitem}>
<h1 className='heading-market'>Crypto Withdraw</h1>    

<Box sx={{ flexGrow: 1 }} >

<Grid container spacing={2}>


<Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
<Item>
{/* <img src={coin5}/> */}
</Item>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
<Item className='depositcoinpartitem'>
<Paper className={classes.depositcoinpartpaper}>
<Box className={classes.depositcoinpart} sx={{ '& > :not(style)': { m: 1 } }}>

      <TextField
      fullWidth
        id="input-with-icon-textfield"
        label="Select Coin"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <img src={coin.logo} class='geticon-img'/><ArrowDropDownIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        onClick={handleDepositOpen}
        value={`       ${coin.name} ${coin.symbol}`}
      />
      

      <Modal
        open={depositopen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={classes.modalcoinselect}
      >
        <Box sx={style} className={classes.modalcoinselectbox}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
             Select coin to deposit <CancelIcon onClick={handleDepositClose} />
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
            <ul className='coin-list-menu'>
                <li onClick={()=>handleSelectCoin(coin5,"BTC","Bitcoin")}><div className='coin-img'><div className='coin-img-inner'><img src={coin5}/></div><h3>BTC<span>Bitcoin</span></h3></div></li>
                <li onClick={()=>handleSelectCoin(coin4,"ETH","Ethereum")}><div className='coin-img'><div className='coin-img-inner'><img src={coin4}/></div><h3>ETH<span>Ethereum</span></h3></div></li>
                <li onClick={()=>handleSelectCoin(coin3,"USDT","TetherUS")}><div className='coin-img'><div className='coin-img-inner'><img src={coin3}/></div><h3>USDT<span>TetherUS</span></h3></div></li>
                <li onClick={()=>handleSelectCoin(coin2,"BNB","BNB")}><div className='coin-img'><div className='coin-img-inner'><img src={coin2}/></div><h3>BNB<span>BNB</span></h3></div></li>
                <li onClick={()=>handleSelectCoin(coin1,"BUSD","BUSD")}><div className='coin-img'><div className='coin-img-inner'><img src={coin1}/></div><h3>BUSD<span>BUSD</span></h3></div></li>
            </ul>
          </Typography>
        </Box>
      </Modal>

    </Box>
</Paper>


<WithdrawCryptoTab/>



</Item>
<div>
  {networkDetail?.map((netdtl, i)=>(
   
   netdtl.symbol==network.namenet&&
   <div className='detail-network' key={i.id}>


<div className='whole-detail-block'>

   
{ netdtl.symbol === 'BNB' &&bnbpop ? <div className="ok-btn-popup"><div className='backdrop'></div><div className='content-part-notice-ok'><h2>Both Address and Memo are required</h2><Button variant="contained" onClick={()=>setBNBpop(!bnbpop)}>OK</Button></div></div> : ""}


  <div className='whole-detail-block-inner'>
    <div className='detail-network-addr'><h3>Address</h3>{netdtl.address} 
    <div className='qr-copy-actions'>
        <Button onClick={handleClipBoard}><ContentCopyIcon/></Button>
      <Snackbar
            open={clipboardopen}
            onClose={() => setClipBoardOpen(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
           }}
          />
          <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit" className='qr-code-img'><img src={qrcode} alt='qr-code' /></Typography>
          </React.Fragment>
        }
      >
          <Button><QrCodeScannerIcon/></Button>
          </HtmlTooltip>
        </div>
    </div>
    { netdtl.memo ?
    <div className='detail-network-addr detail-network-memo'>
      <h3>Memo</h3>{netdtl.memo} 
      <div className='qr-copy-actions'>
        <Button onClick={handleClipBoardMemo}><ContentCopyIcon/></Button>
      <Snackbar
            open={clipboardopenmemo}
            onClose={() => handleClipBoardMemo(false)}
            autoHideDuration={2000}
            message="Copied to clipboard"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
           }}
          />
          
          <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit" className='qr-code-img'><img src={qrcode} alt='qr-code' /></Typography>
          </React.Fragment>
        }
      >
          <Button><QrCodeScannerIcon/></Button>
          </HtmlTooltip>

        </div>
       <div className='memo-reqred'>MEMO is required, or you will lose your coins</div> 
    </div> : ""
    }
    <div className='flex-box-part-dtl'>
          <div className='dtls'><h3>expected arrival</h3>{netdtl.expected_arrival}</div> 
          <div className='dtls'><h3>expected unlock</h3>{netdtl.expected_unlock}</div>
          <div className='dtls'><h3>selected wallet</h3>{netdtl.selected_wallet}</div>
          <div className='dtls'><h3>minimum deposit</h3>{netdtl.minimum_deposit}</div>
          <div className='dtls'><h3>contract address</h3>{netdtl.contract_address}</div>
    </div>

    </div>

  </div>

  <ul className='list-network-dtl'>
  {   
 netdtl?.list_info.map((dtllist,i) => (
<li>{dtllist}</li>
 ))
}

 </ul>

   </div>

  ))}
</div>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
<Item>
</Item>
</Grid>


</Grid>

</Box>


</Item>
</Grid>

<Grid item xs={12} sm={12} md={12} lg={1} xl={1}>
<Item>
</Item>
</Grid>

</Grid>

</Box>
      
    </div>
  )
}

export default WithdrawCryptoBody
