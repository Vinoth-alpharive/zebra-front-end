import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from "react-apexcharts";
import { useParams } from 'react-router-dom';
import Axios from "../../Axios"
let tvScriptLoadingPromise;
import Web3 from 'web3';
import factory from '../../Web3/Abi/factoryAbi.json'
import routerx from '../../Web3/Abi/routeABI.json'

import './TradingViewPrice.css'
import consts from '../../Constansts';

export default function TradingViewWidget({ pairs }) {


  let { token } = useParams();
  // console.log(token, 'useParams');

  const data = pairs ? pairs?.pair_symbol.split('_') : token?.split('_')
  // console.log(pairs, 'TradingViewWidgetpairs');

  const onLoadScriptRef = useRef();
  const [chartData, setChartData] = useState({})

  var WEB = new Web3(pairs?.network?.rpc_Url);
  const [pairsAdd, setPairsAdd] = useState('0xdFC8944ef846c2Af377DD0CF1e4536244a1663f1')
  const [names, setNames] = useState('wan')

  // console.log(names, pairsAdd, 'loggs');

  //USDT
  const getChartData = async () => {
    try {
      setChartData({})
      // console.log(token)
      await Axios.post(`/auth/tradingViewData`, {
        pair: token
      }).then((res) => {
        if (res?.data?.success) {
          // console.log(res?.data?.result)
          setChartData(res?.data?.result)
        }
        else {
          setChartData({})
        }

      }).catch((err) => {
        console.log(err)
      });
    } catch (error) {
      console.log(error, "error")
    }
    // const dts = []
    // const dts1 = []

  }
  const series = [{
    name: "trade",
    data: chartData.price,

  }]

  const options = {
    chart: {
      height: 350,
      type: 'area',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Trading Chart',
      align: 'left',
      style: {
        fontSize: '20px',
        color: '#fff'
      }
    },
    grid: {
      show: false
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    xaxis: {
      categories: chartData.date,
      labels: {
        style: {
          colors: '#fff'
        }
      }
    }
  }

  //WAN
  const getPairs = async () => {
    var factorys;
    // var router;
    var add1;
    var add2;
    if (pairs?.network?.chainId == 1) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.eth_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.eth_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('ether')
    } else if (pairs?.network?.chainId == 56) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.bnb_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.bnb_contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('bnb')
    } else if (pairs?.network?.chainId == 324) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.zksync_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.zksync_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('zksync')
    } else if (pairs?.network?.chainId == 8453) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.same_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.same_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('base')
    } else if (pairs?.network?.chainId == 42161) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.same_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.same_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('arbitrum')
    } else if (pairs?.network?.chainId == 59144) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.same_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.same_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('linea')
    } else if (pairs?.network?.chainId == 204) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.same_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.same_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('opbnb')
    } else if (pairs?.network?.chainId == 1101) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.same_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.same_Contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('polygonzkevm')
    } else if (pairs?.network?.chainId == 888) {
      factorys = new WEB.eth.Contract(
        factory,
        consts?.wan_factory
      );
      var router = new WEB.eth.Contract(
        routerx,
        consts?.wan_contract
      );
      var pairss = await router.methods.WETH().call()
      if (pairs?.address1 == '-') {
        add1 = pairss
        add2 = pairs?.address2
      } else if (pairs?.address2 == '-') {
        add1 = pairs?.address1
        add2 = pairss
      } else {
        add1 = pairs?.address1
        add2 = pairs?.address2
      }
      setNames('wan')
    }
    var datas = await factorys.methods.getPair(add1, add2).call()
    setPairsAdd(datas)
  }

  useEffect(() => {
    if (data?.[1] == 'USDT' || data?.[1] == 'BOBA') {
      getChartData()
    }
  }, [token])

  useEffect(
    () => {
      if (data?.[1] == 'USDT' || data?.[1] == 'BOBA') {
        onLoadScriptRef.current = createWidget;
        // console.log(pairs?.pair_symbol?.split('_').join(''), "pairs")
        if (!tvScriptLoadingPromise) {
          tvScriptLoadingPromise = new Promise((resolve) => {
            const script = document.createElement('script');
            script.id = 'tradingview-widget-loading-script';
            script.src = 'https://s3.tradingview.com/tv.js';
            script.type = 'text/javascript';
            script.onload = resolve;

            document.head.appendChild(script);
          });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => onLoadScriptRef.current = null;

        function createWidget() {
          if (document.getElementById('tradingview_5911e') && 'TradingView' in window) {
            new window.TradingView.widget({
              width: "100%",
              height: 400,
              symbol: `Binance:${pairs?.pair_symbol?.split('_').join('') == undefined ? token?.split('_').join('') : pairs?.pair_symbol?.split('_').join('')
                }`,
              interval: "D",
              timezone: "Etc/UTC",
              theme: "dark",
              style: "1",
              locale: "en",
              toolbar_bg: "#f1f3f6",
              enable_publishing: false,
              allow_symbol_change: true,
              container_id: "tradingview_5911e"
            });
          }
        }
      }
      else {
        if (pairs) {
          getPairs()
        }
      }
    },
    [pairs, token]
  );

  return (
    <div className='tradingview-widget-container'>
      {/* <ReactApexChart options={options} series={series} type="area" height={350} /> */}
      {
        data?.[1] == 'USDT' || data?.[1] == 'BOBA' ?
          <div id='tradingview_5911e' /> :
          <iframe id="dextools-widget"
            title="DEXTools Trading Chart"
            width="95%"
            height="400" src={`https://www.dextools.io/widget-chart/en/${names}/pe-light/${pairsAdd}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false&embedded=true`}></iframe>
      }
    </div>
  );
}

