import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import RightTradeTable from './RightTradeTable';


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
        position: 'relative',
        background: 'rgba(24, 34, 47, 0.52)',
        '& div' : {
            padding: '0px'
        }
    },

    selected: {
      background: 'rgba(187, 201, 242, 0.15)',
      color: '#fff !important',
      border: '1px solid #000 !important',
      borderRadius: '2px',
  }
  
  });

  

export default function RightTradeTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const classes = useStyles();
  
  return (

    <Box sx={{ width: '100%' }}>
      <Box className={classes.tabcoinsleftcontain} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs id="lmstol" className={classes.tabcoinsleft} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Limit" {...a11yProps(0)} />
          <Tab label="Market" {...a11yProps(1)} />
          <Tab label="Stop Limit" {...a11yProps(2)} />
          <Tab label="Trailing" {...a11yProps(3)} />
          <Tab label="OCO" {...a11yProps(4)} />
          <Tab label="Ladder Limit" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={1} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={2} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={3} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={4} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
      <TabPanel value={value} index={5} className={classes.tabpanelcls}>
        <RightTradeTable/>
      </TabPanel>
    </Box>
  );
}