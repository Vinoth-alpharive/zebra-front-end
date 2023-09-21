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
import { styled, alpha } from '@mui/material/styles';
import OrderBookTable from './OrderBookTable';

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
    minHeight: 'auto !important'
    // borderRadius: '5px 5px 0 0',
  },

  tabpanelcls: {
    marginLeft: '0px',
    position: 'relative',
    background: 'rgba(24, 34, 47, 0.52)',
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

  tradehistrymenu: {
    fontSize: '11px !important',
    color: '#fff !important'
  },

  mainouterbook: {
    height: '45vh',
    '@media (max-width: 767.98px)': {
      display: 'none',
    },
    '@media (min-width: 768px) and (max-width: 1199.98px)': {
      height: 'auto !important',
    },
    '& h3': {
      color: '#fff',
      fontSize: '15px !important',
      textAlign: 'left !important',
      padding: '20px 14px !important',
      margin: '0px'
    }
  }

});


const options = [
  'Show depth bars',
  'Quantity precision (Automatic)',
  'Price Aggregation(0.001)'
];

const ITEM_HEIGHT = 48;

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
    minWidth: 180,
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


const OrderOuterTab = ({ tr }) => {

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

    <Box sx={{ width: '100%' }} className={classes.mainouterbook}>
      <h3>Order Book</h3>
      <OrderBookTable tr={tr} />
    </Box>

  )
}

export default OrderOuterTab
