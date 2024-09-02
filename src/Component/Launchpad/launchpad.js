import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import swapp from '../../images/swapping.png'
import './launchpad.css';
import LinearProgress from '@mui/material/LinearProgress';
import spacek from '../../images/spacek-logo.png';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import CancelIcon from '@mui/icons-material/Cancel';
import Axios from '../../Axios'
import thankyou from '../../images/thankyou.gif'
import { border, borderRadius } from '@mui/system';
import { useSDK } from '@metamask/sdk-react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import coinswapimg from '../../images/coinswapimg.png';
import { alpha } from '@mui/material/styles';
import swaprate from '../../images/swaprate.png'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Web3 from 'web3';
import consts from '../../Constansts';
import erc20ABI from '../../Web3/Abi/erc20.json'
import USDTABI from '../../Web3/Abi/USDT.json'
import XDCABI from '../../Web3/Abi/XDCUSDT.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowDropUpSharp } from '@mui/icons-material';
import loader from '../../images/loader1.gif'
import mobmenulogo from '../../images/logo-footer.png'

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const history = [
    createData('29.07.2024', 159, 6.0, 'Completed', 4.0),
    createData('29.07.2024', 159, 6.0, 'Completed', 4.0),
    createData('29.07.2024', 159, 6.0, 'Completed', 4.0),
    createData('29.07.2024', 159, 6.0, 'Completed', 4.0),
];


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // height:'500px',
    // overflowY:'scroll',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: '#2c2a2a',
    color: '#fff',
    borderRadius: "15px",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const styleBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#2c2a2a',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
};

const styleToken = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    '@media (max-width: 767.98px)': {
        width: 245,
    },
    bgcolor: '#2c2a2a',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px",
};




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


