import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
// import NorthIcon from '@mui/icons-material/North';
import Axios from "../../Axios"
import { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const useStyles = makeStyles({

  tabcoinsleft: {
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '0px',
    marginTop: '0px',
  },

  tabletrade: {
    borderRadius: '0px !important',
    height: 'calc(100vh + 23px)',
    background: '#18222f !important',
    '&::-webkit-scrollbar': {
      width: '10px'
    },

    '&::-webkit-scrollbar-track': {
      background: '#131722'
    },

    '&::-webkit-scrollbar-thumb': {
      background: 'rgb(56, 55, 55)',
      borderRadius: '2px'
    },

    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(85, 85, 85)'
    },

    '& div': {
      padding: '0px !important'
    },
    '& table': {
      background: '#18222F'
    },
    '& th': {
      border: 'none !important',
      fontSize: '15px',
      color: '#fff'
    },
    '& td': {
      border: 'none !important',
      paddingTop: '7px',
      paddingBottom: '7px'
    },

  },

  colorchange: {
    color: 'rgba(255, 255, 255, 0.4) !important'
  },

  inputsearch: {

    '& div': {
      borderBottom: 'none !important'
    }
  }

});




var ws = new WebSocket("wss://stream.binance.com:9443/ws");

// sx={{ minWidth: 650 }} 
export default function LeftTradeTable({ pairsSelected, fullPairs }) {
  const asse = useRef()
  const [apiarray, setApiarray] = useState([]);
  const [seconddata, setSeconddata] = useState([]);
  const [butt, setButt] = useState('all')
  const [buttons, setButtons] = useState([{ name: 'All', id: 'all' }])
  const [chains, setChains] = useState([])

  // var arr__params = []

  const [arr__params, setarr__params] = useState([])
  const classes = useStyles();
  const navigate = useNavigate()
  const vdat = []

  // const apiCall = {
  //   "method": "SUBSCRIBE",
  //   "params": arr__params,
  //   "id": 1
  // }

  // useEffect(() => {
  //   if (arr__params.length > 0) {
  //     ws.close();
  //     ws = new WebSocket("wss://stream.binance.com:9443/ws");
  //     socket()
  //   }

  // }, [arr__params])
  // const socket = () => {
  //   ws.onopen = (event) => {
  //     ws.send(JSON.stringify(apiCall));
  //   };
  //   ws.onmessage = function (event) {
  //     const json = JSON.parse(event.data);
  //     try {
  //       apiarray.forEach(element => {
  //         if (element.pair === json.s) {
  //           setSeconddata((seconddata.slice(0)))
  //           element.price = json.p
  //           element.per = json.P
  //           setSeconddata((seconddata) => [...seconddata, element])

  //         }
  //       })
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  // }
  // const tradepair = async () => {

  //   const apidata = await Axios.post('/assets/getall')
  //   setarr__params([])
  //   apidata.data.result.forEach(element => {
  //     const da = {}
  //     const pair = element.coinpair.split("_")
  //     const tpair = pair.join("")
  //     // arr__params.push(tpair + "@ticker")
  //     setarr__params((pre) => [...pre, tpair + "@ticker"])
  //     da.chain = element.chain
  //     da.pair = tpair.toLocaleUpperCase()
  //     da.price = 0
  //     da.per = 0
  //     setApiarray((apiarray) => [...apiarray, da])
  //     setButt((butt) => [...butt, element.chain])
  //   });
  // }



  // useEffect(() => {
  //   tradepair()
  //   return () => ws.close();
  // }, [])


  // const assets = async (e) => {
  //   var bodata = e.target.value
  //   setarr__params([])
  //   if (bodata === "All") {
  //     const apidata = await Axios.post('/assets/getall')
  //     setApiarray([])
  //     apidata.data.result.forEach(element => {
  //       const da = {}
  //       const pair = element.coinpair.split("_")
  //       const tpair = pair.join("")
  //       // arr__params.push(tpair + "@ticker")
  //       setarr__params((pre) => [...pre, tpair + "@ticker"])
  //       da.chain = element.chain
  //       da.pair = tpair.toLocaleUpperCase()
  //       da.price = 0
  //       da.per = 0
  //       setApiarray((apiarray) => [...apiarray, da])
  //       // console.log(apiarray,"f2");

  //     });
  //   } else {
  //     const apidata = await Axios.post('/assets/getall', {
  //       chain: bodata
  //     })
  //     setApiarray([])
  //     apidata.data.result.forEach(element => {
  //       const da = {}
  //       const pair = element.coinpair.split("_")
  //       const tpair = pair.join("")
  //       // arr__params.push(tpair + "@ticker")
  //       setarr__params((pre) => [...pre, tpair + "@ticker"])
  //       da.chain = element.chain
  //       da.pair = tpair.toLocaleUpperCase()
  //       da.price = 0
  //       da.per = 0
  //       setApiarray((apiarray) => [...apiarray, da])
  //       // console.log(apiarray,"f1");

  //     });
  //   }



  // }

  const fullPairSelecteds = async (rows) => {
    for (let i = 0; i < chains.length; i++) {
      const element = chains[i];
      if (element._id === rows?.id) {
        fullPairs(element)
      }

    }
  }

  const networks = async () => {
    try {
      const { data } = await Axios.get(`/admin/getNetwork`)
      for (let i = 0; i < data?.result.length; i++) {
        // buttons.push({ name: data?.result[i]?.name })
        setButtons((pre) => [...pre, { name: data?.result[i]?.name, id: data?.result[i]?._id }])
      }
      setChains(data?.result)
    } catch (error) {
      console.log(error)
    }
  }

  const assets = async (e) => {
    setButt(e?.id)
  }

  const getpairs = async () => {
    try {
      setApiarray([])
      const { data } = await Axios.post(`/admin/getPairs`, { id: butt })
      setApiarray(data?.result)
    } catch (error) {
      console.log(error, "error")
    }

  }

  const getpairOf = async () => {
    try {
      const { data } = await Axios.post(`/admin/getPairs`, { id: butt })
      setApiarray(data?.result)
      navigate(`/exchange/${data?.result[0]?.pair_symbol}`)
    } catch (error) {
      console.log(error, "error")
    }
  }
  useEffect(() => {
    networks()
    getpairOf()
  }, [])


  useEffect(() => {
    if (butt) {
      getpairs()
    }
  }, [butt])

  const [active, setActive] = useState("");
  const [activeTab, setActiveTab] = useState("");

  // const handleClick = (event) => {
  //   setActive(event.target.id);

  // }


  return (
    <TableContainer id="left-side-part-table" component={Paper} className={classes.tabletrade}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Market</TableCell>
            <TableCell align="right" className={classes.colorchange}>
              {/* <div className='search-left-top'><SearchIcon style={{ color: 'rgba(255, 255, 255, 0.58)' }} /></div> */}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
      <div className='buttons-block'>
        <Stack spacing={2} direction="row">
          {buttons?.map((rownw, index) => (
            <Button className={`${activeTab == index && 'activeTabCls'}`} variant="outlined" value={rownw.name} onClick={() => { assets(rownw); fullPairSelecteds(rownw); setActiveTab(index) }} key={index}>{rownw.name}</Button>
          ))}

        </Stack>
      </div>
      <Table className='left-table-body-content' size="small" aria-label="a dense table">
        <TableBody className='table-body-range'>
          {apiarray?.map((row) => (
            <TableRow
              key={row.symbol1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => setActive(row)}
              className={`list-group-item ${active == row && 'active'}`}
            >
              <TableCell component="td" scope="row" onClick={() => {
                navigate(`/exchange/${row.pair_symbol}`)
                pairsSelected(row)
              }} >
                <div class="market-left">
                  <div class="market-left-left"><label>{row.symbol1}</label><button>{row.symbol2}</button></div>
                  {/* <div class="market-left-right"><span>{row.calories}</span></div> */}
                </div>
              </TableCell>
              <TableCell align="right">
                <div class="market-right">
                  {/* <div class="market-right-inner"><label style={{ color: `${row.per >= 0 ? '#23d886' : '#ca492f'} ` }}>{parseFloat(row.per).toFixed(2)}%</label><span>{row.price}</span></div> */}
                  <div class="market-right-inner"><span>{row.symbol1}</span></div>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



