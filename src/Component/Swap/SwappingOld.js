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

import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Select, selectClasses } from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { Popper } from '@mui/base/Popper';

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


import ethrouterAddress from '../../Web3/ContractAddress/ethrouterAddress'
import routerAddress from '../../Web3/ContractAddress/routerAddress';
import routeABI from '../../Web3/Abi/routeABI.json'

import wethAddress from '../../Web3/ContractAddress/wethAddress';
import xrpAddress from '../../Web3/ContractAddress/xrpAddress';
import erc20ABI from '../../Web3/Abi/erc20.json'

import Axios from '../../Axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import loader from '../../images/loader1.gif'

import chainLists1 from '../../chainList.json'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import consts from '../../Constansts';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
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

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const slots = {
        root: StyledButton,
        listbox: StyledListbox,
        popper: StyledPopper,
        ...props.slots,
    };

    return <Select {...props} ref={ref} slots={slots} />;
});

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

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

const StyledOption = styled(Option)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }
  `,
);

const StyledPopper = styled(Popper)`
  z-index: 1;
`;


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
    const [standardLowerValue, setStanderedLowerValue] = useState("")

    const [originalUpVal, setOriginalUpVal] = useState()
    const [originalDownVal, setOriginalDownVal] = useState()

    const [upperBalance, setUpperBalance] = useState("0")
    const [lowerBalance, setLowerBalance] = useState("0")

    const [tokenAdd1, setTokenAdd1] = useState('')
    const [tokenAdd2, setTokenAdd2] = useState('')

    const [loading, setLoading] = useState(false)

    const [network, setNetwork] = useState([])


    const [token1, settoken1] = useState([])
    const [token2, settoken2] = useState([])

    const [swap, setSwap] = useState(false)

    const [adminFeess, setAdminFee] = useState()

    const [adFee, setAdFee] = useState()

    const [selectchainfull, setselectchainfull] = useState()

    const [selectedChain, setSelectedChain] = useState()

    const [chainId, setChainId] = useState()

    const [browserChain, setbrowserChain] = useState()

    const [chainidcheck, setChainidcheck] = useState(false)

    const [routerAddresss, setRouterAddress] = useState()
    const [routerAbi, setRouterAbi] = useState()

    const getCurrentChainid = async () => {
        try {
            const browserChainId = await web3.eth.getChainId()
            setbrowserChain(browserChainId)
            if (Number(browserChainId) === chainId) {
                setChainidcheck(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentChainid()
    }, [chainId])


    const formatDecinal = (number) => {
        var init = 0
        var result;
        if (number?.toString()?.length > 3) {
            for (let i = 0; i <= number?.toString()?.length; i++) {
                const element = number?.toString()[i];
                if (init === 2) {
                    return result;
                } else {
                    if (result) {
                        result += element
                    } else {
                        result = element
                    }
                    if ((element !== '0') && (element !== '.')) {
                        init += 1
                    }
                }
            }
        } else {
            return number
        }

    }

    const getAssets = async () => {
        try {
            const { data } = await Axios.post(`/admin/getAssetsPair`, { chain: selectedChain })

            console.log("🚀 ~ file: Swapping.js:442 ~ getAssets ~ data:", data?.result)
            if (data.result.length > 0) {
                settoken1([])
                settoken2([])
                setUppertoken('Tokens')
                setLowertoken('Tokens')
                setUpperBalance('0')
                setLowerBalance('0')
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
            } else {
                settoken1([])
                settoken2([])
                setUppertoken('Tokens')
                setLowertoken('Tokens')
                setUpperBalance('0')
                setLowerBalance('0')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const adminFee = async (Network) => {
        try {
            const { data } = await Axios.post(`/admin/getAdminFee`, { Network: Network })
            setAdminFee(data.result[0])
            console.log("🚀 ~ file: Swapping.js:463 ~ adminFee ~ data:", data)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        if (selectchainfull) {
            adminFee(selectchainfull?._id)
        }

    }, [selectchainfull])

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

    const chainLists = async () => {
        try {
            const { data } = await Axios.get(`/admin/getNetwork`)
            setNetwork(data?.result)
            setSelectedChain(data?.result[0]?._id)
            setChainId(data?.result[0]?.chainId)
            setselectchainfull(data?.result[0])
        } catch (error) {
            console.log(error, "err")
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
        getAssets()
    }, [selectedChain])

    useEffect(() => {
        // getAssets()
        chainLists()
    }, [])


    const onChangeNetwork = async (chainIds) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainIds) }]
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
                            chainId: web3.utils.toHex(chainIds),
                            nativeCurrency: data?.nativeCurrency,
                            rpcUrls: [selectchainfull?.rpc_Url]
                        }
                    ]
                });
            }
        }
    }


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
                toast.error('Please Select Coin', {
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
                    // await window.ethereum.request({
                    //   method: "wallet_switchEthereumChain",
                    //   params: [{ chainId: "0x3e7" }],
                    // });

                    const account = await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    var address = [`${tokenAdd1}`, `${tokenAdd2}`]
                    // const bal = await web3.utils.toWei(upperValue, 'ether');
                    // swap Tokens

                    const WETHInstancess = new web3.eth.Contract(
                        erc20ABI,
                        tokenAdd1
                    );
                    var approvetoken;
                    var routeInstance;
                    const decimal = await WETHInstancess.methods.decimals().call()
                    console.log("🚀 ~ file: Swapping.js:619 ~ onSubmit ~ decimal:", decimal)
                    const bal = upperValue * (10 ** Number(decimal))
                    console.log("🚀 ~ file: Swapping.js:620 ~ onSubmit ~ bal:", bal)
                    // if (selectchainfull?.name === 'Ethereum Mainnet') {
                    //   const allowance = await WETHInstancess.methods.allowance(account[0], ethrouterAddress).call({})
                    //   if (Number(allowance) > 0) {
                    //     approvetoken = "approve"
                    //   } else {
                    //     approvetoken = await WETHInstancess.methods.approve(ethrouterAddress, bal).send({
                    //       from: account[0]
                    //     })
                    //   }
                    //   routeInstance = new web3.eth.Contract(
                    //     routeABI,
                    //     ethrouterAddress
                    //   );

                    // } else if (selectchainfull?.name === 'WAN') {
                    //   const allowance = await WETHInstancess.methods.allowance(account[0], routerAddress).call({})
                    //   if (Number(allowance) > 0) {
                    //     approvetoken = "approve"
                    //   } else {
                    //     approvetoken = await WETHInstancess.methods.approve(routerAddress, bal.toString()).send({
                    //       from: account[0]
                    //     })
                    //   }
                    //   routeInstance = new web3.eth.Contract(
                    //     routeABI,
                    //     routerAddress
                    //   );
                    // }
                    console.log(routerAddresss, "router")
                    const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call({})
                    if (Number(allowance) > 0) {
                        approvetoken = "approve"
                    } else {
                        approvetoken = await WETHInstancess.methods.approve(routerAddresss, bal.toString()).send({
                            from: account[0]
                        })
                    }
                    routeInstance = new web3.eth.Contract(
                        routerAbi,
                        routerAddresss
                    );


                    const time = new Date()
                    time.setMinutes(time.getMinutes() + 5)
                    // console.log(time, 'time')
                    // console.log(Date.parse(time), "timestamp")
                    if (approvetoken) {
                        const val = ((Number(adminFeess?.Percentage) * parseInt(originalDownVal)) / 100)
                        console.log(bal.toString(), 100, address, account[0], Date.parse(time), "asdfsfd")
                        const changes = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
                            from: account[0]
                        })
                        if (changes) {
                            const createTrade = await Axios.post(`/users/createTrade`, {
                                Pair: `${uppertoken}_${lowertoken}`,
                                amount: upperValue,
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
                            setTimeout(() => {
                                getBalance(tokenAdd1, "up")
                                getBalance(tokenAdd2, "")
                            }, 1000)
                            setLoading(false)
                        }

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
            // await window.ethereum.request({
            //   method: "wallet_switchEthereumChain",
            //   params: [{ chainId: "0x3e7" }],
            // });
            const WETHInstances = new web3.eth.Contract(
                erc20ABI,
                address
            );
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            if (type === "up") {
                const bal1 = await WETHInstances.methods.balanceOf(account[0]).call({ from: account[0] })
                const decimal = await WETHInstances.methods.decimals().call()
                setUpperBalance(parseFloat((Number(bal1) / (10 ** Number(decimal)))).toFixed(2))
                console.log("🚀 ~ file: Swapping.js:756 ~ getBalance ~ parseFloat((Number(bal1) / (10 ** Number(decimal)))).toFixed(2):", parseFloat((Number(bal1) / (10 ** Number(decimal)))).toFixed(2))
            } else {
                const bal2 = await WETHInstances.methods.balanceOf(account[0]).call({ from: account[0] })
                const decimal1 = await WETHInstances.methods.decimals().call()
                setLowerBalance(parseFloat((Number(bal2) / (10 ** Number(decimal1)))).toFixed(2))
                console.log("🚀 ~ file: Swapping.js:757 ~ getBalance ~ parseFloat((Number(bal2) / (10 ** Number(decimal1)))).toFixed(2):", parseFloat((Number(bal2) / (10 ** Number(decimal1)))).toFixed(2))
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

            // var routeInstance;
            // if (selectchainfull?.name === 'Ethereum Mainnet') {
            //   routeInstance = new web3.eth.Contract(
            //     routeABI,
            //     ethrouterAddress
            //   );
            // } else if (selectchainfull?.name === 'WAN') {
            //   routeInstance = new web3.eth.Contract(
            //     routeABI,
            //     routerAddress
            //   );
            // }

            var routeInstance = new web3.eth.Contract(
                routerAbi,
                routerAddresss
            );
            console.log(routerAbi, "Abi")

            // const am11 = await web3.utils.toWei(e, 'ether')
            const tokenInstance2 = new web3.eth.Contract(
                erc20ABI,
                tokenAdd1
            );

            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            const deci = await tokenInstance2.methods.decimals().call()
            const am = (e * (10 ** Number(deci)))
            if (am !== "0" && tokenAdd1 !== "" && (tokenAdd2 !== "" || address !== "")) {
                var amou;
                var decimal;
                if (address !== "") {
                    amou = await routeInstance.methods.getAmountsOut(am.toString(), [`${tokenAdd1}`, `${address}`]).call()
                    const tokenInstance = new web3.eth.Contract(
                        erc20ABI,
                        address
                    );
                    decimal = await tokenInstance.methods.decimals().call()
                } else {
                    amou = await routeInstance.methods.getAmountsOut(am.toString(), [`${tokenAdd1}`, `${tokenAdd2}`]).call()
                    const tokenInstance1 = new web3.eth.Contract(
                        erc20ABI,
                        tokenAdd2
                    );
                    decimal = await tokenInstance1.methods.decimals().call()
                }

                setOriginalDownVal(Number(amou[1]))
                const val = ((Number(adminFeess?.Percentage) * parseInt(Number(amou[1]))) / 100)
                // setAdFee(parseFloat(await web3.utils.fromWei(val, 'ether')).toFixed(2))
                // setLowerValue(parseFloat(await web3.utils.fromWei(parseInt(amou[1]) - val, 'ether')).toFixed(2))
                setAdFee(formatDecinal((Number(val) / (10 ** Number(decimal)))))
                setLowerValue(formatDecinal((Number(amou[1]) - Number(val)) / (10 ** Number(decimal))))
                const time = new Date()
                time.setMinutes(time.getMinutes() + 5)
                if (address !== "") {
                    console.log("if")
                    const changes = await routeInstance.methods.swapExactTokensForTokens(am.toString(), 100, [`${tokenAdd1}`, `${address}`], account[0], Date.parse(time)).estimateGas({
                        from: account[0]
                    })
                    console.log("🚀 ~ file: Swapping.js:832 ~ changes ~ changes:", changes)
                } else {
                    console.log(am.toString(), 100, [`${tokenAdd1}`, `${tokenAdd2}`], account[0], Date.parse(time), "else")
                    const changes = await routeInstance.methods.swapExactTokensForTokens(am.toString(), 100, [`${tokenAdd1}`, `${tokenAdd2}`], account[0], Date.parse(time)).estimateGas({ from: account[0] })
                    console.log("🚀 ~ file: Swapping.js:832 ~ changes ~ changes:", changes)
                }

            } else {
                setLowerValue("0")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const standardUpperChange = async (address) => {
        try {
            // setUpperValue(e)
            var routeInstance = new web3.eth.Contract(
                JSON.parse(address?.router_Abi),
                address?.router_contract
            );

            // const am11 = await web3.utils.toWei(e, 'ether')
            const tokenInstance2 = new web3.eth.Contract(
                erc20ABI,
                tokenAdd1
            );
            const deci = await tokenInstance2.methods.decimals().call()
            const am = (1 * (10 ** Number(deci)))
            if (am !== "0" && tokenAdd1 !== "" && (tokenAdd2 !== "" || address?.address2 !== "")) {
                var amou;
                var decimal;
                if (address !== "") {
                    console.log("if")
                    console.log(am.toString(), "resar")
                    amou = await routeInstance.methods.getAmountsOut(am.toString(), [`${tokenAdd1}`, `${address?.address2}`]).call()
                    const tokenInstance = new web3.eth.Contract(
                        erc20ABI,
                        address?.address2
                    );
                    decimal = await tokenInstance.methods.decimals().call()
                } else {
                    console.log('esle')
                    amou = await routeInstance.methods.getAmountsOut(am.toString(), [`${tokenAdd1}`, `${tokenAdd2}`]).call()
                    const tokenInstance1 = new web3.eth.Contract(
                        erc20ABI,
                        tokenAdd2
                    );
                    decimal = await tokenInstance1.methods.decimals().call()
                }
                // setOriginalDownVal(Number(amou[1]))
                const val = ((Number(adminFeess?.Percentage) * parseInt(Number(amou[1]))) / 100)
                // setAdFee(parseFloat(await web3.utils.fromWei(val, 'ether')).toFixed(2))
                // setLowerValue(parseFloat(await web3.utils.fromWei(parseInt(amou[1]) - val, 'ether')).toFixed(2))
                // setAdFee(formatDecinal((Number(val) / (10 ** Number(decimal)))))
                setStanderedLowerValue(formatDecinal((Number(amou[1]) - Number(val)) / (10 ** Number(decimal))))
            } else {
                setStanderedLowerValue("0")
            }
        } catch (error) {
            console.log(error)
            if (error?.data?.code == -32000) {
                try {
                    const browserChainId = await WEB.eth.getChainId()
                    if (browserChainId === consts.wan) {

                    } else if (browserChainId === consts.bnb)
        } catch (error) {
                    console.log("🚀 ~ file: Swapping.js:910 ~ standardUpperChange ~ error:", error)
                }
            }
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

                {
                    network?.length > 0 ?
                        <div className='blockchains'>
                            <ThemeProvider theme={darkTheme}>
                                <CustomSelect defaultValue={network?.length > 0 ? network[0]?.name : "WAN"} >

                                    {network?.length > 0 ?
                                        <>
                                            {network?.map((item, index) => {
                                                return (
                                                    <StyledOption value={item?.name} key={index} onClick={() => { onChangeNetwork(item?.chainId); setselectchainfull(item); setSelectedChain(item?._id); setChainId(item?.chainId) }} >{item?.name}</StyledOption>
                                                )
                                            })}
                                        </>
                                        :
                                        <></>}

                                </CustomSelect>
                            </ThemeProvider>
                        </div>
                        : <></>
                }



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
                                                            // <li key={index} onClick={() => { setUppertoken(item?.symbol1); setTokenAdd1(item?.address1); lowertokens(item); handleCloseNew(); getBalance(item?.address1, "up") }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'  >{item?.symbol1}</span></Link></li>
                                                            <li key={index} onClick={() => { setUppertoken(item?.symbol1); setTokenAdd1(item?.address1); lowertokens(item); handleCloseNew(); getBalance(item?.address1, "up"); }} ><Link><div className='coin-name-img'>   <div className='no-img'>{item?.symbol1 ? item?.symbol1.charAt(0) : 'Z'}</div></div><span className='con-modal-name'  >{item?.symbol1}</span></Link></li>
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
                                                            // <li key={index} onClick={() => { setLowertoken(item?.symbol2); setTokenAdd2(item?.address2); handleClose(); getBalance(item?.address2, "down", "check") }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'  >{item?.symbol2}</span></Link></li>
                                                            <li key={index} onClick={() => { setLowertoken(item?.symbol2); setTokenAdd2(item?.address2); handleClose(); getBalance(item?.address2, "down", "check"); standardUpperChange(item); setRouterAddress(item?.router_contract); setRouterAbi(JSON.parse(item?.router_Abi)) }} ><Link><div className='coin-name-img'>   <div className='no-img'>{item?.symbol2 ? item?.symbol2.charAt(0) : 'Z'}</div></div><span className='con-modal-name'  >{item?.symbol2}</span></Link></li>
                                                        )
                                                    })
                                                }
                                                {/* <li onClick={() => { setLowertoken("XRP"); handleClose() }} ><Link><div className='coin-name-img'><img src={coins1} /></div><span className='con-modal-name'>XRP</span></Link></li> */}
                                            </nav>
                                        </Box>
                                    </Modal>

                                </Grid>

                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='dollar-value-with-percent'><span className='dollar-value'>{lowerBalance}</span><span className='dollar-value-percentage'>({adminFeess?.Percentage}%)</span></div></Grid>
                            </Grid>
                            <Grid container spacing={0} className={classes.gridinput}>
                                <div className='block-chain-swap'><span>Admin Fee</span><span>{adFee}</span></div>
                                <div className='overall-swap-rate'>
                                    <div className='block-chain-swap'><span>1 {uppertoken} = {standardLowerValue != '' ? standardLowerValue : '0'} {lowertoken}</span></div>
                                    <div className='swaping-rate-block-chain'><img src={swaprate} /><span>$7.78</span></div>
                                </div>
                            </Grid>
                        </Grid>
                        {
                            chainidcheck === true ?
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Button variant="contained" className='Swap-Coins' onClick={onSubmit} >Swap Coins</Button></Grid>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Button variant="contained" className='Swap-Coins' onClick={() => { onChangeNetwork(chainId) }} >Change Network</Button></Grid>
                        }

                    </Grid>
                </Grid>

            </div>
        </>


    )
}

export default Swapping
