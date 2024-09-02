import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import footerbg from '../../images/footer-bg.png'
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
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
import MultipleStopIcon from '@mui/icons-material/MultipleStop';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chip from '@mui/material/Chip';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import thankyou from '../../images/zer.gif'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CircularProgress from '@mui/material/CircularProgress';
import { useRef } from 'react';
import Axios from '../../Axios'
import { useLocation } from 'react-router-dom';
import { margin } from '@mui/system';
import back from '../../images/light-Layer2.png'
import { toast } from 'react-toastify';

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

const Creates = () => {

    const classes = useStyles();
    const navigate = useNavigate()
    const location = useLocation();
    const projectName = useRef(null);
    const tokenName = useRef(null);
    const website = useRef(null);
    const network = useRef(null);
    const description = useRef(null);
    const twitter = useRef(null);
    const discord = useRef(null);
    const instagram = useRef(null);
    const reddit = useRef(null);
    const linkedIn = useRef(null);
    const logo = useRef(null);
    const tokenSymbol = useRef(null);
    const launchPrice = useRef(null);
    const totalSupply = useRef(null);
    const contractAddress = useRef(null);
    const minimumRaiseSoft = useRef(null);
    const minimumRaiseHard = useRef(null);
    const saleStart = useRef(null);
    const saleEnd = useRef(null);
    const currency = useRef(null);

    const [projectNameerr, setProjectNameerr] = useState('');
    const [tokenNameerr, setTokenNameerr] = useState('');
    const [price_value, setPrice_valueerr] = useState('');
    const [websiteerr, setWebsiteerr] = useState('');
    const [networkerr, setNetworkerr] = useState('');
    const [descriptionerr, setDescriptionerr] = useState('');
    const [twittererr, setTwittererr] = useState('');
    const [discorderr, setDiscorderr] = useState('');
    const [instagramerr, setInstaerr] = useState('');
    const [redditerr, setRediterr] = useState('');
    const [linkedinerr, setLinkedinerr] = useState('');
    const [logoerr, setLogoerr] = useState('');
    const [tokenSymbolerr, setTokensymbolerr] = useState('');
    const [launchPriceerr, setLauncherr] = useState('');
    const [totalSupplyerr, setSuppluerr] = useState('');
    const [contractAddresserr, setContractadderr] = useState('');
    const [minimumRaiseSofterr, setMinRaisesofterr] = useState('');
    const [minimumRaiseHarderr, setMinharderr] = useState('');
    const [saleStarterr, setSaleStarterr] = useState('');
    const [saleEnderr, setSaleEnderr] = useState('');
    const [currencyerr, setCcyerr] = useState('');
    const [metaid, setMetaid] = useState('')
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

    const getAccount = async () => {

        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        //   setMetaid(account[0])
        setInputValues((prevState) => ({
            ...prevState,
            Owner_address: account[0],
        }));
    }

    useEffect(() => {
        getAccount();
    }, [])

    const [age, setAge] = React.useState(10);
    const [networks, setNetworks] = useState([]);

    const handleChange2 = (event) => {
        // setAge(event.target.value);
        setCcyerr('');
        setInputValues((prevState) => ({
            ...prevState,
            Currency_raise: event.target.value,
        }));
    };

    const handleChange3 = (event) => {
        setNetworkerr('');
        if(event.target.value === "XDC" || event.target.value === "Wanchain" || event.target.value === "Ethereum"){
            setInputValues((prevState) => ({
                ...prevState,
                Network: event.target.value,
                pay_by: `${event.target.value}(USDT)`
            }));
        }else{
            setInputValues((prevState) => ({
                ...prevState,
                Network: "",
                pay_by: ""
            }));
            toast.error("Selected Network Will be coming soon")
        }
    };

    const [open, setOpen] = React.useState(false);
    const [creates, setCreates] = useState(null)


    const [inputValues, setInputValues] = useState({
        Project_Name: '',
        Token_Name: '',
        Website: '',
        Network: '',
        Description: '',
        WhitePaper: '',
        Twitter: '',
        Discord: '',
        Instagram: '',
        Reddit: '',
        LinkedIn: '',
        Logo: '',
        Token_symbol: '',
        Launch_price: '',
        Total_supply: '',
        Contract_address: '',
        Mim_raise_amou: '',
        Max_raise_amou: '',
        Start_date: '',
        End_date: '',
        pay_by: '',
        Owner_address: '',
        Token_value_in_usdt: ''
    });


    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
            // navigate('/launchpad');
            navigate('/launchpad', { state: inputValues }); // Pass inputValues as location state// Navigate to the other page after 3 seconds
        }, 4000);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        //   setMetaid(account[0])
        setInputValues((prevState) => ({
            ...prevState,
            Owner_address: account[0],
        }));
        if (inputValues.Project_Name == '') {
            setProjectNameerr('Please Enter Project Name');
            projectName.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Token_Name == '') {
            setTokenNameerr('Please Enter Token Name');
            projectName.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Website == '') {
            setWebsiteerr('Please Enter Website');
            projectName.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Network == '') {
            setNetworkerr('Please Select The Network')
            network.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Description == '') {
            setDescriptionerr('Please Enter Description');
            network.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Twitter == '') {
            setTwittererr('Please Enter Twitter Link');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Discord == '') {
            setDiscorderr('Please Enter Discord Link');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Instagram == '') {
            setInstaerr('Please Enter Instagram Link');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Reddit == '') {
            setRediterr('Please Enter Reddit Link');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.LinkedIn == '') {
            setLinkedinerr('Please Enter Linkedin Link');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Logo == '') {
            setLogoerr('Please Enter Logo (URL only)');
            twitter.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (inputValues.Token_symbol == '') {
            setTokensymbolerr('Please Enter Token Symbol');
        } else if (inputValues.Launch_price == '' || Number(inputValues.Launch_price) < 0) {
            if (inputValues.Launch_price == '') {
                setLauncherr('Please Enter Launch Price');
            } else if (Number(inputValues.Launch_price) < 0) {
                setLauncherr('Launch Price cannot be a negative number');
            }
        } else if (inputValues.Token_value_in_usdt == '' || Number(inputValues.Token_value_in_usdt) < 0) {
            if (inputValues.Token_value_in_usdt == '') {
                setPrice_valueerr('Please Enter Token Value in USDT');
            } else if (Number(inputValues.Token_value_in_usdt) < 0) {
                setPrice_valueerr('Launch Token Value in USDT cannot be a negative number');
            }
        } else if(Number(inputValues.Token_value_in_usdt) === 0){
            setPrice_valueerr('Launch Token Value in USDT cannot be Zero');
        }
        else if (inputValues.Total_supply == '' || Number(inputValues.Total_supply) < 0) {

            if (inputValues.Total_supply == '') {
                setSuppluerr('Please Enter Total Supply');
            } else if (Number(inputValues.Total_supply) < 0) {
                setSuppluerr('Total supply cannot be a negative number');
            }
        } else if (inputValues.Contract_address == '') {
            setContractadderr('Please Enter Contract Address');
        } else if (inputValues.Mim_raise_amou == '' || Number(inputValues.Mim_raise_amou) < 0) {

            if (inputValues.Mim_raise_amou == '') {
                setMinRaisesofterr('Please Enter Minimum Raise Amount (soft cap)');
            } else if (Number(inputValues.Mim_raise_amou) < 0) {
                setMinRaisesofterr('Minimum Raise cannot be a negative number');
            }
        } else if (inputValues.Max_raise_amou == '' || Number(inputValues.Max_raise_amou) < 0) {

            if (inputValues.Max_raise_amou == '') {
                setMinharderr('Please Enter Minimum Raise Amount (hard cap)');
            } else if (Number(inputValues.Max_raise_amou) < 0) {
                setMinharderr('Minimum Raise cannot be a negative number');
            }
        } else if (inputValues.Start_date == '') {
            setSaleStarterr('Please Enter Sale Start Date');
        } else if (inputValues.End_date == '') {
            setSaleEnderr('Please Enter Sale End Date');
        }
        // else if (inputValues.Currency_raise == '') {
        //     setCcyerr('Please Select Currency');
        // }
        // else if (inputValues.Owner_address == '') {
        //     alert('owner')
        // }
        else {
            try {
                setCreates(true);
                const { data } = await Axios.post(`/users/createLaunchPad`, inputValues)
                if (data?.success) {
                    setCreates(false);
                    handleOpen();
                } else {
                    toast.error(data?.message)
                }
            } catch (error) {
                console.log(error, 'error');
            } finally {
                setCreates(!true);
            }


            // All fields are filled, proceed with form submission
            // setCreates(true);
            // setTimeout(() => {
            // setCreates(false);
            // handleOpen();
            // }, 3000);
            // e.preventDefault();
        }


    }


    // const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues(prevState => ({
            ...prevState,
            [name]: value
        }));

        switch (name) {
            case 'Project_Name':
                setProjectNameerr(value.trim() === '' ? 'Please Enter Project Name' : '');
                break;
            case 'Token_Name':
                setTokenNameerr(value.trim() === '' ? 'Please Enter Token Name' : '');
                break;
            case 'Token_value_in_usdt':
                setPrice_valueerr(value.trim() === '' ? 'Please Enter Token value in usdt' : '');
                break;
            case 'Website':
                setWebsiteerr(value.trim() === '' ? 'Please Enter Website' : '');
                break;
            case 'Network':
                setNetworkerr(value.trim() === '' ? 'Please Select Which Network the token is on' : '');
                break;
            case 'Description':
                setDescriptionerr(value.trim() === '' ? 'Please Enter Description' : '');
                break;
            case 'Twitter':
                setTwittererr(value.trim() === '' ? 'Please Enter Twitter Link' : '');
                break;
            case 'Discord':
                setDiscorderr(value.trim() === '' ? 'Please Enter Discord Link' : '');
                break;
            case 'Instagram':
                setInstaerr(value.trim() === '' ? 'Please Enter Instagram Link' : '');
                break;
            case 'Reddit':
                setRediterr(value.trim() === '' ? 'Please Enter Reddit Link' : '');
                break;
            case 'LinkedIn':
                setLinkedinerr(value.trim() === '' ? 'Please Enter LinkedIn Link' : '');
                break;
            case 'Logo':
                setLogoerr(value.trim() === '' ? 'Please Enter Logo (URL only)' : '');
                break;
            case 'Token_symbol':
                setTokensymbolerr(value.trim() === '' ? 'Please Enter Token Symbol' : '');
                break;
            case 'Launch_price':

                if (value.trim() === '') {
                    setLauncherr('Please Enter Launch Price');
                } else if (Number(value) < 0) {
                    setLauncherr('Launch Price cannot be a negative number');
                } else {
                    setLauncherr('');
                }

                break;
            case 'Total_supply':

                if (value.trim() === '') {
                    setSuppluerr('Please Enter Total Supply');
                } else if (Number(value) < 0) {
                    setSuppluerr('Total Supply cannot be a negative number');
                } else {
                    setSuppluerr('');
                }

                break;

            case 'Contract_address':
                setContractadderr(value.trim() === '' ? 'Please Enter Contract Address' : '');
                break;
            case 'Mim_raise_amou':
                setMinRaisesofterr(value.trim() === '' ? 'Please Enter Minimum Raise Amount (soft cap)' : '');
                break;
            case 'Max_raise_amou':
                setMinharderr(value.trim() === '' ? 'Please Enter Minimum Raise Amount (hard cap)' : '');
                break;
            case 'input18':
                setSaleStarterr(value.trim() === '' ? 'Please Enter Sale Start' : '');
                break;
            case 'input19':
                setSaleEnderr(value.trim() === '' ? 'Please Enter Sale End' : '');
                break;
            case 'input20':
                setCcyerr(value.trim() === '' ? 'Please Select Currency' : '');
                break;
            default:
                break;
        }

    };

    const handleSalestart = (date) => {

        setInputValues((prevState) => ({
            ...prevState,
            Start_date: date,
        }));
        if (date == '') {
            setSaleStarterr('Please select a sale start date');
        } else {
            setSaleStarterr('');
        }
    }

    const handleSaleend = (date) => {

        setInputValues((prevState) => ({
            ...prevState,
            End_date: date,
        }));
        if (date == '') {
            setSaleEnderr('Please select a sale end date');
        } else {
            setSaleEnderr('');
        }
    }

    const errorStyle = {
        color: 'red',
        fontSize: '12px',
        textAlign: 'center',
        display: 'block',
        margin: '10px 0px'
    }


    const networkLists = async () => {
        try {
            const { data } = await Axios.get(`/admin/getNetwork`)
            setNetworks(data?.result)

        } catch (error) {
            console.log(error, "err")
        }
    }

    useEffect(() => {
        networkLists();
    }, [])

    return (


        <div className='launchpad-page create-page'>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='fixed-header'>
                        <Item className={classes.headercls}>
                            <Header />
                        </Item>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Item id="bd-img-breadcum">
                            <Box sx={{ flexGrow: 1 }}>

                                <Grid container spacing={0}>


                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        <div className='crypto-banner-txt applctn-banner-txt Voting-block back-btn'>
                                            <div className="back">
                                                <Link to='/launchpad'>
                                                    <img src={back} />
                                                </Link>
                                            </div>
                                            <h2>Launchpad Creation</h2>
                                        </div>

                                    </Grid>



                                </Grid>

                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={10}>
                        <Grid container spacing={0} className='form-main2'>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>

                                        <TextField id="outlined-basic" autoComplete='off' label='Project-Name' variant="outlined" name="Project_Name" value={inputValues?.input1} inputRef={projectName} onChange={handleInputChange} />
                                        <span style={errorStyle}>{projectNameerr ? projectNameerr : ''}</span>
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" autoComplete='off' label='Token Name' variant="outlined" name="Token_Name" value={inputValues?.input2} onChange={handleInputChange} />
                                        <span style={errorStyle}>{tokenNameerr ? tokenNameerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>


                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Website' variant="outlined" name="Website" value={inputValues?.input3} onChange={handleInputChange} />
                                        <span style={errorStyle}>{websiteerr ? websiteerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>

                                <div className='create-input'>

                                    <div>
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Which Network is the token on</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                //    value={age}
                                                value={inputValues.Network}
                                                label="Which Network is the token on"
                                                onChange={handleChange3}
                                            >
                                                {networks && networks.length > 0 ? (
                                                    networks.map((row, index) => (
                                                        <MenuItem key={index} value={row.name}> {row.name} </MenuItem>
                                                    ))
                                                ) :
                                                    null
                                                }



                                            </Select>
                                        </FormControl>
                                        <span style={errorStyle}>{networkerr ? networkerr : ''}</span>

                                    </div>

                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Description' variant="outlined" name="Description" value={inputValues?.inpu3} inputRef={network} onChange={handleInputChange} />
                                        <span style={errorStyle}>{descriptionerr ? descriptionerr : ''}</span>

                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Whitepaper link(optional)' variant="outlined" name="WhitePaper" value={inputValues.input21} onChange={handleInputChange} />

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Twitter link' variant="outlined" name="Twitter" value={inputValues.input4} inputRef={twitter} onChange={handleInputChange} />
                                        <span style={errorStyle}>{twittererr ? twittererr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Discord link' variant="outlined" name="Discord" onChange={handleInputChange} />
                                        <span style={errorStyle}>{discorderr ? discorderr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Instagram link' variant="outlined" name="Instagram" onChange={handleInputChange} />
                                        <span style={errorStyle}>{instagramerr ? instagramerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Reddit link' variant="outlined" name="Reddit" onChange={handleInputChange} />
                                        <span style={errorStyle}>{redditerr ? redditerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='LinkedIn link' variant="outlined" name="LinkedIn" onChange={handleInputChange} />
                                        <span style={errorStyle}>{linkedinerr ? linkedinerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Logo (URL only)' variant="outlined" name="Logo" onChange={handleInputChange} />
                                        <span style={errorStyle}>{logoerr ? logoerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Token Symbol' variant="outlined" name="Token_symbol" onChange={handleInputChange} />
                                        <span style={errorStyle}>{tokenSymbolerr ? tokenSymbolerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Launch price' variant="outlined" name="Launch_price" type="number" onChange={handleInputChange} />
                                        <span style={errorStyle}>{launchPriceerr ? launchPriceerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Total Supply' variant="outlined" name="Total_supply" type="number" onChange={handleInputChange} />
                                        <span style={errorStyle}>{totalSupplyerr ? totalSupplyerr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Contract Address' variant="outlined" name="Contract_address" onChange={handleInputChange} />
                                        <span style={errorStyle}>{contractAddresserr ? contractAddresserr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Min Raise Amount(soft cap)' variant="outlined" name="Mim_raise_amou" type="number" onChange={handleInputChange} />
                                        <span style={errorStyle}>{minimumRaiseSofterr ? minimumRaiseSofterr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <TextField id="outlined-basic" label='Min Raise Amount(hard cap)' variant="outlined" name="Max_raise_amou" type="number" onChange={handleInputChange} />
                                        <span style={errorStyle}>{minimumRaiseHarderr ? minimumRaiseHarderr : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateTimePicker']}>
                                                <DateTimePicker label='Sale start' onChange={handleSalestart}
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <span style={errorStyle}>{saleStarterr ? saleStarterr : ''}</span>

                                    </div>

                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DateTimePicker']}>
                                                <DateTimePicker label='Sale end' onChange={handleSaleend} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <span style={errorStyle}>{saleEnderr ? saleEnderr : ''}</span>

                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>


                                    <div>
                                        <TextField id="outlined-basic" label='Pay BY' variant="outlined" name="pay_by" value={`${inputValues.Network} (USDT)`} />
                                        {/* <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Select Currency</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                value={inputValues.Currency_raise}
                                                label="Select Currency"
                                                onChange={handleChange2}
                                            >
                                                <MenuItem value={'XDC'}>XDC</MenuItem>
                                                <MenuItem value={'WAn'}>WAn</MenuItem>
                                                <MenuItem value={'USDT'}>USDT(eth)</MenuItem>
                                                <MenuItem value={'Eth'}>Eth</MenuItem>
                                                <MenuItem value={'BNB'}>BNB</MenuItem>
                                            </Select>
                                        </FormControl> */}
                                        {/* <span style={errorStyle}>{currencyerr ? currencyerr : ''}</span> */}

                                    </div>


                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                                <div className='create-input'>

                                    <div>
                                        <div class="create-total">
                                            <TextField id="outlined-basic" label='Token Value Per USDT' variant="outlined" name="Token_value_in_usdt" type="number" onChange={handleInputChange} />   <span> <MultipleStopIcon /> 1 USDT</span>
                                        </div>

                                        <span style={errorStyle}>{price_value ? price_value : ''}</span>

                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className='create-disclaimer'>
                                    <Chip icon={<ErrorOutlineIcon />} label="Creating an IDO on zebra is free, zebra charges 1% of the amount raised" color="error" variant="outlined" />

                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <div className='grt-skk launch'>
                                    <Button onClick={handleSubmit} >{creates ? <CircularProgress style={{ width: '25px', height: '25px' }} /> : 'Submit'}</Button>
                                </div>
                            </Grid>
                            {/* <Button >Show backdrop</Button> */}
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backdropFilter: 'blur(5px)' }}
                                open={open}
                                onClick={handleClose}
                            >
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                    <div className='backdrop'>
                                        <img src={thankyou} />
                                        <div className='thankyou'> <EmojiEmotionsIcon />Thank you for submitting, our team will review this and be in touch</div>
                                    </div>
                                </Grid>



                            </Backdrop>
                        </Grid>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Item className={classes.footercls}>
                            <Footer />
                        </Item>
                    </Grid>
                </Grid>
            </Box >
        </div >
    )
}

export default Creates