// const TradingViewWidget = ({ pairs }) => {
//   var WEB = new Web3(pairs?.network?.rpc_Url);
//   const [pairsAdd, setPairsAdd] = useState('0xdFC8944ef846c2Af377DD0CF1e4536244a1663f1')
//   const [names, setNames] = useState('wan')

//   console.log(names, pairsAdd, 'loggs');

//   const getPairs = async () => {
//     var factorys;
//     // var router;
//     var add1;
//     var add2;
//     if (pairs?.network?.chainId == 1) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.eth_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.eth_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('ether')
//     } else if (pairs?.network?.chainId == 56) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.bnb_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.bnb_contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('bnb')
//     } else if (pairs?.network?.chainId == 324) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.zksync_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.zksync_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('zksync')
//     } else if (pairs?.network?.chainId == 8453) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.same_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.same_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('base')
//     } else if (pairs?.network?.chainId == 42161) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.same_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.same_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('arbitrum')
//     } else if (pairs?.network?.chainId == 59144) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.same_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.same_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('linea')
//     } else if (pairs?.network?.chainId == 204) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.same_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.same_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('opbnb')
//     } else if (pairs?.network?.chainId == 1101) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.same_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.same_Contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('polygonzkevm')
//     } else if (pairs?.network?.chainId == 888) {
//       factorys = new WEB.eth.Contract(
//         factory,
//         consts?.wan_factory
//       );
//       var router = new WEB.eth.Contract(
//         routerx,
//         consts?.wan_contract
//       );
//       var pairss = await router.methods.WETH().call()
//       if (pairs?.address1 == '-') {
//         add1 = pairss
//         add2 = pairs?.address2
//       } else if (pairs?.address2 == '-') {
//         add1 = pairs?.address1
//         add2 = pairss
//       } else {
//         add1 = pairs?.address1
//         add2 = pairs?.address2
//       }
//       setNames('wan')
//     }
//     var datas = await factorys.methods.getPair(add1, add2).call()
//     setPairsAdd(datas)
//   }
//   useEffect(() => {
//     if (pairs) {
//       getPairs()
//     }
//   }, [pairs])
//   const onLoadScriptRef = useRef();
//   return (
//     <div className='tradingview-widget-container'>
//       <iframe id="dextools-widget"
//         title="DEXTools Trading Chart"
//         width="95%"
//         height="400" src={`https://www.dextools.io/widget-chart/en/${names}/pe-light/${pairsAdd}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false&embedded=true`}></iframe>
//     </div >
//   );
// }

// export default TradingViewWidget
