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
import { Link, useNavigate } from 'react-router-dom'
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
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react'
import redgraph from '../../images/Vector1.png'




import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Axios from '../../Axios';

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

  tabletoptrade: {
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
    boxShadow: 'none !important',
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



function createProposals(spot, projimg, projname, projdesc, projweb, votes) {
  return { spot, projimg, projname, projdesc, projweb, votes };
}

const proposal = [
  createProposals(1, prpoposal1, 'Tutt', 'A public, scalable , EVM Compatible, token', 'tutt.com', 42),
  createProposals(2, prpoposal2, 'MEV', 'Decentralized data exchange economy', 'mev.com', 35),
  createProposals(3, prpoposal1, 'Tutt', 'A public, scalable , EVM Compatible, token', 'tutt.com', 25),
  createProposals(4, prpoposal2, 'MEV', 'Decentralized data exchange economy', 'mev.com', 10)
];

const CoinTable = () => {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [datatusd, setDatatusd] = useState({})
  const [databnb, setDatabnb] = useState([])
  const [datausdc, setDatausdc] = useState([])
  const [datasol, setDatasol] = useState([])
  const [datamatic, setDatamatic] = useState([])
  const [datadot, setDatadot] = useState([])

  const [updates, setUpdates] = useState([])




  const ws = new WebSocket("wss://stream.binance.com:9443/ws");

  const apiCall = {
    "method": "SUBSCRIBE",
    "params": [
      "tusdusdt@ticker",
      "bnbusdt@ticker",
      "usdcusdt@ticker",
      "solusdt@ticker",
      "maticusdt@ticker",
      "dotusdt@ticker"
    ],
    "id": 1
  }


  const socket = () => {
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if (json.s === "TUSDUSDT") {
          setDatatusd(json)
        }
        else if (json.s === "BNBUSDT") {
          setDatabnb(json)
        }
        else if (json.s === "USDCUSDT") {
          setDatausdc(json)
        } else if (json.s === "SOLUSDT") {
          setDatasol(json)
        } else if (json.s === "MATICUSDT") {
          setDatamatic(json)
        } else if (json.s === "DOTUSDT") {
          setDatadot(json)
        }

      } catch (err) {
        console.log(err);
      }
    };
  }
  const rows = [
    createData(coinone, 'Tether', datatusd?.a, graphimg, datatusd?.p, parseFloat(datatusd?.v)),
    createData(cointwo, 'BNB', databnb?.a, graphimg, databnb?.p, parseFloat(databnb?.v)),
    createData(cointhree, 'USDCoin', datausdc?.a, graphimg, datausdc?.p, parseFloat(datausdc?.v)),
    createData(coinfour, 'Sol', datasol?.a, graphimg, datasol?.p, parseFloat(datasol?.v)),
    createData(coinfive, 'Polygon', datamatic?.a, graphimg, datamatic?.p, parseFloat(datamatic?.v)),
    createData(coinsix, 'Polkadot', datadot?.a, graphimg, datadot?.p, parseFloat(datadot?.v)),
  ];


  useEffect(() => {
    socket()
    return () => ws.close();

  }, [])

  const proposals = async () => {
    try {
      const { data } = await Axios.post(`/users/getVotings`, { id: "all", data: new Date().getTime() })
      console.log("🚀 ~ file: CoinTable.js:215 ~ proposals ~ data:", data)
      if (data?.result?.length > 0) {
        // setUpdates(data?.result)
        if (data?.result?.length > 0) {
          var arr = []
          for (let i = 0; i < data?.result?.length; i++) {
            const element = data?.result[i];
            const win = element?.count1
            const loss = element?.count2
            if (win > 0) {
              const perw = (win / (win + loss)) * 100
              element.winPer = perw
            } else {
              element.winPer = 0
            }
            if (loss > 0) {
              const pwel = (loss / (win + loss)) * 100
              element.lossPer = pwel
            } else {
              element.lossPer = 0
            }

            arr.push(element)
          }
          setUpdates(arr)
          console.log("🚀 ~ proposals ~ arr:", arr)
        }

      }
    } catch (error) {
      console.log("🚀 ~ file: CoinTable.js:214 ~ proposals ~ error:", error)
    }
  }

  useEffect(() => {
    proposals()
  }, [])

  return (
    <>

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
                          <div className='coinimg'><img src={row.coinimg} alt='coin-img' /></div>
                          <span className='coinpair-pair'>{row.coinname}</span>
                        </div>
                      </TableCell>
                      {row.price > 0 ? <TableCell align="left"><span className='coin-price-new'>$<span>{row.price ? row.price : "0"}</span></span></TableCell> :
                        <TableCell align="left"><span>$<span className='eroo'>{row.price ? row.price : "0"}</span></span></TableCell>}

                      <TableCell align="left"><div className='coin-chart-img chart-block'>
                        {row.change >= 0 ? <img src={row.chart} /> : <img src={redgraph} />}</div>
                      </TableCell>
                      <TableCell align="left">{row.change >= 0 ? <span className='change-percentage'>{row.change ? row.change : "0"}%</span> : <span className='error-percentage'>{row.change ? row.change : "0"}%</span>}</TableCell>
                      <TableCell align="left"><span className='coin-vol-new coin-price-new'><span>{row.volume ? row.volume : '0'}</span></span></TableCell>
                      <TableCell align="left"><Button className={classes.bgbtn}>Trade</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='see-all-button-outer'>
                <Link variant="contained" endIcon={<ChevronRightIcon />} to='/cryptocurrencies'>
                  See All
                </Link>
              </div>
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
                          <div className='coinimg'><img src={row.coinimg} alt='coin-img' /></div>
                          <span className='coinpair-pair'>{row.coinname}</span>
                        </div>
                      </TableCell>
                      <TableCell align="left"><span className='coin-price-new'>$<span>{row.price}</span></span></TableCell>
                      <TableCell align="left"><div className='coin-chart-img chart-block'>
                        {row.change >= 0 ? <img src={row.chart} /> : <img src={redgraph} />}</div>
                      </TableCell>
                      <TableCell align="left">{row.change >= 0 ? <span className='change-percentage'>{row.change}%</span> : <span className='error-percentage'>{row.change}%</span>}</TableCell>
                      <TableCell align="left"><span className='coin-vol-new coin-price-new'>$<span>{row.volume}</span></span></TableCell>
                      <TableCell align="left"><Button className={classes.bgbtn}>Trade</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className='see-all-button-outer'>
                <Link variant="contained" endIcon={<ChevronRightIcon />} to='/cryptocurrencies'>
                  See All
                </Link>
              </div>
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

                  {updates.length > 0 && updates.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell scope="row" className='pair-coin'><div className='spot-id'>{index + 1}</div></TableCell>
                      <TableCell align="left">
                        <div className='proposal-block'>
                          <div className='proposal-img-name'>
                            {/* <div className='projimg'><img src={row.projimg} alt={row?.Title} /></div> */}
                            <span>{row?.Title}</span>
                          </div>
                          {/* <div className='proposal-desc'><p>{row?.Content}</p></div> */}
                          {/* <div className='proposal-web'>{row.projweb}</div> */}
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div className='proposal-vote'>
                          <lable style={{ color: 'black' }} >
                            Yes
                          </lable>
                          <div>
                            <BorderLinearProgress variant="determinate" value={row?.winPer} />
                          </div>
                          <span className='vote-percent'>{row?.winPer}%</span>
                        </div>
                        <lable style={{ color: 'black', marginTop: '30px' }}>
                          No
                        </lable>
                        <div className='proposal-vote' >
                          <div>
                            <BorderLinearProgress variant="determinate" value={row?.lossPer} />
                          </div>
                          <span className='vote-percent'>{row?.lossPer}%</span>
                        </div>
                      </TableCell>
                      <TableCell align="center" onClick={() => { navigate(`/communityvotenow`, { state: { data: row?.Proposal_Id } }) }} ><Button className={classes.bgbtn}>Vote with DIMO</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </TabPanel>

        </Box>

      </div>
    </>

  )
}

export default CoinTable
