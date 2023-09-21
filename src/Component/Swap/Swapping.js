import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import swapp from '../../images/swapping.png'
import swaprate from '../../images/swaprate.png'
import Button from '@mui/material/Button';
import './Swap.css'
import coinswapimg from '../../images/coinswapimg.png'

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import coins1 from '../../images/coins-1.png'
import coins2 from '../../images/coins-2.png'
import coins3 from '../../images/coins-3.png'
import coins4 from '../../images/coins-4.png'
import coins5 from '../../images/coins-5.png'
import coins6 from '../../images/coins-6.png'
import Web3 from "web3";
import { Link } from 'react-router-dom'

import factoryABI from '../../Web3/Abi/factoryAbi.json'
import factoryAddress from '../../Web3/ContractAddress/factoryAddress'

import routerAddress from '../../Web3/ContractAddress/routerAddress';
import routeABI from '../../Web3/Abi/routeABI.json'

import wethAddress from '../../Web3/ContractAddress/wethAddress';
import xrpAddress from '../../Web3/ContractAddress/xrpAddress';
import erc20ABI from '../../Web3/Abi/erc20.json'

import Axios from '../../Axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../../images/loader1.gif'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

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
    justifyContent: 'space-between !important',
    minHeight: '46px !important',
    width: '100% !important',
    padding: '0px !important',
    '& input': {
      width: '100% !important',
      padding: '0px !important',
      color: '#787E87 !important'
    },
    '& >div': {
      width: '100% !important',
      justifyContent: 'space-between !important',
      display: 'flex',
      alignItems: 'center !important',
      marginLeft: '0px !important',
      background: '#373C3E',
      borderRadius: '9px',
      padding: '10px',
      marginTop: '15px',
      '& svg': {
        color: '#787E87 !important'
      }
    }
  },
  modaltokenlist: {
    background: '#292A2B !important',
    border: '1px solid #373C3E !important',
    borderRadius: '9px !important',
  }

});


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


