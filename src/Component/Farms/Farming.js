import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import pancake from '../../images/coin-4-3.png'
import busd from '../../images/busd.png'
import './Farms'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import coinone from '../../images/coins-1.png'
import cointwo from '../../images/coins-2.png'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CalculateIcon from '@mui/icons-material/Calculate';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Web3 from 'web3';
import farmingAdd from '../../Web3/ContractAddress/farmingAddress'
import farmingAbi from '../../Web3/Abi/farming.json'
import erc20Abi from '../../Web3/Abi/erc20.json'
import Axios from '../../Axios';
import { useRef } from 'react';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../../images/loader1.gif'
import { useSDK } from '@metamask/sdk-react';


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
  liquidityheadleft: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    border: 'none !important'
  },
  liquidityheadright: {
    borderRadius: '0px !important',
    boxShadow: 'none !important',
    border: 'none !important',
    justifyContent: 'flex-end'
  }
});

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


const CalcImpLoss = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Icon = () => {
  return (
    <svg height="20" width="20" viewBox="0 0 20 20">
      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
    </svg>
  );
};

const Farmimg = () => {

  const [webStatus, setWebStatus] = useState(window.ethereum)
  var WEB = new Web3(webStatus);
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const amount = useRef(0)
  const [balance, setBalance] = useState()
  const [already, setAlready] = useState([])
  const [pending, setPending] = useState(0)
  const [chain, setchain] = useState()
  const [pairs, setPairs] = useState()
  const [status, setstatus] = useState("live")
  const [accAddress, setAccAddress] = useState()
  const { sdk, connected, connecting, provider, chainId, account } = useSDK();

  const farmingPairs = async () => {
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });

      const { data } = await Axios.post(`/admin/farmingLiquidity`, {
        contract: "all",
        status: status,
        _id: selectedChain,
        usr_address: address[0]
      })
      setPairs(data?.result)
      // check(data?.result)
    } catch (error) {
      console.log(error, "err")
    }

  }

  const changefarmingPairs = async (e) => {
    try {
      const { data } = await Axios.post(`/admin/farmingLiquidity`, {
        contract: "all",
        status: status,
        _id: selectedChain,
        search: e
      })
      if (data?.result?.length > 0) {
        setPairs(data?.result)
        // check(data?.result)
      }

    } catch (error) {
      console.log(error, "err")
      setPairs([])
    }
  }

  useEffect(() => {
    farmingPairs()
  }, [])
  useEffect(() => {
    farmingPairs()
  }, [status])

  const [loading, setLoading] = useState(false)

  const calls = async () => {
    try {
      const chainid = await WEB.eth.getChainId()
      setchain(chainid, "id")
    } catch (error) {
      console.log("🚀error:", error)

    }

  }

  useEffect(() => {
    calls()
  }, [])

  const balances = async (ele) => {
    try {
      var balWeb3 = new Web3(ele?.Network?.rpc_Url)
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new balWeb3.eth.Contract(
        farmingAbi,
        ele?.contract_Address
      );
      // poolInfo

      const pool = await routeInstance.methods.poolInfo(ele?.ID).call()
      // ****************************************************************

      const erc20Instance = new balWeb3.eth.Contract(
        erc20Abi,
        pool.lpToken
      )
      const balance = await erc20Instance.methods.balanceOf(address[0]).call()
      // console.log(await balWeb3.utils.fromWei(balance, 'ether'), "bal")
      setBalance(await balWeb3.utils.fromWei(balance, 'ether'))
    } catch (error) {
      console.log("🚀 error:", error)

    }

  }

  // const check = async (pairs1) => {
  //   try {
  //     const address = await window.ethereum.request({
  //       method: "eth_requestAccounts"
  //     });
  //     setAlready([])
  //     for (let i = 0; i < pairs1?.length; i++) {
  //       const routeInstance = new WEB.eth.Contract(
  //         farmingAbi,
  //         pairs1[i]?.contract_Address
  //       );
  //       const userInfo = await routeInstance.methods.userInfo(pairs1[i]?.ID, address[0]).call()
  //       const al = await WEB.utils.fromWei(userInfo.amount, 'ether')
  //       if (Number(al) > 0) {
  //         const pendingrews = await routeInstance.methods.pendingReward(pairs1[i]?.ID, address[0]).call()
  //         $('.name_' + pairs1[i]?.Token_Symbol + '_' + pairs1[i]?.pair?.Reward_Token_Symbol).html('<span >' + await WEB.utils.fromWei(pendingrews, 'ether') + '</span>');
  //         setInterval(async () => {
  //           const pendingrew = await routeInstance.methods.pendingReward(pairs1[i]?.ID, address[0]).call()
  //           $('.name_' + pairs1[i]?.Token_Symbol + '_' + pairs1[i]?.pair?.Reward_Token_Symbol).html('<span >' + await WEB.utils.fromWei(pendingrew, 'ether') + '</span>');
  //         }, 3000);
  //         setAlready((pre) => [...pre, pairs1[i]?._id])
  //       }
  //     }
  //   } catch (error) {
  //     console.log("🚀  error:", error)

  //   }


  // }

  const check = async (pairs1) => {
    var liqWeb3 = new Web3(pairs1?.Network?.rpc_Url)
    try {
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      setAlready([])
      const { data } = await Axios.post(`/users/getFarmingPairs`, { address: address[0] })
      if (data?.result?.length > 0) {
        // for (let i = 0; i < data?.result?.length; i++) {
        const routeInstance = new liqWeb3.eth.Contract(
          farmingAbi,
          pairs1?.contract_Address
        );

        const userInfo = await routeInstance.methods.userInfo(pairs1?.ID, address[0]).call()
        const al = await liqWeb3.utils.fromWei(userInfo.amount, 'ether')
        const pendingrews = await routeInstance.methods.pendingReward(pairs1?.ID, address[0]).call()
        $('.name_' + pairs1?.Token_Symbol + '_' + pairs1?.pair?.Reward_Token_Symbol).html('<span >' + await liqWeb3.utils.fromWei(pendingrews, 'ether') + '</span>');
        setInterval(async () => {
          const pendingrew = await routeInstance.methods.pendingReward(pairs1?.ID, address[0]).call()
          $('.name_' + pairs1?.Token_Symbol + '_' + pairs1?.pair?.Reward_Token_Symbol).html('<span >' + await liqWeb3.utils.fromWei(pendingrew, 'ether') + '</span>');
        }, 3000);
        // const ele = data?.result[i]
        // setAlready((pre) => [...pre, ele?.Pair])
        // }
      }
    } catch (error) {
      console.log("🚀  error:", error)

    }


  }


  // useEffect(() => {
  //   if (chain === 999n) {

  //   }
  // }, [chain])

  const unStakes = async (element) => {
    try {
      setLoading(true)
      const address = await window.ethereum.request({
        method: "eth_requestAccounts"
      });
      const routeInstance = new WEB.eth.Contract(
        farmingAbi,
        element?.contract_Address
      );
      const erc20Instance = new WEB.eth.Contract(
        erc20Abi,
        element?.LP_Token
      )
      const deci = await erc20Instance.methods.decimals().call()
      const userInfo = await routeInstance.methods.userInfo(element?.ID, address[0]).call()
      // const al = await WEB.utils.fromWei(userInfo.amount, 'ether')
      const withdraw = await routeInstance.methods.withdraw(element?.ID, Number(userInfo.amount).toString()).send({ from: address[0] })
      if (withdraw) {
        await Axios.post(`/users/createTrade`, {
          Pair: `${element?.pair?.Reward_Token_Symbol}-${element?.Token_Symbol}`,
          // amount: userInfo.amount,
          Amount: (Number(userInfo.amount) / (10 ** Number(deci))),
          Price: "0",
          User_Address: address[0],
          Trade_type: "unstaked",
          Trade_At: "farming",
          Coin_name: element?.pair?.Reward_Token_Symbol
        })
        farmingPairs()
        setLoading(false)
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
      setLoading(false)
      console.log(error)
    }
  }

  const farming = async (selc) => {
    try {
      setLoading(true)
      const chainid = await WEB.eth.getChainId()
      var check = ''
      if (Number(chainid) == Number(selected?.Network?.chainId)) {
        check = 'approve'
      } else {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: WEB.utils.toHex(Number(selected?.Network?.chainId)) }]
        })
        check = 'approve'
      }

      if (check != "") {
        const address = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const routeInstance = new WEB.eth.Contract(
          farmingAbi,
          selc?.contract_Address
        );
        if (Number(amount.current.value) <= 0) {
          setLoading(false)
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
          const pool = await routeInstance.methods.poolInfo(selc?.ID).call()
          const erc20Instance = new WEB.eth.Contract(
            erc20Abi,
            pool.lpToken
          )
          const deci = await erc20Instance.methods.decimals().call()
          // const am1 = await WEB.utils.toWei(amount.current.value, 'ether')
          // approve
          const am = (Number(amount.current.value) * (10 ** Number(deci)))
          const approve = await erc20Instance.methods.approve(selc?.contract_Address, am.toString()).send({
            from: address[0]
          })
          // ****************************************************************
          if (approve) {
            // deposite
            const amou1 = await routeInstance.methods.deposit(selc?.ID, am.toString()).send({ from: address[0] })
            if (amou1) {
              handleCloseliq()
              farmingPairs()
              await Axios.post(`/users/createTrade`, {
                Pair: `${selected?.pair?.Reward_Token_Symbol}-${selected?.Token_Symbol}`,
                // amount: amount.current.value,
                Amount: amount.current.value,
                Price: "0",
                User_Address: address[0],
                Trade_type: "staked",
                Trade_At: "farming",
                Coin_name: selected?.pair?.Reward_Token_Symbol,
                Trade_id: selected?._id
              })
              setLoading(false)
              toast.success("Successfully Farmed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              handleCloseliq()
            } else {
              setLoading(false)
              toast.error("User Cancelled Transaction", {
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
            // ****************************************************************
          } else {
            setLoading(false)
            toast.error("User Cancelled Transaction", {
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
          // pendingReward

          // const pendingrew = await routeInstance.methods.pendingReward(0, address[0]).call()
          // console.log(await WEB.utils.fromWei(pendingrew, 'ether'), "rew")
          // ****************************************************************

          // userInfo

          // const userInfo = await routeInstance.methods.userInfo(0, address[0]).call()
          // console.log(userInfo, "userInfo")
          // ****************************************************************

          // emergencyWithdraw

          // const emergencyWithdraw = await routeInstance.methods.emergencyWithdraw(0).send({ from: address[0] })
          // console.log(emergencyWithdraw, "emergencyWithdraw")
          // ****************************************************************

          // withdraw

          // const withdraw = await routeInstance.methods.withdraw(0, am).send({ from: address[0] })
          // console.log(withdraw, "withdraw")
          // ****************************************************************

          // getMultiplier

          // const start = await routeInstance.methods.startTime().call()
          // const end = await routeInstance.methods.allEndTime().call()

          // console.log(start, end, "edn")

          // const multiplier = await routeInstance.methods.getMultiplier(start, end).call()
          // console.log(multiplier, "mil")
          // ****************************************************************
        }
      } else {
        toast.error("", {
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
      setLoading(false)
      console.log(error)
    }
  }

  const reStake = async (ele) => {
    try {
      setLoading(true)

      var checks = ''
      var chains = await WEB.eth.getChainId()
      if (Number(ele?.Network?.chainId) == Number(chains)) {
        checks = "approve"
      } else {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: WEB.utils.toHex(Number(ele?.Network?.chainId)) }]
        })
        checks = 'approve'
      }
      if (checks != '') {
        const address = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const routeInstance = new WEB.eth.Contract(
          farmingAbi,
          ele?.contract_Address
        );
        if (Number(ele?.trades?.Amount) <= 0) {
          setLoading(false)
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
          const pool = await routeInstance.methods.poolInfo(ele?.ID).call()
          const erc20Instance = new WEB.eth.Contract(
            erc20Abi,
            pool.lpToken
          )
          const deci = await erc20Instance.methods.decimals().call()
          // const am1 = await WEB.utils.toWei(amount.current.value, 'ether')
          // approve
          const am = (Number(ele?.trades?.Amount) * (10 ** Number(deci)))
          const approve = await erc20Instance.methods.approve(ele?.contract_Address, am.toString()).send({
            from: address[0]
          })
          // ****************************************************************
          if (approve) {
            // deposite
            const amou1 = await routeInstance.methods.deposit(ele?.ID, am.toString()).send({ from: address[0] })
            if (amou1) {

              await Axios.post(`/users/createTrade`, {
                Pair: `${ele?.pair?.Reward_Token_Symbol}-${ele?.Token_Symbol}`,
                // amount: amount.current.value,
                Amount: ele?.trades?.Amount,
                Price: "0",
                User_Address: address[0],
                Trade_type: "staked",
                Trade_At: "farming",
                Coin_name: ele?.pair?.Reward_Token_Symbol,
                Trade_id: ele?._id
              })
              farmingPairs()
              handleCloseliq()
              setLoading(false)
              toast.success("Successfully Farmed", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              handleCloseliq()
            } else {
              setLoading(false)
              toast.error("User Cancelled Transaction", {
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
            setLoading(false)
            toast.error("User Cancelled Transaction", {
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
      } else {
        toast.error("Network Change Cancelled", {
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
      console.log("🚀 ~ reStake ~ error:", error)
    }

  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setstatus("live")
    }
    else if (newValue === 1) {
      setstatus("finish")
    }
  };
  const [age, setAge] = React.useState('');

  const handleChange1 = (event) => {
    setAge(event.target.value);
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const menuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  const [sort, setSortby] = React.useState('');

  const sortby = (event) => {
    setSortby(event.target.value);
  };

  const [isActive, setIsActive] = useState();
  const [selected, setSelected] = useState()
  const [openliquidity, setOpen] = useState(false);

  const handleClickOpenliq = (ele) => {

    balances(ele)
    setOpen(true);
    setSelected(ele)
  };

  const handleCloseliq = () => {
    setOpen(false);
  };

  const [openRoi, setOpenRoi] = useState(false);

  const handleOpenRoi = () => {
    setOpenRoi(true);
  };

  const handleCloseRoi = () => {
    setOpenRoi(false);
  };

  const [addLiquidity, setAddLiquidity] = useState(false);

  const handleOpenAddLiquidity = () => {
    setAddLiquidity(true);
  };

  const handleCloseAddLiquidity = () => {
    setAddLiquidity(false);
  };

  const [unStake, setUnStake] = useState(false);

  const handleOpenUnStake = () => {
    setUnStake(true);
  };

  const handleCloseUnStake = () => {
    setUnStake(false);
  };

  const options = [
    { value: 1, label: "Pancake", image: pancake },
    { value: 2, label: "BUSD", image: busd }
  ]

  const optionstwo = [
    { value: 1, label: "Pancake", image: pancake },
    { value: 2, label: "BUSD", image: busd }
  ]

  const [showBuyMenu, setShowBuyMenu] = useState(false)

  const handleTkOne = (e) => {
    e.stopPropagation();
    setShowBuyMenu(!showBuyMenu)
  }

  const [showTkOneMenu, setShowTkOneMenu] = useState(false)

  const handleTkSecond = (e) => {
    e.stopPropagation();
    setShowTkOneMenu(!showTkOneMenu)
  }
  const placeHolder = "Select Token"
  const getDisplayBuy = () => {
    return placeHolder;
  };

  const [select, setSelect] = useState('');
  const [updated, setUpdated] = useState(select);

  const [selectTwo, setSelectTwo] = useState('');
  const [updatedNew, setUpdatedNew] = useState(selectTwo);

  const handleClick = (optionSelect) => {
    setSelect(optionSelect);
    setUpdated(select)
  };

  const handleClickTwo = (optionSelect) => {
    setSelectTwo(optionSelect);
    setUpdatedNew(selectTwo)
  };

  const [count, setCount] = useState(0.0112000);

  const incrementCount = () => {
    setCount(count + 0.0000207);
  };

  const decrementCount = () => {
    setCount(count - 0.0000207);
  };


  const [showTier, setShowTier] = useState(false);
  const [showVlTier, setShowVlTier] = useState(false);
  const [valueHistoryPrice, setValueHistoryPrice] = useState(0);
  const [roiStackFor, setRoiStackFor] = useState(0);

  const handleRoiStackFor = (event, newValue) => {
    setRoiStackFor(newValue);
  };

  const handleHistoryPrice = (event, newValue) => {
    setValueHistoryPrice(newValue);
  };

  const HandleToggleTier = () => {
    setShowTier(!showTier)
  }

  const handleVlOpenTier = () => {
    setShowVlTier(true)
  }

  const handleVlCloseTier = () => {
    setShowVlTier(false)
  }

  function createData(assetimg, asset, price, balance, value) {
    return { assetimg, asset, price, balance, value };
  }


  const rows = [
    createData(pancake, 'CAKE', 1.521, 37.79, 57.48),
    createData(busd, 'BNB', 240.406, 0.17, 42.52)
  ];


  const [network, setNetwork] = useState([])
  const [selectedChain, setSelectedChain] = useState()
  const [chainId1, setChainId1] = useState()
  const [selectchainfull, setselectchainfull] = useState()

  const [selecnet, setSelcNet] = useState()

  const [browserChain, setbrowserChain] = useState()
  const [chainidcheck, setChainidcheck] = useState(false)

  const chainLists = async () => {
    try {
      const { data } = await Axios.get(`/admin/getNetwork`)
      setNetwork(data?.result)
      setSelectedChain(data?.result[0]?._id)
      setChainId1(data?.result[0]?.chainId)
      setSelcNet(data?.result[0]?.name)
      setselectchainfull(data?.result[0])
    } catch (error) {
      console.log(error, "err")
    }
  }

  const getAddress = async () => {
    const address = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAccAddress(address[0])
  }

  useEffect(() => {
    chainLists()
    getAddress()
  }, [])

  const onChangeNetwork = async (chainIds) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: WEB.utils.toHex(chainIds) }]
      });
      // console.log(sdk, "sdfhsuifd")
      // await sdk.switchToNetwork(chainIds);
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
      if (Number(browserChainId) === Number(chainId)) {
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

  const sortby1 = (event) => {
    setSelcNet(event.target.value);
  };


  useEffect(() => {
    getCurrentChainid()
    farmingPairs()
  }, [chainId, selectedChain])

  return (

    <>
      {
        loading === true ? <div className='swap-loader' style={{ zIndex: '-3 !important' }}><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div> : <></>
      }
      <div className='farmimg-page'>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0} className='fliter-titles'>
            <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
              <div className='fliter-inner'>
                <h4 class="textSubtle">FILTER BY</h4>
                <Box sx={{ width: '100%' }}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                      <Tab label="Live" {...a11yProps(0)} />
                      <Tab label="Finished" {...a11yProps(1)} />
                    </Tabs>
                  </Box>
                </Box>
              </div>
            </Grid>

            <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
              <div className='farm-type'>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={menuOpen} >
                  Farm Types
                </Button>
                <Menu
                  id="basic-menu" className='menuss'
                  anchorEl={anchorEl}
                  open={open}
                  onClose={menuClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem className='menu-lists-title'>Farm Types</MenuItem>
                  <MenuItem >
                    <div className='V3-Farms'>
                      <div className='v3'>
                        <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-231a1e38-0 dPwWVs"><path d="M21.2627 15.8306C21.5556 16.1235 21.5556 16.5983 21.2627 16.8912L18.6539 19.5H20.3788C20.793 19.5 21.1288 19.8358 21.1288 20.25C21.1288 20.6642 20.793 21 20.3788 21L16.8433 21C16.429 21 16.0933 20.6642 16.0933 20.25V16.7145C16.0933 16.3002 16.429 15.9645 16.8433 15.9645C17.2575 15.9645 17.5933 16.3002 17.5933 16.7145V18.4393L20.202 15.8306C20.4949 15.5377 20.9698 15.5377 21.2627 15.8306Z"></path><path d="M2.81285 7.78034C3.10575 8.07323 3.58062 8.07323 3.87352 7.78034L6.48227 5.17158L6.48227 6.89645C6.48227 7.31067 6.81806 7.64645 7.23227 7.64645C7.64649 7.64645 7.98227 7.31067 7.98227 6.89645L7.98227 3.36092C7.98227 3.16201 7.90326 2.97124 7.7626 2.83059C7.62195 2.68994 7.43119 2.61092 7.23227 2.61092L3.69674 2.61092C3.28253 2.61092 2.94674 2.9467 2.94674 3.36092C2.94674 3.77513 3.28253 4.11092 3.69674 4.11092H5.42161L2.81285 6.71968C2.51996 7.01257 2.51996 7.48744 2.81285 7.78034Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M8.46195 20.5622C8.66369 20.5827 8.86838 20.5932 9.07553 20.5932C12.3892 20.5932 15.0755 17.9069 15.0755 14.5932C18.3892 14.5932 21.0755 11.9069 21.0755 8.59315C21.0755 5.69362 19.0188 3.27448 16.2846 2.71504C15.9185 2.64011 15.5401 2.59853 15.153 2.59363C15.1272 2.5933 15.1013 2.59314 15.0754 2.59314C11.7617 2.59314 9.07542 5.27943 9.07542 8.59314C5.76171 8.59314 3.07542 11.2794 3.07542 14.5931C3.07542 17.5962 5.28164 20.0839 8.16168 20.524C8.26099 20.5392 8.3611 20.5519 8.46195 20.5622ZM5.07542 14.5931C5.07542 12.384 6.86628 10.5931 9.07542 10.5931C9.19238 10.5931 9.30799 10.5981 9.42207 10.6079C10.0255 12.3008 11.3677 13.6431 13.0607 14.2465C13.0704 14.3606 13.0754 14.4762 13.0754 14.5931C13.0754 16.8023 11.2846 18.5931 9.07542 18.5931C6.86628 18.5931 5.07542 16.8023 5.07542 14.5931ZM11.0754 8.59314C11.0754 6.384 12.8663 4.59314 15.0754 4.59314C17.2846 4.59314 19.0754 6.384 19.0754 8.59314C19.0754 10.8023 17.2846 12.5931 15.0754 12.5931C12.8663 12.5931 11.0754 10.8023 11.0754 8.59314Z"></path></svg>
                        <h4>V3 Farms</h4>
                      </div>
                      <div className='staked-switch'>
                        <FormGroup>
                          <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
                        </FormGroup>
                      </div>
                    </div>
                  </MenuItem>

                  <MenuItem >
                    <div className='V3-Farms'>
                      <div className='v3'>
                        <svg viewBox="0 0 24 24" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-231a1e38-0 dPwWVs"><path d="M13.7803 2.71967C14.0732 3.01256 14.0732 3.48744 13.7803 3.78033L12.8107 4.75L14.0307 5.96999H20C21.1 5.96999 22 6.86999 22 7.96999V12.73C21.28 12.25 20.43 11.97 19.5 11.97C17.19 11.97 15.3 13.73 15.05 15.97H11.91C11.96 15.64 12 15.31 12 14.97C12 13.43 11.41 12.03 10.46 10.97H11C12.1 10.97 13 10.07 13 8.96999V7.06068L11.75 5.81066L10.7803 6.78033C10.4874 7.07322 10.0126 7.07322 9.71967 6.78033C9.42678 6.48744 9.42678 6.01256 9.71967 5.71967L12.7197 2.71967C13.0126 2.42678 13.4874 2.42678 13.7803 2.71967Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M11 15C11 17.7614 8.76142 20 6 20C3.23858 20 1 17.7614 1 15C1 12.2386 3.23858 10 6 10C8.76142 10 11 12.2386 11 15ZM9 15C9 16.6569 7.65685 18 6 18C4.34315 18 3 16.6569 3 15C3 13.3431 4.34315 12 6 12C7.65685 12 9 13.3431 9 15Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12.97C17.57 12.97 16 14.54 16 16.47C16 18.4 17.57 19.97 19.5 19.97C21.43 19.97 23 18.4 23 16.47C23 14.54 21.43 12.97 19.5 12.97ZM19.5 17.97C18.67 17.97 18 17.3 18 16.47C18 15.64 18.67 14.97 19.5 14.97C20.33 14.97 21 15.64 21 16.47C21 17.3 20.33 17.97 19.5 17.97Z"></path><path d="M9 8.96997H4C3.45 8.96997 3 8.52997 3 7.96997C3 7.41997 3.45 6.96997 4 6.96997H7C8.1 6.96997 9 7.86997 9 8.96997Z"></path></svg>
                        <h4>V2 Farms</h4>
                      </div>
                      <div className='staked-switch'>
                        <FormGroup>
                          <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
                        </FormGroup>
                      </div>
                    </div>
                  </MenuItem>

                  {/* <MenuItem>
            <div className='V3-Farms'>
              <div className='v3'>
                <svg viewBox="0 0 15 15" color="text" width="20px" xmlns="http://www.w3.org/2000/svg" class="sc-231a1e38-0 dPwWVs"><path d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path><path d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path></svg>
                <h4>Booster Available</h4>
              </div>
              <div className='staked-switch'>
                <FormGroup>
                  <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} />
                </FormGroup>
              </div>
            </div>
          </MenuItem> */}
                </Menu>
              </div>
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>

      <div className='staked-switch'>
        <FormGroup>
          <FormControlLabel control={<IOSSwitch sx={{ m: 1 }} />} label="Staked only" />
        </FormGroup>
      </div>
    </Grid> */}

            <Grid item xs={6} sm={6} md={6} lg={2} xl={2} className='empty-block-mobile'></Grid>

            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              {/* <div className='sortby first1'>
                <Box sx={{ minWidth: 120 }}>
                  {
                    selecnet ?
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label" className='demo-input-label'>Network</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select" className='input-field' value={selecnet}
                          onChange={sortby1}
                        >
                          {network && network?.map((item, index) => {
                            return (
                              <MenuItem value={item?.name} key={index} onClick={() => { onChangeNetwork(item?.chainId); setChainId1(item?.chainId); setSelectedChain(item?._id) }} >{item?.name}</MenuItem>
                            )
                          })}

                        </Select>
                      </FormControl>
                      :
                      <></>
                  }

                </Box>
              </div> */}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <div className='sortby first1'>
                <Box sx={{ minWidth: 120 }}>

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" className='demo-input-label'>Hot</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select" className='input-field'
                      value={sort}
                      onChange={sortby}
                    >
                      <MenuItem value="APR">APR</MenuItem>
                      <MenuItem value="Earned">Earned</MenuItem>
                      <MenuItem value="Liquidity">Liquidity</MenuItem>
                      <MenuItem value="Latest">Latest</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={2} xl={2} className="search-box">
              <Box sx={{ maxWidth: 120 }}>
                <div className='search-bar'>
                  <TextField id="outlined-basic" placeholder="Search" onChange={(e) => { changefarmingPairs(e.target.value) }} variant="outlined" />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>


        <div className='fliter-left'></div>


        <Box sx={{ width: '100%' }}>
          <CustomTabPanel value={value} index={0} className='tab-content'>

            {pairs && pairs?.map((element, index) => {
              return (
                <div className='live' key={index}>
                  <TableContainer component={Paper} className='table-contain'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody className='accordion-tab-head' onClick={() => {
                        check(element)
                        if (isActive === "") {
                          setIsActive(index)
                        } else if (isActive === index) {
                          setIsActive("")
                        }
                        else {
                          setIsActive(index)
                        }
                      }
                      }>
                        <TableCell>
                          <div className='titlename'>
                            <div className='title-img'>
                              <img src={coinone} />
                            </div>
                            <div className='title-img2'>
                              <img src={cointwo} />
                            </div>
                            <h4>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP</h4>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-sec-td">
                            <div className="percentage">0.05%</div>
                            {/* <div className="boosted rocket">
                  <svg
                    viewBox="0 0 15 15"
                    width="18px"
                    color="success"
                    xmlns="http://www.w3.org/2000/svg"
                    class="sc-231a1e38-0 dAjNFt">
                    <path
                      d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                    <path
                      d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                  </svg>Boosted</div> */}
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Earned</h4>
                            <div className="earn-txt">0</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-fourth-td">
                            <h4>APR</h4>
                            <div className="apr">
                              <div className="apr-value rocket">
                                <svg
                                  viewBox="0 0 15 15"
                                  color="success"
                                  width="20px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="sc-231a1e38-0 ehPJsM">
                                  <path
                                    d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                                  <path
                                    d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                                </svg>
                                <div className="per-increase">Up to<span>89.61%</span></div>
                                <div className="per-decrease">53.01%</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className='usdt-fifty-td'>
                            <h4>Staked Liquidity</h4>
                            <div className="doller-value">${element?.totalLiquidity ? element?.totalLiquidity : "0"}</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          {/* <div className='usdt-fifty-td'>
                <h4>Multiplier</h4>
                <div className="doller-value">178x</div>
              </div> */}
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Available</h4>
                            <div className="earn-txt">{element?.user_address?.stake == true ? "0" : element?.user_address?.some((obj) => { return obj?.user_address == account ? true : false }) == true ? "1" : "0"} LP</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Stakes</h4>
                            <div className="earn-txt">{element?.user_address?.some((obj) => { if (obj?.user_address == account) { return obj?.stake } }) == true ? "1" : "0"} LP</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="arrow-down">
                            <ExpandMoreIcon />
                          </div>
                        </TableCell>

                      </TableBody>

                      <TableBody className='accordion-tab-div'>
                        {isActive === index &&
                          <>
                            <TableCell className='w-40-percent'>
                              <Stack spacing={2} direction="column" alignItems="flex-start">
                                <Button variant="text" onClick={() => { handleClickOpenliq(element) }} >Add {element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </Button>
                                <Button variant="text">See Pair Info</Button>
                                <Button variant="text">View Contract</Button>
                              </Stack>
                            </TableCell>

                            <TableCell className='w-60-percent' colspan='8 '>

                              {element?.user_address?.some(obj => { if (obj?.user_address == account) { return obj?.stake } }) == true ?
                                <>
                                  <div className='after-add-liquidity'>
                                    <label className='start-farming'>1 STAKED FARMING</label>
                                    <div className='staking-farming-left-right'>
                                      <div className='staking-farming-left'>
                                        <div className='staking-farming-left-left'>
                                          <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                          {/* <span>Max 1.1234/ Min 0.1283 zebra per busd</span> */}
                                          <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                          <p>~23.234 USD</p>
                                          {/* <div className='coin-rate-small'><span>10.00 <span>zebra</span></span><span>10.00 <span>busd</span></span></div> */}
                                        </div>
                                        <div className='staking-farming-left-right-unstake'>
                                          <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>UnStake</Button>

                                        </div>
                                      </div>
                                      <div className='staking-farming-right'>
                                        <h3>Reward Earned</h3>
                                        <div className={`harvest-balance`}>
                                          <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                          <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : element?.trades?.User_Address == account ?
                                  <>
                                    <div className='after-add-liquidity'>
                                      <label className='start-farming'>1 STAKED FARMING</label>
                                      <div className='staking-farming-left-right'>
                                        <div className='staking-farming-left'>
                                          <div className='staking-farming-left-left'>
                                            <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                            {/* <span>Max 1.1234/ Min 0.1283 zebra per busd</span> */}
                                            <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                            <p>~23.234 USD</p>
                                            {/* <div className='coin-rate-small'><span>10.00 <span>zebra</span></span><span>10.00 <span>busd</span></span></div> */}
                                          </div>
                                          <div className='staking-farming-left-right-unstake'>
                                            {/* <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>Stake</Button> */}
                                            <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { reStake(element) }}>Stake</Button>
                                          </div>
                                        </div>
                                        {/* <div className='staking-farming-right'>
                                          <h3>Reward Earned</h3>
                                          <div className={`harvest-balance`}>
                                            <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                            <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className='before-add-liquidity'>
                                      <label className='start-farming'>Start Farmings</label>
                                      {
                                        chainidcheck === true ?
                                          <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { handleClickOpenliq(element) }}>Add Liquidity</Button>
                                          :
                                          <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { onChangeNetwork(chainId) }}>Change network</Button>

                                      }
                                    </div>
                                  </>}

                              {/* {already.includes(`${element?.pair?.Reward_Token_Symbol}-${element?.Token_Symbol}`) === false ?
                                <>
                                  <div className='before-add-liquidity'>
                                    <label className='start-farming'>Start Farming</label>
                                    {
                                      chainidcheck === true ?
                                        <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { handleClickOpenliq(element) }}>Add Liquidity</Button>
                                        :
                                        <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { onChangeNetwork(chainId) }}>Change network</Button>
                                    }
                                  </div>
                                </>
                                :
                                <>
                                  <div className='after-add-liquidity'>
                                    <label className='start-farming'>1 STAKED FARMING</label>
                                    <div className='staking-farming-left-right'>
                                      <div className='staking-farming-left'>
                                        <div className='staking-farming-left-left'>
                                          <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                          <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                          <p>~23.234 USD</p>
                                        </div>
                                        <div className='staking-farming-left-right-unstake'>
                                          <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>Unstake</Button>
                                        </div>
                                      </div>
                                      <div className='staking-farming-right'>
                                        <h3>Reward Earned</h3>
                                        <div className={`harvest-balance`}>
                                          <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                          <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>} */}




                            </TableCell>


                          </>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )
            })}
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1} className='tab-content'>

            {pairs && pairs?.map((element, index) => {
              return (
                <div className='live' key={index}>
                  <TableContainer component={Paper} className='table-contain'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableBody className='accordion-tab-head' onClick={() => {
                        if (isActive === "") {
                          setIsActive(index)
                        } else if (isActive === index) {
                          setIsActive("")
                        }
                        else {
                          setIsActive(index)
                        }
                      }
                      }>
                        <TableCell>
                          <div className='titlename'>
                            <div className='title-img'>
                              <img src={coinone} />
                            </div>
                            <div className='title-img2'>
                              <img src={cointwo} />
                            </div>
                            <h4>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP</h4>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-sec-td">
                            <div className="percentage">0.05%</div>
                            {/* <div className="boosted rocket">
                  <svg
                    viewBox="0 0 15 15"
                    width="18px"
                    color="success"
                    xmlns="http://www.w3.org/2000/svg"
                    class="sc-231a1e38-0 dAjNFt">
                    <path
                      d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                    <path
                      d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                  </svg>Boosted</div> */}
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Earned</h4>
                            <div className="earn-txt">0</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-fourth-td">
                            <h4>APR</h4>
                            <div className="apr">
                              <div className="apr-value rocket">
                                <svg
                                  viewBox="0 0 15 15"
                                  color="success"
                                  width="20px"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="sc-231a1e38-0 ehPJsM">
                                  <path
                                    d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                                  <path
                                    d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                                </svg>
                                <div className="per-increase">Up to<span>89.61%</span></div>
                                <div className="per-decrease">53.01%</div>
                              </div>
                            </div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className='usdt-fifty-td'>
                            <h4>Staked Liquidity</h4>
                            <div className="doller-value">$8,479,708</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          {/* <div className='usdt-fifty-td'>
                <h4>Multiplier</h4>
                <div className="doller-value">178x</div>
              </div> */}
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Available</h4>
                            <div className="earn-txt">{element?.user_address?.stake == true ? "0" : element?.trades?.User_Address == account ? "1" : "0"} LP</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="usdt-third-td">
                            <h4>Stakes</h4>
                            <div className="earn-txt">{element?.user_address?.some(obj => { if (obj?.user_address == account) { return obj?.stake } }) == true ? "1" : "0"} LP</div>
                          </div>
                        </TableCell>

                        <TableCell align="left">
                          <div className="arrow-down">
                            <ExpandMoreIcon />
                          </div>
                        </TableCell>

                      </TableBody>

                      <TableBody className='accordion-tab-div'>
                        {isActive === index &&
                          <>
                            <TableCell className='w-40-percent'>
                              <Stack spacing={2} direction="column" alignItems="flex-start">
                                {/* <Button variant="text">Add Zebra Exchange</Button> */}
                                <Button variant="text">See Pair Info</Button>
                                <Button variant="text">View Contract</Button>
                              </Stack>
                            </TableCell>

                            <TableCell className='w-60-percent' colspan='8 '>

                              {element?.user_address?.stake == true ?
                                <>
                                  <div className='after-add-liquidity'>
                                    <label className='start-farming'>1 STAKED FARMING</label>
                                    <div className='staking-farming-left-right'>
                                      <div className='staking-farming-left'>
                                        <div className='staking-farming-left-left'>
                                          <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                          {/* <span>Max 1.1234/ Min 0.1283 zebra per busd</span> */}
                                          <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                          <p>~23.234 USD</p>
                                          {/* <div className='coin-rate-small'><span>10.00 <span>zebra</span></span><span>10.00 <span>busd</span></span></div> */}
                                        </div>
                                        <div className='staking-farming-left-right-unstake'>
                                          <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>Unstake</Button>
                                        </div>
                                      </div>
                                      <div className='staking-farming-right'>
                                        <h3>Reward Earned</h3>
                                        <div className={`harvest-balance`}>
                                          <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                          <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                                : element?.trades?.User_Address == account ?
                                  <>
                                    <div className='after-add-liquidity'>
                                      <label className='start-farming'>1 STAKED FARMING</label>
                                      <div className='staking-farming-left-right'>
                                        <div className='staking-farming-left'>
                                          <div className='staking-farming-left-left'>
                                            <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                            {/* <span>Max 1.1234/ Min 0.1283 zebra per busd</span> */}
                                            <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                            <p>~23.234 USD</p>
                                            {/* <div className='coin-rate-small'><span>10.00 <span>zebra</span></span><span>10.00 <span>busd</span></span></div> */}
                                          </div>
                                          <div className='staking-farming-left-right-unstake'>
                                            <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>Unstake</Button>
                                          </div>
                                        </div>
                                        {/* <div className='staking-farming-right'>
                                          <h3>Reward Earned</h3>
                                          <div className={`harvest-balance`}>
                                            <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                            <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                          </div>
                                        </div> */}
                                      </div>
                                    </div>
                                  </>
                                  :
                                  <>
                                    <div className='before-add-liquidity'>
                                      <label className='start-farming'>Start Farming</label>
                                      {
                                        chainidcheck === true ?
                                          <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { handleClickOpenliq(element) }}>Add Liquidity</Button>
                                          :
                                          <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { onChangeNetwork(chainId) }}>Change network</Button>

                                      }
                                    </div>
                                  </>}
                              {/* {already.includes(`${element?.pair?.Reward_Token_Symbol}-${element?.Token_Symbol}`) == false ?
                                <>
                                  <div className='before-add-liquidity'>
                                    <label className='start-farming'>Start Farming</label>
                                    {
                                      chainidcheck === true ?
                                        <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { handleClickOpenliq(element) }}>Add Liquidity</Button>
                                        :
                                        <Button className='connect-wallet-start-farming' variant="contained" onClick={() => { onChangeNetwork(chainId) }}>Change network</Button>

                                    }
                                  </div>
                                </>
                                :
                                <>
                                  <div className='after-add-liquidity'>
                                    <label className='start-farming'>1 STAKED FARMING</label>
                                    <div className='staking-farming-left-right'>
                                      <div className='staking-farming-left'>
                                        <div className='staking-farming-left-left'>
                                          <label>{element?.pair?.Reward_Token_Symbol}-{element?.Token_Symbol} LP </label>
                                          <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                                          <p>~23.234 USD</p>
                                        </div>
                                        <div className='staking-farming-left-right-unstake'>
                                          <Button className='connect-wallet-start-farming' variant="outlined" onClick={() => { unStakes(element) }}>Unstake</Button>
                                        </div>
                                      </div>
                                      <div className='staking-farming-right'>
                                        <h3>Reward Earned</h3>
                                        <div className={`harvest-balance`}>
                                          <span className={`name_${element?.Token_Symbol}_${element?.pair?.Reward_Token_Symbol}`}>0</span>
                                          <Button variant="contained" disabled={pending > "0" ? false : true}>Harvest</Button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>} */}




                            </TableCell>


                          </>
                        }
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              )
            })}
          </CustomTabPanel>

          {/* <CustomTabPanel value={value} index={1} className='tab-content'>
    <div className='live'>
      <TableContainer component={Paper} className='table-contain'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableCell>
              <div className='titlename'>
                <div className='title-img'>
                  <img src={coinone} />
                </div>
                <div className='title-img2'>
                  <img src={cointwo} />
                </div>
                <h4>USDT-BNB LP</h4>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="usdt-sec-td">
                <div className="percentage">0.05%</div>
                <div className="boosted rocket">
                  <svg
                    viewBox="0 0 15 15"
                    width="18px"
                    color="success"
                    xmlns="http://www.w3.org/2000/svg"
                    class="sc-231a1e38-0 dAjNFt">
                    <path
                      d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                    <path
                      d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                  </svg>Boosted</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="usdt-third-td">
                <h4>Earned</h4>
                <div className="earn-txt">0</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="usdt-fourth-td">
                <h4>APR</h4>
                <div className="apr">
                  <div className="apr-value rocket">
                    <svg
                      viewBox="0 0 15 15"
                      color="success"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      class="sc-231a1e38-0 ehPJsM">
                      <path
                        d="M8.34588 13.6273C8.0575 13.8656 7.63823 13.7399 7.49172 13.3958L6.78828 11.7438C7.73587 11.3939 8.62311 10.9234 9.44396 10.3744C9.44396 10.3744 9.66966 11.6436 9.38982 12.3723C9.20938 12.8421 8.73469 13.3061 8.34588 13.6273ZM3.25141 8.2087L1.60451 7.50815C1.25825 7.36086 1.1335 6.93831 1.37577 6.6505C1.69974 6.26564 2.16489 5.79794 2.63298 5.61886C3.35861 5.34125 4.62149 5.55437 4.62149 5.55437C4.07225 6.3748 3.60147 7.26158 3.25141 8.2087ZM12.8903 2.10977C12.8903 2.10977 9.90266 0.830267 6.4865 4.2453C5.1647 5.56643 4.37403 7.02028 3.861 8.29315C3.69201 8.7456 3.80668 9.24027 4.13864 9.57809L5.42423 10.857C5.75619 11.1948 6.25111 11.3034 6.70378 11.1345C8.22388 10.5552 9.6041 9.66087 10.7537 8.51033C14.1699 5.09589 12.8903 2.10977 12.8903 2.10977ZM8.62311 6.3748C8.15233 5.90426 8.15233 5.13812 8.62311 4.66758C9.09389 4.19704 9.86042 4.19704 10.3312 4.66758C10.7959 5.13812 10.802 5.90426 10.3312 6.3748C9.86042 6.84534 9.09389 6.84534 8.62311 6.3748Z"></path>
                      <path
                        d="M3.77609 10.3019C3.54971 10.0756 3.23604 9.92849 2.92949 10.0208C2.22706 10.2322 1.71542 10.8838 1.71542 11.6548L1.71542 13.361H3.42253C4.19392 13.361 4.84581 12.8496 5.05736 12.1476C5.14968 11.8412 5.00246 11.5277 4.77608 11.3014L3.77609 10.3019Z"></path>
                    </svg>
                    <div className="per-increase">Up to<span>89.61%</span></div>
                    <div className="per-decrease">53.01%</div>
                  </div>
                </div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className='usdt-fifty-td'>
                <h4>Staked Liquidity</h4>
                <div className="doller-value">$8,479,708</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className='usdt-fifty-td'>
                <h4>Multiplier</h4>
                <div className="doller-value">178x</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="usdt-third-td">
                <h4>Available</h4>
                <div className="earn-txt">0 LP</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="usdt-third-td">
                <h4>Stakes</h4>
                <div className="earn-txt">0 LP</div>
              </div>
            </TableCell>

            <TableCell align="left">
              <div className="arrow-down" onClick={() => setIsActive(!isActive)}>
                <ExpandMoreIcon />
              </div>
            </TableCell>

          </TableBody>

          <TableBody className='accordion-tab-div'>
            {isActive &&
              <>
                <TableCell className='w-40-percent'>
                  <Stack spacing={2} direction="column" alignItems="flex-start">
                    <Button variant="text">Add Zebra Exchange</Button>
                    <Button variant="text">See Pair Info</Button>
                    <Button variant="text">View Contract</Button>
                  </Stack>
                </TableCell>

                <TableCell className='w-60-percent' colspan='8 '>
                  <label className='start-farming'>Start Farming</label>
                  <Button className='connect-wallet-start-farming' variant="contained">Connect Wallet</Button>
                </TableCell>
              </>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </CustomTabPanel> */}


          <div className='connect-wallet'>

          </div>


        </Box>





        <Dialog open={unStake} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className='add-liquidity add-liquidity-modal-popup unstacking-pop-up'>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className='liquidit-title liquidit-title-head unstacking-pop-up-title-head'>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadleft}>
                  <DialogTitle id="alert-dialog-title">{"Unstaking"}</DialogTitle>
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadright}>
                  <div class="per-increase">
                    {/* <div className='setting-icon'>
<SettingsIcon/>
</div> */}
                    <div className='close-icon' onClick={handleCloseUnStake}>
                      <CloseIcon />
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>
            {/* <div className='unstakenotify'><img src={unstakenotify} alt="unstakenotify"/></div> */}
            <Grid container spacing={2} className='add-liquidity-pop-pup-body unstacking-pop-up-pop-pup-body'>

              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-al-balance-tier-block unstacking-pop-up-inner-block'>
                <div className='staking-farming-left-right'>
                  <div className='staking-farming-left'>
                    <div className='staking-farming-left-left'>
                      <label>Zebra-BUSD LP (#123456)</label>
                      <span>Max 1.1234/ Min 0.1283 zebra per busd</span>
                      <p style={{ fontWeight: 600 }}>APR 33.90345%</p>
                      <p>~23.234 USD</p>
                      <div className='coin-rate-small'><span>10.00 <span>zebra</span></span><span>10.00 <span>busd</span></span></div>
                    </div>
                    <div className='staking-farming-left-right-stake'>
                      <Button className='connect-wallet-start-farming' variant="contained" >Manage Position</Button>
                    </div>
                  </div>
                </div>
                <Button variant="contained" className='add-liqui-add-btn-inner unstake-button'>Unstake</Button>
                <p className='unstake-para'>Unstake will also automaticaally harvwst any earnings that you haven't collect yet, and send them to your wallet</p>
              </Grid>
            </Grid>
          </Box>
        </Dialog>


        <Dialog open={addLiquidity} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className='add-liquidity add-liquidity-modal-popup'>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className='liquidit-title liquidit-title-head'>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadleft}>
                  <DialogTitle id="alert-dialog-title">{"Add Liquidity"}</DialogTitle>
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadright}>
                  <div class="per-increase">
                    {/* <div className='setting-icon'>
<SettingsIcon/>
</div> */}
                    <div className='close-icon' onClick={handleCloseAddLiquidity}>
                      <CloseIcon />
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} className='add-liquidity-pop-pup-body'>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className='al-left-right'>
                  <div className='al-left'>
                    <div className='al-left-imgs'><img src={pancake} alt="pancake" /><img src={busd} alt="busd" /></div>
                    <div className='al-left-pair'>XRP-USDT</div>
                  </div>
                  <div className='al-right'>
                    <span>Active</span>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='coin-al-balance-tier-block'>
                <div className='coin-al-balance-tier-block-outer'>
                  <div className='al-left-right'>
                    <div className='al-left'>
                      <div className='al-left-imgs'><img src={pancake} alt="pancake" /></div>
                      <div className='al-left-pair'>XRP</div>
                    </div>
                    <div className='al-right'>
                      <label>10</label>
                      <p>~$1.19</p>
                    </div>
                  </div>
                  <div className='al-left-right'>
                    <div className='al-left'>
                      <div className='al-left-imgs'><img src={busd} alt="busd" /></div>
                      <div className='al-left-pair'>BUSD</div>
                    </div>
                    <div className='al-right'>
                      <label>10</label>
                      <p>~$1.19</p>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Dialog>




        <Dialog open={openliquidity} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className='add-liquidity'>
          {selected &&
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} className='liquidit-title liquidit-title-head'>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Item className={classes.liquidityheadleft}>
                    <DialogTitle id="alert-dialog-title">{"Add Liquidity"}</DialogTitle>
                  </Item>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                  <Item className={classes.liquidityheadright}>
                    <div class="per-increase">
                      <div><span>0.7%</span></div>
                      <div className='CalculateIcon-icon' onClick={handleOpenRoi}>
                        <CalculateIcon />
                      </div>
                      {/* <div className='setting-icon'>
                                    <SettingsIcon/>
                                    </div> */}
                      <div className='close-icon' onClick={handleCloseliq}>
                        <CloseIcon />
                      </div>
                    </div>
                  </Item>
                </Grid>
              </Grid>

              <div className='liquidit-content'>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">

                    <Grid container spacing={0} className='liquidity-body-content-modal'>

                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} id="liquidity-block-left">
                        {/* <div className='dialog-content'>
                <div className='token-pair'>
                  <h4>CHOOSE TOKEN PAIR</h4>
                </div>
              </div> */}

                        {/* <DropDownToken placeHolder="Select Token" options={options}/> */}
                        {/* <div className='pairing-block'>
                <div className="chain-select-options chain-select-options-buy select-token dropdown-container">

                  <div className="dropdown-input" onClick={handleTkOne}>
                    <div className="dropdown-selected-value">
                      {select ? (<div className="dropdown-item" key={select.value}>
                        <div><img src={select.image} alt={select.label} /></div> {select.label}
                      </div>) : getDisplayBuy()}
                    </div>
                    <div className="dropdown-tools">
                      <div className="dropdown-tool">
                        <Icon />
                      </div>
                    </div>

                    {showBuyMenu &&
                      <div className="dropdown-menu">
                        <div className='search-box-token-search'>
                          <div className="seach-icon-inside"><img src={searchiconhistory} alt="search-token-block" /></div>
                          <input type='text' placeholder='Search' />
                        </div>
                        <div className="dropdown-menu-inner">
                          {options.map((option) => (
                            <div onClick={() => handleClick(option)} className="dropdown-item" key={option.value}>
                              <div><img src={option.image} alt={option.label} /></div> {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    }

                  </div>
                </div>
                <div className='pairing-mid'>+</div>
                <div className="chain-select-options chain-select-options-buy select-token dropdown-container">
                  <div className="dropdown-input" onClick={handleTkSecond}>
                    <div className="dropdown-selected-value">
                      {selectTwo ? (<div className="dropdown-item" key={selectTwo.value}>
                        <div><img src={selectTwo.image} alt={selectTwo.label} /></div> {selectTwo.label}
                      </div>) : getDisplayBuy()}
                    </div>
                    <div className="dropdown-tools">
                      <div className="dropdown-tool">
                        <Icon />
                      </div>
                    </div>

                    {showTkOneMenu &&
                      <div className="dropdown-menu">
                        <div className='search-box-token-search'>
                          <div className="seach-icon-inside"><img src={searchiconhistory} alt="search-token-block" /></div>
                          <input type='text' placeholder='Search' />
                        </div>
                        <div className="dropdown-menu-inner">
                          {optionstwo.map((option) => (
                            <div onClick={() => handleClickTwo(option)} className="dropdown-item" key={option.value}>
                              <div><img src={option.image} alt={option.label} /></div> {option.label}
                            </div>
                          ))}
                        </div>
                      </div>
                    }

                  </div>
                </div>
              </div> */}

                        {!showVlTier ?

                          (<div className='free-tier free-tier-v3lp'>
                            <div className='free-tier-inner'><div className='free-tier-inner-left'><h3>V3 LP - 0.25% fee tier</h3><label>100% Pick</label></div><span className='free-tier-inner-right' onClick={HandleToggleTier}>{showTier ? "Hide" : "Show"}</span></div>
                            {showTier &&
                              <div className='free-tier-bottom'>
                                <Stack direction="row" spacing={2} className='v3-lp-tier-stack'>
                                  <Button variant="contained"><div>0.01% <label>0% Pick</label></div></Button>
                                  <Button variant="contained"><div>0.05% <label>0% Pick</label></div></Button>
                                  <Button variant="contained" className='activepercentage'><div>0.25% <label>100% Pick</label></div></Button>
                                  <Button variant="contained"><div>1% <label>Not Created</label></div></Button>
                                </Stack>
                                <Button onClick={handleVlOpenTier} className='Add-V2-Liquidity' variant="text">Add V2 Liquidity</Button>
                              </div>
                            }
                          </div>) :

                          (<div className='free-tier free-tier-v2lp'>
                            <div className='free-tier-inner'><div className='free-tier-inner-left'><h3>V2 LP - 0.25 fee tier</h3></div><span className='free-tier-inner-right' onClick={HandleToggleTier}>{showTier ? "Hide" : "Show"}</span></div>
                            {showTier &&
                              <div className='free-tier-bottom'>
                                <Stack direction="row" spacing={2}>
                                  <Button onClick={handleVlCloseTier} variant="contained">V3 LP</Button>
                                  <Button variant="contained" className='activepercentage'><div>V2 LP</div></Button>
                                </Stack>
                              </div>
                            }
                          </div>
                          )

                        }

                        <div className='dialog-content'>
                          <div className='token-pair'>
                            <h4>DEPOSIT AMOUNT</h4>
                          </div>
                        </div>
                        <div className='pair-block-change'>
                          <div className='pair-block-change-left'>
                            <div className='token-one top-token token-style'>


                              <div className='outer-block-with-balance'>
                                <div className='inner-block-with-balance'>
                                  <div className='token-img-one token-img-style'>
                                    {/* <img src={selected?.image} alt="P" /> */}
                                    <div className='no-img'>{selected?.Token_Symbol ? selected?.Token_Symbol.charAt(0) : 'Z'}</div>
                                  </div>
                                  <span>{selected?.Token_Symbol}</span>
                                  <div className='copy-icon'><ContentCopyIcon /></div>
                                </div>

                                <div className='balance-inner-righ'>Balance:<span>{balance}</span></div>
                              </div>

                            </div>
                            <div className='enter-amount-with-approx'>
                              <input type='text' placeholder='0.0' className='input-block' ref={amount} />
                              <label>~1.55 USD</label>
                            </div>
                          </div>
                          {/* <div className='pair-block-change-right'>
                  <div className='token-two bottom-token token-style'>

                    <div className='outer-block-with-balance'>
                      <div className='inner-block-with-balance'>
                        <div className='token-img-two token-img-style'>
                          <img src={busd} alt="busd" />
                        </div>
                        <span>BUSD</span>
                        <div className='copy-icon'><ContentCopyIcon /></div>
                      </div>

                      <div className='balance-inner-righ'>Balance:<span>0</span></div>
                    </div>


                  </div>
                  <div className='enter-amount-with-approx'>
                    <input type='text' placeholder='0.0' className='input-block' />
                    <label>~1.55 USD</label>
                  </div>
                </div> */}
                        </div>


                      </Grid>


                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                        {!showVlTier ?

                          <div class="vl3-lp-right">
                            <div className='dialog-content'>
                              <div className='token-pair cake-button'>
                                <h4>SET PRICE RANGE</h4>
                                <div><label className='View-prices-in'>View prices in</label><Button variant="outlined" startIcon={<SwapHorizIcon />}>{selected?.Token_Symbol}</Button></div>
                              </div>
                              <div className='current-price-block'><span><label>Current Price:</label> <span>1.54652</span> {selected?.Token_Symbol} per {selected?.pair?.Reward_Token_Symbol}</span></div>
                            </div>

                            <Grid container spacing={2} className='liquidity-inner-blocks-right'>
                              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div className='min-max-price-block'>
                                  <label>Min Price</label>
                                  <div className='dec-incr'>
                                    <div onClick={decrementCount} className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                    <input type='text' value={count} />
                                    <div onClick={incrementCount} className='incr-icon'><AddCircleOutlineIcon /></div>
                                  </div>
                                  <label>{selected?.Token_Symbol} per {selected?.pair?.Reward_Token_Symbol}</label>
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div className='min-max-price-block'>
                                  <label>Min Price</label>
                                  <div className='dec-incr'>
                                    <div className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                    <input type='text' value="0.0112000" />
                                    <div className='incr-icon'><AddCircleOutlineIcon /></div>
                                  </div>
                                  <label>{selected?.pair?.Reward_Token_Symbol} per {selected?.Token_Symbol}</label>
                                </div>
                              </Grid>
                            </Grid>
                            <Stack spacing={2} direction="row" className='percentage-button-block'>
                              <Button variant="outlined">10%</Button>
                              <Button variant="outlined">20%</Button>
                              <Button variant="outlined">50%</Button>
                              <Button variant="outlined">Full Range</Button>
                            </Stack>
                            {/* <Button variant="contained" className='balance-btn-submit'>Approve XRP</Button> */}
                            {/* <Button onClick={handleOpenAddLiquidity} variant="contained" className='balance-btn-submit-add'>Add</Button> */}
                            <Button onClick={() => { farming(selected) }} variant="contained" className='balance-btn-submit-add'>Add</Button>

                          </div>

                          :

                          <div class="vl2-lp-right">
                            <h3 className='my-position-head'>Your position will appear here.</h3>
                            <Grid container spacing={2} className='liquidity-inner-blocks-right'>
                              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div className='min-max-price-block'>
                                  <label>Min Price</label>
                                  <div className='dec-incr'>
                                    <div onClick={decrementCount} className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                    <input type='text' value={count} />
                                    <div onClick={incrementCount} className='incr-icon'><AddCircleOutlineIcon /></div>
                                  </div>
                                  <label>USDT per XRP</label>
                                </div>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <div className='min-max-price-block'>
                                  <label>Min Price</label>
                                  <div className='dec-incr'>
                                    <div className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                    <input type='text' value="0.0112000" />
                                    <div className='incr-icon'><AddCircleOutlineIcon /></div>
                                  </div>
                                  <label>USDT per XRP</label>
                                </div>
                              </Grid>
                            </Grid>
                            <Button variant="contained" disabled className='balance-btn-submit'>Insufficient BUSD balance</Button>
                          </div>

                        }

                      </Grid>


                    </Grid>

                  </DialogContentText>
                </DialogContent>
              </div>

            </Box>
          }


        </Dialog>

        <Dialog open={openRoi} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" className='add-liquidity roi-calculator-modal'>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} className='liquidit-title liquidit-title-head'>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadleft}>
                  <DialogTitle id="alert-dialog-title">{"ROI Calculator"}</DialogTitle>
                </Item>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Item className={classes.liquidityheadright}>
                  <div class="per-increase">
                    <div className='close-icon' onClick={handleCloseRoi}>
                      <CloseIcon />
                    </div>
                  </div>
                </Item>
              </Grid>
            </Grid>

            <div className='liquidit-content'>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">

                  <Grid container spacing={0} className='liquidity-body-content-modal'>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6} id="liquidity-block-left">
                      <div className='dialog-content'>
                        <div className='token-pair'>
                          <h4>DEPOSIT AMOUNT</h4>
                        </div>
                      </div>

                      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                        <OutlinedInput
                          id="outlined-adornment-weight"
                          endAdornment={<InputAdornment position="end">USD</InputAdornment>}
                          aria-describedby="outlined-weight-helper-text"
                          inputProps={{
                            'aria-label': 'weight',
                          }}
                        />
                      </FormControl>

                      <Stack spacing={2} direction="row" className='dolar-range-deposit-amnt'>
                        <Button className='active-cls' variant="outlined">$100</Button>
                        <Button variant="outlined">$1000</Button>
                        <Button variant="outlined">Max</Button>
                      </Stack>

                      <div className='pair-block-change'>
                        <div className='pair-block-change-left'>
                          <div className='token-one top-token token-style'>


                            <div className='outer-block-with-balance'>
                              <div className='inner-block-with-balance'>
                                <div className='token-img-one token-img-style'>
                                  <img src={pancake} alt="pancake" />
                                </div>
                                <span>XRP</span>
                              </div>

                              <div className='balance-inner-righ'><span>0</span></div>
                            </div>

                          </div>
                        </div>
                        <div className='pair-block-change-right'>
                          <div className='token-two bottom-token token-style'>

                            <div className='outer-block-with-balance'>
                              <div className='inner-block-with-balance'>
                                <div className='token-img-two token-img-style'>
                                  <img src={busd} alt="busd" />
                                </div>
                                <span>BUSD</span>
                              </div>

                              <div className='balance-inner-righ'><span>0</span></div>
                            </div>

                          </div>
                        </div>
                      </div>

                      <div className='dialog-content'>
                        <div className='token-pair cake-button'>
                          <h4>HISTORY PRICE</h4>
                          <div><label className='View-prices-in'>View prices in</label><Button variant="outlined" startIcon={<SwapHorizIcon />}>XRP</Button></div>
                        </div>
                      </div>


                      <Box sx={{ width: '100%' }} className="history-price-tab-box">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs className='history-price-tab' value={valueHistoryPrice} onChange={handleHistoryPrice} aria-label="basic tabs example">
                            <Tab label="24H" {...a11yProps(0)} />
                            <Tab label="7D" {...a11yProps(1)} />
                            <Tab label="30D" {...a11yProps(2)} />
                            <Tab label="1Y" {...a11yProps(3)} />
                          </Tabs>
                        </Box>
                        <CustomTabPanel value={valueHistoryPrice} index={0}>
                          24H
                        </CustomTabPanel>
                        <CustomTabPanel value={valueHistoryPrice} index={1}>
                          7D
                        </CustomTabPanel>
                        <CustomTabPanel value={valueHistoryPrice} index={2}>
                          30D
                        </CustomTabPanel>
                        <CustomTabPanel value={valueHistoryPrice} index={3}>
                          1Y
                        </CustomTabPanel>
                      </Box>

                    </Grid>


                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                      {!showVlTier ?

                        <div class="vl3-lp-right">

                          <div className='dialog-content'>
                            <div className='token-pair cake-button'>
                              <h4>STAKED FOR</h4>
                            </div>
                          </div>

                          <Box sx={{ width: '100%' }} className="history-price-tab-box roi-price-tab-stack-for">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs className='history-price-tab roi-price-tabs-stack-for' value={roiStackFor} onChange={handleRoiStackFor} aria-label="basic tabs example">
                                <Tab label="24H" {...a11yProps(0)} />
                                <Tab label="7D" {...a11yProps(1)} />
                                <Tab label="30D" {...a11yProps(2)} />
                                <Tab label="1Y" {...a11yProps(3)} />
                                <Tab label="5Y" {...a11yProps(4)} />
                              </Tabs>
                            </Box>
                            {/* <CustomTabPanel value={valueHistoryPrice} index={0}>
                                  24H
                                  </CustomTabPanel>
                                  <CustomTabPanel value={valueHistoryPrice} index={1}>
                                  7D
                                  </CustomTabPanel>
                                  <CustomTabPanel value={valueHistoryPrice} index={2}>
                                  30D
                                  </CustomTabPanel>
                                  <CustomTabPanel value={valueHistoryPrice} index={3}>
                                  1Y
                                  </CustomTabPanel>
                                  <CustomTabPanel value={valueHistoryPrice} index={4}>
                                  5Y
                                  </CustomTabPanel> */}
                          </Box>

                          <div className='dialog-content'>
                            <div className='token-pair cake-button'>
                              <h4>COMPOUNDING EVERY</h4>
                            </div>
                          </div>

                          <Box sx={{ width: '100%' }} className="history-price-tab-box roi-price-tab-stack-for">
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                              <Tabs className='history-price-tab roi-price-tabs-stack-for' value={roiStackFor} onChange={handleRoiStackFor} aria-label="basic tabs example">
                                <Tab label="24H" {...a11yProps(5)} />
                                <Tab label="7D" {...a11yProps(6)} />
                                <Tab label="30D" {...a11yProps(7)} />
                                <Tab label="1Y" {...a11yProps(8)} />
                              </Tabs>
                            </Box>
                          </Box>

                          <div className='dialog-content'>
                            <div className='token-pair cake-button'>
                              <h4>SET PRICE RANGE</h4>
                            </div>
                            <div className='your-position-appear-here'>Your position will appear here.</div>
                          </div>

                          <div className='token-pair cake-button set-price-roi-calc'>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <div><label className='View-prices-in'>View prices in</label><Button variant="outlined" startIcon={<SwapHorizIcon />}>XRP</Button></div>
                            </Grid>
                          </div>


                          <Grid container spacing={2} className='liquidity-inner-blocks-right'>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <div className='min-max-price-block'>
                                <label>Min Price</label>
                                <div className='dec-incr'>
                                  <div onClick={decrementCount} className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                  <input type='text' value={count} />
                                  <div onClick={incrementCount} className='incr-icon'><AddCircleOutlineIcon /></div>
                                </div>
                                <label>USDT per XRP</label>
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <div className='min-max-price-block'>
                                <label>Min Price</label>
                                <div className='dec-incr'>
                                  <div className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                  <input type='text' value="0.0112000" />
                                  <div className='incr-icon'><AddCircleOutlineIcon /></div>
                                </div>
                                <label>XRP per USDT</label>
                              </div>
                            </Grid>
                          </Grid>
                          {/* <Stack spacing={2} direction="row" className='percentage-button-block'>
                                    <Button variant="outlined">10%</Button>
                                    <Button variant="outlined">20%</Button>
                                    <Button variant="outlined">50%</Button>
                                    <Button variant="outlined">Full Range</Button>
                                  </Stack> */}
                          <Button variant="outlined" className='full-range-button'>Full Range</Button>
                        </div>

                        :

                        <div class="vl2-lp-right">
                          <h3 className='my-position-head'>Your position will appear here.</h3>
                          <Grid container spacing={2} className='liquidity-inner-blocks-right'>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <div className='min-max-price-block'>
                                <label>Min Price</label>
                                <div className='dec-incr'>
                                  <div onClick={decrementCount} className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                  <input type='text' value={count} />
                                  <div onClick={incrementCount} className='incr-icon'><AddCircleOutlineIcon /></div>
                                </div>
                                <label>USDT per XRP</label>
                              </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                              <div className='min-max-price-block'>
                                <label>Min Price</label>
                                <div className='dec-incr'>
                                  <div className='decr-icon'><RemoveCircleOutlineIcon /></div>
                                  <input type='text' value="0.0112000" />
                                  <div className='incr-icon'><AddCircleOutlineIcon /></div>
                                </div>
                                <label>XRP per USDT</label>
                              </div>
                            </Grid>
                          </Grid>
                          <Button variant="contained" disabled className='balance-btn-submit'>Insufficient BUSD balance</Button>
                        </div>

                      }

                    </Grid>


                  </Grid>

                  <Grid container spacing={0} className='roi-at-calcullate-impermanent-loss'>
                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                      <div className='dialog-content'>
                        <div className='token-pair cake-button'>
                          <h4>CALCULATE IMPERMANENT LOSS</h4>
                        </div>
                        <FormControlLabel
                          control={<CalcImpLoss sx={{ m: 1 }} defaultChecked />}
                        />
                      </div>

                    </Grid>
                    <Grid container spacing={0} className='detail-calculate-loss-tables'>

                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className="padding-block-10px">

                        <div className='dialog-content'>
                          <div className='token-pair cake-button edit-reset-outer'>
                            <h4>ENTRY PRICE</h4>
                            <Stack spacing={2} direction="row" className='edit-reset-font'>
                              <Button variant="outlined">Edit</Button>
                              <Button variant="outlined">Reset</Button>
                            </Stack>
                          </div>
                        </div>

                        <TableContainer component={Paper} className='ABV-table'>
                          <Table aria-label="caption table">
                            <TableHead>
                              <TableRow>
                                <TableCell>ASSET</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>BALANCE</TableCell>
                                <TableCell>VALUE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell><div className='asset-mg-block-outer'><div className='asset-mg-block'><img src={row.assetimg} alt={row.assetimg} /></div>{row.asset}</div></TableCell>
                                  <TableCell>${row.price}</TableCell>
                                  <TableCell>{row.balance}</TableCell>
                                  <TableCell>${row.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className="padding-block-10px">

                        <div className='dialog-content'>
                          <div className='token-pair cake-button edit-reset-outer'>
                            <h4>ENTRY PRICE</h4>
                            <Stack spacing={2} direction="row" className='edit-reset-font'>
                              <Button variant="outlined">Edit</Button>
                              <Button variant="outlined">Reset</Button>
                            </Stack>
                          </div>
                        </div>

                        <TableContainer component={Paper} className='ABV-table'>
                          <Table aria-label="caption table">
                            <TableHead>
                              <TableRow>
                                <TableCell>ASSET</TableCell>
                                <TableCell>PRICE</TableCell>
                                <TableCell>BALANCE</TableCell>
                                <TableCell>VALUE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell><div className='asset-mg-block-outer'><div className='asset-mg-block'><img src={row.assetimg} alt={row.assetimg} /></div>{row.asset}</div></TableCell>
                                  <TableCell>${row.price}</TableCell>
                                  <TableCell>{row.balance}</TableCell>
                                  <TableCell>${row.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className="padding-block-10px">

                        <div className='dialog-content'>
                          <div className='token-pair cake-button edit-reset-outer'>
                            <h4>PROJECTED RESULTS </h4>
                          </div>
                          <div className='token-pair cake-button PROJECTED-RESULTS-outer'>
                            <h4><div className='PROJECTED-RESULTS'><span>$100</span><label>(0%)</label></div></h4>
                            <div className='HOLD-Tokens'>HOLD Tokens</div>
                          </div>
                        </div>

                        <TableContainer component={Paper} className='ABV-table'>
                          <Table aria-label="caption table">
                            <TableHead>
                              <TableRow>
                                <TableCell>ASSET</TableCell>
                                <TableCell>BALANCE</TableCell>
                                <TableCell>VALUE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell><div className='asset-mg-block-outer'><div className='asset-mg-block'><img src={row.assetimg} alt={row.assetimg} /></div>{row.asset}</div></TableCell>
                                  <TableCell>{row.balance}</TableCell>
                                  <TableCell>${row.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Grid>

                      <Grid item xs={12} sm={12} md={12} lg={6} xl={6} className="padding-block-10px">

                        <div className='dialog-content PROJECTED-RESULTS-outer-outer'>
                          {/* <div className='token-pair cake-button edit-reset-outer'>
                                <h4>PROJECTED RESULTS </h4>
                                </div> */}
                          <div className='token-pair cake-button PROJECTED-RESULTS-outer'>
                            <h4><div className='PROJECTED-RESULTS'><span>$100.973</span><label>(0.97%)</label></div></h4>
                            <div className='Provide-Liquidity'>Provide Liquidity</div>
                          </div>
                        </div>

                        <TableContainer component={Paper} className='ABV-table'>
                          <Table aria-label="caption table">
                            <TableHead>
                              <TableRow>
                                <TableCell>ASSET</TableCell>
                                <TableCell>BALANCE</TableCell>
                                <TableCell>VALUE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {rows.map((row) => (
                                <TableRow key={row.name}>
                                  <TableCell><div className='asset-mg-block-outer'><div className='asset-mg-block'><img src={row.assetimg} alt={row.assetimg} /></div>{row.asset}</div></TableCell>
                                  <TableCell>{row.balance}</TableCell>
                                  <TableCell>${row.value}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>

                      </Grid>


                    </Grid>
                  </Grid>

                  <Grid container spacing={0} className='roi-at-current-rate'>

                    <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>

                      <div className='dialog-content'>
                        <div className='token-pair cake-button'>
                          <h4>ROI AT CURRENT RATES</h4>
                        </div>
                        <h3 className='price-percentage-block-part'>$0.95 <span>(0.95%)</span></h3>
                      </div>

                    </Grid>

                  </Grid>

                  <Grid container spacing={0} className='roi-at-apply-setting'>
                    <Button variant="contained">apply settings</Button>
                  </Grid>

                </DialogContentText>
              </DialogContent>
            </div>

          </Box>

        </Dialog>

      </div>
    </>




  )

}
export default Farmimg
