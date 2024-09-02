import React, { useEffect } from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './TradeHistory.css'
import Button from "@mui/material/Button";
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { useParams, useSearchParams } from 'react-router-dom';
import NorthIcon from '@mui/icons-material/North';
import './OrderBookTable.css'
import { useState } from 'react';
import Axios from '../../Axios'
import Web3 from 'web3';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function createData(fat, carbs, protein, calories) {
  return { fat, carbs, protein, calories };
}




// const datastock = [
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
//   createData('22,222,3345', '22,222,3345', 0.00735, '19.08'),
// ];


const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 80,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));


const useStyles = makeStyles({

  tabcoinsleft: {
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '0px',
    marginTop: '0px',
  },

  tabletrade: {
    borderRadius: '0px !important',
    background: '#18222f !important',
    '& div': {
      padding: '0px !important'
    },
    '& table': {
      background: '#18222F'
    },
    '& th': {
      border: 'none !important',
      fontSize: '15px',
      color: '#fff'
    },
    '& td': {
      border: 'none !important',
      paddingTop: '4px',
      paddingBottom: '4px'
    },
  },

  colorchange: {
    color: 'rgba(255, 255, 255, 0.4) !important'
  },

  taberight: {
    paddingLeft: '1px !important',
    paddingTop: '1px !important'
  },
  tabeleft: {
    paddingTop: '1px !important',
  },
  bodyorderbook: {
    paddingLeft: '1px !important',
    '@media (min-width: 768px) and (max-width: 1199.98px)': {
      display: 'flex !important',
      flexWrap: 'nowrap !important'
    }
  },
  dropmenuauto: {
    paddingBottom: '2px !important',
    paddingTop: '2px !important'
  }

});


const OrderBookTable = ({ tr }) => {

  const classes = useStyles();
  var WEB = new Web3(window.ethereum);
  const [openbook, setOpenBook] = React.useState(null);
  const [datastock, setDataStock] = useState([])
  const [datastock1, setDataStock1] = useState([])

  let { token } = useParams();


  const history = async () => {
    const account = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const { data } = await Axios.post(`/users/TradeHistory`, {
      user: account[0],
      pair: token ? token : "wanUSDT_WWAN"
    })
    const dts = []
    const dts1 = []
    for (let i = 0; i < data?.result?.length; i++) {
      const dt = data?.result[i]
      if (dt?.Trade_type === "BUY") {
        dts.push(createData("", parseFloat(dt?.Amount).toFixed(6), dt?.createdAt, parseFloat(dt?.Price).toFixed(6)))
      } else {
        dts1.push(createData("", parseFloat(dt?.Amount).toFixed(6), dt?.createdAt, parseFloat(dt?.Price).toFixed(6)))
      }

    }
    setDataStock(dts)
    setDataStock1(dts1)
  }

  useEffect(() => {
    history()
  }, [token])
  useEffect(() => {
    history()
  }, [tr])

  useEffect(() => {
    history()
  }, [])
  const openbookmenu = Boolean(openbook);
  const handleClickBook = (event) => {
    setOpenBook(event.currentTarget);
  };
  const handleCloseBook = () => {
    setOpenBook(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (

    <div className='trade-history-block order-open-book order-open-book-desktop'>


      <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>

        <Grid container spacing={2} className={classes.bodyorderbook}>


          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.tabeleft}>
            <Item className={classes.headinner} id='selling-order-detail'>


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
                    {datastock?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell align="left">
                          <div class="market-right mid">
                            <div class="market-right-inner right-align-white"><label>{row.protein}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div class="market-right right">
                            <div class="market-right-inner right-align-white"><label style={{ color: `${row.carbs < 0 ? '#ca492f' : '#23d886'} ` }}>{row.carbs}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner"><label>{row.calories}</label></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


            </Item>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.taberight}>
            <Item className={classes.headinner} id='buying-order-detail'>


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
                    {datastock1?.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >


                        <TableCell align="left">
                          <div class="market-right mid">
                            <div class="market-right-inner right-align-white"><label>{row.protein}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div class="market-right right">
                            <div class="market-right-inner right-align-white"><label style={{ color: `${row.carbs > 0 ? '#ca492f' : '#23d886'} ` }}>{row.carbs}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner"><label>{row.calories}</label></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


            </Item>
          </Grid>
        </Grid>

      </Box>

    </div>

  )
}

export default OrderBookTable
