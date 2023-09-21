// TradingViewWidget.js

import React, { useEffect, useRef } from 'react';
import './TradingViewPrice.css'

let tvScriptLoadingPromise;

export default function TradingViewPrice() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

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
        if (document.getElementById('tradingview_72943') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "in",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            range: "ALL",
            allow_symbol_change: true,
            calendar: true,
            studies: ["studyADR@tv-basicstudies","BB@tv-basicstudies","chandeMO@tv-basicstudies","CCI@tv-basicstudies","DetrendedPriceOscillator@tv-basicstudies","DONCH@tv-basicstudies","Volume@tv-basicstudies","WilliamsAlligator@tv-basicstudies","WilliamsFractal@tv-basicstudies"],
            container_id: "tradingview_72943"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div id='tradingview_72943' />
    </div>
  );
}
