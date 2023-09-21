import React from 'react'
import Menu from '@mui/material/Menu';
import './TradeHistory.css'
import { styled, alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { useParams, useSearchParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Typography from '@mui/material/Typography';
import Axios from '../../Axios';
import { useEffect } from 'react';
import { useState } from 'react';

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}









const useStyles = makeStyles({


  tabletrade: {
    borderRadius: '0px !important',
    '& div': {
      padding: '0px !important'
    },
    '& table': {
      background: '#18222F'
    },
    '& th': {
      border: 'none !important',
      fontSize: '12px',
      color: '#fff',
      paddingLeft: '0px !important',
      paddingTop: '0px !important'
    },
    '& td': {
      border: 'none !important',
      paddingTop: '4px',
      paddingBottom: '4px',
      paddingLeft: '0px !important'
    },
  },

  colorchange: {
    color: 'rgba(255, 255, 255, 0.4) !important'
  },

  tradehistrymenu: {
    fontSize: '11px !important',
    color: '#fff !important'
  },

  dropmenuauto: {
    paddingBottom: '2px !important',
    paddingTop: '2px !important'
  },

  tabcoinsleft: {
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '0px',
    marginTop: '0px',
    minHeight: 'auto !important',
    '& div': {
      justifyContent: 'space-around !important',
      margin: '0px !important',
      display: 'flex !important',
      width: '100%',
      '& button': {
        width: '50%',
        textAlign: 'center',
        padding: '0.7em',
        fontSize: '12px',
        textTransform: 'none',
      }
    }
  },
  tabpanelcls: {
    marginLeft: '3px',
    '& div': {
      padding: '0px'
    }
  },

  ordertabpanelcls: {
    '& div': {
      padding: '0px !important'
    }
  }

});


const TradeHistory = ({ da }) => {

  const classes = useStyles();

  const [anchordot, setAnchorDot] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);
  const [order, setOrder] = React.useState(0);
  const [rows, setRows] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeOrder = (event, newValue) => {
    if (newValue === 1) {
      history("buy")
    } else if (newValue === 2) {
      history("sell")
    } else {
      history("all")
    }
    setOrder(newValue);
  };
  function createData(fat, carbs, protein, side) {
    return { fat, carbs, protein, side };
  }

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let { token } = useParams();

  const opendot = Boolean(anchordot);
  const handleClickDot = (event) => {
    setAnchorDot(event.currentTarget);
  };
  const handleCloseDot = () => {
    setAnchorDot(null);
  };

  const history = async (side) => {
    try {
      var datas = { pair: token, trade_at: 'exchange' }
      if (side === "buy") {
        datas.side = "buy"
      } else if (side === "sell") {
        datas.side = "sell"
      }
      const { data } = await Axios.post(`/auth/getAllTransactionHist`, datas)
      setRows([])
      if (data?.result?.length > 0) {
        for (let i = 0; i < data?.result?.length; i++) {
          const dt = data?.result[i]
          setRows((pre) => [...pre, createData(dt?.createdAt, dt?.Amount, dt?.Price, dt?.Trade_type)])
        }
      } else {
        setRows([])
      }


    } catch (error) {
      console.log(error)
    }

  }


  useEffect(() => {
    history("all")
  }, [token, da])

  return (
    <div className='trade-history-block'>
      <div className='sell-buy-trade my-order-items Trade-History-outer'>
        <div className='my-order-inner Trade-History-inner'>
          <h4 className='sell-buy-trade-head my-order-head'>Trade History</h4>
          <Box className='my-order-tab-head' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs id='buy-sell-all-tab' className='buy-sell-all-tab-cls' value={order} onChange={handleChangeOrder} aria-label="basic tabs example">
              <Tab className='all-tab' label="All" {...a11yProps(0)} />
              <Tab className='buy-tab' label="Buy" {...a11yProps(1)} />
              <Tab className='sell-tab' label="Sell" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </div>
        <div className='my-order-content'>
          <TabPanel value={order} index={0} className={classes.ordertabpanelcls}>

            <TableContainer component={Paper} className={classes.tabletrade}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.colorchange}>Time</TableCell>
                    <TableCell align="left" className={classes.colorchange}>Amount</TableCell>
                    <TableCell align="right" className={classes.colorchange}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell align="left" component="td" scope="row">
                        <div class="market-left">
                          <div class="market-left-left price"><label >{row.fat}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div class="market-right mid">
                          <div class="market-right-inner"><label style={{ color: `${row.side === "BUY" ? '#23d886' : '#ca492f'} ` }} >{row.carbs}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div class="market-right right">
                          <div class="market-right-inner"><span>{row.protein}</span></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </TabPanel>
          <TabPanel value={order} index={1} className={classes.ordertabpanelcls}>
            <TableContainer component={Paper} className={classes.tabletrade}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.colorchange}>Time</TableCell>
                    <TableCell align="left" className={classes.colorchange}>Amount</TableCell>
                    <TableCell align="right" className={classes.colorchange}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell align="left" component="td" scope="row">
                        <div class="market-left">
                          <div class="market-left-left price"><label>{row.fat}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div class="market-right mid">
                          <div class="market-right-inner"><label style={{ color: '#23d886' }}>{row.carbs}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div class="market-right right">
                          <div class="market-right-inner"><span>{row.protein}</span></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={order} index={2} className={classes.ordertabpanelcls}>
            <TableContainer component={Paper} className={classes.tabletrade}>
              <Table size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className={classes.colorchange}>Time</TableCell>
                    <TableCell align="left" className={classes.colorchange}>Amount</TableCell>
                    <TableCell align="right" className={classes.colorchange}>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      <TableCell align="left" component="td" scope="row">
                        <div class="market-left">
                          <div class="market-left-left price"><label >{row.fat}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="left">
                        <div class="market-right mid">
                          <div class="market-right-inner"><label style={{ color: '#ca492f' }}>{row.carbs}</label></div>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div class="market-right right">
                          <div class="market-right-inner"><span>{row.protein}</span></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </div>
      </div>






    </div>
  )
}

export default TradeHistory
