import React from 'react'
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
import NorthIcon from '@mui/icons-material/North';
import './OrderBookTable.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function createData(fat, carbs, protein, calories) {
  return { fat, carbs, protein, calories };
}

const datastock = [
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '-22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '-22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '-22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '22,222,3345'),
  createData('22,222,3345', '22,222,3345', 0.00735, '-22,222,3345'),
];


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
    '& div': {
      padding: '0px !important'
    },
    '& table': {
      background: '#18222F'
    },
    '& th': {
      border: 'none !important',
      fontSize: '12px',
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
  },
  dropmenuauto: {
    paddingBottom: '2px !important',
    paddingTop: '2px !important'
  }

});


const OrderBookTableMobile = ({ tr }) => {

  const classes = useStyles();

  const [openbook, setOpenBook] = React.useState(null);
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

  // const history = async () => {
  //   const account = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   const { data } = await Axios.post(`/users/TradeHistory`, {
  //     user: account[0],
  //     pair: token ? token : "wanUSDT_WWAN"
  //   })
  //   const dts = []
  //   const dts1 = []
  //   for (let i = 0; i < data?.result?.length; i++) {
  //     const dt = data?.result[i]
  //     if (dt?.Trade_type === "BUY") {
  //       dts.push(createData("", parseFloat(dt?.Amount).toFixed(6), dt?.createdAt, parseFloat(dt?.Price).toFixed(6)))
  //     } else {
  //       dts1.push(createData("", parseFloat(dt?.Amount).toFixed(6), dt?.createdAt, parseFloat(dt?.Price).toFixed(6)))
  //     }

  //   }
  //   setDataStock(dts)
  //   setDataStock1(dts1)
  // }

  // useEffect(() => {
  //   history()
  // }, [tr])

  return (

    <div className='trade-history-block order-open-book order-open-book-mobile'>
      <h4 className='sell-buy-trade-head my-order-head'>Order </h4>

      <Box sx={{ flexGrow: 1 }} className={classes.bodymain}>

        <Grid container spacing={2} className={classes.bodyorderbook}>


          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.tabeleft}>
            <Item className={classes.headinner}>

              <div className='option-btns left'>

                <div class="tab-optns-left">
                  <Button>1/18</Button>

                  <div className='prev-nxt-btns'><Button>Prev</Button><Button>Next</Button></div>

                  <div className='auto-btn'>
                    <Button
                      id="demo-customized-button-openbook"
                      aria-controls={openbookmenu ? 'demo-customized-menu-openbook' : undefined}
                      aria-haspopup="true"
                      aria-expanded={openbookmenu ? 'true' : undefined}
                      variant="contained"
                      disableElevation
                      onClick={handleClickBook}
                      endIcon={<KeyboardArrowDownIcon />}
                    >
                      Auto
                    </Button>
                    <StyledMenu
                      id="demo-customized-menu-openbook"
                      MenuListProps={{
                        'aria-labelledby': 'demo-customized-button-openbook',
                      }}
                      openbook={openbook}
                      openbookmenu={openbookmenu}
                      onClose={handleCloseBook}
                    >
                      <MenuItem className={classes.dropmenuauto} onClick={handleCloseBook} disableRipple>
                        Auto
                      </MenuItem>
                      <MenuItem className={classes.dropmenuauto} onClick={handleCloseBook} disableRipple>
                        50
                      </MenuItem>
                      {/* <Divider sx={{ my: 0.5 }} /> */}
                      <MenuItem className={classes.dropmenuauto} onClick={handleCloseBook} disableRipple>
                        100
                      </MenuItem>
                      <MenuItem className={classes.dropmenuauto} onClick={handleCloseBook} disableRipple>
                        All
                      </MenuItem>
                    </StyledMenu>
                  </div>

                </div>

                <div class="tab-optns-right">
                  <span>$1.92M</span>
                </div>

              </div>

              <TableContainer component={Paper} className={classes.tabletrade}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right" className={classes.colorchange}>Amount</TableCell>
                      <TableCell align="right" className={classes.colorchange}>Price</TableCell>
                      <TableCell align="right" className={classes.colorchange}>Amount</TableCell>
                      <TableCell align="right" className={classes.colorchange}>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datastock.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner right-align-white"><label>{row.protein}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner"><label style={{ color: `${row.calories < 0 ? '#ca492f' : '#23d886'} ` }}>{row.calories}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner right-align-white"><label>{row.protein}</label></div>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div class="market-right right">
                            <div class="market-right-inner"><label style={{ color: `${row.calories < 0 ? '#ca492f' : '#23d886'} ` }}>{row.calories}</label></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


            </Item>
          </Grid>



          {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className={classes.taberight}>
             <Item className={classes.headinner}>
                 
             <div className='option-btns right'>

<div class="tab-optns-left">
<Button>1/18</Button>

<div className='prev-nxt-btns'><Button>Prev</Button><Button>Next</Button></div>

<div className='auto-btn'>
<Button
  id="demo-customized-button"
  aria-controls={open ? 'demo-customized-menu' : undefined}
  aria-haspopup="true"
  aria-expanded={open ? 'true' : undefined}
  variant="contained"
  disableElevation
  onClick={handleClick}
  endIcon={<KeyboardArrowDownIcon />}
>
  Auto
</Button>
<StyledMenu
  id="demo-customized-menu"
  MenuListProps={{
    'aria-labelledby': 'demo-customized-button',
  }}
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
>
  <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
    Auto
  </MenuItem>
  <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
    50
  </MenuItem>
  <Divider sx={{ my: 0.5 }} />
  <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
    100
  </MenuItem>
  <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
    All
  </MenuItem>
</StyledMenu>
</div>

</div>

<div class="tab-optns-right">
<span>$1.92M</span>
</div>

</div>

<TableContainer component={Paper} className={classes.tabletrade}>
                  <Table size="small" aria-label="a dense table">
                  <TableHead>
                  <TableRow>
                  <TableCell align="right" className={classes.colorchange}>Agg. Total</TableCell>
                  <TableCell align="right" className={classes.colorchange}>Total</TableCell>
                  <TableCell align="right" className={classes.colorchange}>Quantity</TableCell>
                  <TableCell align="right" className={classes.colorchange}>Price(0.001)</TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                  {datastock.map((row) => (
                  <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                  <TableCell align="right" component="td" scope="row">
                  <div class="market-left">
                  <div class="market-left-left rght-algn-ttl"><label>{row.fat}</label></div>
                  </div>
                  </TableCell>
                  <TableCell align="right">
                  <div class="market-right mid">
                  <div class="market-right-inner right-align-white"><label>{row.carbs}</label></div>
                  </div>
                  </TableCell>
                  <TableCell align="right">
                  <div class="market-right right">
                  <div class="market-right-inner right-align-white"><label>{row.protein}</label></div>
                  </div>
                  </TableCell>
                  <TableCell align="right">
                  <div class="market-right right">
                  <div class="market-right-inner"><label style={{color:`${row.calories < 0? '#ca492f' : '#23d886'} `}}>{row.calories}</label></div>
                  </div>
                  </TableCell>
                  </TableRow>
                  ))}
                  </TableBody>
                  </Table>
                  </TableContainer>


             </Item>
             </Grid> */}




        </Grid>

      </Box>

    </div>

  )
}

export default OrderBookTableMobile
