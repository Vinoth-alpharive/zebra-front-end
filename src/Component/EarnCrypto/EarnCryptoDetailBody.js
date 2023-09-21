import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import './EarnCrypto.css'
import etherum from '../../images/etherum.png'
import coins11 from '../../images/coins-1.png'
import AddIcon from '@mui/icons-material/Add';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EarnChartDetalChart from './EarnChartDetalChart';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles({

  bgbtn: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow:'none !important',
    marginTop: '10px !important'
  },

  chartpartcrypto: {
    background: '#EDF3F6',
    borderRadius: '9px',
    padding: '21px 15px 0px 15px',
    marginTop: '20px !important'
  },

  tabmainchartcryptoouter: {
    border: 'none !important',
    '& button': {
            fontWeight: '700',
            fontSize: '15px',
            color: '#596570 !important',
            padding: '10px 20px',
            border: 'none !important',
            margin: '4px !important',
            border: 'none !important',
            
    }
  },

  tabmainchartcrypto: {
    '& div':{
    background: '#fff !important',
    margin: '0px !important',
    border: 'none !important',
    borderRadius: '9px',
}
  },

  buttonstyle: {

    '& button':{
     
      background: '#53D6FF',
      borderRadius: '9px',
      color: '#000',
      height: '40px',
      textTransform: 'none',
      boxShadow: 'none !important',
      justifyContent: 'center !important',
            alignItems: 'center !important',
            '& span': {
              margin: '0px !important',
              display:'flex',
              alignItems: 'center',
              color: '#000'
            },
            '&:hover':{
              color: '#fff !important'
            }
    }
  }

//   containcryptoearn: {
//     gap: '10px !important'
//   }

});

function createData(action, totalval, tokenamnt, tokenamntnew, account, time) {
    return { action, totalval, tokenamnt, tokenamntnew, account, time};
  }
  
  const rows = [
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
    createData( "Swap Eth for USDT", "394.39", 394, 0.22, '0x873a...2616', '1 hour ago'),
  ];


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

const EarnCryptoDetailBody = () => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div className='banner-part'>

    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>

    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <div className='earn-crypto-coin-detail-block'>
          <div className='earn-crypto-coin-detail-coin-inner-top'>
          <div className='coin-pair-main-img-pair'><div><img src={coins11}/></div><div><img src={etherum}/></div></div>
          <div className='coin-pair-main-name'><h2>USDT/ETH</h2></div>
          </div>
          <div className='earn-crypto-coin-detail-coin-inner-bottom'>
          <div><div><img src={coins11}/></div>1 USDT = &lt; 0.001 ETH</div>
          <div><div><img src={etherum}/></div>1 ETH = 1.80k USDT</div>
        </div>
        </div>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.buttonstyle}>
       <div className='buttons-liquidity-trade'>
       <Button variant="contained" startIcon={<AddIcon/>}>Add Liquidity</Button>
       <Button className='add-liquidity-trade' variant="contained">Trade</Button>
       </div>
    </Grid>


    </Grid>
    </Box>


    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0} className={classes.containcryptoearn}>

    <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
        <div className='liquidity-details-left'>
            <div className='liquidity-details-left-top'>
             <h3>Total Tokens Locked</h3>
             <div className='flex-box-grd-box'><div><img src={coins11}/><span>USDT</span></div><span>146.62m</span></div>
             <div className='flex-box-grd-box'><div><img src={etherum}/><span>ETH</span></div><span>68.9k</span></div>
            </div>
            <div className='liquidity-details-left-bottom'>
                <div className='liquidity-details-left-bottom-inner'>
                  <div className='liquidity-details-left-bottom-name'><span>TVL</span></div>
                  <div className='liquidity-details-left-bottom-price'>$<span>271.03m</span></div>
                  <div className='liquidity-details-left-bottom-percentage highpercentage'><span>3.81</span>%</div>
                </div>
                <div className='liquidity-details-left-bottom-inner'>
                  <div className='liquidity-details-left-bottom-name'><span>Volume 24h</span></div>
                  <div className='liquidity-details-left-bottom-price'>$<span>391.99m</span></div>
                  <div className='liquidity-details-left-bottom-percentage highpercentage'><span>18.34</span>%</div>
                </div>
                <div className='liquidity-details-left-bottom-inner'>
                  <div className='liquidity-details-left-bottom-name'><span>24h Fees</span></div>
                  <div className='liquidity-details-left-bottom-price'>$<span>195.99k</span></div>
                </div>
            </div>
        </div>
    </Grid>

    <Grid item xs={12} sm={12} md={12} lg={1} xl={1}></Grid>
    
    <Grid item xs={12} sm={12} md={12} lg={8} xl={8} className={classes.chartpartcrypto}>
    <Box sx={{ width: '100%' }} className={classes.chartdesign}>

    <Grid container spacing={0} className='padding-block'> 

    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
        <h2 className='dollar-vlue-in-chart'>$271.03m</h2>
      </Grid>
      
    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.tabmainchartcryptoouter}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={classes.tabmainchartcryptoouter}>
        <Tabs className={classes.tabmainchartcrypto} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Volume" {...a11yProps(0)} />
          <Tab label="Liquidity" {...a11yProps(1)} />
          <Tab label="Fees" {...a11yProps(2)} />
        </Tabs>
      </Box>
      </Grid>

      </Grid>

      <TabPanel value={value} index={0} className={classes.cointabspecific}>
       <EarnChartDetalChart/>
      </TabPanel>

      <TabPanel value={value} index={1} className={classes.cointabspecific}>
      <h2>Liquidity</h2>
      </TabPanel>

      <TabPanel value={value} index={2} className={classes.cointabspecific}>
      <h2>Fees</h2>
      </TabPanel>

      </Box>
    </Grid>


    </Grid>
    </Box>




    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
    <span className='earn-crypto-table-transaction-head'>Transactions</span>
    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


    <TableContainer component={Paper} className={classes.tabletoptrade}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='cointable-table earn-crypto-table earn-crypto-table-transaction'>
        <TableHead>
     
          <TableRow>
            <TableCell align="left">Actions</TableCell>
            <TableCell align="left">Total Value</TableCell>
            <TableCell align="left">Token Amount</TableCell>
            <TableCell width="150" align="left">Token Amount</TableCell>
            <TableCell align="left">Account</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.action}</TableCell>
              <TableCell scope="row" className='pair-coin'>${row.totalval}</TableCell>
              <TableCell align="left"><div className='coin-price-new pool-block-2'>{row.tokenamnt} USDT</div></TableCell>
              <TableCell width="150" align="left"><div className='coin-chart-img chart-block pool-block-3'><span>{row.tokenamntnew}</span> ETH</div></TableCell>
              <TableCell align="left"><div className='change-percentage pool-block-4'><span>{row.account}</span></div></TableCell>
              <TableCell align="left"><div className='coin-vol-new coin-price-new pool-block-5'><span>{row.time}</span></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>







    </Grid>

    </Grid>
    </Box>
      
    </div>
  )
}

export default EarnCryptoDetailBody
