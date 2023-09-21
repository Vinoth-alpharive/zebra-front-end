import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import './MarketTableInner.css'
import { makeStyles } from '@mui/styles';
import MarketTable from './MarketTable';

const useStyles = makeStyles({

    tabpartmarketitem : {
        background: 'transparent !important',
        boxShadow: 'none !important',
        marginRight: '0px !important',
        marginLeft:'0px !important',

        '& button' : {
            fontSize: '16px',
            paddingTop: '10px !important',
            paddingBottom: '10px !important',
            marginRight:'10px'
        }
    },

    taboverallcontentouter: { padding: '0px !important'}

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

export default function MarketTableInner() {

    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }} className={classes.taboverallcontentouter}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className='tab-overall-content' value={value} onChange={handleChange} aria-label="basic tabs example">
        {/* icon={<StarIcon />} iconPosition="start"  */}
          <Tab label="New" {...a11yProps(0)} />
          <Tab label="Metaverse" {...a11yProps(1)} />
          <Tab label="Gaming" {...a11yProps(2)} />
          <Tab label="DeFi" {...a11yProps(3)} />
          <Tab label="Innovation" {...a11yProps(4)} />
          <Tab label="Layer1/Layer2" {...a11yProps(5)} />
          <Tab label="Fan Token" {...a11yProps(6)} />
          <Tab label="NFT" {...a11yProps(7)} />
          <Tab label="Storage" {...a11yProps(8)} />
          <Tab label="Polkadot" {...a11yProps(9)} />
          <Tab label="POS" {...a11yProps(10)} />
          <Tab label="POW" {...a11yProps(11)} />
        </Tabs>
      </Box>
      <TabPanel className='tab-market-table' value={value} index={0}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={1}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={2}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={3}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={4}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={5}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={6}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={7}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={8}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={9}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={10}>
        <MarketTable/>
      </TabPanel>
      <TabPanel className='tab-market-table' value={value} index={11}>
        <MarketTable/>
      </TabPanel>
    </Box>
  );
}