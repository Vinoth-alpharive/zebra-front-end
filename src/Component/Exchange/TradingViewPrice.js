// TradingViewWidget.js

import React, { useEffect, useRef, useState } from 'react';
import './TradingViewPrice.css'
import Web3 from 'web3';
import factory from '../../Web3/Abi/factoryAbi.json'
import consts from '../../Constansts';
import routerx from '../../Web3/Abi/routeABI.json'
let tvScriptLoadingPromise;

const TradingViewPrice = ({ pairs }) => {
  const onLoadScriptRef = useRef();
  var WEB = new Web3(pairs?.network?.rpc_Url);
  const [pairsAdd, setPairsAdd] = useState('0xdFC8944ef846c2Af377DD0CF1e4536244a1663f1')
  const [names, setNames] = useState('wan')

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
    if (pairs) {
      getPairs()
    }
  }, [pairs])

  return (
    <div className='tradingview-widget-container'>
      <iframe id="dextools-widget"
        title="DEXTools Trading Chart"
        width="100%"
        height="400" src={`https://www.dextools.io/widget-chart/en/${names}/pe-light/${pairsAdd}?theme=dark&chartType=2&chartResolution=30&drawingToolbars=false`}></iframe>
    </div>
  );
}
export default TradingViewPrice
