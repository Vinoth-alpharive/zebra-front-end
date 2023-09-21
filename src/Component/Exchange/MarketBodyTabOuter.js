import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import './MarketBodyTabOuter.css'
import MarketTableInner from './MarketTableInner';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

    // commontabcls: {
    //     padding: '0px !important'
    // },


});

function TabPanel(props) {

    const classes = useStyles(); 
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

export default function MarketBodyTabOuter() {

    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs className='tab-overall' value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<StarIcon />} iconPosition="start" label="Favourite" {...a11yProps(0)}/>
          <Tab label="All Cryptos" {...a11yProps(1)} />
          <Tab label="Spot Markets" {...a11yProps(2)} />
          <Tab label="Future Markets" {...a11yProps(3)} />
          <Tab label="New Listing" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel className='commontabcls' value={value} index={0}>
        <MarketTableInner/>
      </TabPanel>
      <TabPanel className='commontabcls' value={value} index={1}>
        <MarketTableInner/>
      </TabPanel>
      <TabPanel className='commontabcls' value={value} index={2}>
        <MarketTableInner/>
      </TabPanel>
      <TabPanel className='commontabcls' value={value} index={3}>
        <MarketTableInner/>
      </TabPanel>
      <TabPanel className='commontabcls' value={value} index={4}>
        <MarketTableInner/>
      </TabPanel>
    </Box>
  );
}