import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(token, tokensym, amount, amntdollar, time, day, status) {
  return { token, tokensym, amount, amntdollar, time, day, status };
}

const rows = [
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
  createData('XDC', 'XDC', 2290, "190,290", "10:00am", "28/03/23", "success"),
];

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

export default function AccountInnerab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div className='inner-tab-account'>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="XDC" {...a11yProps(1)} />
            <Tab label="BTC" {...a11yProps(2)} />
            <Tab label="ETH" {...a11yProps(3)} />
            <Tab label="XRP" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>

          <TableContainer component={Paper} className='table-container-cls'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Token</TableCell>
                  <TableCell align='center'>Amount</TableCell>
                  <TableCell align='center'>Time</TableCell>
                  <TableCell align='center'>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >

                    <TableCell><div className='token'><span className='token-trans'>{row.token}</span><span className='token-tokensym'>{row.tokensym}</span></div></TableCell>
                    <TableCell><div className='amount-td cmn-outer'><span className='amount-trans spanone'>{row.amount}</span><span className='amount-amntdollar spantwo'>{row.amntdollar}</span></div></TableCell>
                    <TableCell><div className='timeday-td cmn-outer'><span className='timeday-time spanone'>{row.time}</span><span className='timeday-day spantwo'>{row.day}</span></div></TableCell>
                    <TableCell><div className='status-status'>{row.status}</div></TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>

        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </div>
  );
}