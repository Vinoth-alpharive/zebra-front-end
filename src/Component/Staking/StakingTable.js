import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import stakingimg from '../../images/stakingimg.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import coins1 from '../../images/coins-1.png'
import coins2 from '../../images/coins-2.png'
import coins3 from '../../images/coins-3.png'
import coins4 from '../../images/coins-4.png'
import coins5 from '../../images/coins-5.png'
import coins6 from '../../images/coins-6.png'

import Axios from '../../Axios'

import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const useStyles = makeStyles({

  tablestakingblock: {
    background: '#181A1A !important',
    textTransform: 'none !important',
    boxShadow: 'none !important',
    border: '1px solid #373C3E',
    borderRadius: '9px !important',
    '& th': {
      borderBottom: '1px solid rgb(60 64 64) !important'
    },
    '& td': {
      borderBottom: '1px solid rgb(60 64 64) !important'
    }
  },
  stakeheadpart: {
    alignItems: 'center !important'
  },
  toolbarsearch: {
    justifyContent: 'flex-end !important',
    padding: '0px !important',
    '& input': {
      width: '100% !important'
    }
  }

});

function createData(coinimg, name, calories, fat) {
  return { coinimg, name, calories, fat };
}

const rows = [
  createData(coins1, 'Tether', 11.2, 30),
  createData(coins2, 'BNB', 7, 30),
  createData(coins3, 'USDCoin', 8, 30),
  createData(coins4, 'Sol', 4, 30),
  createData(coins5, 'Polygon', 5.5, 30),
  createData(coins6, 'Polkadot', 7, 30),
  createData(coins6, 'Polkadot', 10, 30),
  createData(coins6, 'Polkadot', 11.5, 30),
  createData(coins6, 'Polkadot', 9, 30),
];

export default function StakingTable() {



  const classes = useStyles();

  return (
    <div className='staking-table'>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={0} className={classes.stakeheadpart}>

          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
            <div className='heading-stak'><div className='straking-left-outer'><div className='straking-left'><img src={stakingimg} /></div>Staking</div><p>Maximum returns, minimum effort: Let your assets work for you with Zebra's staking feature</p></div>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Toolbar className={classes.toolbarsearch}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </Toolbar>
          </Grid>

        </Grid>
      </Box>
      <TableContainer component={Paper} className={classes.tablestakingblock}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Est. APY</TableCell>
              <TableCell>Reward</TableCell>
              <TableCell>Time Lock</TableCell>
              <TableCell>Trade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell><div className="img-name"><img src={row.coinimg} />{row.name}</div></TableCell>
                <TableCell><div className='percentage-est'><span className='percentage'>{row.calories}</span>%</div></TableCell>
                <TableCell><div className="img-name"><img src={row.coinimg} />{row.name}</div></TableCell>
                <TableCell><div className='days-time'><span>{row.fat}</span> d</div></TableCell>
                <TableCell><Button variant="contained" className='stake-button'>Stake</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}