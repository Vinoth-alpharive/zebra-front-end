import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import './OrderOuterTab.css'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import OrderBookTable from './OrderBookTable';
import TradingViewPrice from './TradingViewPrice';
import TradeViewDepth from './TradeViewDepth';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import Button from "@mui/material/Button";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TradeHistoryMobile from './TradeHistoryMobile';
import OrderBookTableMobile from './OrderBookTableMobile';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const options = [
  'Quantity precision (Automatic)'
];

const ITEM_HEIGHT = 48;
const ITEM_WIDTH = 177;

// const StyledMenu = styled((props) => (
//     <Menu
//       elevation={0}
//       anchorOrigin={{
//         vertical: 'bottom',
//         horizontal: 'right',
//       }}
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     '& .MuiPaper-root': {
//       borderRadius: 6,
//       marginTop: theme.spacing(1),
//       minWidth: 80,
//       color:
//         theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
//       boxShadow:
//         'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
//       '& .MuiMenu-list': {
//         padding: '4px 0',
//       },
//       '& .MuiMenuItem-root': {
//         '& .MuiSvgIcon-root': {
//           fontSize: 18,
//           color: theme.palette.text.secondary,
//           marginRight: theme.spacing(1.5),
//         },
//         '&:active': {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             theme.palette.action.selectedOpacity,
//           ),
//         },
//       },
//     },
//   }));


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



const useStyles = makeStyles({

  tabcoinsleft: {
    display: 'flex !important',
    marginLeft: '0px',
    marginTop: '0px',
    minHeight: 'auto !important',
    '@media (max-width: 767.98px)': {
      marginLeft: '0px !important',
    }
    // borderRadius: '5px 5px 0 0',
  },

  tabpanelcls: {
    marginLeft: '0px',
    position: 'relative',
    background: 'rgba(24, 34, 47, 0.52)',
    height: '100%',
    '& div': {
      padding: '0px'
    }
  },

  selected: {
    background: 'rgba(187, 201, 242, 0.15)',
    color: '#fff !important',
    border: '1px solid #000 !important',
    borderRadius: '2px',
  },

  bothchartsdepthchartpaddingrght: {
    paddingLeft: '1px !important',
    paddingTop: '0px !important'
  },
  bothchartsdepthchartpaddingleft: {
    paddingTop: '0px !important'
  },
  bodymainbothcontain: {
    marginTop: '2px !important'
  },
  tradehistrymenu: {
    fontSize: '11px !important',
    color: '#fff !important'
  },

});



const ChartOuterTabMobile = () => {

  const [value, setValue] = React.useState(0);
  const [anchordot, setAnchorDot] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const opendot = Boolean(anchordot);
  const handleClickDot = (event) => {
    setAnchorDot(event.currentTarget);
  };
  const handleCloseDot = () => {
    setAnchorDot(null);
  };

  const classes = useStyles();

  return (
    <>
      <Box sx={{ width: '100%' }} className='chart-moble'>
        <Box className='orderoutercontain' sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs id="tab-mobile" className={classes.tabcoinsleft} value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Chart" {...a11yProps(0)} />
            <Tab label="Depth" {...a11yProps(1)} />
            {/* <Tab label="Order Book" {...a11yProps(2)} /> */}
            {/* <Tab label="Trade History" {...a11yProps(3)} />
          <Tab label="Open Orders" {...a11yProps(4)} />
          <Tab label="Closed Orders" {...a11yProps(5)} /> */}
            {/* <Tab label="Wallets" {...a11yProps(5)} /> */}
          </Tabs>
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
        </Box>


        <TabPanel value={value} index={0} className={classes.tabpanelcls}>
          <TradingViewPrice />
        </TabPanel>

        <TabPanel value={value} index={1} className={classes.tabpanelcls}>
          <TradeViewDepth />
        </TabPanel>

        <TabPanel value={value} index={2} className={classes.tabpanelcls}>
          {/* <OrderBookTable/> */}
          {/* <OrderBookTableMobile/> */}
        </TabPanel>

        <TabPanel value={value} index={3} className={classes.tabpanelcls}>
          <TradeHistoryMobile />
        </TabPanel>

        <TabPanel value={value} index={4} className={classes.tabpanelcls}>
          <div className='initial-createacc'>
            <div class="logged-out-msg"><a href="/account/register" class="logged-out-msg--link">Create an account</a> or <a href="/account/login?returnUrl=/trade/btc-usd" class="logged-out-msg--link">log in</a> to track your open orders here.</div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5} className={classes.tabpanelcls}>
          <div className='initial-createacc'>
            <div class="logged-out-msg"><a href="/account/register" class="logged-out-msg--link">Create an account</a> or <a href="/account/login?returnUrl=/trade/btc-usd" class="logged-out-msg--link">log in</a> to track your open orders here.</div>
          </div>
        </TabPanel>
        {/* <TabPanel value={value} index={5} className={classes.tabpanelcls}>
        <div className='initial-createacc'>
           <div class="logged-out-msg"><a href="/account/register" class="logged-out-msg--link">Create an account</a> or <a href="/account/login?returnUrl=/trade/btc-usd" class="logged-out-msg--link">log in</a> to track your open orders here.</div>
        </div>
      </TabPanel> */}

      </Box>
      <OrderBookTableMobile />
    </>
  )
}

export default ChartOuterTabMobile
