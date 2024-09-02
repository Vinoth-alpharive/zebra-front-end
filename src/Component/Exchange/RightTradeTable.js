import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { makeStyles } from '@mui/styles';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Link } from 'react-router-dom';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './RightTradeTable.css'


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1INCH', '1inch', 'BTC', 0.35, 0.00002265),
  createData('AAVE', 'Aave Token', 'ETH', -0.35, 0.00002265),
  createData('1INCH', '1inch', 'BTC', 0.35, 0.00002265),
  createData('AAVE', 'Aave Token', 'ETH', -0.35, 0.00002265),
  createData('1INCH', '1inch', 'BTC', 0.35, 0.00002265),
  createData('AAVE', 'Aave Token', 'ETH', -0.35, 0.00002265),
  createData('1INCH', '1inch', 'BTC', 0.35, 0.00002265),
  createData('AAVE', 'Aave Token', 'ETH', -0.35, 0.00002265),
  createData('1INCH', '1inch', 'BTC', 0.35, 0.00002265),
  createData('AAVE', 'Aave Token', 'ETH', -0.35, 0.00002265),
];



const useStyles = makeStyles({

  tabcoinsleft: {
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '0px',
    marginTop: '0px',
    // borderRadius: '5px 5px 0 0',
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
      fontSize: '17px',
      color: '#fff',
      paddinTop: '0px !important'
    },
    '& td': {
      border: 'none !important',
      paddingTop: '10px',
      paddingBottom: '10px'
    },
  },
  dropmenuauto: {
    padding: '6px 7px !important',
    fontSize: '12px !important',
    color: '#fff !important'
  }

});


function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return 'This field is being focused';
    }

    return 'Helper text';
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}


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
    background: '#18222f',
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

// sx={{ minWidth: 650 }} 
export default function RightTradeTable() {

  const classes = useStyles();

  const [count, setCount] = useState(0);
  const IncNum = () => {
    setCount(count + 1);
  };
  const DecNum = () => {
    if (count > 0) setCount(count - 1);
    else {
      setCount(0);
      alert("min limit reached");
    }
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
    <>

      <div className='order-component righttradetop'>
        <div className='scroll-part-top'>
          <div className='clear-order-form'><Link><BackspaceIcon /></Link></div>

          <Box component="form" noValidate autoComplete="off" className='incre-dec-box pricebox'>

            <div className='buttons-top'>
              <Button><DragHandleIcon /></Button>
              <Button>Bid</Button>
              <Button>Ask</Button>
              <Button>Last</Button>
            </div>

            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput placeholder="Price" value={count} />

              <div className='incre-dec'>
                <Button onClick={IncNum}><ExpandLessIcon /></Button>
                <Button onClick={DecNum}><ExpandMoreIcon /></Button>
              </div>

              {/* <MyFormHelperText /> */}
            </FormControl>
          </Box>

          <Box component="form" noValidate autoComplete="off" className='incre-dec-box quantity'>

            {/* <div className='buttons-top'>
      <Button><DragHandleIcon/></Button>
      <Button>Bid</Button>
      <Button>Ask</Button>
      <Button>Last</Button>
      </div> */}

            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput placeholder="Price" value={count} />

              <div className='incre-dec'>
                <Button onClick={IncNum}><ExpandLessIcon /></Button>
                <Button onClick={DecNum}><ExpandMoreIcon /></Button>
              </div>

              {/* <MyFormHelperText /> */}
            </FormControl>
          </Box>

          <Box component="form" noValidate autoComplete="off" className='incre-dec-box plusfree'>

            <div className='buttons-top'>
              <Button>25%</Button>
              <Button>50%</Button>
              <Button>75%</Button>
              <Button>100%</Button>
              <Button>0%</Button>
            </div>

            <FormControl sx={{ width: '100%' }}>
              <OutlinedInput placeholder="Price" value={count} />

              <div className='incre-dec'>
                <Button onClick={IncNum}><ExpandLessIcon /></Button>
                <Button onClick={DecNum}><ExpandMoreIcon /></Button>
              </div>

              {/* <MyFormHelperText /> */}
            </FormControl>
          </Box>

          <Box component="form" className='confirmation'>

            <div className='confirmation-left'>

              <FormGroup>
                <FormControlLabel control={<Checkbox defaultChecked />} label="Show confirmation" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Clear after submission" />
              </FormGroup>


            </div>

            <div className='confirmation-right'>

              <FormGroup>


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
                    Good Till Cancelled
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
                    <MenuItem style={{ background: '#0081eb', borderRadius: '3px', margin: '0 3px' }} className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                      Good Till Cancelled
                    </MenuItem>
                    <MenuItem className={classes.dropmenuauto} onClick={handleClose} disableRipple>
                      Immediete or Cancel
                    </MenuItem>
                  </StyledMenu>
                </div>


                <FormControlLabel control={<Checkbox defaultChecked />} label=" Post only" labelPlacement="start" />
              </FormGroup>

            </div>

          </Box>


          <div class="order-button-container-fake-space loggedOutButtons"></div>

        </div>


      </div>

      {/* <div class="order-button-container floating"><div class="logged-out-buttons "><p>To begin trading please create an account or log in.</p><div class="logged-out-buttons--container"><a href="/account/register" class="button button-medium primary">Create an account</a><a href="/account/login?returnUrl=/trade/btc-usd" class="button button-medium primary">Log in</a></div></div></div>

    <div class="market-trade-availability">BTC/USD is tradable by Bittrex &amp; Bittrex Global customers.</div> */}

    </>
  );
}



