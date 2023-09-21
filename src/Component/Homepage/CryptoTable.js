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
import {Link} from 'react-router-dom'
import coinone from '../../images/coins-1.png'
import cointwo from '../../images/coins-2.png'
import cointhree from '../../images/coins-3.png'
import coinfour from '../../images/coins-4.png'
import coinfive from '../../images/coins-5.png'
import coinsix from '../../images/coins-6.png'
import graphimg from '../../images/graph-img.png'
import prpoposal1 from '../../images/prpoposal-1.png'
import prpoposal2 from '../../images/prpoposal-2.png'
import './CoinTable.css'


import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

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
            color: '#fff !important',
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

function createData(coinimg, coinname, price, chart, change, volume) {
    return { coinimg, coinname, price, chart, change, volume };
  }
  
  const rows = [
    createData(coinone, 'Tether', '1,867', graphimg, '+1.5', '474B'),
    createData(cointwo, 'BNB', '1,867', graphimg, '+1.5', '474B'),
    createData(cointhree, 'USDCoin', '1,867', graphimg, '+1.5', '474B'),
    createData(coinfour, 'Sol', '1,867', graphimg, '+1.5', '474B'),
    createData(coinfive, 'Polygon', '1,867', graphimg, '+1.5', '474B'),
    createData(coinsix, 'Polkadot', '1,867', graphimg, '+1.5', '474B'),
  ];


  function createProposals(spot, projimg, projname, projdesc, projweb, votes) {
    return { spot, projimg, projname, projdesc, projweb, votes };
  }
  
  const proposal = [
    createProposals(1,prpoposal1, 'Tutt', 'A public, scalable , EVM Compatible, token', 'tutt.com', 42),
    createProposals(2,prpoposal2, 'MEV', 'Decentralized data exchange economy', 'mev.com', 35),
    createProposals(3,prpoposal1, 'Tutt', 'A public, scalable , EVM Compatible, token', 'tutt.com', 25),
    createProposals(4,prpoposal2, 'MEV', 'Decentralized data exchange economy', 'mev.com', 10)
  ]; 
  
const CryptoTable = () => {

    const classes = useStyles();

    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
    <div className='coin-main-table-outer'>

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className={classes.tabmain} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Top Coins" {...a11yProps(0)} />
          <Tab label="Recently Listed" {...a11yProps(1)} />
          <Tab label="Proposals" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.cointabspecific}>

      <TableContainer component={Paper} className={classes.tabletoptrade}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className='cointable-table'>
        <TableHead>
          
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price  </TableCell>
            <TableCell align="left">Chart</TableCell>
            <TableCell align="left">Change  </TableCell>
            <TableCell align="left">Volume(24h)</TableCell>
            <TableCell align="left">Trade  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell scope="row" className='pair-coin'>
                <div className='pair-coin-coins-new'>
                <div className='coinimg'><img src={row.coinimg} alt='coin-img'/></div>
                <span className='coinpair-pair'>{row.coinname}</span>
                </div>
              </TableCell>
              <TableCell align="left"><span className='coin-price-new'>$<span>{row.price}</span></span></TableCell>
              <TableCell align="left"><div className='coin-chart-img chart-block'><img src={row.chart}/></div></TableCell>
              <TableCell align="left"><span className='change-percentage' style={row.change < 0 ? {color: '#F44D4D !important'} : {color: '#00B881 !important'} }>{row.change}%</span></TableCell>
              <TableCell align="left"><span className='coin-vol-new coin-price-new'>$<span>{row.volume}</span></span></TableCell>
              <TableCell align="left"><Button className={classes.bgbtn}>Trade</Button></TableCell>
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
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price  </TableCell>
            <TableCell align="left">Chart</TableCell>
            <TableCell align="left">Change  </TableCell>
            <TableCell align="left">Volume(24h)</TableCell>
            <TableCell align="left">Trade  </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell scope="row" className='pair-coin'>
                <div className='pair-coin-coins-new'>
                <div className='coinimg'><img src={row.coinimg} alt='coin-img'/></div>
                <span className='coinpair-pair'>{row.coinname}</span>
                </div>
              </TableCell>
              <TableCell align="left"><span className='coin-price-new'>$<span>{row.price}</span></span></TableCell>
              <TableCell align="left"><div className='coin-chart-img chart-block'><img src={row.chart}/></div></TableCell>
              <TableCell align="left"><span className='change-percentage' style={row.change < 0 ? {color: '#F44D4D !important'} : {color: '#00B881 !important'} }>{row.change}%</span></TableCell>
              <TableCell align="left"><span className='coin-vol-new coin-price-new'>$<span>{row.volume}</span></span></TableCell>
              <TableCell align="left"><Button className={classes.bgbtn}>Trade</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </TableContainer>
        
      </TabPanel>

      <TabPanel value={value} index={2} className={classes.cointabspecific}>

      <TableContainer component={Paper} className={classes.tabletoptrade}>
      <Table sx={{ minWidth: 650 }} style={{ tableLayout: 'fixed' }} aria-label="simple table" className='cointable-table crypto-table'>
        <TableHead>
          
          <TableRow>
            <TableCell width="50" align="left">Spot</TableCell>
            <TableCell width="400" align="left">Project </TableCell>
            <TableCell width="180" align="left">Votes</TableCell>
            <TableCell width="300" align="center">Action  </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>

        



          {proposal.map((row) => (
            <TableRow
              key={row.spot}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell scope="row" className='pair-coin'><div className='spot-id'>{row.spot}</div></TableCell>
              <TableCell align="left">
                <div className='proposal-block'>
                <div className='proposal-img-name'>
                <div className='projimg'><img src={row.projimg} alt={row.projname}/></div>
                <span>{row.projname}</span>
                </div>
                <div className='proposal-desc'><p>{row.projdesc}</p></div>
                <div className='proposal-web'>{row.projweb}</div>
                </div>
              </TableCell>
              <TableCell align="left"><div className='proposal-vote'><div><BorderLinearProgress variant="determinate" value={row.votes} /></div><span className='vote-percent'>{row.votes}%</span></div></TableCell>
              <TableCell align="center"><Button className={classes.bgbtn}>Vote with ZBR</Button></TableCell>
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

export default CryptoTable
