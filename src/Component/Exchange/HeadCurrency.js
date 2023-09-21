import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './HeadCurrency.css'
import axios from 'axios'

const options = {
  method: 'GET',
  url: 'https://google-translate1.p.rapidapi.com/language/translate/v2/languages',
  headers: {
    'Accept-Encoding': 'application/gzip',
    'X-RapidAPI-Key': '18aff218e0msh717d0aa613beb10p15e84fjsnb11e215c76d7',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
}).catch(function (error) {
  console.error(error);
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

export default function HeadCurrency() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Language and Region" {...a11yProps(0)} />
          <Tab label="Currency" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <h3 className='clr-head'>Choose a language and region</h3>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h3 className='clr-head'>Choose a currency</h3>
      </TabPanel>
    </Box>
  );
}