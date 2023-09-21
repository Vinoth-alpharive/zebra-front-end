import React from 'react'
import { makeStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
// import {Link} from 'react-router-dom'
// import coinone from '../../images/coins-1.png'
// import cointwo from '../../images/coins-2.png'
// import cointhree from '../../images/coins-3.png'
// import coinfour from '../../images/coins-4.png'
// import coinfive from '../../images/coins-5.png'
// import coinsix from '../../images/coins-6.png'
// import graphimg from '../../images/graph-img.png'
// import prpoposal1 from '../../images/prpoposal-1.png'
// import prpoposal2 from '../../images/prpoposal-2.png'
import {useNavigate} from "react-router-dom"
import etherum from '../../images/etherum.png'
import coins11 from '../../images/coins-1.png'

const useStyles = makeStyles({
  
    tabletoptrade:{
        background: 'transparent !important',
        boxShadow: 'none !important',
        '& th': {
            color: '#8B95A3 !important',
            border: 'none !important',
            whiteSpace: 'nowrap'
        },
        '& td': {
            color: '#000 !important',
            border: 'none !important',
            paddingTop: '2px',
            paddingBottom: '2px'
        }
    },
    bgbtn: {
        background: '#181A1A !important',
        textTransform: 'none !important',
        boxShadow:'none !important',
        marginTop: '10px !important',
        color: '#fff !important'
      },
      cointabspecific: {
        border: '1px solid #C0C9D0',
        borderRadius: '9px',
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

function createData(id, paironeimg, pairtwoimg, paironename, pairtwoname, tvl, volume, totalyield, reward) {
    return { id, paironeimg, pairtwoimg, paironename, pairtwoname, tvl, volume, totalyield, reward };
  }
  
  const rows = [
    createData( 1, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
    createData( 2, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
    createData( 1, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
    createData( 1, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
    createData( 1, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
    createData( 1, etherum, coins11, 'USDT', 'ETH', '271.03m', '391.99m', 9.92, 'ETH'),
  ];
  

  
const EarnCryptoBody = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div className='coin-main-table-outer'>

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className={classes.tabmain} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pools" {...a11yProps(0)} />
          <Tab label="Farms" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.cointabspecific}>

      <TableContainer component={Paper} className={classes.tabletoptrade}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='cointable-table earn-crypto-table'>
        <TableHead>
     
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Pool  </TableCell>
            <TableCell align="left">TVL</TableCell>
            <TableCell align="left">Volume 24h  </TableCell>
            <TableCell align="left">Total Yield</TableCell>
            <TableCell align="left">Reward Token</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={()=>navigate("/earncrypto-details")}
            >
              <TableCell align="left">{row.id}</TableCell>
              <TableCell scope="row" className='pair-coin'>
                <div className='pair-coin-coins-new pool-block-1'>
                <div className='coinimg'><img src={row.paironeimg} alt='coin-img'/><img src={row.pairtwoimg} alt='coin-img'/></div>
                <span className='coinpair-pair'>{row.paironename}/{row.pairtwoname}</span>
                </div>
              </TableCell>
              <TableCell align="left"><div className='coin-price-new pool-block-2'>$<span>{row.tvl}</span></div></TableCell>
              <TableCell align="left"><div className='coin-chart-img chart-block pool-block-3'>$<span>{row.volume}</span></div></TableCell>
              <TableCell align="left"><div className='change-percentage pool-block-4'>{row.totalyield}%</div></TableCell>
              <TableCell align="left"><div className='coin-vol-new coin-price-new pool-block-5'><div className='reward-coin'><img src={row.paironeimg}/></div><span className='reward-coin-name'>{row.reward}</span></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>

      </TabPanel>
      <TabPanel value={value} index={1} className={classes.cointabspecific}>

      <TableContainer component={Paper} className={classes.tabletoptrade}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='cointable-table'>
        <TableHead>
     
          <TableRow>
            <TableCell align="left">#</TableCell>
            <TableCell align="left">Farm  </TableCell>
            <TableCell align="left">TVL</TableCell>
            <TableCell align="left">Volume 24h  </TableCell>
            <TableCell align="left">Total Yield</TableCell>
            <TableCell align="left">Reward Token</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            

               <TableCell align="left">{row.id}</TableCell>
              <TableCell scope="row" className='pair-coin'>
                <div className='pair-coin-coins-new pool-block-1'>
                <div className='coinimg'><img src={row.paironeimg} alt='coin-img'/><img src={row.pairtwoimg} alt='coin-img'/></div>
                <span className='coinpair-pair'>{row.paironename}/{row.pairtwoname}</span>
                </div>
              </TableCell>
              <TableCell align="left"><div className='coin-price-new pool-block-2'>$<span>{row.tvl}</span></div></TableCell>
              <TableCell align="left"><div className='coin-chart-img chart-block pool-block-3'>$<span>{row.volume}</span></div></TableCell>
              <TableCell align="left"><div className='change-percentage pool-block-4'>{row.totalyield}%</div></TableCell>
              <TableCell align="left"><div className='coin-vol-new coin-price-new pool-block-5'><div className='reward-coin'><img src={row.paironeimg}/></div><span className='reward-coin-name'>{row.paironename}</span></div></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
        
      </TabPanel>


    </Box>
      
    </div>
  )
}

export default EarnCryptoBody
