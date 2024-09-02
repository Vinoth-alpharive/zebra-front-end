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
import ethrouterAddress from '../../Web3/ContractAddress/ethrouterAddress'
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



export default function RightTradeTabOuter({ pairs, trade, fullpairs }) {
    var WEB = new Web3(window.ethereum);

    const [value, setValue] = useState(0);
    const [order, setOrder] = useState(0);
    const [data, setData] = useState();
    const [data1, setData1] = useState();
    const [amount, setamount] = useState(-1);
    const [amount1, setamount1] = useState();
    const [netw, setNetw] = useState()
    const [bal, setBal] = useState()
    const [bal1, setBal1] = useState()

    const [buy, setBuy] = useState()
    const [buyprice, setBuyprice] = useState()

    const [sell, setsell] = useState(0)
    const [sellprice, setsellprice] = useState()
    const [pairss, setPairs] = useState()

    const [origi_Buy, setOrigi_Buy] = useState()
    const [origi_Buyprice, setOrigi_Buyprice] = useState()
    const [origi_Sellprice, setOrigi_Sellprice] = useState()
    const [origi_Sell, setOrigi_Sell] = useState()

    const [inibuy, setinibuy] = useState()
    const [inisell, setinisell] = useState()

    const [chain, setchain] = useState()

    const [adFee, setAdFee] = useState()
    const [adminFeess, setAdminFee] = useState()
    const [adminFeesssell, setAdFeesell] = useState()
    const [adminFeesssellprice, setAdFeesellprice] = useState()
    const [adminFeesssellprice1, setAdFeesellprice1] = useState()
    const [browserChain, setbrowserChain] = useState()
    const [sliderData, setsliderData] = useState(100)
    const [sliderDatas, setsliderDatas] = useState(100)
    const [chainId, setChainId] = useState()
    const [chainidcheck, setChainidcheck] = useState(false)
    const [chainidcheck1, setChainidcheck1] = useState(false)

    const [routerAddresss, setRouterAddress] = useState()
    const [routerAbi, setRouterAbi] = useState()


    let { token } = useParams();


    useEffect(() => {
        if (pairs != undefined) {

            setinisell()
            setinibuy()
            // setsell('')
            // setBuy('')
            setChainId(pairs?.network?.chainId)
            setRouterAddress(pairs?.router_contract)
            setRouterAbi(JSON.parse(pairs?.router_Abi))
        }

    }, [pairs])
    // const calls = async () => {
    //   const chainid = await WEB.eth.getChainId()
    //   setchain(chainid, "id")
    // }
    // useEffect(() => {
    //   // calls()
    //   calc_price(pairs)

    // }, [])

    const adminFee = async () => {
        try {
            const { data } = await Axios.post(`/admin/getAdminFee`, {
                Network: pairs?.network?._id
            })
            setAdminFee(data.result[0])
        } catch (error) {
            console.log("🚀 ~ file: RightTradeTabOuter.js:160 ~ adminFee ~ error:", error)
        }

    }

    useEffect(() => {
        if (pairs != undefined) {
            adminFee()
        }
    }, [pairs])

    useEffect(() => {
        // if (chain === 999n) {
        initial_bal()
        // }
    }, [chain])

    useEffect(() => {
        if (adminFeess != null) {
            buyChanges()
            initial_bal()
            if (pairs != undefined) {
                calc_balance(pairs)
            }
        }
    }, [adminFeess])

    const getCurrentChainid = async () => {
        try {
            const browserChainId = await WEB.eth.getChainId()
            setbrowserChain(browserChainId)
            setchain(setbrowserChain)
            if (chainId === undefined) {
                setChainidcheck1(true)
            }
            else if (Number(browserChainId) === chainId) {
                setChainidcheck(true)
                setChainidcheck1(false)
                calc_balance(pairs)
            } else {
                setChainidcheck(false)
                setChainidcheck1(false)
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

            buyChanges()
            initial_bal()
            calc_balance(pairs)
        } catch (err) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                var data;
                // console.log(chainLists1, "chainlist")

                for (let i = 0; i < chainLists1?.length; i++) {
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
                            rpcUrls: [fullpairs?.rpc_Url]
                        }
                    ]
                });
            }
        }
    }

    const formatDecinal = (number) => {
        var init = 0
        var result;
        if (number?.toString()?.length > 3) {
            for (let i = 0; i <= number?.toString()?.length; i++) {
                const element = number?.toString()[i];
                if (init <= 6) {
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

    useEffect(() => {
        getCurrentChainid()
    }, [chainId])

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
        // console.log("Amount")
        if (pair !== undefined) {
            try {
                const addressArray = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });
                const ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    pair?.address1
                );
                const ERC20Instance1 = new WEB.eth.Contract(
                    erc20ABI,
                    pair?.address2
                );
                const decimal1 = await ERC20Instance.methods.decimals().call()
                const decimal2 = await ERC20Instance1.methods.decimals().call()
                const bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
                console.log("🚀 ~ file: RightTradeTabOuter.js:306 ~ constcalc_balance= ~ bal1:", bal1)
                const bals1 = Number(bal1) / 10 ** Number(decimal1)
                // const bals1 = 1000000 / 10 ** Number(decimal1)


                // setBal(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))
                // setData(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))
                setBal(bals1)
                setData(bals1)

                const bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
                console.log("🚀 ~ file: RightTradeTabOuter.js:316 ~ constcalc_balance= ~ bal2:", bal2)
                const bals2 = Number(bal2) / 10 ** Number(decimal2)
                // const bals2 = 1000000000000000000 / 10 ** Number(decimal2)


                // setBal1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
                // setData1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
                setBal1(bals2)
                setData1(bals2)


                // var routeInstance
                // if (fullpairs?.name === 'Ethereum Mainnet') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     ethrouterAddress
                //   );
                // } else if (fullpairs?.name === 'WAN') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     routerAddress
                //   );
                // }

                var routeInstance = new WEB.eth.Contract(
                    JSON.parse(pairs?.router_Abi),
                    pairs?.router_contract
                );



                // const bal3 = parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6)
                // const bal4 = parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6)
                const bal3 = parseFloat(bals1).toFixed(6)
                console.log("🚀 ~ file: RightTradeTabOuter.js:349 ~ constcalc_balance= ~ bal3:", bal3)
                const bal4 = parseFloat(bals2).toFixed(6)
                console.log("🚀 ~ file: RightTradeTabOuter.js:351 ~ constcalc_balance= ~ bal4:", bal4)
                // const am = await WEB.utils.toWei(bal3, 'ether')
                // const am1 = await WEB.utils.toWei(bal4, 'ether')

                setamount(bal4)
                setamount1(bal3)
                const am = bal3 * (10 ** Number(decimal1))
                console.log("🚀 ~ file: RightTradeTabOuter.js:356 ~ constcalc_balance= ~ am:", am)
                const am1 = bal4 * (10 ** Number(decimal2))
                console.log("🚀 ~ file: RightTradeTabOuter.js:358 ~ constcalc_balance= ~ am1:", am1)
                var amou1
                var amou2
                if (am !== 0) {
                    amou1 = await routeInstance.methods.getAmountsOut(bal1.toString(), [`${pair.address1}`, `${pair.address2}`]).call()
                }
                if (am1 !== 0) {
                    amou2 = await routeInstance.methods.getAmountsOut(bal2.toString(), [`${pair.address2}`, `${pair.address1}`]).call()
                }

                if (amou1 !== undefined) {
                    const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
                    setAdFeesell(parseFloat(val / (10 ** Number(decimal2))).toFixed(2))

                    // setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
                    setBuy(parseFloat((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))
                    setOrigi_Buy(amou1[1])
                }
                if (amou2 !== undefined) {
                    const val1 = ((Number(adminFeess?.Percentage) * parseInt(amou2[1])) / 100)
                    setAdFee(parseFloat(val1 / (10 ** Number(decimal1))).toFixed(6))
                    setsell(parseFloat((parseInt(amou2[1]) - val1) / (10 ** Number(decimal1))).toFixed(6))
                    setOrigi_Sell(amou2[1])
                }
            } catch (error) {
                console.log(error)
            }
        }


    }


    useEffect(() => {
        // if (chain === 999n) {
        console.log(pairs, "pairs")
        if (pairs !== undefined) {
            calc_balance(pairs)
            // calc_price(pairs)
            setPairs(pairs)
            priceChanges()
            buyChanges()
            initial_bal()
        }
        // } else {
        //   if (pairs !== undefined) {
        //     setPairs(pairs)
        //   }
        // }
    }, [pairs, chain])

    const initial_bal = async () => {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts"
            });

            const ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pairs.address1
            );

            const ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pairs.address2
            );
            const bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
            setBal(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))
            setData(parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6))

            const bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
            setBal1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
            setData1(parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6))
            const bal3 = parseFloat(await WEB.utils.fromWei(bal1, 'ether')).toFixed(6)
            const bal4 = parseFloat(await WEB.utils.fromWei(bal2, 'ether')).toFixed(6)
            // var routeInstance
            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     ethrouterAddress
            //   );
            // } else if (fullpairs?.name === 'WAN') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     routerAddress
            //   );
            // }

            var routeInstance = new WEB.eth.Contract(
                JSON.parse(pairs?.router_Abi),
                pairs?.router_contract
            );


            const am = await WEB.utils.toWei(bal3, 'ether')
            console.log("🚀 ~ file: RightTradeTabOuter.js:462 ~ constinitial_bal= ~ am:", am)
            const am1 = await WEB.utils.toWei(bal4, 'ether')
            console.log("🚀 ~ file: RightTradeTabOuter.js:464 ~ constinitial_bal= ~ am1:", am1)

            const amou1 = await routeInstance.methods.getAmountsOut(am, [`${pairs?.address1}`, `${pairs?.address2}`]).call()
            const amou2 = await routeInstance.methods.getAmountsOut(am1, [`${pairs?.address2}`, `${pairs?.address1}`]).call()

            const initialbuy = await routeInstance.methods.getAmountsOut(await WEB.utils.toWei(1, 'ether'), [`${pairs.address2}`, `${pairs.address1}`]).call()
            const initialsell = await routeInstance.methods.getAmountsOut(await WEB.utils.toWei(1, 'ether'), [`${pairs.address1}`, `${pairs.address2}`]).call()
            console.log("🚀 ~ file: RightTradeTabOuter.js:469 ~ constinitial_bal= ~ initialbuy:", initialbuy)
            console.log("🚀 ~ file: RightTradeTabOuter.js:470 ~ constinitial_bal= ~ initialsell:", initialsell)

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
        setsell(sliderData * data1)
    }, [sliderData, amount])

    useEffect(() => {
        setBuy(sliderDatas * amount1)
    }, [sliderDatas, data])

    const sliderChanges = async () => {
        try {
            // var routeInstance;

            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     ethrouterAddress
            //   );
            // } else if (fullpairs?.name === 'WAN') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     routerAddress
            //   );
            // }

            var routeInstance = new WEB.eth.Contract(
                JSON.parse(pairs?.router_Abi),
                pairs?.router_contract
            );


            const ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pairss?.address1
            );
            const ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pairss?.address2
            );
            const decimal1 = await ERC20Instance1.methods.decimals().call()
            const decimal2 = await ERC20Instance.methods.decimals().call()
            // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)
            if (Number(data) !== 0) {
                // const am = await WEB.utils.toWei(data, 'ether')
                const am = data * (10 ** Number(decimal2))
                console.log("🚀 ~ file: RightTradeTabOuter.js:533 ~ sliderChanges ~ am:", am)
                var amou1;
                if (pairss !== undefined) {
                    amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairss.address1}`, `${pairss.address2}`]).call()
                } else {
                    amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address1}`, `${consts.address2}`]).call()
                }
                setOrigi_Buy(amou1[1])

                const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)

                setAdFeesell((val / (10 ** Number(decimal1))).toFixed(6))
                setBuy(((parseInt(amou1[1]) - val) / (10 ** Number(decimal1))).toFixed(6))

                // setAdFeesell(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
                // setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))
            } else {
                setBuy(0)
            }

        } catch (error) {
            console.log(error)
        }

    }
    const priceChanges = async () => {
        try {
            // var routeInstance;

            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     ethrouterAddress
            //   );
            // } else if (fullpairs?.name === 'WAN') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     routerAddress
            //   );
            // }

            var routeInstance = new WEB.eth.Contract(
                JSON.parse(pairs?.router_Abi),
                pairs?.router_contract
            );

            const ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pairs?.address1
            );
            const ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pairs?.address2
            );
            const decimal1 = await ERC20Instance1.methods.decimals().call()
            const decimal2 = await ERC20Instance.methods.decimals().call()
            // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)

            // const am = await WEB.utils.toWei(data, 'ether')
            const am = 1 * (10 ** Number(decimal2))
            var amou1;

            if (pairs !== undefined) {
                amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address1}`, `${pairs.address2}`]).call()
            }
            //  else {
            //   amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address1}`, `${consts.address2}`]).call()
            // }
            // setOrigi_Buyprice(amou1[1])

            const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)

            // setAdFeesellprice((val / (10 ** Number(decimal1))).toFixed(6))
            setsellprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal1))).toFixed(6))

            // setAdFeesell(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
            // setBuy(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))


        } catch (error) {
            console.log(pairs)
            console.log(error)
        }

    }
    const buyChanges = async () => {
        try {
            var routeInstance = new WEB.eth.Contract(
                JSON.parse(pairs?.router_Abi),
                pairs?.router_contract
            );


            const ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pairs?.address1
            );
            const ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pairs?.address2
            );
            const decimal1 = await ERC20Instance1.methods.decimals().call()
            const decimal2 = await ERC20Instance.methods.decimals().call()
            // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)

            const am = 1 * (10 ** Number(decimal1))
            var amou1;
            if (pairs !== undefined) {
                amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address2}`, `${pairs.address1}`]).call()
            } else {
                amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address2}`, `${consts.address1}`]).call()
            }

            // setOrigi_Sell(amou1[1])
            const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)

            // setAdFee(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
            // setsell(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))

            // setAdFee((val / (10 ** Number(decimal2))).toFixed(6))
            setBuyprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))


        } catch (error) {
            console.log(error)
        }


    }

    const handleSliderChange = async (event, datas) => {
        var bs
        if (bal !== undefined) {
            bs = parseFloat(bal1).toFixed(2)
        }
        else {
            bs = parseFloat(amount).toFixed(2)
        }

        const da = datas / 100 * bs
        setData(parseFloat(da).toFixed(6));
        setsliderDatas(datas)
        console.log(parseFloat(da).toFixed(6), "datas", amount, datas)
        // const bs = parseFloat(bal).toFixed(2)
        // const da = data / 100 * bs
        // parseFloat()
        // setData(parseFloat(da).toFixed(6));
    };
    const sliderChanges1 = async () => {
        try {
            // var routeInstance;

            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     ethrouterAddress
            //   );
            // } else if (fullpairs?.name === 'WAN') {
            //   routeInstance = new WEB.eth.Contract(
            //     routeABI,
            //     routerAddress
            //   );
            // }

            var routeInstance = new WEB.eth.Contract(
                JSON.parse(pairs?.router_Abi),
                pairs?.router_contract
            );


            const ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pairss?.address1
            );
            const ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pairss?.address2
            );
            const decimal1 = await ERC20Instance1.methods.decimals().call()
            const decimal2 = await ERC20Instance.methods.decimals().call()
            // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)
            if (Number(data1) !== 0) {
                const am = Number(amount !== -1 ? amount : data1) * (10 ** Number(decimal1))
                console.log("🚀 ~ file: RightTradeTabOuter.js:716 ~ sliderChanges1 ~ am:", am)
                var amou1;
                if (pairss !== undefined) {
                    amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairss.address2}`, `${pairss.address1}`]).call()
                }
                //  else {
                //   amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address2}`, `${consts.address1}`]).call()
                // }
                setOrigi_Sell(amou1[1])
                const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)

                // setAdFee(parseFloat(await WEB.utils.fromWei(val, 'ether')).toFixed(2))
                // setsell(parseFloat(await WEB.utils.fromWei(parseInt(amou1[1]) - val, 'ether')).toFixed(6))

                setAdFee((val / (10 ** Number(decimal2))).toFixed(6))
                setsell(((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))
            } else {
                setsell(0)
            }

        } catch (error) {
            console.log(error)
        }


    }
    useEffect(() => {
        sliderChanges1()
    }, [amount])
    const handleBuypriceChange = async (data) => {
        const bs = parseFloat(data).toFixed(2)
        const da = sliderData / 100 * bs
        setData1(parseFloat(da).toFixed(6));
        setamount(data)
        console.log(parseFloat(da).toFixed(6), "data1", data, sliderData)
    };

    const handlesellpriceChange = async (data) => {
        const bs = parseFloat(data).toFixed(2)
        setamount1(data)
        const da = sliderDatas / 100 * bs
        setData(parseFloat(da).toFixed(6));
        console.log(parseFloat(da).toFixed(6), "data1", data, sliderDatas)
    };


    const handleSliderChange1 = async (event, data) => {
        var bs
        if (bal !== undefined) {
            bs = parseFloat(bal1).toFixed(2)
        }
        else {
            bs = parseFloat(amount).toFixed(2)
        }
        const da = data / 100 * bs
        setData1(parseFloat(da).toFixed(6));
        setsliderData(data)
        console.log(parseFloat(da).toFixed(6), "data", data)
        // setamount(parseFloat(da).toFixed(6))
        // setBuyprice()
    };
    const handleInputChange = (event) => {
        setamount(event.target.value)
        // setData1(event.target.value)
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleInputChange1 = (event) => {
        setamount1(event.target.value)
        // setData1(event.target.value)
        // setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeOrder = (event, newValue) => {
        setOrder(newValue);
    };

    const handleSell = async () => {
        try {
            // await window.ethereum.request({
            //   method: "wallet_switchEthereumChain",
            //   params: [{ chainId: "0x3e7" }],
            // });

            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            var address
            var WETHInstancess
            var decimal;
            if (pairss !== undefined) {
                address = [`${pairss.address1}`, `${pairss.address2}`]
                WETHInstancess = new WEB.eth.Contract(
                    erc20ABI,
                    pairss.address1
                );
                decimal = await WETHInstancess.methods.decimals().call()
            } else {
                address = [`${consts.address1}`, `${consts.address2}`]
                WETHInstancess = new WEB.eth.Contract(
                    erc20ABI,
                    consts.address1
                );
                decimal = await WETHInstancess.methods.decimals().call()
            }
            // const bal = await WEB.utils.toWei(data, 'ether');
            const bal = data * (10 ** Number(decimal))
            const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var routeInstance
            var approvetoken

            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   const allowance = await WETHInstancess.methods.allowance(account[0], ethrouterAddress).call()


            //   if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
            //     approvetoken = "approve"
            //   } else {
            //     approvetoken = await WETHInstancess.methods.approve(ethrouterAddress, bal).send({
            //       from: account[0]
            //     })
            //   }

            // } else if (fullpairs?.name === 'WAN') {
            //   const allowance = await WETHInstancess.methods.allowance(account[0], routerAddress).call()
            //   if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
            //     approvetoken = "approve"
            //   }
            //   else {
            //     approvetoken = await WETHInstancess.methods.approve(routerAddress, bal).send({
            //       from: account[0]
            //     })
            //   }

            // }

            const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call()
            if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = "approve"
            }
            else {
                approvetoken = await WETHInstancess.methods.approve(routerAddresss, bal.toString()).send({
                    from: account[0]
                })
            }
            const time = new Date()
            time.setMinutes(time.getMinutes() + 5)
            if (approvetoken) {
                // if (fullpairs?.name === 'Ethereum Mainnet') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     ethrouterAddress
                //   );
                // } else if (fullpairs?.name === 'WAN') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     routerAddress
                //   );
                // }
                routeInstance = new WEB.eth.Contract(
                    routerAbi,
                    routerAddresss
                );
                const buys = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100000, address, account[0], Date.parse(time)).send({
                    from: account[0]
                })
                if (buys) {
                    const createTrade = await Axios.post(`/users/createTrade`, {
                        Pair: token,
                        amount: amount,
                        Amount: parseFloat(data).toFixed(6),
                        Price: buy,
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
            const account = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            var address
            var WETHInstancess
            var decimal
            if (pairss !== undefined) {
                address = [`${pairss.address2}`, `${pairss.address1}`]
                WETHInstancess = new WEB.eth.Contract(
                    erc20ABI,
                    pairss.address2
                );
                decimal = await WETHInstancess.methods.decimals().call()
            } else {
                address = [`${consts.address2}`, `${consts.address1}`]
                WETHInstancess = new WEB.eth.Contract(
                    erc20ABI,
                    consts.address2
                );
                decimal = await WETHInstancess.methods.decimals().call()
            }
            console.log("first")
            var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
            const bal = Number(bls) * (10 ** Number(decimal))
            const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens
            var routeInstance
            var approvetoken
            // if (fullpairs?.name === 'Ethereum Mainnet') {
            //   const allowance = await WETHInstancess.methods.allowance(account[0], ethrouterAddress).call()
            //   console.log("🚀 ~ file: RightTradeTabOuter.js:845 ~ handleBuy ~ allowance:", Number(allowance))
            //   if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
            //     approvetoken = 'approve'
            //   } else {
            //     approvetoken = await WETHInstancess.methods.approve(ethrouterAddress, bal.toString()).send({
            //       from: account[0]
            //     })
            //   }

            // } else if (fullpairs?.name === 'WAN') {
            //   const allowance = await WETHInstancess.methods.allowance(account[0], routerAddress).call()
            //   console.log("🚀 ~ file: RightTradeTabOuter.js:845 ~ handleBuy ~ allowance:", Number(allowance))
            //   if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
            //     approvetoken = 'approve'
            //   } else {
            //     approvetoken = await WETHInstancess.methods.approve(routerAddress, bal.toString()).send({
            //       from: account[0]
            //     })
            //   }

            // }

            const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call()
            console.log("🚀 ~ file: RightTradeTabOuter.js:845 ~ handleBuy ~ allowance:", Number(allowance))
            if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = 'approve'
            } else {
                approvetoken = await WETHInstancess.methods.approve(routerAddresss, bal.toString()).send({
                    from: account[0]
                })
            }
            const time = new Date()
            time.setMinutes(time.getMinutes() + 5)
            if (approvetoken) {
                // if (fullpairs?.name === 'Ethereum Mainnet') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     ethrouterAddress
                //   );
                // } else if (fullpairs?.name === 'WAN') {
                //   routeInstance = new WEB.eth.Contract(
                //     routeABI,
                //     routerAddress
                //   );
                // }
                routeInstance = new WEB.eth.Contract(
                    routerAbi,
                    routerAddresss
                );
                console.log(address, bal, account[0], "roles")
                const buyss = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
                    from: account[0]
                })
                if (buyss) {
                    console.log({
                        Pair: token,
                        amount: amount,
                        Amount: parseFloat(data1).toFixed(6),
                        Price: sell,
                        User_Address: account[0],
                        Trade_type: "BUY",
                        Trade_At: "exchange",
                        Coin_name: token.split('_')[1]
                    }, "console")
                    const createTrade = await Axios.post(`/users/createTrade`, {
                        Pair: token,
                        amount: amount,
                        Amount: parseFloat(data1).toFixed(6),
                        Price: sell,
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
                        <div className='price-buy-input'><span>Price</span><input value={buyprice} type='text' /><span>{token?.split('_')[0]}</span></div>
                        <div className='price-buy-input amount-buy-input'><span>Amount</span>


                            <input id="rangeInput" type='number' value={amount} onChange={(e) => { handleBuypriceChange(e.target.value) }} /><span>{token?.split('_')[1]}</span></div>
                        {/* onChange={handleInputChange}  */}
                        <Slider defaultValue={100} value={sliderData} onChange={handleSliderChange1} onChangeCommitted={() => { sliderChanges1() }} aria-label="Default" />
                        {/* */}
                        <div className='price-buy-input total-buy-input'><span>Total Price</span><input value={sell === undefined || sell === "NaN" ? 0 : sell} type='text' /><span>{token?.split('_')[0]}</span></div>
                        <div className='admin-fee-outer' style={{ color: 'white' }} ><span>Admin Fee  </span><span>  {adFee}</span></div>

                        {
                            chainidcheck1 === true ?
                                <Button variant="contained" className='Buy-BTC-button' disabled>Select Network</Button> :
                                <>
                                    {chainidcheck === true ?
                                        <Button variant="contained" className='Buy-BTC-button' onClick={handleBuy} >Buy {token?.split('_')[0]}</Button> :
                                        <Button variant="contained" className='Buy-BTC-button' onClick={() => { onChangeNetwork(chainId) }} >Change Network</Button>
                                    }
                                </>
                        }



                    </TabPanel >
                    <TabPanel value={value} index={1} className={classes.tabpanelcls}>
                        <div className='price-buy-input'><span>Price</span><input value={sellprice} type='text' /><span>{token?.split('_')[1]}</span></div>
                        <div className='price-buy-input amount-buy-input'><span>Amount</span>

                            <input id="rangeInput" type='number' value={amount1} onChange={(e) => { handlesellpriceChange(e.target.value) }} /><span>{token?.split('_')[0]}</span></div>
                        {/* value={parseFloat(data).toFixed(6)} */}
                        {/* onChange={(e) => { setamount1(e.target.value); setData1(e.target.value) } */}
                        <Slider defaultValue={100} onChange={handleSliderChange} onChangeCommitted={() => { sliderChanges() }} aria-label="Default" />
                        {/* value={data} */}
                        <div className='price-buy-input total-buy-input'><span>Price</span><input value={buy} type='text' /><span>{token?.split('_')[1]}</span></div>
                        <div className='admin-fee-outer' style={{ color: 'white' }}  ><span>Admin Fee  </span><span>  {adminFeesssell}</span></div>
                        {
                            chainidcheck1 === true ?
                                <Button variant="contained" className='Buy-BTC-button' disabled>Select Network</Button> :
                                <>
                                    {chainidcheck === true ?
                                        <Button variant="contained" className='Buy-BTC-button sell-btn' onClick={handleSell} >Sell {token?.split('_')[0]}</Button>
                                        :
                                        <Button variant="contained" className='Buy-BTC-button sell-btn' onClick={() => { onChangeNetwork(chainId) }} >Change Network</Button>

                                    }</>
                        }

                    </TabPanel >
                </Box >
            </div >

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