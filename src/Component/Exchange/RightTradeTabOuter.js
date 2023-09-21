import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Web3 from 'web3';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { useParams, useSearchParams } from 'react-router-dom';
import erc20ABI from '../../Web3/Abi/erc20.json'
import consts from '../../Constansts';
import routerAddress from '../../Web3/ContractAddress/routerAddress';
import routeABI from '../../Web3/Abi/routeABI.json'
import Axios from '../../Axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    display: 'flex !important',
    background: '#18222F',
    marginLeft: '0px',
    marginTop: '0px',
    minHeight: 'auto !important',
    '& div': {
      justifyContent: 'space-around !important',
      margin: '0px !important',
      display: 'flex !important',
      width: '100%',
      '& button': {
        width: '50%',
        textAlign: 'center',
        padding: '0.7em',
        fontSize: '12px',
        textTransform: 'none',
      }
    }
  },
  tabpanelcls: {
    marginLeft: '3px',
    '& div': {
      padding: '0px'
    }
  },

  ordertabpanelcls: {
    '& div': {
      padding: '0px !important'
    }
  }

});



export default function RightTradeTabOuter({ pairs, trade }) {
  var WEB = new Web3(window.ethereum);

  const [value, setValue] = useState(0);
  const [order, setOrder] = useState(0);
  const [data, setData] = useState();
  const [data1, setData1] = useState();

  const [netw, setNetw] = useState()
  const [bal, setBal] = useState()
  const [bal1, setBal1] = useState()

  const [buy, setBuy] = useState()
  const [sell, setsell] = useState()
  const [pairss, setPairs] = useState()

  const [origi_Buy, setOrigi_Buy] = useState()
  const [origi_Sell, setOrigi_Sell] = useState()

  const [inibuy, setinibuy] = useState()
  const [inisell, setinisell] = useState()

  const [chain, setchain] = useState()

  const [adFee, setAdFee] = useState()
  const [adminFeess, setAdminFee] = useState()
  const [adminFeesssell, setAdFeesell] = useState()


  let { token } = useParams();

  const routeInstance = new WEB.eth.Contract(
    routeABI,
    routerAddress
  );
  const calls = async () => {
    const chainid = await WEB.eth.getChainId()
    setchain(chainid, "id")
  }
  useEffect(() => {
    calls()
  }, [])

  const adminFee = async () => {
    try {
      const { data } = await Axios.get(`/admin/getAdminFee`)
      setAdminFee(data.result)
    } catch (error) {
    }
  }

  useEffect(() => {
    adminFee()
  }, [])


  // const balance = async () => {
  //   const addressArray = await window.ethereum.request({
  //     method: "eth_requestAccounts"
  //   });
  //   const balance = await WEB.eth.getBalance(`${addressArray}`)
  //   const bal = await WEB.utils.fromWei(balance, 'ether');
  //   const cha = await WEB.eth.getChainId()
  //   setBal(bal)
  //   setData(bal)
  //   const chain = cha.toString()
  // }

  // useEffect(() => {
  //   balance()
  // }, [])

  const calc_balance = async (pair) => {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const ERC20Instance = new WEB.eth.Contract(
        erc20ABI,
        pair.address1
      );
      const ERC20Instance1 = new WEB.eth.Contract(
        erc20ABI,
        pair.address2
      );
      const bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
      setBal(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))
      setData(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))

      const bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
      setBal1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
      setData1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))

      const routeInstance = new WEB.eth.Contract(
        routeABI,
        routerAddress
      );
      const bal3 = parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6)
      const bal4 = parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6)
      const am = await WEB.utils.toWei(bal3, 'ether')
      const am1 = await WEB.utils.toWei(bal4, 'ether')

      const amou1 = await routeInstance.methods.getAmountsOut(am, [`${pair.address1}`, `${pair.address2}`]).call()
      const amou2 = await routeInstance.methods.getAmountsOut(am1, [`${pair.address2}`, `${pair.address1}`]).call()

      const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
      setAdFee(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))

      const val1 = ((Number(adminFeess?.Percentage) * parseInt(amou2[1])) / 100)
      setAdFeesell(parseFloat(await WEB.utils.fromWei(val1, 'ether')).toFixed(2))

      setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
      setOrigi_Buy(amou1[1])
      setsell(parseFloat(await WEB.utils.fromWei(parseInt(amou2[1]) - val1, 'ether')).toFixed(6))
      setOrigi_Sell(amou2[1])
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (chain === 999n) {
      if (pairs !== undefined) {
        calc_balance(pairs)
        setPairs(pairs)
      }
    } else {
      if (pairs !== undefined) {
        setPairs(pairs)
      }
    }
  }, [pairs, chain])

  const initial_bal = async () => {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const ERC20Instance = new WEB.eth.Contract(
        erc20ABI,
        consts.address1
      );

      const ERC20Instance1 = new WEB.eth.Contract(
        erc20ABI,
        consts.address2
      );
      const bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
      setBal(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))
      setData(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))

      const bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
      setBal1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
      setData1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
      const bal3 = parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6)
      const bal4 = parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6)

      const routeInstance = new WEB.eth.Contract(
        routeABI,
        routerAddress
      );
      const am = await WEB.utils.toWei(bal3, 'ether')
      const am1 = await WEB.utils.toWei(bal4, 'ether')

      const amou1 = await routeInstance.methods.getAmountsOut(am, [`${consts.address1}`, `${consts.address2}`]).call()
      const amou2 = await routeInstance.methods.getAmountsOut(am1, [`${consts.address2}`, `${consts.address1}`]).call()

      const initialbuy = await routeInstance.methods.getAmountsOut(await WEB.utils.toWei(1, 'ether'), [`${consts.address2}`, `${consts.address1}`]).call()
      const initialsell = await routeInstance.methods.getAmountsOut(await WEB.utils.toWei(1, 'ether'), [`${consts.address1}`, `${consts.address2}`]).call()

      setinibuy(parseFloat(await WEB.utils.fromWei(initialbuy[1], 'ether')).toFixed(6))
      setinisell(parseFloat(await WEB.utils.fromWei(initialsell[1], 'ether')).toFixed(6))

      const val = ((Number(adminFeess?.Percentage) * parseInt(initialbuy[1])) / 100)
      setAdFee(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))

      const val1 = ((Number(adminFeess?.Percentage) * parseInt(initialsell[1])) / 100)
      setAdFeesell(parseFloat(await WEB.utils.fromWei(val1, 'ether')).toFixed(2))

      setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
      setOrigi_Buy(amou1[1])
      setsell(parseFloat(await WEB.utils.fromWei(parseInt(amou2[1]) - val1, 'ether')).toFixed(6))
      setOrigi_Sell(amou2[1])
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (chain === 999n) {
      initial_bal()
    }
  }, [chain])

  const handleSliderChange = async (event, data) => {
    const bs = parseFloat(bal).toFixed(2)
    const da = data / 100 * bs
    parseFloat()
    setData(parseFloat(da).toFixed(6));
  };

  const sliderChanges = async () => {
    try {
      if (chain === 999n) {
        const routeInstance = new WEB.eth.Contract(
          routeABI,
          routerAddress
        );
        // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)
        if (Number(data) !== 0) {
          const am = await WEB.utils.toWei(data, 'ether')
          var amou1;
          if (pairss !== undefined) {
            amou1 = await routeInstance.methods.getAmountsOut(am, [`${pairss.address1}`, `${pairss.address2}`]).call()
          } else {
            amou1 = await routeInstance.methods.getAmountsOut(am, [`${consts.address1}`, `${consts.address2}`]).call()
          }
          setOrigi_Buy(amou1[1])
          const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
          setAdFeesell(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
          setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
        } else {
          setBuy(0)
        }
      }
    } catch (error) {
      console.log(error)
    }

  }

  const sliderChanges1 = async () => {
    try {
      if (chain === 999n) {
        const routeInstance = new WEB.eth.Contract(
          routeABI,
          routerAddress
        );
        // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)
        if (Number(data1) !== 0) {
          const am = await WEB.utils.toWei(data1, 'ether')
          var amou1;
          if (pairss !== undefined) {
            amou1 = await routeInstance.methods.getAmountsOut(am, [`${pairss.address2}`, `${pairss.address1}`]).call()
          } else {
            amou1 = await routeInstance.methods.getAmountsOut(am, [`${consts.address2}`, `${consts.address1}`]).call()
          }
          setOrigi_Sell(amou1[1])
          const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
          setAdFee(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
          setsell(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
        } else {
          setsell(0)
        }
      }

    } catch (error) {
      console.log(error)
    }


  }

  const handleSliderChange1 = async (event, data) => {
    const bs = parseFloat(bal1).toFixed(2)
    const da = data / 100 * bs
    setData1(parseFloat(da).toFixed(6));
  };
  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeOrder = (event, newValue) => {
    setOrder(newValue);
  };

  const handleSell = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3e7" }],
      });

      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      var address
      var WETHInstancess
      if (pairss !== undefined) {
        address = [`${pairss.address1}`, `${pairss.address2}`]
        WETHInstancess = new WEB.eth.Contract(
          erc20ABI,
          pairss.address1
        );
      } else {
        address = [`${consts.address1}`, `${consts.address2}`]
        WETHInstancess = new WEB.eth.Contract(
          erc20ABI,
          consts.address1
        );
      }
      const bal = await WEB.utils.toWei(data, 'ether');
      const buys = await WEB.utils.toWei(buy, 'ether');
      // swap Tokens
      const approvetoken = await WETHInstancess.methods.approve(routerAddress, bal).send({
        from: account[0]
      })
      const time = new Date()
      time.setMinutes(time.getMinutes() + 5)
      if (approvetoken) {
        const buy = await routeInstance.methods.swapExactTokensForTokens(bal, 100000, address, account[0], Date.parse(time)).send({
          from: account[0]
        })
        if (buy) {
          const createTrade = await Axios.post(`/users/createTrade`, {
            Pair: token,
            Amount: await WEB.utils.fromWei(bal, 'ether'),
            Price: await WEB.utils.fromWei(origi_Buy, 'ether'),
            User_Address: account[0],
            Trade_type: "SELL",
            Trade_At: "exchange",
            Coin_name: token.split('_')[0]
          })
          trade(true)
          toast.success(createTrade?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error('Trade Cancelled', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }

    } catch (error) {
      console.log(error)
    }

  }

  const handleBuy = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3e7" }],
      });

      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      var address
      var WETHInstancess
      if (pairss !== undefined) {
        address = [`${pairss.address2}`, `${pairss.address1}`]
        WETHInstancess = new WEB.eth.Contract(
          erc20ABI,
          pairss.address2
        );
      } else {
        address = [`${consts.address2}`, `${consts.address1}`]
        WETHInstancess = new WEB.eth.Contract(
          erc20ABI,
          consts.address2
        );
      }
      const bal = await WEB.utils.toWei(data1, 'ether');
      const buys = await WEB.utils.toWei(buy, 'ether');
      // swap Tokens
      const approvetoken = await WETHInstancess.methods.approve(routerAddress, bal).send({
        from: account[0]
      })
      const time = new Date()
      time.setMinutes(time.getMinutes() + 5)
      if (approvetoken) {
        const buyss = await routeInstance.methods.swapExactTokensForTokens(bal, 1000000, address, account[0], Date.parse(time)).send({
          from: account[0]
        })
        if (buyss) {
          const createTrade = await Axios.post(`/users/createTrade`, {
            Pair: token,
            Amount: await WEB.utils.fromWei(bal, 'ether'),
            Price: await WEB.utils.fromWei(origi_Sell, 'ether'),
            User_Address: account[0],
            Trade_type: "BUY",
            Trade_At: "exchange",
            Coin_name: token.split('_')[1]
          })
          trade("sell")
          toast.success(createTrade?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error('Trade Cancelled', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }


    } catch (error) {
      console.log(error)
    }

  }

  const classes = useStyles();

  return (
    <>
      <ToastContainer />

      <div className='sell-buy-trade'>
        <h4 className='sell-buy-trade-head'>Trade Now</h4>
        <Box sx={{ width: '100%' }}>
          <Box className='tabcoinsleftcontain' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs id='buy-sell-tab' className={classes.tabcoinsleft} value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab className='buy-tab' label="Buy" {...a11yProps(0)} />
              <Tab className='sell-tab' label="Sell" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0} className={classes.tabpanelcls}>
            <div className='price-buy-input'><span>Price</span><input value={inibuy} type='text' /><span>{token?.split('_')[0]}</span></div>
            <div className='price-buy-input amount-buy-input'><span>Amount</span>


              <input id="rangeInput" type='number' value={parseFloat(data1).toFixed(6)} oninput="myRange.value=amount.value" onChange={handleInputChange} /><span>{token?.split('_')[1]}</span></div>

            <Slider defaultValue={100} value={data1} onChange={handleSliderChange1} onChangeCommitted={() => { sliderChanges1() }} aria-label="Default" />

            <div className='price-buy-input total-buy-input'><span>Total Price</span><input value={sell} type='text' /><span>{token?.split('_')[0]}</span></div>
            <div className='admin-fee-outer' ><span>Admin Fee  </span><span>  {adFee}</span></div>

            <Button variant="contained" className='Buy-BTC-button' onClick={handleBuy} >Buy {token?.split('_')[0]}</Button>
          </TabPanel>
          <TabPanel value={value} index={1} className={classes.tabpanelcls}>
            <div className='price-buy-input'><span>Price</span><input value={inisell} type='text' /><span>{token?.split('_')[1]}</span></div>
            <div className='price-buy-input amount-buy-input'><span>Amount</span>

              <input id="rangeInput" value={parseFloat(data).toFixed(6)} type='number' onChange={(e) => { setData1(e.target.value) }} /><span>{token?.split('_')[0]}</span></div>

            <Slider defaultValue={100} value={data} onChange={handleSliderChange} onChangeCommitted={() => { sliderChanges() }} aria-label="Default" />

            <div className='price-buy-input total-buy-input'><span>Price</span><input value={buy} type='text' /><span>{token?.split('_')[1]}</span></div>
            <div className='admin-fee-outer' ><span>Admin Fee  </span><span>  {adminFeesssell}</span></div>
            <Button variant="contained" className='Buy-BTC-button sell-btn' onClick={handleSell} >Sell {token?.split('_')[0]}</Button>
          </TabPanel>
        </Box>
      </div>

      {/* <div className='sell-buy-trade my-order-items'>
        <div className='my-order-inner'>
          <h4 className='sell-buy-trade-head my-order-head'>My Orders</h4>
          <Box className='my-order-tab-head' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs id='buy-sell-all-tab' className='buy-sell-all-tab-cls' value={order} onChange={handleChangeOrder} aria-label="basic tabs example">
              <Tab className='sell-tab' label="Sell" {...a11yProps(0)} />
              <Tab className='buy-tab' label="Buy" {...a11yProps(1)} />
              <Tab className='all-tab' label="All" {...a11yProps(2)} />
            </Tabs>
          </Box>
        </div>
        <div className='my-order-content'>
          <TabPanel value={order} index={0} className={classes.ordertabpanelcls}>
            <div className='my-order-list'>
              <div className='order-timing'>10:46</div>
              <div className='order-rise'>27,102.80</div>
              <div className='order-qty'>0.0015</div>
              <div className='delete-order'><HighlightOffIcon /></div>
            </div>
          </TabPanel>
        </div>
      </div> */}

    </>
  );
}