var web3 = new Web3(window.ethereum);
const Swapping = () => {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openNew, setOpenNew] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenNew = () => setOpenNew(true);
  const handleCloseNew = () => setOpenNew(false);

  const [uppertoken, setUppertoken] = useState("Tokens")
  const [lowertoken, setLowertoken] = useState("Tokens")

  const [upperValue, setUpperValue] = useState("")
  const [lowerValue, setLowerValue] = useState("")

  const [originalUpVal, setOriginalUpVal] = useState()
  const [originalDownVal, setOriginalDownVal] = useState()

  const [upperBalance, setUpperBalance] = useState("0")
  const [lowerBalance, setLowerBalance] = useState("0")

  const [tokenAdd1, setTokenAdd1] = useState('')
  const [tokenAdd2, setTokenAdd2] = useState('')

  const [loading, setLoading] = useState(false)


  const [token1, settoken1] = useState([])
  const [token2, settoken2] = useState([])

  const [swap, setSwap] = useState(false)

  const [adminFeess, setAdminFee] = useState()

  const [adFee, setAdFee] = useState()

  const factoryInstance = new web3.eth.Contract(
    factoryABI,
    factoryAddress
  );

  const routeInstance = new web3.eth.Contract(
    routeABI,
    routerAddress
  );

  const WETHInstance = new web3.eth.Contract(
    erc20ABI,
    wethAddress
  );

  const XRPInstance = new web3.eth.Contract(
    erc20ABI,
    xrpAddress
  );

  const getAssets = async () => {
    try {
      const { data } = await Axios.get(`/admin/getAssetsPair`)
      const temp = []
      const datas = []
      for (let i = 0; i < data?.result?.length; i++) {
        const dt = data?.result[i]
        if (!temp.includes(dt?.symbol1)) {
          temp.push(dt?.symbol1)
          datas.push(dt)
        }
      }
      settoken1(datas)
    } catch (error) {
      console.log(error)
    }
  }

  const adminFee = async () => {
    try {
      const { data } = await Axios.get(`/admin/getAdminFee`)
      setAdminFee(data.result)
    } catch (error) {
      console.log(error)
    }
  }

  const lowertokens = async (item) => {
    try {
      const { data } = await Axios.post(`/admin/getAssetsByName`, { name: item?.symbol1 })
      setLowertoken("Tokens")
      settoken2(data?.result)
      setLowerValue("0")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAssets()
    adminFee()
  }, [])


  const onSubmit = async () => {

    // Creating Asset Pair ----------------------------------------------------------------
    // const bal = await factoryInstance.methods.createPair(wethAddress, xrpAddress).send({ from: account[0] })

    //add liquidity -----------------------------------------------------------
    // appprove tokens
    // const app1 = await WETHInstance.methods.approve(routerAddress, 500).send({ from: account[0] })
    // console.log(app1, "app")
    // const app2 = await XRPInstance.methods.approve(routerAddress, 500).send({ from: account[0] })
    // console.log(app2, "app")
    // try {
    //   const one = await web3.utils.toWei(500, 'ether');
    //   const two = await web3.utils.toWei(250, 'ether');
    //   const bal = await routeInstance.methods.addLiquidity(wethAddress, xrpAddress, one, one, two, two, account[0], 1687515781000).send({ from: account[0] })
    //   console.log(bal, "acc")
    // } catch (error) {
    //   console.log(error, "err")
    // }
    try {
      if (tokenAdd1 === "" || tokenAdd2 === "") {
        toast.error('  Please Select Coin', {
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
        if (upperValue !== "" && lowerValue !== "") {
          setLoading(true)
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x3e7" }],
          });

          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          var address = [`${tokenAdd1}`, `${tokenAdd2}`]
          const bal = await web3.utils.toWei(upperValue, 'ether');
          // swap Tokens

          const WETHInstancess = new web3.eth.Contract(
            erc20ABI,
            tokenAdd1
          );

          const approvetoken = await WETHInstancess.methods.approve(routerAddress, bal).send({
            from: account[0]
          })
          const time = new Date()
          time.setMinutes(time.getMinutes() + 5)
          // console.log(time, 'time')
          // console.log(Date.parse(time), "timestamp")
          if (approvetoken) {
            const val = ((Number(adminFeess?.Percentage) * parseInt(originalDownVal)) / 100)
            await routeInstance.methods.swapExactTokensForTokens(bal, 100, address, account[0], Date.parse(time)).send({
              from: account[0]
            })
            const createTrade = await Axios.post(`/users/createTrade`, {
              Pair: `${uppertoken}_${lowertoken}`,
              Amount: upperValue,
              Price: lowerValue,
              User_Address: account[0],
              Trade_type: "BUY",
              Trade_At: "swap",
              Coin_name: lowertoken
            })
            toast.success("Token Swap Successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setUpperValue("")
            setLowerValue("")
            getBalance(tokenAdd1, "up")
            getBalance(tokenAdd2, "")
            setLoading(false)
          } else {
            setLoading(false)
            toast.error('Token Approve Error', {
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
        } else {
          toast.error(' Please Enter Amount', {
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
      setLoading(false)
      toast.error('Transaction Cancelled', {
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

  const getBalance = async (address, type, check) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3e7" }],
      });
      const WETHInstances = new web3.eth.Contract(
        erc20ABI,
        address
      );
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (type === "up") {
        const bal1 = await WETHInstances.methods.balanceOf(account[0]).call({ from: account[0] })
        setUpperBalance(parseFloat(await web3.utils.fromWei(bal1, 'ether')).toFixed(2))
      } else {
        const bal2 = await WETHInstances.methods.balanceOf(account[0]).call({ from: account[0] })
        setLowerBalance(parseFloat(await web3.utils.fromWei(bal2, 'ether')).toFixed(2))
      }
      if (check === "check" && upperValue !== "") {
        upperChange(upperValue, address)
      }
    } catch (error) {
      console.log(error)
    }


  }

  const upperChange = async (e, address) => {
    try {
      setUpperValue(e)
      const routeInstance = new web3.eth.Contract(
        routeABI,
        routerAddress
      );
      const am = await web3.utils.toWei(e, 'ether')
      if (am !== "0" && tokenAdd1 !== "" && (tokenAdd2 !== "" || address !== "")) {
        var amou;
        if (address !== "") {
          amou = await routeInstance.methods.getAmountsOut(am, [`${tokenAdd1}`, `${address}`]).call()
        } else {
          amou = await routeInstance.methods.getAmountsOut(am, [`${tokenAdd1}`, `${tokenAdd2}`]).call()
        }

        setOriginalDownVal(amou[1])
        const val = ((Number(adminFeess?.Percentage) * parseInt(amou[1])) / 100)
        setAdFee(parseFloat(await web3.utils.fromWei(val, 'ether')).toFixed(2))
        setLowerValue(parseFloat(await web3.utils.fromWei(parseInt(amou[1]) - val, 'ether')).toFixed(2))
      } else {
        setLowerValue("0")
      }
    } catch (error) {
      console.log(error)
    }

  }

  const lowerChange = async (e) => {
    setLowerValue(e)
  }

  const swapChange = async () => {
    setSwap(!swap)
  }
  const swapChangesss = async (status) => {
    if (status === true) {
      const token1 = uppertoken
      const token2 = lowertoken
      const val1 = upperValue
      const val2 = lowerValue
      const bal1 = upperBalance
      const bal2 = lowerBalance
      const add1 = tokenAdd1
      const add2 = tokenAdd2
      setUppertoken(token2)
      setLowertoken(token1)
      setUpperValue("")
      setLowerValue("")
      setUpperBalance(bal2)
      setLowerBalance(bal1)
      setTokenAdd1(add2)
      setTokenAdd2(add1)
    } else {
      const token1 = uppertoken
      const token2 = lowertoken
      const val1 = upperValue
      const val2 = lowerValue
      const bal1 = upperBalance
      const bal2 = lowerBalance
      const add1 = tokenAdd1
      const add2 = tokenAdd2
      setUppertoken(token2)
      setLowertoken(token1)
      setUpperValue("")
      setLowerValue("")
      setUpperBalance(bal2)
      setLowerBalance(bal1)
      setTokenAdd1(add2)
      setTokenAdd2(add1)
    }
  }

  useEffect(() => {
    if (swap === true) {
      swapChangesss(true)
    } else {
      swapChangesss(false)
    }
  }, [swap])

  return (
    <>
      {
        loading === true ? <div className='swap-loader'><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div> : <></>
      }
      <div className='swapping'>
        <ToastContainer />


        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <div className='swapp-img'><div className='swapp-img-inner'><img src={swapp} /></div>Swap</div>
            <p className='swap-para'>Swap and save: Get the best exchange rates with Zebra's Swap feature</p>
          </Grid>
          <Grid className='grid-swap-outer'>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='swap-token'>
              <Grid container spacing={0} className={classes.gridinput}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}><input type='Number' onChange={(e) => { upperChange(e.target.value, "") }} value={upperValue} /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Button className='token-button-link' onClick={handleOpenNew} >{uppertoken}<span className='arrow-btn-token' ><KeyboardArrowUpIcon /><KeyboardArrowDownIcon /></span></Button>
                  <Modal
                    open={openNew}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style} className={classes.modaltokenlist}>

                      <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}><h3 className='select-token-head-modal'>Select a Token</h3></Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}><span className='select-token-head-modal-close' onClick={handleCloseNew}><HighlightOffIcon /></span></Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Toolbar className={classes.toolbarsearch}>
                            <Search>
                              <StyledInputBase
                                placeholder="Search by name or paste address"
                                inputProps={{ 'aria-label': 'search' }}
                              />
                              <SearchIcon />
                            </Search>
                          </Toolbar>
                        </Grid>
                      </Grid>
                      <nav className='coin-modal-list'>

                        {
                          token1?.map((item, index) => {
                            return (
                              <li key={index} onClick={() => { setUppertoken(item?.symbol1); setTokenAdd1(item?.address1); lowertokens(item); handleCloseNew(); getBalance(item?.address1, "up") }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'  >{item?.symbol1}</span></Link></li>
                            )
                          })
                        }

                      </nav>
                    </Box>
                  </Modal>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><span className='dollar-value'>{upperBalance}</span></Grid>
              </Grid>

            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='swap-token'>
              <div className='coinswapimg'><img src={coinswapimg} onClick={swapChange} /></div>
              <Grid container spacing={0} className={classes.gridinput}>
                <Grid item xs={12} sm={12} md={12} lg={8} xl={8}><input type='Number' onChange={(e) => { lowerChange(e) }} value={lowerValue} /></Grid>
                <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                  <Button className='token-button-link' onClick={handleOpen} >{lowertoken}<span className='arrow-btn-token'><KeyboardArrowUpIcon /><KeyboardArrowDownIcon /></span></Button>

                  <Modal

                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"

                  >
                    <Box sx={style} className={classes.modaltokenlist}>

                      <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}><h3 className='select-token-head-modal'>Select a Token</h3></Grid>
                        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}><span className='select-token-head-modal-close' onClick={handleClose}><HighlightOffIcon /></span></Grid>
                      </Grid>

                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                          <Toolbar className={classes.toolbarsearch}>
                            <Search>

                              <StyledInputBase
                                placeholder="Search by name or paste address"
                                inputProps={{ 'aria-label': 'search' }}
                              />
                              <SearchIcon />
                            </Search>
                          </Toolbar>
                        </Grid>
                      </Grid>


                      <nav className='coin-modal-list'>

                        {
                          token2?.map((item, index) => {
                            return (
                              <li key={index} onClick={() => { setLowertoken(item?.symbol2); setTokenAdd2(item?.address2); handleClose(); getBalance(item?.address2, "down", "check") }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'  >{item?.symbol2}</span></Link></li>
                            )
                          })
                        }
                        {/* <li onClick={() => { setLowertoken("XRP"); handleClose() }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'>XRP</span></Link></li> */}
                      </nav>
                    </Box>
                  </Modal>

                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='dollar-value-with-percent'><span className='dollar-value'>{lowerBalance}</span><span className='dollar-value-percentage'>(0.3%)</span></div></Grid>
              </Grid>
              <Grid container spacing={0} className={classes.gridinput}>
                <div className='block-chain-swap'><span>Admin Fee</span><span>{adFee}</span></div>
                <div className='overall-swap-rate'>
                  <div className='block-chain-swap'><span>1 ETH = 1,794.90 USDT</span><span>($1,800.48)</span></div>
                  <div className='swaping-rate-block-chain'><img src={swaprate} /><span>$7.78</span></div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Button variant="contained" className='Swap-Coins' onClick={onSubmit} >Swap Coins</Button></Grid>
          </Grid>
        </Grid>

      </div>
    </>


  )
}

export default Swapping
