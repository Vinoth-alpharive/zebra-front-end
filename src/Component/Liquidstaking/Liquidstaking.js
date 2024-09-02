import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
// import { styled } from '@mui/material/styles';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import './Liquidstaking.css'
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TextField from '@mui/material/TextField';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ethimg from '../../images/coin-4-2.png'
import Axios from '../../Axios';
import Toolbar from '@mui/material/Toolbar';
import stakingimg from '../../images/stakingimg.png'
import Web3, { ConnectionCloseError } from 'web3';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import erc20ABI from '../../Web3/Abi/erc20.json'
import farmingAbi from '../../Web3/Abi/stakingAbi.json'
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import coinone from '../../images/coins-1.png'
import cointwo from '../../images/coins-2.png'
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Popper } from '@mui/base/Popper';
import { selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import chainLists1 from '../../chainList.json'
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import loader from '../../images/loader1.gif'
import coins1 from '../../images/coins-1.png'
import coins2 from '../../images/coins-2.png'
import coins3 from '../../images/coins-3.png'
import coins4 from '../../images/coins-4.png'
import coins5 from '../../images/coins-5.png'
import coins6 from '../../images/coins-6.png'

import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({
  sidebarcls: {
    background: '#010712 !important',
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    overflow: 'hidden',
    position: 'relative'
  },
  headercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: 'transparent !important',
    borderBottom: '1px solid #373c3e',
    '@media (max-width: 991.98px)': {
      padding: '20px 10px !important',
    }
  },
  coinsblock: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '20px 55px !important',
    background: 'transparent !important',
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
    }
  },
  footercls: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    padding: '30px 55px !important',
    backgroundImage: `url(${footerbg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginTop: '20px',
    '& nav': {
      '& li': {
        '& a': {
          color: '#C0C9D0 !important'
        }
      }
    },
    '@media (max-width: 991.98px)': {
      padding: '20px !important',
    }
  },

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


const Liquidstaking = () => {
  useEffect(() => {
    document.title = "Zebra Exchange | Stake"
  }, [])


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [web3link, setWeb3Link] = useState(window.ethereum)
  const newWeb = new Web3(window.ethereum)
  const [selecId, setSelecId] = useState()
  var WEB = new Web3(web3link);
  const classes = useStyles();
  const [liquidity, setLiquidity] = useState('');
  const [proceed, setProceed] = useState(false);
  const [pairs, setpairs] = useState([])
  const [balance, setbalance] = useState()
  const [balance1, setbalance1] = useState()
  const [dis, setDis] = useState(true)

  const [his, sethis] = useState()

  const [selct, setSelct] = useState()

  const firstValue = useRef()
  const [newval, setNewVal] = useState()
  const [newval1, setNewVal1] = useState()


  const handleOpenProceed = () => {
    if (selct == '') {
      toast.error("Please Select Pair")
    } else {
      setProceed(true)
    }
  }

  useEffect(() => {
    getBalance()
  }, [selct])

  const handleCloseProceed = () => {
    setNewVal()
    setProceed(false)
    stakingHistory()
  }
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const slots = {
      root: StyledButton,
      listbox: StyledListbox,
      popper: StyledPopper,
      ...props.slots,
    };

    return <Select {...props} ref={ref} slots={slots} />;
  });

  const StyledButton = styled('button')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-width: 320px;
    padding: 8px 12px;
    border-radius: 8px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
      };
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
    }
  
    &.${selectClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `,
  );

  const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
  };

  const StyledListbox = styled('ul')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
      };
    `,
  );

  const StyledPopper = styled(Popper)`
  z-index: 1;