function valuetext(value) {
    return `${value}°C`;
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyles = makeStyles({

    tablestakingblock: {
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
        padding: '50px 55px !important',
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
    innerlaunchpad: {
        boxShadow: 'none !important',
    }
});

const rows = [
    { price: 'Price Pool' },
    { price: 'Price Pool' },
    { price: 'Price Pool' },
    { price: 'Price Pool' },

]


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

const launchpad = () => {
    var WEB = new Web3(window.ethereum);
    useEffect(() => {
        document.title = "Zebra Exchange | Launchpad"
    }, [])

    const { sdk, connected, connecting, provider, chainId, account } = useSDK();

    const classes = useStyles();
    const navigate = useNavigate()
    const location = useLocation();
    const inputValues = location.state;
    const [modelData, setModelData] = useState('')
    const [siteurl, setSiteurl] = useState('')
    const [navigation, setNavigation] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSelectedData = async (item) => {
        setModelData(item);
        setSiteurl(item?.Network);
    }


    // console.log(inputValues, 'trying...!!');

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [creates, setCreates] = useState(null)

    const handleClick = () => {
        setCreates(true); // Start loading
        // setTimeout(() => {
        setCreates(false);
        navigate('/creates'); // Navigate to the other page after 3 seconds
        // }, 3000);
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [userLaunchpads, setUserLanchPads] = useState([]);
    const [metaid, setMetaid] = useState('')
    const [chain, setchain] = useState("")

    const getAccount = async () => {

        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        setMetaid(account[0])
        let chain = await WEB.eth.getChainId()
        setchain(chain)
    }


    const getLaunchpads = async () => {
        try {
            const { data } = await Axios.post(`/users/getLaunchPad/`, { type: value == '0' ? account : 'sale', id: value == '0' ? '' : account })
            if (data?.success) {
                setUserLanchPads(data?.result)
            } else {
                setUserLanchPads([])
            }

        } catch (error) {
            console.log(error, 'error');
        }

    }

    useEffect(() => {
        // alert('CALING LANCH PAD');
        if (account != undefined) {
            getLaunchpads();
        } else {
            setMetaid('');
            setUserLanchPads([]);
        }
    }, [account, value])

    useEffect(() => {
        getAccount();
        connectwallet();
    }, [metaid])

    useEffect(() => {
    }, [account])


    useEffect(() => {
        // alert(siteurl)
        switch (siteurl) {
            case 'Binance Smart Chain':
                setNavigation('https://bscscan.com/address/')
                break;
            case 'Wanchain':
                setNavigation('https://wanexplorer.io/address/')
                break;
            case 'Ethereum':
                setNavigation('https://etherscan.io/address/')
                break;
            case 'Shardeum Sphinx':
                setNavigation('https://explorer-sphinx.shardeum.org/account/')
                break;
            case 'XDC':
                setNavigation('https://explorer.xinfin.network/address/')
                break;
            case 'Base':
                setNavigation('https://basescan.org/address/')
                break;
            case 'xdc testnet':
                setNavigation('https://explorer.xinfin.network/address/')
                break;
            default:
                break;
        }
    }, [siteurl])

    const connectwallet = async () => {
        try {

            const accounts = await sdk.connect();
            setMetaid(accounts[0]);

        } catch (err) {
            console.warn(`failed to connect..`, err);
        }
    }



    const [openz, setOpenz] = React.useState(false);

    const handleCloseBox = () => {
        setAmount("")
        setAmount2("")
        setTokenbal("")
        setAdmnfee("")
        setOpenz(false);
    }
    const [openNew, setOpenNew] = React.useState(false);
    const handleOpenNew = () => setOpenNew(true);
    const handleCloseNew = () => setOpenNew(false);
    const [uppertoken, setUppertoken] = useState("Tokens")
    const [lowertoken, setLowertoken] = useState("Tokens");
    const [token1, settoken1] = useState([])
    const [token2, settoken2] = useState([])
    const [upperBalance, setUpperBalance] = useState("0")
    const [lowerBalance, setLowerBalance] = useState("0");
    const [swap, setSwap] = useState(false);
    const [standardLowerValue, setStanderedLowerValue] = useState("")
    const [gasPrice, setGasPrice] = useState();
    const [chainidcheck, setChainidcheck] = useState(false);
    const [landetails, setLandetails] = useState("");
    const [buydetails, setBuydetails] = useState("");
    const [tokenbal, setTokenbal] = useState("")
    const [amount, setAmount] = useState("")
    const [amount2, setAmount2] = useState("")
    const [amounterr, setAmounterr] = useState("")
    const [openCreate, setOpenCreate] = React.useState(false);
    const [estigas, setEstigas] = useState("")
    const [admnfee, setAdmnfee] = useState("")
    const [amounttra, setAmounttra] = useState("")
    const [historyy, setHistoryy] = useState([])

    // const handleOpenCreate = () => setOpenCreate(true);
    const handleOpenBox = async (data) => {
        // setBuydetails("")
        // setOpenz(true);
        // setBuydetails(data)
        let network = data?.pay_by
        let net = network?.split("(")[0]
        console.log(net, chain, "chainidtochange");
        if (net === "Ethereum" && chain != 1) {
            console.log("changeeth");
            await onChangeNetwork(1)
            setchain("")
            setBuydetails("")
            setBuydetails(data)
        } else if (net === "XDC" && chain != 50) {
            console.log("changexdc");
            await onChangeNetwork(50)
            setchain("")
            setBuydetails("")
            setBuydetails(data)
        } else if (net === "Wanchain" && chain != 888) {
            console.log("changewan");
            await onChangeNetwork(888)
            setchain("")
            setBuydetails("")
            setBuydetails(data)
        } else if (net === "Ethereum" && chain === 1) {
            setchain("")
            setBuydetails("")
            setBuydetails(data)
            setOpenz(true)
        } else if (net === "XDC" && chain === 50) {
            setchain("")
            setBuydetails("")
            setBuydetails(data)
            setOpenz(true)
        } else if (net === "Wanchain" && chain === 888) {
            setchain("")
            setBuydetails("")
            setBuydetails(data)
            setOpenz(true)
        }

    }

    const handleOpenCreate = (data) => {
        setLandetails("")
        setOpenCreate(true);
        setLandetails(data)
    }


    const handleCloseCreate = () => setOpenCreate(false);


    const getbalance = async () => {
        // console.log(buydetails.pay_by,"buydetails");
        let network = buydetails.pay_by
        let net = network?.split("(")[0]
        if (openz === true) {
            if (net === "Ethereum") {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    consts.ETH_USDT_Address
                );
                let bal2 = await ERC20Instance.methods.balanceOf(account[0]).call();
                //   console.log(Number(bal2)/ 10**6,"vijay456998");
                setTokenbal(Number(Number(bal2) / 10 ** 6))
            } else if (net === "Wanchain") {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    consts.WAN_USDT_Address
                );
                let bal2 = await ERC20Instance.methods.balanceOf(account[0]).call();
                setTokenbal(Number(Number(bal2) / 10 ** 6))
            } else if (net === "XDC") {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    XDCABI,
                    consts.XDC_USDT_Address
                );
                let bal2 = await ERC20Instance.methods.balanceOf(account[0]).call();
                setTokenbal(Number(Number(bal2) / 10 ** 6))
            }
        }


    }

    useEffect(() => {
        getbalance()
    }, [buydetails])





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
            setGasPrice()
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
            setGasPrice()
            setUpperBalance(bal2)
            setLowerBalance(bal1)
            setTokenAdd1(add2)
            setTokenAdd2(add1)
        }
    }


    const onChangeNetwork = async (chainIds) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: WEB.utils.toHex(chainIds) }]
            });
            setOpenz(true);
        } catch (err) {
            console.log("🚀 ~ onChangeNetwork ~ err:", err)
            // This error code indicates that the chain has not been added to MetaMask
            if (err?.data?.originalError?.code == 4902) {
                var data;

                for (let i = 0; i < chainLists1.length; i++) {
                    const element = chainLists1[i];
                    if (element?.chainId === chainIds) {
                        data = element
                    }
                }

                // await window.ethereum.request({
                //   method: 'wallet_addEthereumChain',
                //   params: [
                //     {
                //       chainName: data?.chain,
                //       chainId: web3.utils.toHex(chainIds),
                //       nativeCurrency: data?.nativeCurrency,
                //       rpcUrls: [selectchainfull?.rpc_Url]
                //     }
                //   ]
                // });

                await provider
                    .request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: `0x${chainIds.toString(16)}`,
                                chainName: data?.chain,
                                // blockExplorerUrls: ['https://polygonscan.com'],
                                nativeCurrency: { symbol: data?.nativeCurrency?.symbol, decimals: 18 },
                                rpcUrls: ["https://gwan-ssl.wandevs.org:56891/"],
                            },
                        ],
                    })
            }
        }
    }

    const tokenamountonchange = async (e) => {
        setEstigas("")
        setAmount2("")
        setAdmnfee("")
        setAmount(Number(e))
        await getbalance()
        if (e > 0) {
            setAmounterr("")

            let fee = Number(e) * 1 / 100
            let amount = Number(e) - Number(fee)
            setAmounttra(amount)
            setAmount2(Number(amount) * Number(buydetails.Token_value_in_usdt))
            setAdmnfee(Number(fee))
        } else {
            setAmounterr("Amount Should be Greater Than 0")
        }
    }

    useEffect(() => {
        getgas();
    }, [amount])

    const getgas = async () => {
        if (amount > 0 && openz === true) {
            let network = buydetails?.pay_by
            let net = network?.split("(")[0]
            if (net === "Ethereum") {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    USDTABI,
                    consts.ETH_USDT_Address
                );
                let add = account[0]
                let estimateGas = await WEB.eth.estimateGas({
                    "value": "0", // Only tokens
                    "data": ERC20Instance.methods.transfer(buydetails?.Owner_address, "100").encodeABI(),
                    "from": buydetails?.Owner_address,
                    "to": add
                });
                let am = WEB.utils.fromWei(Number(estimateGas).toString(), 'Gwei')
                setEstigas(am)
            } else if (net === "Wanchain") {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    consts.WAN_USDT_Address
                );
                let add = account[0]
                let estimateGas = await WEB.eth.estimateGas({
                    "value": "0", // Only tokens
                    "data": ERC20Instance.methods.transfer(buydetails?.Owner_address, "100").encodeABI(),
                    "from": buydetails?.Owner_address,
                    "to": add
                });
                let am = WEB.utils.fromWei(Number(estimateGas).toString(), 'Gwei')
                setEstigas(am)
            } else {
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    XDCABI,
                    consts.XDC_USDT_Address
                );
                let add = account[0]
                let estimateGas = await WEB.eth.estimateGas({
                    "value": "0", // Only tokens
                    "data": ERC20Instance.methods.transfer(buydetails?.Owner_address, "100").encodeABI(),
                    "from": buydetails?.Owner_address,
                    "to": add
                });
                let am = WEB.utils.fromWei(Number(estimateGas).toString(), 'Gwei')
                setEstigas(am)
            }

        }
    }

    const Buytoken = async () => {
        try {
            await getbalance()
            let cont_address
            let address
            if (tokenbal === 0) {
                setLoadersss(false)
                toast.error("Insufficient Balance")
            }
            else if (!amount) {
                setLoadersss(false)
                toast.error("Invalid Amount")
            }
            else if (amounterr) {
                setLoadersss(false)
                toast.error("Invalid Amount")
            } else {
                handleLoadersss()
                if (buydetails?.Network === "Ethereum") {
                    cont_address = consts.ETH_USDT_Address
                    address = "0x52307495A627c14DF5590556b0F4cFd994334b14"
                } else if (buydetails?.Network === "Wanchain") {
                    cont_address = consts.WAN_USDT_Address
                    address = "0x0AD07ebe2543Fa09C069f62Bda2BEe18F12954D2"
                } else if (buydetails?.Network === "XDC") {
                    cont_address = consts.XDC_USDT_Address
                    address = "0x52307495A627c14DF5590556b0F4cFd994334b14"
                }
                const account = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                let ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    cont_address
                );
                let Tranadmin = await ERC20Instance.methods.transfer(address, admnfee * 10 ** 6).send({ from: account[0] });
                if (Tranadmin.transactionHash) {
                    let transamou = await ERC20Instance.methods.transfer(buydetails?.Owner_address, amounttra * 10 ** 6).send({ from: account[0] });
                    if (transamou.transactionHash) {
                        console.log(transamou.transactionHash, "vijay");
                        let payload = {
                            Project_Name: buydetails?.Project_Name,
                            Project_id: buydetails?._id,
                            Token_Name: buydetails?.Token_Name,
                            Network: buydetails?.Network,
                            Token_symbol: buydetails?.Token_symbol,
                            Tokens: amount2,
                            Usdt: amounttra,
                            admin_Usdt: admnfee,
                            User_address: account[0],
                            pay_by: buydetails?.pay_by,
                            Transaction: transamou,
                            Admin_Transaction: Tranadmin,
                            Transactionhas: transamou.transactionHash,
                            Admin_Transactionhas: Tranadmin.transactionHash
                        }
                        const { data } = await Axios.post(`/users/Launchpadtransaction/`, { payload })
                        if (data) {
                            setLoadersss(false)
                            setAmount("")
                            setAmount2("")
                            setTokenbal("")
                            setAdmnfee("")
                            setOpenz(false)
                            toast.success("Transaction Successfull")
                        } else {
                            setLoadersss(false)
                            toast.error("Failed to send transaction")
                        }
                    }

                }
            }
        } catch (error) {
            console.log(error, "err");
            if (error.code === 4001) {
                setLoadersss(false)
                toast.error(error.message)
            } else {
                setLoadersss(false)
                toast.error("Failed to send transaction")
            }
        }

    }

    const gethistory = async () => {
        try {
            const { data } = await Axios.post(`/users/LaunchpadHistory/`, { address: metaid })
            setHistoryy(data.result)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        gethistory()
    }, [])

    const [loadersss, setLoadersss] = React.useState(false);
    const handleLoadersss = () => setLoadersss(true);


    return (
        <>
            {
                loading === true ? <div className='swap-loader'><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div> : <></>
            }
            <div className='launchpad-page'>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={0} >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
                            <Item className={classes.headercls}>
                                <Header />
                            </Item>
                        </Grid>
{/* 
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Item id="bd-img-breadcum">
                                <Box sx={{ flexGrow: 1 }}>

                                    <Grid container spacing={0}>


                                        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                            <div className='crypto-banner-txt applctn-banner-txt Voting-block'>
                                                <h2>Launchpad</h2>
                                            </div>
                                        </Grid>



                                    </Grid>

                                </Box>
                            </Item>
                        </Grid> */}

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Item className={classes.innerlaunchpad}>

                                <Grid container spacing={0} >

                                    <Box sx={{ width: '100%' }}>
                                        <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>

                                        </Grid>
                                        <section className="Launchpad">
                                            <Box className="launchpad-content">
                                                <div className='spacex-part'>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderColor: 'divider', display: 'flex', justifyContent: 'space-between' }} className='launchpadtab'>
                                                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                                                <Tab label="My Sales" {...a11yProps(0)} />
                                                                <Tab label="Sales" {...a11yProps(1)} />
                                                                <Tab label="History" {...a11yProps(2)} />

                                                            </Tabs>

                                                            <div className='grt-skk'>
                                                                <Button onClick={handleClick}>{creates ? <CircularProgress style={{ width: '25px', height: '25px' }} /> : 'Create'}</Button>
                                                            </div>
                                                        </Box>
                                                        <CustomTabPanel value={value} index={0}>

                                                            <div className='price-pool'>
                                                                <Grid container className="price-pool-block" spacing={2}>
                                                                    {/* {rows.map((san, ind) => { */}
                                                                    {userLaunchpads.length > 0 ?
                                                                        userLaunchpads.map((san, ind) => {
                                                                            return (

                                                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12} key={ind}>
                                                                                    <div className="launchpad-price-pool">
                                                                                        <div className="div-content">
                                                                                            {/* <h6>{san.price}</h6> */}
                                                                                            <h6>Price Pool</h6>
                                                                                            <h3>
                                                                                                {/* 20,000 SKK */}
                                                                                                {san?.Launch_price} {san?.Token_symbol}
                                                                                            </h3>
                                                                                            <h4>
                                                                                                {/* SKK Airdrop for ZBR Holders */}
                                                                                                {san?.Project_Name} Airdrop for ZBR Holders

                                                                                            </h4>
                                                                                            <p>
                                                                                                {/* Users will receive SKK through the airdrop according to the
                                                                                        amount of ZBR they hold. Formula: The ZBR held by the
                                                                                        participating user / The total amount of all participating
                                                                                        users * 20,000 SKK */}
                                                                                                {san?.Description}
                                                                                            </p>
                                                                                        </div>
                                                                                        <Stack direction="row" spacing={1} className='chip-span'>
                                                                                            {/* <Chip label="Start-Date:3-5-24" color="success" />
                                                                                    <Chip label="End-Date:5-5-24" color="error" /> */}
                                                                                            <Chip label={`Start-Date:${san?.Start_date?.split('T')[0]}`} color="success" />
                                                                                            <Chip label={`End-Date:${san?.End_date?.split('T')[0]}`} color="error" />
                                                                                        </Stack>

                                                                                        <div className='buy-btn'>
                                                                                            <Button className="pricepool-btn" onClick={() => { handleSelectedData(san); handleOpen(); }}>Show</Button>
                                                                                        </div>
                                                                                    </div>
                                                                                </Grid>

                                                                            )
                                                                        }) : metaid == '' ? <h3 className='nodatafound'> <img src={thankyou} /> Please Connect Your Wallet</h3> :
                                                                            <div className='nodatafound'>
                                                                                <img src={thankyou} />
                                                                                No Data Found
                                                                            </div>
                                                                    }

                                                                </Grid>
                                                            </div>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={1}>

                                                            <div className='price-pool'>
                                                                <Grid container className="price-pool-block" spacing={2}>
                                                                    {userLaunchpads.length > 0 ?
                                                                        userLaunchpads.map((san, ind) => {
                                                                            return (

                                                                                <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                    <div className="launchpad-price-pool">
                                                                                        <div className="div-content">
                                                                                            {/* <h6>{san.price}</h6> */}
                                                                                            <h3>
                                                                                                {/* 20,000 SKK */}
                                                                                                {san?.Launch_price} {san?.Token_symbol}
                                                                                            </h3>
                                                                                            <h4>
                                                                                                {/* SKK Airdrop for ZBR Holders */}
                                                                                                {san?.Project_Name} Airdrop for ZBR Holders
                                                                                            </h4>
                                                                                            <p>
                                                                                                {/* Users will receive SKK through the airdrop according to the
                                                                                        amount of ZBR they hold. Formula: The ZBR held by the
                                                                                        participating user / The total amount of all participating
                                                                                        users * 20,000 SKK */}
                                                                                                {san?.Description}
                                                                                            </p>
                                                                                        </div>
                                                                                        <Stack direction="row" spacing={1} className='chip-span'>
                                                                                            <Chip label={`Start-Date:${san?.Start_date?.split('T')[0]}`} color="success" />
                                                                                            <Chip label={`End-Date:${san?.End_date?.split('T')[0]}`} color="error" />
                                                                                        </Stack>

                                                                                        <div className='buy-btn'>
                                                                                            <Button onClick={() => handleOpenBox(san)} className="pricepool-btn">Buy Token</Button>
                                                                                            <Button onClick={() => handleOpenCreate(san)} className="pricepool-btn">Show</Button>
                                                                                            <Modal
                                                                                                open={openz}
                                                                                                // onClose={handleCloseBox}
                                                                                                aria-labelledby="modal-modal-title"
                                                                                                aria-describedby="modal-modal-description"
                                                                                            >
                                                                                                <Box className="stylebox">

                                                                                                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                                                                                        <div className='buy-swap'>
                                                                                                            <span className='select-token-head-modal-close' onClick={handleCloseBox}><HighlightOffIcon /></span>
                                                                                                            <Grid container spacing={0}>
                                                                                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                                                                    <div className='swapp-img'>BUY</div>
                                                                                                                    <p className='swap-para'>Buy-Tokens and Get the best Offers and Benefits With Zebra's Launchpad feature</p>
                                                                                                                </Grid>
                                                                                                                <Grid className='grid-swap-outer'>


                                                                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='swap-token token-input'>

                                                                                                                        <Grid container spacing={0} className={classes.gridinput}>

                                                                                                                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}><input type='Number' value={amount} onChange={(e) => tokenamountonchange(e.target.value)} /></Grid>
                                                                                                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>

                                                                                                                                <div className='token-button-link'>{buydetails.pay_by ? buydetails.pay_by : "USDT"}</div>
                                                                                                                                {/* onClick={handleOpenNew} */}
                                                                                                                                {/* <Modal
                                                                                                                            open={openNew}
                                                                                                                            aria-labelledby="modal-modal-title"
                                                                                                                            aria-describedby="modal-modal-description"
                                                                                                                        >
                                                                                                                            <Box sx={styleToken} className={classes.modaltokenlist}>

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
                                                                                                                        </Modal> */}

                                                                                                                            </Grid>
                                                                                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><span className='dollar-value'>{`${tokenbal} USDT`}</span></Grid>
                                                                                                                        </Grid>

                                                                                                                    </Grid>

                                                                                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='swap-token token-input'>
                                                                                                                        <Grid container spacing={0} className={classes.gridinput}>
                                                                                                                            <Grid item xs={12} sm={7} md={7} lg={7} xl={7}><input type='Number' value={amount2} /></Grid>
                                                                                                                            <Grid item xs={12} sm={5} md={5} lg={5} xl={5}>
                                                                                                                                <div className='token-button-link'>{buydetails.Token_Name ? buydetails.Token_Name : "USDT"}</div>

                                                                                                                                {/* <Modal

                                                                                                                            open={open}
                                                                                                                            aria-labelledby="modal-modal-title"
                                                                                                                            aria-describedby="modal-modal-description"

                                                                                                                        >
                                                                                                                            <Box sx={styleToken} className={classes.modaltokenlist}>

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
                                                                                                                                                
                                                                                                                                                <li key={index} onClick={() => { setLowertoken(item?.symbol2); setTokenAdd2(item?.address2); handleClose(); getBalance(item?.address2, "down", "check"); standardUpperChange(item); setRouterAddress(item?.router_contract); setRouterAbi(JSON.parse(item?.router_Abi)) }} ><Link><div className='coin-name-img'>   <div className='no-img'>{item?.symbol2 ? item?.symbol2.charAt(0) : 'Z'}</div></div><span className='con-modal-name'  >{item?.symbol2}</span></Link></li>
                                                                                                                                            )
                                                                                                                                        })
                                                                                                                                    }
                                                                                                                                  
                                                                                                                                </nav>
                                                                                                                            </Box>
                                                                                                                        </Modal> */}

                                                                                                                            </Grid>

                                                                                                                            {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><div className='dollar-value-with-percent'><span className='dollar-value'>{lowerBalance}</span><span className='dollar-value-percentage'>({adminFeess?.Percentage}%)</span></div></Grid> */}
                                                                                                                        </Grid>
                                                                                                                        <Grid  spacing={0} className={classes.gridinput}>
                                                                                                                            <div className='admin-fee-direct'>
                                                                                                                            <div className='block-chain-swap'><span>Admin Fee 1%</span><span></span></div>
                                                                                                                            <div className='swaping-rate-block-chain'>{admnfee}</div>
                                                                                                                            </div>

                                                                                                                            <div className='overall-swap-rate launch-swap'>
                                                                                                                                {<div className='block-chain-swap'><span>1 {buydetails.pay_by ? buydetails.pay_by : "USDT"} = {buydetails.Token_value_in_usdt != '' ? buydetails.Token_value_in_usdt : '0'}{buydetails.Token_Name != '' ? buydetails.Token_Name : '0'} {lowertoken}</span></div>}
                                                                                                                                {<div className='swaping-rate-block-chain'><img src={swaprate} /><span>{estigas ? `${estigas} Gas` : '0'}</span></div>}

                                                                                                                            </div>
                                                                                                                            <span style={{ color: "red" }}>{amounterr}</span>
                                                                                                                        </Grid>
                                                                                                                    </Grid>
                                                                                                                    {
                                                                                                                        tokenbal > 0 ?
                                                                                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                                                                                                <Button variant="contained" className='Swap-Coins' onClick={() => { Buytoken(); }} >{`BUY ${buydetails?.Token_Name}`}</Button>
                                                                                                                            </Grid>

                                                                                                                            // <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Button variant="contained" className='Swap-Coins' onClick={onSubmitETH} >Swap Coins</Button></Grid>
                                                                                                                            :
                                                                                                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}><Button variant="contained" className='Swap-Coins' >{`Your Balance is ${tokenbal}  ${buydetails?.Network} USDT`}</Button></Grid>
                                                                                                                    }

                                                                                                                </Grid>
                                                                                                            </Grid>
                                                                                                        </div>
                                                                                                    </Typography>
                                                                                                </Box>
                                                                                            </Modal>
                                                                                            <Modal
                                                                                                open={loadersss}
                                                                                                aria-labelledby="modal-modal-title"
                                                                                                aria-describedby="modal-modal-description"
                                                                                            >
                                                                                                <div className='swap-loader'><div className='swap-loader-inner'><img src={loader} className='loadings' /></div></div>
                                                                                            </Modal>
                                                                                            <Modal
                                                                                                open={openCreate}
                                                                                                aria-labelledby="modal-modal-title"
                                                                                                aria-describedby="modal-modal-description"
                                                                                            >
                                                                                                <Box className="create-list">
                                                                                                    <div className="create-history">
                                                                                                        <div className='sales-head'>
                                                                                                        <div className='project-detail-full'>
                                                                                                       
                                                                                                        <div className="list-detail">
                                                                                                                        <div className='project-name'>
                                                                                                                            <p>Logo:</p>
                                                                                                                        </div>
                                                                                                                        <div className='project-name'>
                                                                                                                            <img src={mobmenulogo} />
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <div className="list-detail">
                                                                                                                        <div className='project-name'>
                                                                                                                            <p>Project Name : </p>
                                                                                                                        </div>
                                                                                                                        <div className='project-name'>
                                                                                                                            <span>{landetails ? landetails?.Project_Name : ""} </span>
                                                                                                                        </div>
                                                                                                                    </div>

                                                                                                                    <span className='select-token-head-modal-close' onClick={handleCloseCreate}><HighlightOffIcon /></span>
                                                                                                                </div>
                                                                                                        </div>
                                                                                                       
                                                                                                        <Grid container className="price-pool-block pop-block" spacing={2}>
                                               
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Token Name:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Token_Name : ""}  </span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Website:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Website : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Network:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Network : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Description:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Description : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Whitepaper link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.WhitePaper : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Twitter link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Twitter : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Discord link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Discord : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Instagram link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Instagram : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Reddit link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Reddit : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>LinkedIn link:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.LinkedIn : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            {/* <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Logo:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Logo : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid> */}
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Token symbol:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Token_symbol : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Launch price:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Launch_price : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Total supply:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Total_supply : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Contract Address:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Contract_address : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Min Raise Amount(soft cap):</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Mim_raise_amou : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Min Raise Amount(hard cap):</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Max_raise_amou : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Sale start:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.Start_date : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Sale end:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.End_date : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                            <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                                                                                                                <div className="list-detail">
                                                                                                                    <div className='project-name'>
                                                                                                                        <p>Pay BY:</p>
                                                                                                                    </div>
                                                                                                                    <div className='project-name'>
                                                                                                                        <span>{landetails ? landetails?.pay_by : ""}</span>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </Grid>
                                                                                                        </Grid>

                                                                                                    </div>
                                                                                                </Box>
                                                                                            </Modal>
                                                                                        </div>
                                                                                    </div>
                                                                                </Grid>

                                                                            )
                                                                        }) :
                                                                        <div className='nodatafound'>
                                                                            <img src={thankyou} />
                                                                            No Sale Found
                                                                        </div>
                                                                    }

                                                                </Grid>
                                                            </div>
                                                        </CustomTabPanel>
                                                        <CustomTabPanel value={value} index={2}>

                                                            <div className='price-pool'>
                                                                {/* <TableContainer component={Paper}>
                                                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                    <TableHead>
                                                                        <TableRow>
                                                                            <TableCell>
                                                                                Date & Time</TableCell>
                                                                            <TableCell align="right">pair</TableCell>
                                                                            <TableCell align="right">Type</TableCell>
                                                                            <TableCell align="right">Status</TableCell>
                                                                            <TableCell align="right">Action</TableCell>
                                                                        </TableRow>
                                                                    </TableHead>
                                                                    <TableBody>
                                                                        {history.map((row) => (
                                                                            <TableRow
                                                                                key={row.name}
                                                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                            >
                                                                                <TableCell component="th" scope="row">
                                                                                    {row.name}
                                                                                </TableCell>
                                                                                <TableCell align="right">{row.calories}</TableCell>
                                                                                <TableCell align="right">{row.fat}</TableCell>
                                                                                <TableCell align="right">{row.carbs}</TableCell>
                                                                                <TableCell align="right">{row.protein}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer> */}

                                                                <TableContainer component={Paper} className={classes.tablestakingblock}>
                                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell className='table-head'>Date & Time</TableCell>
                                                                                <TableCell className='table-head'>Project Name</TableCell>
                                                                                <TableCell className='table-head'>Token Name</TableCell>
                                                                                <TableCell className='table-head'>Token Symbol</TableCell>
                                                                                <TableCell className='table-head'>Network</TableCell>
                                                                                <TableCell className='table-head'>Receive</TableCell>
                                                                                <TableCell className='table-head'>Sent</TableCell>
                                                                                <TableCell className='table-head'>Paid BY</TableCell>
                                                                                <TableCell className='table-head'>Transaction Hash</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {historyy?.map((row) => (
                                                                                <TableRow
                                                                                    key={row.name}
                                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                                >
                                                                                    <TableCell component="th" scope="row">
                                                                                        {row?.createdAt}
                                                                                    </TableCell>
                                                                                    <TableCell>{row?.Project_Name}</TableCell>
                                                                                    <TableCell>{row?.Token_Name}</TableCell>
                                                                                    <TableCell>{row?.Token_symbol}</TableCell>
                                                                                    <TableCell>{row?.Network}</TableCell>
                                                                                    <TableCell >{row?.Tokens}</TableCell>
                                                                                    <TableCell >{row?.Usdt}</TableCell>
                                                                                    <TableCell>{row?.pay_by}</TableCell>
                                                                                    <TableCell>{row?.Transactionhas?.slice(0, 5)}...{row?.Transactionhas?.slice(59, 66)}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableContainer>
                                                            </div>
                                                        </CustomTabPanel>

                                                    </Box>

                                                </div>
                                                {/* <div className='website-contract'>
                                                <div className='smart-contract-bar'>
                                                    <Link to=''><TravelExploreIcon /> Website</Link>
                                                </div>
                                                <div className='smart-contract-bar'>
                                                    <Link to=''><StickyNote2Icon /> Whitepaper</Link>
                                                </div>
                                                <div className='smart-contract-bar'>
                                                    <Link to=''><AttachFileIcon /> SmartContract</Link>
                                                </div>
                                            </div>
                                            <div className='price-box'>
                                                <Grid container className="launchpad-block1" >
                                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6} className="block1-purchase-price">
                                                        <h6>Purchase Price</h6>
                                                        <span>0.05 USDT</span>
                                                    </Grid>
                                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6} className="block1-purchase-price">
                                                        <h6>Sale Amount</h6>
                                                        <span>4,000,000 SKK</span>
                                                    </Grid>
                                                    <Grid item xl={3} lg={3} md={4} sm={4} xs={6} className="block1-purchase-price" >
                                                        <h6>Total Supply</h6>
                                                        <span>500,000,000 SKK</span>
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xl={3} lg={3} md={4} sm={4} xs={6} className="block1-purchase-price">
                                                        <h6>Market Cap</h6>
                                                        <span>345,000 USDT</span>
                                                    </Grid>
                                                </Grid>
                                            </div> */}

                                                <div className='linear-bar'>
                                                    {/* <LinearProgress variant="determinate" value={progress} /> */}
                                                    {/* <Slider aria-label="" defaultValue={10} getAriaValueText={valuetext} valueLabelDisplay="auto" shiftStep={30} step={1} min={10} max={110} /> */}

                                                </div>

                                                {/* <div className='loader-time'>
                                                <div className='warm-up'>
                                                    <p>Warm up</p>
                                                    <p>11/01 10:00</p>
                                                </div>
                                                <div className='warm-up'>
                                                    <p>Sale Start</p>
                                                    <p>11/03 20:00</p>
                                                </div>
                                                <div className='warm-up'>
                                                    <p>Sale Ends</p>
                                                    <p>11/04 20:00</p>
                                                </div>
                                            </div> */}



                                            </Box>

                                        </section>
                                    </Box>
                                    {/* <Modal
                                    open={open}

                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <div className='closeicon'>
                                            <CancelIcon onClick={handleClose} />
                                            <Grid container sx={{ justifyContent: 'center', height: '500px', overflowY: 'scroll' }} >
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                                    <div className='form-main '>
                                                        <Grid container sx={{ justifyContent: 'center' }} >
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Project Name<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Project_Name}</span>
                                                            </Grid>

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Token Name<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>

                                                                <span>{modelData?.Token_Name}</span>
                                                            </Grid>

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Website<div>:</div>
                                                                </div>
                                                            </Grid>

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Website}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Which Network is the token on
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Network}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Description<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Description}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Whitepaper link (optional )
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.WhitePaper ? modelData?.WhitePaper : '-'}</span>
                                                            </Grid>

                                                        </Grid>
                                                    </div>

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                                    <div className='form-main '>
                                                        <Grid container sx={{ justifyContent: 'center' }} >
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Twitter link<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={modelData?.Twitter} target="_blank">{modelData?.Twitter?.slice(0, 25)}</a></span>

                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Discord link<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={modelData?.Discord} target="_blank">{modelData?.Discord?.slice(0, 25)}</a></span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Instagram link<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={modelData?.Instagram} target="_blank">{modelData?.Instagram?.slice(0, 25)}</a></span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Reddit link
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={modelData?.Reddit} target="_blank">{modelData?.Reddit?.slice(0, 25)}</a></span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    LinkedIn link<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={modelData?.LinkedIn} target="_blank">{modelData?.LinkedIn?.slice(0, 25)}</a></span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Logo<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Logo?.slice(0, 25)}</span>
                                                            </Grid>

                                                        </Grid>
                                                    </div>

                                                </Grid>
                                                <Grid item xs={12} sm={12} md={12} lg={12} xl={6}>
                                                    <div className='form-main '>
                                                        <Grid container sx={{ justifyContent: 'center' }} >
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Token Symbol<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Token_symbol}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Launch price<div>:</div>
                                                                </div>
                                                            </Grid>

                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Launch_price}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Total Supply<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Total_supply}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Contract Address
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span><a href={`${navigation}${modelData?.Contract_address}`} target="_blank">{modelData?.Contract_address?.slice(0, 15)}</a></span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Minimum Raise Amount<div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Mim_raise_amou}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Minimum Raise Amount
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Max_raise_amou}</span>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <div className='result-launch'>
                                                                    Currency
                                                                    <div>:</div>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                                                                <span>{modelData?.Currency_raise}</span>
                                                            </Grid>

                                                        </Grid>
                                                    </div>

                                                </Grid>
                                            </Grid>
                                        </div>


                                    </Box>
                                </Modal> */}
                                </Grid>



                            </Item>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Item className={classes.footercls}>
                                <Footer />
                            </Item>
                        </Grid>
                    </Grid>
                </Box >
            </div>

        </>
    )
}

export default launchpad
