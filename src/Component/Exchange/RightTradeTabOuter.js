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
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import uniswapRouter from '../../Web3/Abi/uniswapRouter.json'
import { useSDK } from '@metamask/sdk-react';

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



export default function RightTradeTabOuter({ pairs, trade, fullpairs, loadings }) {
  var WEB = new Web3(window.ethereum);

  const [value, setValue] = useState(0);
  const [order, setOrder] = useState(0);
  const [data, setData] = useState(0);
  const [data1, setData1] = useState(0);
  const [amount, setamount] = useState(0);
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
  const [chainlist, setChainlist] = useState()
  const [fullDecimal, setFullDecimal] = useState(18)
  const { sdk, connected, connecting, provider, account, balance } = useSDK();

  let { token } = useParams();

  const chins = async () => {
    try {
      const { data } = await axios.get('https://chainid.network/chains.json')
      setChainlist(data)
    } catch (error) {
      console.log("🚀 ~ chins ~ error:", error)

    }
  }
  useEffect(() => {
    chins()
  }, [])


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
    calc_balance(pairs)
    defaultByPrice()
    defaultSellPrice()
  }, [pairs, adminFeess])

  useEffect(() => {
    if (pairs != undefined) {
      setBuyprice(0)
      setamount(0)
      setsell(0)
      setAdFee(0)
      setinisell()
      setinibuy()
      adminFee()
      setChainId(pairs?.network?.chainId)
      setRouterAddress(pairs?.router_contract)
      setRouterAbi(JSON.parse(pairs?.router_Abi))
    }


  }, [pairs])

  const calc_balance = async (pair) => {
    if (pair !== undefined && adminFeess != undefined) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        var deci;
        if (chainlist?.length > 0) {
          for (let i = 0; i < chainlist.length; i++) {
            const element = chainlist[i];
            if (element?.chainId == Number(chainId)) {
              deci = element?.nativeCurrency?.decimals
              setFullDecimal(element?.nativeCurrency?.decimals)
            }
          }
        }

        var ERC20Instance = ''
        var bals1 = ''
        var decimal1 = ''
        var bal1 = ''

        var ERC20Instance1 = ''
        var bals2 = ''
        var decimal2 = ''
        var bal2 = ''

        if (pair?.address1 != '-') {
          ERC20Instance = new WEB.eth.Contract(
            erc20ABI,
            pair?.address1
          );
          decimal1 = await ERC20Instance.methods.decimals().call()
          bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
          bals1 = Number(bal1) / 10 ** Number(decimal1)
        } else {
          bals1 = Number(balance) / 10 ** Number(fullDecimal)
          decimal1 = fullDecimal
          bal1 = balance
        }

        if (pair?.address2 != '-') {
          ERC20Instance1 = new WEB.eth.Contract(
            erc20ABI,
            pair?.address2
          );
          decimal2 = await ERC20Instance1.methods.decimals().call()
          bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
          bals2 = (Number(bal2) / (10 ** Number(decimal2)))
        } else {
          decimal2 = fullDecimal
          bal2 = balance
          bals2 = (Number(balance) / (10 ** Number(fullDecimal)))
        }
        setBal(bals1)
        setBal1(bals2)

        var routeInstance = new WEB.eth.Contract(
          JSON.parse(pair?.router_Abi),
          pair?.router_contract
        );
        var WTHS = await routeInstance.methods.WETH().call()
        const bal3 = parseFloat(bals1).toFixed(10)
        const bal4 = parseFloat(bals2).toFixed(10)
        // const am = await WEB.utils.toWei(bal3, 'ether')
        // const am1 = await WEB.utils.toWei(bal4, 'ether')

        setamount(bal4)
        setamount1(bal3)
        const am = bal3 * (10 ** Number(decimal1))
        const am1 = bal4 * (10 ** Number(decimal2))
        var amou1
        var amou2
        if (am !== 0) {
          amou1 = await routeInstance.methods.getAmountsOut(bal1.toString(), [`${pair.address1 == '-' ? WTHS : pair.address1}`, `${pair.address2 == '-' ? WTHS : pair.address2}`]).call()
        }
        if (am1 !== 0) {
          amou2 = await routeInstance.methods.getAmountsOut(bal2.toString(), [`${pair.address2 == '-' ? WTHS : pair.address2}`, `${pair.address1 == '-' ? WTHS : pair.address1}`]).call()
        }

        if (amou1 !== undefined) {
          const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
          setAdFeesell(parseFloat(val / (10 ** Number(decimal2))).toFixed(2))
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
        console.log(error, "erre1")
        if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
          try {
            const browserChainId = await WEB.eth.getChainId()
            var routeInstance;
            if (Number(browserChainId) == consts.wan) {
              routeInstance = new WEB.eth.Contract(
                uniswapRouter,
                consts?.wan_contract
              );
            } else if (Number(browserChainId) == consts.bnb) {
              routeInstance = new WEB.eth.Contract(
                uniswapRouter,
                consts?.bnb_contract
              );
            } else if (Number(browserChainId) == consts.eth) {
              routeInstance = new WEB.eth.Contract(
                uniswapRouter,
                consts?.eth_Contract
              );
            } else if (Number(browserChainId) == consts.zksync) {
              routeInstance = new WEB.eth.Contract(
                uniswapRouter,
                consts?.zksync_Contract
              );
            } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
              routeInstance = new WEB.eth.Contract(
                uniswapRouter,
                consts?.same_Contract
              );
            }

            const addressArray = await window.ethereum.request({
              method: "eth_requestAccounts"
            });
            var ERC20Instance = ''
            var bals1 = ''
            var decimal1 = ''
            var bal1 = ''

            var ERC20Instance1 = ''
            var bals2 = ''
            var decimal2 = ''
            var bal2 = ''

            if (pair?.address1 != '-') {
              ERC20Instance = new WEB.eth.Contract(
                erc20ABI,
                pair?.address1
              );
              decimal1 = await ERC20Instance.methods.decimals().call()
              bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
              bals1 = Number(bal1) / 10 ** Number(decimal1)
            } else {
              bals1 = Number(balance) / 10 ** Number(fullDecimal)
              decimal1 = fullDecimal
              bal1 = balance
            }
            if (pair?.address2 != '-') {
              ERC20Instance1 = new WEB.eth.Contract(
                erc20ABI,
                pair?.address2
              );
              decimal2 = await ERC20Instance1.methods.decimals().call()
              bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
              bals2 = (Number(bal2) / (10 ** Number(decimal2)))
            } else {
              decimal2 = fullDecimal
              bal2 = balance
              bals2 = (Number(balance) / (10 ** Number(fullDecimal)))
            }
            setBal(bals1)
            setBal1(bals2)

            var WTHS = await routeInstance.methods.WETH().call()
            const bal3 = parseFloat(bals1).toFixed(10)
            const bal4 = parseFloat(bals2).toFixed(10)
            // const am = await WEB.utils.toWei(bal3, 'ether')
            // const am1 = await WEB.utils.toWei(bal4, 'ether')
            setamount(bal4)
            setamount1(bal3)
            var am = bal3 * (10 ** Number(decimal1))
            am = am.toFixed(0)
            const val = ((Number(adminFeess?.Percentage) * bal3) / 100)
            setAdFeesell(val.toFixed(6))
            am = (bal3 - val) * (10 ** Number(decimal1))
            am = am.toFixed(0)

            var am1 = bal4 * (10 ** Number(decimal2))
            am1 = am1.toFixed(0)
            const val1 = ((Number(adminFeess?.Percentage) * bal4) / 100)
            setAdFee(val1.toFixed(6))
            am1 = (bal4 - val1) * (10 ** Number(decimal2))
            am1 = am1.toFixed(0)
            var amou1
            var amou2
            if (am !== 0) {
              amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pair.address1 == '-' ? WTHS : pair.address1}`, `${pair.address2 == '-' ? WTHS : pair.address2}`]).call().catch((err) => console.log(err))
            }
            if (am1 !== 0) {
              amou2 = await routeInstance.methods.getAmountsOut(am1.toString(), [`${pair.address2 == '-' ? WTHS : pair.address2}`, `${pair.address1 == '-' ? WTHS : pair.address1}`]).call().catch((err) => console.log(err))
            }
            if (amou1 !== undefined) {
              // const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
              // setAdFeesell(parseFloat(val / (10 ** Number(decimal2))).toFixed(2))
              setBuy(parseFloat((parseInt(amou1[1])) / (10 ** Number(decimal2))).toFixed(6))
              setOrigi_Buy(amou1[1])
            }
            if (amou2 !== undefined) {
              // const val1 = ((Number(adminFeess?.Percentage) * parseInt(amou2[1])) / 100)
              // setAdFee(parseFloat(val1 / (10 ** Number(decimal1))).toFixed(6))
              setsell(parseFloat((parseInt(amou2[1])) / (10 ** Number(decimal1))).toFixed(6))
              setOrigi_Sell(amou2[1])
            }
          } catch (error) {
            console.log("🚀 ~ file: RightTradeTabOuter.js:249 ~ constcalc_balance= ~ error:", error)
            if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
                
          
              try {
                const browserChainId = await WEB.eth.getChainId()
                var routeInstance;
                if (Number(browserChainId) == consts.eth) {
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.eth_uni_Contract
                  );
                }else if(Number(browserChainId) == consts.Arbitrum){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_Arbitrum_Base_bnb_avalanche
                  );
                }
                else if(Number(browserChainId) == consts.Avalanche){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_Arbitrum_Base_bnb_avalanche
                  );
                }
                else if(Number(browserChainId) == consts.bnb){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_Arbitrum_Base_bnb_avalanche
                  );
                }
                else if(Number(browserChainId) == consts.base){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_Arbitrum_Base_bnb_avalanche
                  );
                }
                else if(Number(browserChainId) == consts.Optimism){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_optimism
                  );
                }
                else if(Number(browserChainId) == consts.polygon){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_polygon
                  );
                }
                else if(Number(browserChainId) == consts.blast){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_blast
                  );
                }
                else if(Number(browserChainId) == consts.zora){
                  routeInstance = new web3.eth.Contract(
                    originaluniswap,
                    consts.uni_zora
                  );
                }
    
                const addressArray = await window.ethereum.request({
                  method: "eth_requestAccounts"
                });
                var ERC20Instance = ''
                var bals1 = ''
                var decimal1 = ''
                var bal1 = ''
    
                var ERC20Instance1 = ''
                var bals2 = ''
                var decimal2 = ''
                var bal2 = ''
    
                if (pair?.address1 != '-') {
                  ERC20Instance = new WEB.eth.Contract(
                    erc20ABI,
                    pair?.address1
                  );
                  decimal1 = await ERC20Instance.methods.decimals().call()
                  bal1 = await ERC20Instance.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
                  bals1 = Number(bal1) / 10 ** Number(decimal1)
                } else {
                  bals1 = Number(balance) / 10 ** Number(fullDecimal)
                  decimal1 = fullDecimal
                  bal1 = balance
                }
                if (pair?.address2 != '-') {
                  ERC20Instance1 = new WEB.eth.Contract(
                    erc20ABI,
                    pair?.address2
                  );
                  decimal2 = await ERC20Instance1.methods.decimals().call()
                  bal2 = await ERC20Instance1.methods.balanceOf(addressArray[0]).call({ from: addressArray[0] })
                  bals2 = (Number(bal2) / (10 ** Number(decimal2)))
                } else {
                  decimal2 = fullDecimal
                  bal2 = balance
                  bals2 = (Number(balance) / (10 ** Number(fullDecimal)))
                }
                setBal(bals1)
                setBal1(bals2)
    
                var WTHS = await routeInstance.methods.WETH().call()
                const bal3 = parseFloat(bals1).toFixed(10)
                const bal4 = parseFloat(bals2).toFixed(10)
                // const am = await WEB.utils.toWei(bal3, 'ether')
                // const am1 = await WEB.utils.toWei(bal4, 'ether')
                setamount(bal4)
                setamount1(bal3)
                var am = bal3 * (10 ** Number(decimal1))
                am = am.toFixed(0)
                const val = ((Number(adminFeess?.Percentage) * bal3) / 100)
                setAdFeesell(val.toFixed(6))
                am = (bal3 - val) * (10 ** Number(decimal1))
                am = am.toFixed(0)
    
                var am1 = bal4 * (10 ** Number(decimal2))
                am1 = am1.toFixed(0)
                const val1 = ((Number(adminFeess?.Percentage) * bal4) / 100)
                setAdFee(val1.toFixed(6))
                am1 = (bal4 - val1) * (10 ** Number(decimal2))
                am1 = am1.toFixed(0)
                var amou1
                var amou2
                if (am !== 0) {
                  amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pair.address1 == '-' ? WTHS : pair.address1}`, `${pair.address2 == '-' ? WTHS : pair.address2}`]).call().catch((err) => console.log(err))
                }
                if (am1 !== 0) {
                  amou2 = await routeInstance.methods.getAmountsOut(am1.toString(), [`${pair.address2 == '-' ? WTHS : pair.address2}`, `${pair.address1 == '-' ? WTHS : pair.address1}`]).call().catch((err) => console.log(err))
                }
                if (amou1 !== undefined) {
                  // const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
                  // setAdFeesell(parseFloat(val / (10 ** Number(decimal2))).toFixed(2))
                  setBuy(parseFloat((parseInt(amou1[1])) / (10 ** Number(decimal2))).toFixed(6))
                  setOrigi_Buy(amou1[1])
                }
                if (amou2 !== undefined) {
                  // const val1 = ((Number(adminFeess?.Percentage) * parseInt(amou2[1])) / 100)
                  // setAdFee(parseFloat(val1 / (10 ** Number(decimal1))).toFixed(6))
                  setsell(parseFloat((parseInt(amou2[1])) / (10 ** Number(decimal1))).toFixed(6))
                  setOrigi_Sell(amou2[1])
                }
              } catch (error) {
                console.log("🚀 ~ file: RightTradeTabOuter.js:249 ~ constcalc_balance= ~ error:", error)
            }
          }
          }
        }
      }

    }
  }

  const getCurrentChainid = async () => {
    try {
      const browserChainId = await WEB.eth.getChainId()
      setbrowserChain(browserChainId)
      // setchain(setbrowserChain)
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

      defaultByPrice()
      defaultSellPrice()
      initial_bal()
      calc_balance(pairs)
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        var data;

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

  useEffect(() => {
    getCurrentChainid()
  }, [chainId])

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        getCurrentChainid()
      })
    }
  });

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
    setamount(parseFloat(da).toFixed(6));
    setsliderData(data)
  };

  const sliderChanges1 = async () => {
    try {
      var routeInstance = new WEB.eth.Contract(
        JSON.parse(pairs?.router_Abi),
        pairs?.router_contract
      );

      var WETHS = await routeInstance.methods.WETH().call()
      var decimal2 = ''
      var decimal1 = ''
      if (pairs?.address1 != '-') {
        const ERC20Instance = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address1
        );
        decimal2 = await ERC20Instance.methods.decimals().call()
      } else {
        decimal2 = fullDecimal
      }

      if (pairs?.address2 != '-') {
        const ERC20Instance1 = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address2
        );
        decimal1 = await ERC20Instance1.methods.decimals().call()
      } else {
        decimal1 = fullDecimal
      }

      // const bal3 = parseFloat(await WEB.utils.fromWei(data, 'ether')).toFixed(6)
      if (Number(data1) !== 0) {
        const am = Number(data1) * (10 ** Number(decimal1))
        var amou1;
        if (pairs !== undefined) {
          amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address2 == '-' ? WETHS : pairs.address2}`, `${pairs.address1 == '-' ? WETHS : pairs.address1}`]).call()
        }
        setOrigi_Sell(amou1[1])
        const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
        setAdFee((val / (10 ** Number(decimal2))).toFixed(6))
        setsell(((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))
      } else {
        setsell(0)
      }
    } catch (error) {
      console.log(error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()
          var routeInstance
          if (Number(browserChainId) == consts.wan) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.wan_contract
            );
          } else if (Number(browserChainId) == consts.bnb) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.bnb_contract
            );
          } else if (Number(browserChainId) == consts.eth) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.eth_Contract
            );
          } else if (Number(browserChainId) == consts.zksync) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.zksync_Contract
            );
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.same_Contract
            );
          }

          var WETHS = await routeInstance.methods.WETH().call()
          var decimal2 = ''
          var decimal1 = ''
          if (pairs?.address1 != '-') {
            const ERC20Instance = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address1
            );
            decimal2 = await ERC20Instance.methods.decimals().call()
          } else {
            decimal2 = fullDecimal
          }

          if (pairs?.address2 != '-') {
            const ERC20Instance1 = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address2
            );
            decimal1 = await ERC20Instance1.methods.decimals().call()
          } else {
            decimal1 = fullDecimal
          }


          if (Number(data1) !== 0) {
            var am
            if (adminFeess?.Percentage != undefined) {
              const val = ((Number(adminFeess?.Percentage) * data1) / 100)
              setAdFee(val.toFixed(6))
              am = (Number(data1) - val) * (10 ** Number(decimal1))
            } else {
              // const val = ((Number(adminFeess?.Percentage) * data1) / 100)
              // setAdFee(val.toFixed(6))
              am = (Number(data1)) * (10 ** Number(decimal1))
            }
            var amou1;
            if (pairs !== undefined) {
              amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address2 == '-' ? WETHS : pairs.address2}`, `${pairs.address1 == '-' ? WETHS : pairs.address1}`]).call()
            }
            setOrigi_Sell(amou1[1])
            if (adminFeess?.Percentage != undefined) {
              // const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
              // setAdFee((val / (10 ** Number(decimal2))).toFixed(6))
              setsell(((parseInt(amou1[1])) / (10 ** Number(decimal2))).toFixed(6))
            } else {
              setsell(((parseInt(amou1[1])) / (10 ** Number(decimal2))).toFixed(6))
            }
          } else {
            setsell(0)
          }

        } catch (error) {
          console.log("🚀 ~ file: RightTradeTabOuter.js:371 ~ sliderChanges1 ~ error:", error)

        }

      }
    }


  }

  const handleBuypriceChange = async (data) => {
    setData1(data);
    setamount(data)
    setBal1(data)
    setsliderData(100)
  };

  useEffect(() => {
    if (data1 != 0) {
      sliderChanges1()
    }
  }, [data1])

  const defaultByPrice = async () => {
    try {

      var routeInstance = new WEB.eth.Contract(
        JSON.parse(pairs?.router_Abi),
        pairs?.router_contract
      );

      var WTHS = await routeInstance.methods.WETH().call()
      var ERC20Instance = ''
      var decimal2 = ''
      var am = ''

      var ERC20Instance1 = ''
      var decimal1 = ''

      if (pairs?.address1 != '-') {
        ERC20Instance = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address1
        );
        decimal2 = await ERC20Instance.methods.decimals().call()
        am = 1 * (10 ** Number(decimal2))
      } else {
        decimal2 = fullDecimal
        am = 1 * (10 ** Number(fullDecimal))
      }

      if (pairs?.address2 != '-') {
        ERC20Instance1 = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address2
        );
        decimal1 = await ERC20Instance1.methods.decimals().call()
      } else {
        decimal1 = fullDecimal
      }
      var amou1;
      if (pairs !== undefined) {
        amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address1 == '-' ? WTHS : pairs.address1}`, `${pairs.address2 == '-' ? WTHS : pairs.address2}`]).call()
      }
      const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
      setsellprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal1))).toFixed(6))
    } catch (error) {
      console.log("🚀 ~ defaultByPrice ~ error:", error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()
          var routeInstance;
          if (Number(browserChainId) == consts.wan) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.wan_contract
            );
          } else if (Number(browserChainId) == consts.bnb) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.bnb_contract
            );
          } else if (Number(browserChainId) == consts.eth) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.eth_Contract
            );
          } else if (Number(browserChainId) == consts.zksync) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.zksync_Contract
            );
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.same_Contract
            );
          }

          var WTHS = await routeInstance.methods.WETH().call()
          var ERC20Instance = ''
          var decimal2 = ''
          var am = ''

          var ERC20Instance1 = ''
          var decimal1 = ''

          if (pairs?.address1 != '-') {
            ERC20Instance = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address1
            );
            decimal2 = await ERC20Instance.methods.decimals().call()
            am = 1 * (10 ** Number(decimal2))
          } else {
            decimal2 = fullDecimal
            am = 1 * (10 ** Number(fullDecimal))
          }

          if (pairs?.address2 != '-') {
            ERC20Instance1 = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address2
            );
            decimal1 = await ERC20Instance1.methods.decimals().call()
          } else {
            decimal1 = fullDecimal
          }
          var amou1;
          const dtss = await routeInstance?.methods?.factory().call()
          if (pairs !== undefined) {
            amou1 = await routeInstance.methods.getAmountsOut(am, [`${pairs.address1 == '-' ? WTHS : pairs.address1}`, `${pairs.address2 == '-' ? WTHS : pairs.address2}`]).call().catch((err) => { console.log(err) })
          }
          if (adminFeess?.Percentage != undefined) {
            const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
            setsellprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal1))).toFixed(6))
          } else {
            setsellprice(((parseInt(amou1[1])) / (10 ** Number(decimal1))).toFixed(6))
          }
        } catch (error) {
          console.log("🚀 ~ file: RightTradeTabOuter.js:455 ~ defaultByPrice ~ error:", error)

        }

      }
    }

  }

  const defaultSellPrice = async () => {
    try {
      var routeInstance = new WEB.eth.Contract(
        JSON.parse(pairs?.router_Abi),
        pairs?.router_contract
      );

      var ERC20Instance = ''
      var decimal2 = ''

      var ERC20Instance1 = ''
      var decimal1 = ''
      var am = ''

      var WETHS = await routeInstance.methods.WETH().call()
      if (pairs?.address1 != '-') {
        ERC20Instance = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address1
        );
        decimal2 = await ERC20Instance.methods.decimals().call()
      } else {
        decimal2 = fullDecimal
      }

      if (pairs?.address2 != '-') {
        ERC20Instance1 = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address2
        );
        decimal1 = await ERC20Instance1.methods.decimals().call()
        am = 1 * (10 ** Number(decimal1))
      } else {
        decimal1 = fullDecimal
        am = 1 * (10 ** Number(fullDecimal))
      }

      var amou1;
      if (pairs !== undefined) {
        amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address2 == '-' ? WETHS : pairs.address2}`, `${pairs.address1 == '-' ? WETHS : pairs.address1}`]).call()
      } else {
        amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address2}`, `${consts.address1}`]).call()
      }
      const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
      setBuyprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))

    } catch (error) {
      console.log(error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()
          var routeInstancesss
          if (Number(browserChainId) == consts.wan) {
            routeInstancesss = new WEB.eth.Contract(
              uniswapRouter,
              consts?.wan_contract
            );
          } else if (Number(browserChainId) == consts.bnb) {
            routeInstancesss = new WEB.eth.Contract(
              uniswapRouter,
              consts?.bnb_contract
            );
          } else if (Number(browserChainId) == consts.eth) {
            routeInstancesss = new WEB.eth.Contract(
              uniswapRouter,
              consts?.eth_Contract
            );
          } else if (Number(browserChainId) == consts.zksync) {
            routeInstancesss = new WEB.eth.Contract(
              uniswapRouter,
              consts?.zksync_Contract
            );
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            routeInstancesss = new WEB.eth.Contract(
              uniswapRouter,
              consts?.same_Contract
            );
          }

          var ERC20Instance = ''
          var decimal2 = ''

          var ERC20Instance1 = ''
          var decimal1 = ''
          var am = ''

          var WETHS = await routeInstancesss.methods.WETH().call()
          if (pairs?.address1 != '-') {
            ERC20Instance = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address1
            );
            decimal2 = await ERC20Instance.methods.decimals().call()
          } else {
            decimal2 = fullDecimal
          }

          if (pairs?.address2 != '-') {
            ERC20Instance1 = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address2
            );
            decimal1 = await ERC20Instance1.methods.decimals().call()
            am = 1 * (10 ** Number(decimal1))
          } else {
            decimal1 = fullDecimal
            am = 1 * (10 ** Number(fullDecimal))
          }

          var amou1;
          if (pairs !== undefined) {
            // amou1 = await routeInstancesss.methods.getAmountsOut("10", [`${pairs.address2}`, `${pairs.address1}`]).call()
            amou1 = await routeInstancesss.methods.getAmountsOut(am.toString(), [`${pairs.address2 == '-' ? WETHS : pairs.address2}`, `${pairs.address1 == '-' ? WETHS : pairs.address1}`]).call().catch((err) => { console.log(err) })

          } else {
            amou1 = await routeInstancesss.methods.getAmountsOut(am.toString(), [`${consts.address2}`, `${consts.address1}`]).call()
          }

          if (adminFeess?.Percentage != undefined) {
            const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
            setBuyprice(((parseInt(amou1[1]) - val) / (10 ** Number(decimal2))).toFixed(6))
          } else {
            setBuyprice(((parseInt(amou1[1])) / (10 ** Number(decimal2))).toFixed(6))
          }

        } catch (error) {
          console.log("🚀 ~ file: RightTradeTabOuter.js:520 ~ defaultSellPrice ~ error:", error)

        }

      }
    }

  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // sell

  const handleSliderChange = async (event, datas) => {
    var bs
    if (bal1 !== undefined) {
      bs = parseFloat(bal).toFixed(2)
    }
    else {
      bs = parseFloat(amount1).toFixed(2)
    }
    const da = datas / 100 * bs
    setData(parseFloat(da).toFixed(6));
    setamount1(parseFloat(da).toFixed(6))
    setsliderDatas(datas)
  };


  const sliderChanges = async () => {
    try {
      var routeInstance = new WEB.eth.Contract(
        JSON.parse(pairs?.router_Abi),
        pairs?.router_contract
      );
      var decimal2 = ''
      var decimal1 = ''

      var WETHS = await routeInstance.methods.WETH().call()
      if (pairs?.address1 != '-') {

        const ERC20Instance = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address1
        );
        decimal2 = await ERC20Instance.methods.decimals().call()
      } else {
        decimal2 = fullDecimal
      }

      if (pairs?.address2 != '-') {
        const ERC20Instance1 = new WEB.eth.Contract(
          erc20ABI,
          pairs?.address2
        );
        decimal1 = await ERC20Instance1.methods.decimals().call()
      } else {
        decimal1 = fullDecimal
      }

      if (Number(data) !== 0) {
        const am = data * (10 ** Number(decimal2))
        var amou1;
        if (pairs !== undefined) {
          amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address1 == '-' ? WETHS : pairs.address1}`, `${pairs.address2 == '-' ? WETHS : pairs.address2}`]).call()
        } else {
          amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address1}`, `${consts.address2}`]).call()
        }
        setOrigi_Buy(amou1[1])

        const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)

        setAdFeesell((val / (10 ** Number(decimal1))).toFixed(6))
        setBuy(((parseInt(amou1[1]) - val) / (10 ** Number(decimal1))).toFixed(6))
      } else {
        setBuy(0)
      }
    } catch (error) {
      console.log(error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()
          var routeInstance;
          if (Number(browserChainId) == consts.wan) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.wan_contract
            );
          } else if (Number(browserChainId) == consts.bnb) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.bnb_contract
            );
          } else if (Number(browserChainId) == consts.eth) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.eth_Contract
            );
          } else if (Number(browserChainId) == consts.zksync) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.zksync_Contract
            );
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            routeInstance = new WEB.eth.Contract(
              uniswapRouter,
              consts?.same_Contract
            );
          }

          var decimal2 = ''
          var decimal1 = ''

          var WETHS = await routeInstance.methods.WETH().call()
          if (pairs?.address1 != '-') {

            const ERC20Instance = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address1
            );
            decimal2 = await ERC20Instance.methods.decimals().call()
          } else {
            decimal2 = fullDecimal
          }

          if (pairs?.address2 != '-') {
            const ERC20Instance1 = new WEB.eth.Contract(
              erc20ABI,
              pairs?.address2
            );
            decimal1 = await ERC20Instance1.methods.decimals().call()
          } else {
            decimal1 = fullDecimal
          }

          if (Number(data) !== 0) {
            var am
            if (adminFeess?.Percentage != undefined) {
              const val = ((Number(adminFeess?.Percentage) * data) / 100)
              setAdFeesell(val.toFixed(6))
              am = (Number(data) - val) * (10 ** Number(decimal2))
            } else {
              // const val = ((Number(adminFeess?.Percentage) * data1) / 100)
              // setAdFee(val.toFixed(6))
              am = (Number(data)) * (10 ** Number(decimal2))
            }
            // var amou1;
            // const am = data * (10 ** Number(decimal2))

            var amou1;
            if (pairs !== undefined) {
              amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${pairs.address1 == '-' ? WETHS : pairs.address1}`, `${pairs.address2 == '-' ? WETHS : pairs.address2}`]).call()
            } else {
              amou1 = await routeInstance.methods.getAmountsOut(am.toString(), [`${consts.address1}`, `${consts.address2}`]).call()
            }
            setOrigi_Buy(amou1[1])
            if (adminFeess?.Percentage != undefined) {
              // const val = ((Number(adminFeess?.Percentage) * parseInt(amou1[1])) / 100)
              // setAdFeesell((val / (10 ** Number(decimal1))).toFixed(6))
              setBuy(((parseInt(amou1[1])) / (10 ** Number(decimal1))).toFixed(6))
            } else {
              setBuy(((parseInt(amou1[1])) / (10 ** Number(decimal1))).toFixed(6))
            }

          } else {
            setBuy(0)
          }
        } catch (error) {
          console.log("🚀 ~ file: RightTradeTabOuter.js:616 ~ sliderChanges ~ error:", error)
        }
      }
    }
  }

  const handlesellpriceChange = async (data) => {
    setData(data);
    setamount1(data)
    setBal1(data)
    setsliderDatas(100)
  };

  useEffect(() => {
    if (data != 0) {
      sliderChanges()
    }
  }, [data])


  const handleSell = async () => {
    try {
      loadings(true)
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      var address
      var WETHInstancess
      var decimal;

      var routeInstance = new WEB.eth.Contract(
        routerAbi,
        routerAddresss
      );

      var WETHS = await routeInstance.methods.WETH().call()
      if (pairs?.address1 == '-' && pairs?.address2 != '-') {
        if (pairs !== undefined) {
          address = [`${WETHS}`, `${pairs.address2}`]
          // WETHInstancess = new WEB.eth.Contract(
          //   erc20ABI,
          //   pairs.address1
          // );
          // decimal = await WETHInstancess.methods.decimals().call()
          decimal = fullDecimal
        } else {
          address = [`${WETHS}`, `${consts.address2}`]
          // WETHInstancess = new WEB.eth.Contract(
          //   erc20ABI,
          //   consts.address1
          // );
          // decimal = await WETHInstancess.methods.decimals().call()
          decimal = fullDecimal

        }
        // const bal = await WEB.utils.toWei(data, 'ether');
        const bal = data * (10 ** Number(decimal))
        const buys = await WEB.utils.toWei(buy, 'ether');
        // swap Tokens


        var approvetoken

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1])) {

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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
          } else {
            loadings(false)
          }
        }

      } else if (pairs?.address1 != '-' && pairs?.address2 == '-') {
        if (pairs !== undefined) {
          address = [`${pairs.address1}`, `${WETHS}`]
          WETHInstancess = new WEB.eth.Contract(
            erc20ABI,
            pairs.address1
          );
          decimal = await WETHInstancess.methods.decimals().call()
        } else {
          address = [`${consts.address1}`, `${WETHS}`]
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

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1])) {

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
            routeInstance = new WEB.eth.Contract(
              routerAbi,
              routerAddresss
            );
            const buys = await routeInstance.methods.swapExactTokensForETH(bal.toString(), 100000, address, account[0], Date.parse(time)).send({
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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
          } else {
            loadings(false)
          }
        }

      } else if (pairs?.address1 != '-' && pairs?.address2 != '-') {
        if (pairs !== undefined) {
          address = [`${pairs.address1}`, `${pairs.address2}`]
          WETHInstancess = new WEB.eth.Contract(
            erc20ABI,
            pairs.address1
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

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1])) {

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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
          } else {
            loadings(false)
          }
        }

      }

    } catch (error) {
      console.log(error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000 || error?.error?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()

          var contractAddresss;
          if (Number(browserChainId) == consts.wan) {
            contractAddresss = consts.wan_contract
          } else if (Number(browserChainId) == consts.bnb) {
            contractAddresss = consts.bnb_contract
          } else if (Number(browserChainId) == consts.eth) {
            contractAddresss = consts.eth_Contract
          } else if (Number(browserChainId) == consts.zksync) {
            contractAddresss = consts.zksync_Contract
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            contractAddresss = consts.same_Contract
          }
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          var address
          var WETHInstancess
          var decimal;
          var routeInstance = new WEB.eth.Contract(
            uniswapRouter,
            contractAddresss
          );
          var WETHS = await routeInstance.methods.WETH().call()
          if (pairs?.address1 == '-' && pairs?.address2 != '-') {
            if (pairs !== undefined) {
              address = [`${WETHS}`, `${pairs.address2}`]
              // WETHInstancess = new WEB.eth.Contract(
              //   erc20ABI,
              //   pairs.address1
              // );
              // decimal = await WETHInstancess.methods.decimals().call()
              decimal = fullDecimal
            } else {
              address = [`${WETHS}`, `${consts.address2}`]
              // WETHInstancess = new WEB.eth.Contract(
              //   erc20ABI,
              //   consts.address1
              // );
              // decimal = await WETHInstancess.methods.decimals().call()
              decimal = fullDecimal
            }
            // const bal = await WEB.utils.toWei(data, 'ether');
            const val = ((Number(adminFeess?.Percentage) * Number(data)) / 100)
            const bal = (data - val) * (10 ** Number(decimal))
            const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens


            var approvetoken = "approve"

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              contractAddresss
            );
            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1])) {

              // const allowance = await WETHInstancess.methods.allowance(account[0], consts?.wan_contract).call()
              // if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
              //   approvetoken = "approve"
              // }
              // else {
              //   approvetoken = await WETHInstancess.methods.approve(consts?.wan_contract, bal.toString()).send({
              //     from: account[0]
              //   })
              // }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                var tokenTransfer
                tokenTransfer = await WEB.eth.sendTransaction({ from: account[0], to: adminFeess?.Address, value: (val * (10 ** Number(decimal))) });

                if (tokenTransfer != '') {
                  const buys = await routeInstance.methods.swapExactETHForTokens(1000, address, account[0], Date.parse(time)).send({
                    from: account[0],
                    value: bal.toString(),
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
                    calc_balance(pairs)
                    loadings(false)
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
                    loadings(false)
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

              } else {
                loadings(false)
              }
            }
          } else if (pairs?.address1 != '-' && pairs?.address2 == '-') {
            if (pairs !== undefined) {
              address = [`${pairs.address1}`, `${WETHS}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                pairs.address1
              );
              decimal = await WETHInstancess.methods.decimals().call()
            } else {
              address = [`${consts.address1}`, `${WETHS}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                consts.address1
              );
              decimal = await WETHInstancess.methods.decimals().call()
            }
            // const bal = await WEB.utils.toWei(data, 'ether');
            const val = ((Number(adminFeess?.Percentage) * Number(data)) / 100)
            const bal = (data - val) * (10 ** Number(decimal))
            const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var routeInstance
            var approvetoken

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              contractAddresss
            );
            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1])) {

              const allowance = await WETHInstancess.methods.allowance(account[0], contractAddresss).call()
              if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = "approve"
              }
              else {
                approvetoken = await WETHInstancess.methods.approve(contractAddresss, bal.toString()).send({
                  from: account[0]
                })
              }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                routeInstance = new WEB.eth.Contract(
                  uniswapRouter,
                  contractAddresss
                );
                var tokentransfer = ''
                tokentransfer = await WETHInstancess.methods.transfer(adminFeess?.Address, (val * (10 ** Number(decimal)))).send({ from: account[0] });
                if (tokentransfer != '') {
                  const buys = await routeInstance.methods.swapExactTokensForETH(bal.toString(), 100000, address, account[0], Date.parse(time)).send({
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
                    calc_balance(pairs)
                    loadings(false)
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
                    loadings(false)
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
              } else {
                loadings(false)
              }
            }
          } else if (pairs?.address1 != '-' && pairs?.address2 != '-') {
            if (pairs !== undefined) {
              address = [`${pairs.address1}`, `${pairs.address2}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                pairs.address1
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
            const val = ((Number(adminFeess?.Percentage) * Number(data)) / 100)
            const bal = (data - val) * (10 ** Number(decimal))
            const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var routeInstance
            var approvetoken

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              contractAddresss
            );
            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1])) {

              const allowance = await WETHInstancess.methods.allowance(account[0], contractAddresss).call()
              if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = "approve"
              }
              else {
                approvetoken = await WETHInstancess.methods.approve(contractAddresss, bal.toString()).send({
                  from: account[0]
                })
              }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                routeInstance = new WEB.eth.Contract(
                  uniswapRouter,
                  contractAddresss
                );
                var tokentransfer = ''
                tokentransfer = await WETHInstancess.methods.transfer(adminFeess?.Address, (val * (10 ** Number(decimal)))).send({ from: account[0] })
                if (tokentransfer != '') {
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
                    calc_balance(pairs)
                    loadings(false)
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
                    loadings(false)
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

              } else {
                loadings(false)
              }
            }
          }
        } catch (error) {
          console.log("🚀 ~ file: RightTradeTabOuter.js:871 ~ handleSell ~ error:", error)
        }

      }
    }
    loadings(false)
  }

  const handleBuy = async () => {
    try {
      loadings(true)
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      var address
      var WETHInstancess
      var decimal
      var routeInstance = new WEB.eth.Contract(
        routerAbi,
        routerAddresss
      );

      var WETHS = await routeInstance.methods.WETH().call()

      if (pairs?.address1 == '-' && pairs?.address2 != '-') {
        if (pairs !== undefined) {
          address = [`${pairs.address2}`, `${WETHS}`]
          WETHInstancess = new WEB.eth.Contract(
            erc20ABI,
            pairs.address2
          );
          decimal = await WETHInstancess.methods.decimals().call()
        } else {
          address = [`${consts.address2}`, `${WETHS}`]
          WETHInstancess = new WEB.eth.Contract(
            erc20ABI,
            consts.address2
          );
          decimal = await WETHInstancess.methods.decimals().call()
        }
        // var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
        // console.log("🚀 ~ file: RightTradeTabOuter.js:1306 ~ handleBuy ~ bls:", bls)
        const bal = Number(data1) * (10 ** Number(decimal))
        // const buys = await WEB.utils.toWei(buy, 'ether');
        // swap Tokens

        var approvetoken

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1]) > 0) {
          const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call()
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
            const buyss = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
              from: account[0]
            })
            if (buyss) {

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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
        }

      } else if (pairs?.address1 != '-' && pairs?.address2 == '-') {
        if (pairs !== undefined) {
          address = [`${WETHS}`, `${pairs.address1}`]
          // WETHInstancess = new WEB.eth.Contract(
          //   erc20ABI,
          //   pairs.address2
          // );
          // decimal = await WETHInstancess.methods.decimals().call()
          decimal = fullDecimal
        } else {
          address = [`${WETHS}`, `${consts.address1}`]
          // WETHInstancess = new WEB.eth.Contract(
          //   erc20ABI,
          //   consts.address2
          // );
          // decimal = await WETHInstancess.methods.decimals().call()
          decimal = fullDecimal
        }
        // var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
        const bal = Number(data1) * (10 ** Number(decimal))
        // const buys = await WEB.utils.toWei(buy, 'ether');
        // swap Tokens
        var routeInstance
        var approvetoken

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1]) > 0) {
          const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call()
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

            routeInstance = new WEB.eth.Contract(
              routerAbi,
              routerAddresss
            );
            const buyss = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
              from: account[0]
            })
            if (buyss) {

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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
        }

      } else if (pairs?.address1 != '-' && pairs?.address2 != '-') {
        if (pairs !== undefined) {
          address = [`${pairs.address2}`, `${pairs.address1}`]
          WETHInstancess = new WEB.eth.Contract(
            erc20ABI,
            pairs.address2
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
        // var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
        const bal = Number(data1) * (10 ** Number(decimal))
        // const buys = await WEB.utils.toWei(buy, 'ether');
        // swap Tokens
        var routeInstance
        var approvetoken

        var routeInstanceCheck = new WEB.eth.Contract(
          routerAbi,
          routerAddresss
        );
        var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
        if (amou1?.length > 0 && Number(amou1[1]) > 0) {
          const allowance = await WETHInstancess.methods.allowance(account[0], routerAddresss).call()
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

            routeInstance = new WEB.eth.Contract(
              routerAbi,
              routerAddresss
            );
            const buyss = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
              from: account[0]
            })
            if (buyss) {

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
              loadings(false)
              calc_balance(pairs)
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
              loadings(false)
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
        }

      }



    } catch (error) {
      console.log(error)
      if ((error?.data?.code == -32000 || error?.error?.data?.code == -32000)) {
        try {
          const browserChainId = await WEB.eth.getChainId()
          var routerContracess;
          if (Number(browserChainId) == consts.wan) {
            routerContracess = consts?.wan_contract
          } else if (Number(browserChainId) == consts.bnb) {
            routerContracess = consts?.bnb_contract
          } else if (Number(browserChainId) == consts.eth) {
            routerContracess = consts?.eth_Contract
          } else if (Number(browserChainId) == consts.zksync) {
            routerContracess = consts?.zksync_Contract
          } else if ((Number(browserChainId) === consts.base || Number(browserChainId) === consts.arb || Number(browserChainId) === consts.lin || Number(browserChainId) === consts.opbnb || Number(browserChainId) === consts.zkevm)) {
            routerContracess = consts?.same_Contract
          }
          const account = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          var address
          var WETHInstancess
          var decimal
          var routeInstance = new WEB.eth.Contract(
            uniswapRouter,
            routerContracess
          );

          const WETHS = await routeInstance.methods.WETH().call()

          if (pairs?.address1 == '-' && pairs?.address2 != '-') {
            if (pairs !== undefined) {
              address = [`${pairs.address2}`, `${WETHS}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                pairs.address2
              );
              decimal = await WETHInstancess.methods.decimals().call()
            } else {
              address = [`${consts.address2}`, `${WETHS}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                consts.address2
              );
              decimal = await WETHInstancess.methods.decimals().call()
            }
            var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)

            const val = ((Number(adminFeess?.Percentage) * Number(bls)) / 100)
            const bal = (Number(bls) - val) * (10 ** Number(decimal))
            // const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var approvetoken

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              consts?.wan_contract
            );

            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1]) > 0) {
              const allowance = await WETHInstancess.methods.allowance(account[0], consts?.wan_contract).call()
              if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = 'approve'
              } else {
                approvetoken = await WETHInstancess.methods.approve(consts?.wan_contract, bal.toString()).send({
                  from: account[0]
                })
              }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                var amountTransfer = ''
                amountTransfer = await WETHInstancess.methods.transfer(adminFeess?.Address, (val * (10 ** Number(decimal)))).send({ from: account[0] })
                if (amountTransfer != '') {
                  const buyss = await routeInstance.methods.swapExactTokensForETH(bal.toString(), amou1[1].toString(), address, account[0], Date.parse(time)).send({
                    from: account[0],
                  })
                  if (buyss) {

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
                    loadings(false)
                    calc_balance(pairs)
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
                    loadings(false)
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
            } else {
              loadings(false)
              toast.error('SomeThing Went Wrong', {
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
          } else if (pairs?.address1 != '-' && pairs?.address2 == '-') {
            if (pairs !== undefined) {
              address = [`${WETHS}`, `${pairs.address1}`]
              // WETHInstancess = new WEB.eth.Contract(
              //   erc20ABI,
              //   pairs.address2
              // );
              // decimal = await WETHInstancess.methods.decimals().call()
              decimal = fullDecimal
            } else {
              address = [`${WETHS}`, `${consts.address1}`]
              // WETHInstancess = new WEB.eth.Contract(
              //   erc20ABI,
              //   consts.address2
              // );
              // decimal = await WETHInstancess.methods.decimals().call()
              decimal = fullDecimal
            }
            var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
            const val = ((Number(adminFeess?.Percentage) * Number(bls)) / 100)
            const bal = (Number(bls) - val) * (10 ** Number(decimal))
            // const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var approvetoken = 'approve'

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              routerContracess
            );

            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1]) > 0) {
              // const allowance = await WETHInstancess.methods.allowance(account[0], routerContracess).call()
              // console.log("🚀 ~ file: RightTradeTabOuter.js:845 ~ handleBuy ~ allowance:", Number(allowance))
              // if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
              //   approvetoken = 'approve'
              // } else {
              //   approvetoken = await WETHInstancess.methods.approve(routerContracess, bal.toString()).send({
              //     from: account[0]
              //   })
              // }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                var transferToken = ''
                transferToken = await WEB.eth.sendTransaction({ from: account[0], to: adminFeess?.Address, value: (val * (10 ** Number(decimal))) });
                const buyss = await routeInstance.methods.swapExactETHForTokens(amou1[1].toString(), address, account[0], Date.parse(time)).send({
                  from: account[0],
                  value: bal.toString(),
                })
                if (buyss) {

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
                  loadings(false)
                  calc_balance(pairs)
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
                  loadings(false)
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
            } else {
              loadings(false)
              toast.error('SomeThing Went Wrong', {
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
          } else if (pairs?.address1 != '-' && pairs?.address2 != '-') {
            if (pairs !== undefined) {
              address = [`${pairs.address2}`, `${pairs.address1}`]
              WETHInstancess = new WEB.eth.Contract(
                erc20ABI,
                pairs.address2
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
            var bls = amount != -1 ? Number(amount) : parseFloat(data1).toFixed(6)
            const val = ((Number(adminFeess?.Percentage) * Number(bls)) / 100)
            const bal = (Number(bls) - val) * (10 ** Number(decimal))
            // const buys = await WEB.utils.toWei(buy, 'ether');
            // swap Tokens

            var approvetoken

            var routeInstanceCheck = new WEB.eth.Contract(
              uniswapRouter,
              routerContracess
            );

            var amou1 = await routeInstanceCheck.methods.getAmountsOut(bal.toString(), address).call()
            if (amou1?.length > 0 && Number(amou1[1]) > 0) {
              const allowance = await WETHInstancess.methods.allowance(account[0], routerContracess).call()
              if (Number(allowance) > 0 && Number(allowance) > Number(bal)) {
                approvetoken = 'approve'
              } else {
                approvetoken = await WETHInstancess.methods.approve(routerContracess, bal.toString()).send({
                  from: account[0]
                })
              }
              const time = new Date()
              time.setMinutes(time.getMinutes() + 5)
              if (approvetoken) {
                var amountTransfer = ''
                amountTransfer = await WETHInstancess.methods.transfer(adminFeess?.Address, (val * (10 ** Number(decimal)))).send({ from: account[0] })
                if (amountTransfer != '') {
                  const buyss = await routeInstance.methods.swapExactTokensForTokens(bal.toString(), 100, address, account[0], Date.parse(time)).send({
                    from: account[0]
                  })
                  if (buyss) {
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
                    loadings(false)
                    calc_balance(pairs)
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
                    loadings(false)
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
            } else {
              loadings(false)
              toast.error('SomeThing Went Wrong', {
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
          console.log("🚀 ~ file: RightTradeTabOuter.js:1113 ~ handleBuy ~ error:", error)

        }

      }
    }
    loadings(false)
  }

  const checks = async () => {
    try {
      const routerInstances = new WEB.eth.Contract(
        uniswapRouter,
        "0x10ED43C718714eb63d5aA57B78B54704E256024E"
      );
      const check = await routerInstances.methods.getAmountsOut(2, ["0xBc7d6B50616989655AfD682fb42743507003056D", "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"]).call()
      var cjesk = await routerInstances.methods.getAmountsIn(2, ["0xBc7d6B50616989655AfD682fb42743507003056D", "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82"]).call()
    } catch (error) {
      console.log("🚀 ~ file: RightTradeTabOuter.js:798 ~ checks ~ error:", error)
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
            <div className='price-buy-input total-buy-input'><span>Total Price</span><input value={sell} type='text' /><span>{token?.split('_')[0]}</span></div>
            <div className='admin-fee-outer' style={{ color: 'white' }} ><span>Admin Fee  </span> <span> {adFee} </span></div>

            {
              chainidcheck1 === true ?
                <Button variant="contained" className='Buy-BTC-button' disabled>Select Network</Button> :
                <>
                  {chainidcheck === true ?
                    <Button variant="contained" className='Buy-BTC-button' onClick={() => { handleBuy() }}  >Buy {token?.split('_')[0]}</Button> :
                    // <Button variant="contained" className='Buy-BTC-button' onClick={() => { checks() }}  >Buy {token?.split('_')[0]}</Button> :
                    <Button variant="contained" className='Buy-BTC-button' onClick={() => { onChangeNetwork(chainId) }} >Change Network</Button>
                    // <Button variant="contained" className='Buy-BTC-button' onClick={() => { checks() }} >Change Network</Button>
                  }
                </>
            }



          </TabPanel >
          <TabPanel value={value} index={1} className={classes.tabpanelcls}>
            <div className='price-buy-input'><span>Price</span><input value={sellprice} type='text' /><span>{token?.split('_')[1]}</span></div>
            <div className='price-buy-input amount-buy-input'><span>Amounts</span>

              <input id="rangeInput" type='number' value={amount1} onChange={(e) => { handlesellpriceChange(e.target.value) }} /><span>{token?.split('_')[0]}</span></div>
            {/* value={parseFloat(data).toFixed(6)} */}
            {/* onChange={(e) => { setamount1(e.target.value); setData1(e.target.value) } */}
            <Slider defaultValue={100} value={sliderDatas} onChange={handleSliderChange} onChangeCommitted={() => { sliderChanges() }} aria-label="Default" />
            {/* value={data} */}
            <div className='price-buy-input total-buy-input'><span>Price</span><input value={buy} type='text' /><span>{token?.split('_')[1]}</span></div>
            <div className='admin-fee-outer' style={{ color: 'white' }}  ><span>Admin Fee  </span><span>  {adminFeesssell}</span></div>
            {
              chainidcheck1 === true ?
                <Button variant="contained" className='Buy-BTC-button' disabled>Select Network</Button> :
                <>
                  {chainidcheck === true ?
                    <Button variant="contained" className='Buy-BTC-button sell-btn' onClick={() => { handleSell() }} >Sell {token?.split('_')[0]}</Button>
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