`;

  const grey = {
    50: '#f6f8fa',
    100: '#eaeef2',
    200: '#d0d7de',
    300: '#afb8c1',
    400: '#8c959f',
    500: '#6e7781',
    600: '#57606a',
    700: '#424a53',
    800: '#32383f',
    900: '#24292f',
  };


  const [network, setNetwork] = useState([])
  const [selectedChain, setSelectedChain] = useState()
  const [chainId, setChainId] = useState()
  const [selectchainfull, setselectchainfull] = useState()

  const [selecnet, setSelcNet] = useState()

  const [browserChain, setbrowserChain] = useState()
  const [chainidcheck, setChainidcheck] = useState(false)

  const [loading, setLoading] = useState(false)

  const [selecIdBal, setSelecIdBal] = useState()
  const [selecBal, setSelecBal] = useState()


  const chainLists = async () => {
    try {
      const { data } = await Axios.get(`/admin/getNetwork`)
      setNetwork(data?.result)
      setSelectedChain(data?.result[0]?._id)
      setChainId(data?.result[0]?.chainId)
      setSelcNet(data?.result[0]?.name)
      setselectchainfull(data?.result[0])
    } catch (error) {
      console.log(error, "err")
    }
  }

  useEffect(() => {
    chainLists()
  }, [])

  const sortby = (event) => {
    setLiquidity(event.target.value);
  };

  const sortby1 = (event) => {
    setSelcNet(event.target.value);
  };

  const selc = async (item) => {
    setWeb3Link(item?.Network?.rpc_Url)
    setSelecId(item?.Network?.chainId)
    setSelct(item)
    calc1(item)
  }

  const check = async (pairs1) => {
    try {
      setSelecBal(0)
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const webs = new Web3(pairs1?.Network?.rpc_Url)
      // for (let i = 0; i < pairs1?.length; i++) {
      const routeInstance = new webs.eth.Contract(
        farmingAbi,
        pairs1?.Trade_id?.contractAddress
      );
      const userInfo = await routeInstance.methods.userInfo(Number(pairs1?.Trade_id?.ID), address[0]).call()
      const al = await webs.utils.fromWei(userInfo.amount, 'ether')
      if (Number(al) > 0) {
        const pendingrews = await routeInstance.methods.pendingReward(pairs1?.Trade_id?.ID, address[0]).call()
        setSelecBal(Number(await webs.utils.fromWei(pendingrews, 'ether')).toFixed(8))
        // $('.item_' + i).html('<span >' + Number(await webs.utils.fromWei(pendingrews, 'ether')).toFixed(8) + '</span>');

        // setInterval(async () => {

        //   const pendingrew = await routeInstance.methods.pendingReward(pairs1[i]?.Trade_id?.ID, address[0]).call()
        //   $('.name_' + i).html('<span >' + Number(await webs.utils.fromWei(pendingrew, 'ether')).toFixed(8) + '</span>');
        // }, 300000);
      }
      // }
    } catch (error) {
      console.log(error, "error")
    }


  }

  const getpairs = async (id) => {
    try {
      const { data } = await Axios.post(`/admin/getstakingPairs`, { _id: "all" })
      setpairs([])
      if (data?.result?.length > 0) {
        setpairs(data?.result)
        // setSelct(data?.result[0])
        calc1(data?.result[0])
        setLiquidity(`${data?.result[0]?.LP_Token_Symbol}/${data?.result[0]?.Reward_Token_Symbol}`)
      } else {
        setSelct('')
        setpairs()
        setLiquidity()
        setNewVal1(0)
      }
    } catch (error) {
      console.log("🚀 error:", error)
    }
  }

  useEffect(() => {
    if (selectedChain) {
      getpairs(selectedChain)
      stakingHistory()
      // check()
    }
  }, [selectedChain])

  const getBalance = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new WEB.eth.Contract(
        erc20ABI,
        selct?.LP_Token
      );
      const routeInstance1 = new WEB.eth.Contract(
        erc20ABI,
        selct?.Reward_Token
      );
      const bal = await routeInstance.methods.balanceOf(address[0]).call()
      const deci = await routeInstance.methods.decimals().call()
      setbalance(parseFloat(Number(bal) / (10 ** Number(deci))).toFixed(2))
      if (parseFloat(Number(bal) / (10 ** Number(deci))).toFixed(2) > 0) {
        setDis(false)
      }
      const bal1 = await routeInstance1.methods.balanceOf(address[0]).call()
      const deci1 = await routeInstance1.methods.decimals().call()
      setbalance1(parseFloat(Number(bal1) / (10 ** Number(deci1))).toFixed(2))
    } catch (error) {
      console.log(error)
    }

  }

  const stakingHistory = async () => {
    const address = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const { data } = await Axios.post(`/auth/stakingHistory`, {
      address: address[0],
      // _id: selectedChain
    })
    if (data?.success === true) {
      data?.result?.forEach(element => {
        const dat = new Date(element?.createdAt).getTime()
        element.lockPeriod = (Number(dat) + (Number(element?.Trade_id?.Lock_Period * 1000)))
        const date = new Date(element.lockPeriod)
        element.lock = date.toLocaleDateString('en-US')
        if (element.lockPeriod > Date.now()) {
          element.status = true
        } else {
          element.status = false
        }
      });
      // check(data?.result)
      sethis(data?.result)
    }
  }
  useEffect(() => {
    getpairs()
    stakingHistory()
  }, [])

  const calc1 = async (val) => {
    const va = val?.Lock_Period * await WEB.utils.fromWei(val?.Reward_Per_Sec, "ether") * 1
    setNewVal1(va)
  }

  const calc = async (val) => {
    if (val > 0) {
      const va = selct?.Lock_Period * await WEB.utils.fromWei(selct?.Reward_Per_Sec, "ether") * val
      setNewVal(va)
    } else {
      setNewVal()
    }
  }

  const onSubmit = async () => {
    try {
      if ((firstValue.current.value == 0 || firstValue.current.value == '')) {
        toast.error("Please Enter Amount", {
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
        setLoading(true)

        var test = await newWeb.eth.getChainId()
        var testResult = '';
        if (Number(test) == Number(selecId)) {
          testResult = "approve"
        } else {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: newWeb.utils.toHex(selecId) }]
          })
          testResult = "approve"
        }
        if (testResult != " ") {
          const address = await window.ethereum.request({
            method: "eth_requestAccounts"
          });
          const routeInstance = new newWeb.eth.Contract(
            farmingAbi,
            selct?.contractAddress
          );
          const routeInstances = new newWeb.eth.Contract(
            erc20ABI,
            selct?.LP_Token
          );
          const deci = await routeInstances.methods.decimals().call()
          const allowance = await routeInstances.methods.allowance(address[0], selct?.contractAddress).call()
          var approves
          if (Number(allowance) >= Number(firstValue.current.value) * (10 ** Number(deci))) {
            approves = "approve"
          } else {
            approves = await routeInstances.methods.approve(selct?.contractAddress, Number(firstValue.current.value) * (10 ** Number(deci))).send({ from: address[0] })

          }
          if (approves) {
            const deposite = await routeInstance.methods.deposit(0, (Number(firstValue.current.value) * (10 ** Number(deci)))).send({
              from: address[0]
            })
            if (deposite) {
              const save = await Axios.post(`/users/createTrade`, {
                Pair: `${selct?.LP_Token_Symbol}_${selct?.Reward_Token_Symbol}`,
                amount: firstValue.current.value,
                Amount: firstValue.current.value,
                Price: "0",
                User_Address: address[0],
                Trade_type: "staked",
                Trade_At: "Staking",
                Coin_name: `${selct?.LP_Token_Symbol}`,
                Trade_id: selct._id
              })
              if (save?.data?.success === true) {
                setProceed(false)
                getpairs()
                stakingHistory()
                toast.success("Successfully Staked", {
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
                toast.error("SomeThing Went Wrong", {
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
            setLoading(false)
          } else {
            setLoading(false)
            toast.error("Transaction Cancelled", {
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
          toast.error("Network Change Error", {
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
      setLoading(false)
      console.log(error)
    }
  }

  const unStakes = async (element) => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new WEB.eth.Contract(
        farmingAbi,
        element?.Trade_id?.contractAddress
      );
      const userInfo = await routeInstance.methods.userInfo(element?.Trade_id?.ID, address[0]).call()
      // const al = await WEB.utils.fromWei(userInfo.amount, 'ether')
      const withdraw = await routeInstance.methods.withdraw(element?.Trade_id?.ID, userInfo.amount).send({ from: address[0] })
      if (withdraw) {
        await Axios.post(`/users/createTrade`, {
          Pair: element?.Pair,
          amount: userInfo.amount,
          Amount: await WEB.utils.toWei(userInfo.amount, 'ether'),
          Price: "0",
          User_Address: address[0],
          Trade_type: "unstaked",
          Trade_At: "Staking",
          Coin_name: element?.Coin_name
        })
        stakingHistory()
        toast.success("Un Staked SuccessFully", {
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
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeNetwork = async (chainIds) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: WEB.utils.toHex(chainIds) }]
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        var data;


        // console.log(chainLists1, "chainlist")

        for (let i = 0; i < chainLists1.length; i++) {
          const element = chainLists1[i];
          if (element?.chainId === chainId) {
            data = element
          }
        }

        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: data?.chain,
              chainId: WEB.utils.toHex(chainIds),
              nativeCurrency: data?.nativeCurrency,
              rpcUrls: [selectchainfull?.rpc_Url]
            }
          ]
        });
      }
    }
  }

  const getCurrentChainid = async () => {
    try {
      const browserChainId = await WEB.eth.getChainId()
      setbrowserChain(browserChainId)
      if (Number(browserChainId) == chainId) {
        setChainidcheck(true)
      } else {
        setChainidcheck(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        getCurrentChainid()
      })
      // window.ethereum.on('accountsChanged', () => {
      //   window.location.reload();
      // })
    }
  });

  useEffect(() => {
    getCurrentChainid()
  }, [chainId])

  const shows = async (index, item) => {
    setSelecIdBal(index)
    check(item)
  }

  return (

    <>
      {
        loading === true ? <div className='swap-loader'><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div> : <></>
      }

      <div className='swaping-page liquid-staking-main-body'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
              <Item className={classes.headercls}>
                <Header />
              </Item>
            </Grid>

            {/* <div className='sortby first'>
              <Box sx={{ minWidth: 250 }}>
                {
                  selecnet ?
                    <FormControl fullWidth>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select" className='input-field' value={selecnet}
                        onChange={sortby1}
                      >
                        {network && network?.map((item, index) => {
                          return (
                            <MenuItem value={item?.name} key={index} onClick={() => { onChangeNetwork(item?.chainId); setChainId(item?.chainId); setSelectedChain(item?._id) }} >{item?.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </FormControl>
                    :
                    <></>
                }

              </Box>
            </div> */}
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} id="liquid-staking-id" className={proceed ? "liquid-staking-classname" : ""}>
              <Item className={classes.coinsblock}>
                <div className='liquid-staking'>
                  {/* <div className='liquid-staking-first' id={proceed ? "arrowshow" : ""}>
                    {proceed ? <ArrowBackIcon onClick={handleCloseProceed} /> : ""}
                    <div className='heading-title'>
                      <h4>Liquid Staking</h4>
                      <p>Unlock liquidity while earning rewards</p>
                    </div>
                  </div> */}

                  {!proceed &&
                    // <div className='liquid-stake'>
                    //   <div className='heading-title'>
                    //     <h6>CHOOSE A PAIR TO LIQUID STAKE</h6>
                    //     <div className='sortby'>
                    //       <Box sx={{ minWidth: 120 }}>
                    //         <FormControl fullWidth>
                    //           <InputLabel id="demo-simple-select-label" className='demo-input-label'>Select Pair</InputLabel>
                    //           <Select
                    //             labelId="demo-simple-select-label"
                    //             id="demo-simple-select" className='input-field' value={liquidity}
                    //             onChange={sortby}
                    //           >
                    //             {pairs && pairs?.map((item, index) => {
                    //               return (
                    //                 <MenuItem value={`${item?.LP_Token_Symbol}/${item?.Reward_Token_Symbol}`} key={index} onClick={() => selc(item)}>{item?.LP_Token_Symbol}/{item?.Reward_Token_Symbol}</MenuItem>
                    //               )
                    //             })}

                    //           </Select>
                    //         </FormControl>
                    //       </Box>
                    //     </div>
                    //     <div className='xchange-rate'>
                    //       <h4>Exchange Rate</h4>
                    //       <p>1 {`${liquidity?.split('/')[0] ? liquidity?.split('/')[0] : ""}`} = {`${newval1 ? newval1 : "0"}`} {`${liquidity?.split('/')[1] ? liquidity?.split('/')[1] : ""}`}</p>
                    //     </div>

                    //     <div className='xchange-rate'>
                    //       <h4>Est. APR</h4>
                    //       <p>3.946%</p>
                    //     </div>

                    //   </div>

                    //   {
                    //     chainidcheck === true ?
                    //       <div className='proceed-btn'>
                    //         <Button onClick={handleOpenProceed} variant="contained">Proceeds</Button>
                    //       </div> :
                    //       <div className='proceed-btn'>
                    //         <Button onClick={() => { onChangeNetwork(chainId) }} variant="contained">Change Network</Button>
                    //       </div>
                    //   }

                    // </div>
                    <>
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
                                  placeholder="Search for  a token"
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
                              <TableCell className='table-head'>Name</TableCell>
                              <TableCell className='table-head'>Est. APY</TableCell>
                              <TableCell className='table-head'>Reward</TableCell>
                              <TableCell className='table-head'>Time Lock</TableCell>
                              <TableCell className='table-head'>Trade</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pairs?.length > 0 && pairs.map((row, index) => (
                              <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell><div className="img-name"><img src={row?.coinimg} alt={row?.LP_Token_Symbol?.slice(0, 1)} />{row?.LP_Token_Symbol}</div></TableCell>
                                <TableCell><div className='percentage-est'><span className='percentage'>{row?.calories ? row?.calories : 0}</span>%</div></TableCell>
                                <TableCell><div className="img-name"><img src={row?.coinimg} alt={row?.Reward_Token_Symbol?.slice(0, 1)} />{row?.Reward_Token_Symbol}</div></TableCell>
                                <TableCell><div className='days-time'><span>{parseInt(row?.Lock_Period / (60 * 60 * 24))}</span> d</div></TableCell>
                                <TableCell><Button variant="contained" className='stake-button' onClick={() => { selc(row); handleOpenProceed(); }} >Stake</Button></TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </>

                  }
                  {proceed &&

                    < div className='liquid-stake' id="deposit-amount-liquid-staking">
                      <div className='dals-back'><ArrowBackIcon onClick={handleCloseProceed} /></div>
                      <div className='heading-title'>
                        <h6>DEPOSIT AMOUNT</h6>

                        <div className='deposit-amount'>
                          <div className='token-deposit-amount'><div className='token-deposit-amount-left'><label>{selct?.LP_Token_Symbol}</label><ContentCopyIcon /></div><div className='token-deposit-amount-right'><label>Balance:</label><span>{balance}</span></div></div>
                          <div className="deposit-amount-block">
                            <TextField id="outlined-basic" placeholder='0.0' variant="outlined" inputRef={firstValue} onChange={(e) => { calc(e.target.value) }} />
                            <div className="deposit-amount-block-approx"><label>~1,829.28 USD</label></div>
                          </div>
                        </div>

                        <div className='deposit-amount'>
                          <div className='token-deposit-amount'><div className='token-deposit-amount-left'><label>YOU WILL RECEIVE</label></div><div className='token-deposit-amount-right'><label>Balance:</label><span>{balance1}</span></div></div>
                          <div className='balance-receive'>
                            <span className='value-differ-block-identidy'>{newval}</span>
                            <div className='balance-receive-token'>
                              <div className='balance-receive-token-img'><img src={ethimg} alt="eth-img" /></div>
                              <div className='balance-receive-token-name'><label>{selct?.Reward_Token_Symbol}</label></div>
                            </div>
                          </div>
                        </div>

                        <div className='xchange-rate'>
                          <h4>Exchange Rate</h4>
                          <p>1 {selct?.LP_Token_Symbol} = {`${newval1}`}  {selct?.Reward_Token_Symbol}</p>
                        </div>

                        <div className='xchange-rate'>
                          <h4>Est. APR</h4>
                          <p>3.946%</p>
                        </div>

                      </div>

                      <div className='proceed-btn'>
                        <Button variant="contained" disabled={dis} onClick={() => { onSubmit() }} >Proceedss</Button>
                      </div>
                    </div>
                  }
                </div>



              </Item>

              {
                !proceed &&
                <Item className={classes.coinsblock}>

                  <div className='live liquid-staking-table'>
                    <Button onClick={handleOpen} className='unstake-popup'>UnStake</Button>
                    <Modal
                      open={open}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box className="modal-box-popup">
                        <div className='close-menu'>
                          <Button onClick={handleClose}><CloseIcon /></Button>
                        </div>

                        <TableContainer component={Paper} className='table-contain'>
                          {/* <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      {
                        his && his?.map((item, index) => {
                          return (
                            <TableBody className='accordion-tab-head' key={index}>
                              <TableCell>
                                <div className='titlename'>
                                  <div className='title-img'>
                                    <img src={coinone} />
                                  </div>
                                  <div className='title-img2'>
                                    <img src={cointwo} />
                                  </div>
                                  <h4>{item?.Pair} LP</h4>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Amount Deposite</h4>
                                  <div className="doller-value">{item?.Amount}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Reward Amount</h4>
                                  <div className="doller-value"><span className={`item_${index}`}></span></div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className='usdt-fifty-td'>
                                  <h4>Lock Period</h4>
                                  <div className="doller-value">{item?.lock}</div>
                                </div>
                              </TableCell>

                              <TableCell align="left">
                                <div className="usdt-third-td disabled-btn-style">
                                  <Button variant="contained" disabled={item?.status} onClick={() => { unStakes(item) }} >UnStake</Button>
                                </div>
                              </TableCell>

                            </TableBody>
                          )
                        })
                      }


                    </Table> */}

                          <Table sx={{ minWidth: 650 }} aria-label="simple table">

                            {
                              his && his?.map((item, index) => {
                                return (
                                  <TableBody className='accordion-tab-head staking-table' key={index}>
                                    <TableCell>
                                      <div className='titlename'>
                                        <div className='title-img'>
                                          <img src={coinone} />
                                        </div>
                                        {/* <div className='title-img2'>
                                      <img src={cointwo} />
                                    </div> */}
                                        <h4>{item?.Pair} LP</h4>
                                      </div>
                                    </TableCell>

                                    <TableCell align="left">
                                      <div className='usdt-fifty-td'>
                                        <h4>Amount Deposite</h4>
                                        <div className="doller-value">{item?.Amount}</div>
                                      </div>
                                    </TableCell>

                                    <TableCell align="left">
                                      <div className='usdt-fifty-td'>
                                        <h4>Reward Amount</h4>
                                        {/* <div className="doller-value"><span className={`item_${index}`}></span></div> */}
                                        {
                                          selecIdBal == index ?
                                            <div className="doller-value"><Button onClick={() => { shows(index, item) }} >{selecBal} </Button></div> :
                                            <div className="doller-value"><Button onClick={() => { shows(index, item) }} >Show Reward </Button></div>
                                        }

                                      </div>
                                    </TableCell>

                                    <TableCell align="left">
                                      <div className='usdt-fifty-td'>
                                        <h4>Lock Period</h4>
                                        <div className="doller-value">{item?.lock}</div>
                                      </div>
                                    </TableCell>

                                    <TableCell align="left">
                                      <div className="usdt-third-td disabled-btn-style">
                                        <Button variant="contained" disabled={item?.status} onClick={() => { unStakes(item) }}>UnStake</Button>
                                      </div>
                                    </TableCell>

                                  </TableBody>
                                )
                              })
                            }



                          </Table>

                        </TableContainer>

                      </Box>
                    </Modal>
                  </div>

                </Item>
              }


            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Item className={classes.footercls}>
                <Footer />
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div >
    </>

  )
}

export default Liquidstaking
