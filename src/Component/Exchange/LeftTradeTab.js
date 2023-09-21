import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import LeftTradeTable from './LeftTradeTable';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';

// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

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

    tabcoinsleft: {
        display:'flex !important',
        background: '#18222F',
        marginLeft: '0px',
        marginTop: '0px',
        minHeight: 'auto !important'
        // borderRadius: '5px 5px 0 0',
    },

    tabpanelcls: {
        marginLeft: '0px',
        '& div' : {
            padding: '0px !important'
        }
    },

    selected: {
      background: 'rgba(187, 201, 242, 0.15)',
      color: '#fff !important',
      border: '1px solid #000 !important',
      borderRadius: '2px'
  }
  
  });

  

export default function LeftTradeTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  
  return (

    <Box sx={{ width: '100%' }}>
      <Box className={classes.tabcoinsleftcontain} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className={classes.tabcoinsleft} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Al" {...a11yProps(0)} />
          <Tab label="BTC" {...a11yProps(1)} />
          <Tab label="ETH" {...a11yProps(2)} />
          <Tab label="USD" {...a11yProps(3)} />
          <Tab label="USDT" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.tabpanelcls}>
        <LeftTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanelcls}>
        <LeftTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanelcls}>
        <LeftTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabpanelcls}>
        <LeftTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabpanelcls}>
        <LeftTradeTable/>
      </TabPanel>
    </Box>
  );
}