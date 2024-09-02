import React from 'react'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './TradeHistory.css'
import Button from "@mui/material/Button";
import { styled, alpha } from '@mui/material/styles';
// import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
// import NorthIcon from '@mui/icons-material/North';


function createData(fat, carbs, protein) {
  return { fat, carbs, protein };
}

const rows = [
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(2223345, 0.00735, '3:53:45 PM'),
  createData(2223345, 0.00735, '3:53:45 AM'),
  createData(-2223345, 0.00735, '3:53:45 PM'),
];



const useStyles = makeStyles({

  tabcoinsleft: {
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '3px',
    marginTop: '2px',
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

  tradehistrymenu: {
    fontSize: '11px !important',
    color: '#fff !important'
  },

  dropmenuauto: {
    paddingBottom: '2px !important',
    paddingTop: '2px !important'
  }

});


const options = [
  'Quantity precision (Automatic)'
];

const ITEM_HEIGHT = 48;
const ITEM_WIDTH = 177;

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

const TradeHistoryMobile = ({ tr }) => {

  const classes = useStyles();

  const [anchordot, setAnchorDot] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [datastock, setDataStock] = useState([])
  const [datastock1, setDataStock1] = useState([])


  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  }, [tr])


  const opendot = Boolean(anchordot);
  const handleClickDot = (event) => {
    setAnchorDot(event.currentTarget);
  };
  const handleCloseDot = () => {
    setAnchorDot(null);
  };

  return (
    <div className='trade-history-block'>

      <div className='flex-trade-histry'>
        {/* <span className='head-block'>Trade history</span> */}


        <div className='dots-block'>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={opendot ? 'long-menu' : undefined}
            aria-expanded={opendot ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClickDot}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchordot}
            open={opendot}
            onClose={handleCloseDot}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: ITEM_WIDTH,
                background: '#18222f',
                flexDirection: 'column',
                boxShadow: '0 0 0 1px rgb(0 0 0 / 50%), 0 5px 15px 0 rgb(0 0 0 / 15%), inset 0 0 0 1px rgb(255 255 255 / 10%)',
                padding: '3px 0',
                borderRadius: '2px',
                left: 'auto !important',
                right: '20px'
              },
            }}
          >
            {options.map((option) => (
              <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleCloseDot} className={classes.tradehistrymenu}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>


      </div>

      <div className='option-btns'>

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
            Autoss
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

            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              100
            </MenuItem>
            <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
              All
            </MenuItem>
          </StyledMenu>
        </div>

      </div>

      <TableContainer component={Paper} className={classes.tabletrade}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right" className={classes.colorchange}>Price</TableCell>
              <TableCell align="right" className={classes.colorchange}>Quantity</TableCell>
              <TableCell align="right" className={classes.colorchange}>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell align="right" component="td" scope="row">
                  <div class="market-left">
                    <div class="market-left-left price"><label style={{ color: `${row.fat < 0 ? '#ca492f' : '#23d886'} ` }}>{row.fat}</label></div>
                  </div>
                </TableCell>
                <TableCell align="right">
                  <div class="market-right mid">
                    <div class="market-right-inner"><label>{row.carbs}%</label></div>
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

    </div>
  )
}

export default TradeHistoryMobile