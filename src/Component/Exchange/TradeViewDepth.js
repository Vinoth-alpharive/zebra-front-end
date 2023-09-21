// TradingViewWidget.js

import React, { useEffect, useRef } from 'react';
import './TradeViewDepth.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";


am4core.useTheme(am4themes_animated);
let tvScriptLoadingPromise;

export default function TradeViewDepth() {
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
        if (document.getElementById('tradingview_b6bc8') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "NASDAQ:AAPL",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "3",
            locale: "in",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            withdateranges: true,
            allow_symbol_change: true,
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            container_id: "tradingview_b6bc8"
          });
        }
      }
    },
    []
  );
  useEffect(()=>{
    let chart = am4core.create("chartdiv", am4charts.XYChart);
  
    // Add data
    chart.dataSource.url = `http://43.205.10.212/api/v1/huobi/depth?currency=btcusdt`;
    chart.dataSource.reloadFrequency = 30000;
    chart.dataSource.adapter.add("parsedData", function(data) {
   
      // Function to process (sort and calculate cummulative volume)
      function processData(list, type, desc) {
    
        // Convert to data points
        for(var i = 0; i < list.length; i++) {
          list[i] = {
            value: Number(list[i][0]),
            volume: Number(list[i][1]),
          }
        }
    
        // Sort list just in case
        list.sort(function(a, b) {
          if (a.value > b.value) {
            return 1;
          }
          else if (a.value < b.value) {
            return -1;
          }
          else {
            return 0;
          }
        });
    
        // Calculate cummulative volume
        if (desc) {
          for(var i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i+1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.unshift(dp);
          }
        }
        else {
          for(var i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i-1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            let dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.push(dp);
          }
        }
    
      }
    
      // Init
      let res = [];
   //    console.log(data.bids)
      processData(data.bids, "bids", true);
      processData(data.asks, "asks", false);
    
      return res;
    });
    
    // Set up precision for numbers
    chart.numberFormatter.numberFormat = "#,###.####";
    
    // Create axes
    let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    xAxis.dataFields.category = "value";
    //xAxis.renderer.grid.template.location = 0;
    xAxis.renderer.minGridDistance = 50;
     xAxis.stroke = am4core.color("#fff");
    xAxis.title.text = `Price btc/usdt`;
   
    let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
    yAxis.title.text = "Volume";
     yAxis.stroke = am4core.color("#fff");
    // Create series
    let series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.categoryX = "value";
    series.dataFields.valueY = "bidstotalvolume";
    series.strokeWidth = 2;
    series.stroke = am4core.color("#0f0");
    series.fill = series.stroke;
    series.fillOpacity = 0.1;
    series.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{bidsvolume}[/]"
    
    let series2 = chart.series.push(new am4charts.StepLineSeries());
    series2.dataFields.categoryX = "value";
    series2.dataFields.valueY = "askstotalvolume";
    series2.strokeWidth = 2;
    series2.stroke = am4core.color("#f00");
    series2.fill = series2.stroke;
    series2.fillOpacity = 0.1;
    series2.tooltipText = "Ask: [bold]{categoryX}[/]\nTotal volume: [bold]{valueY}[/]\nVolume: [bold]{asksvolume}[/]"
    
    let series3 = chart.series.push(new am4charts.ColumnSeries());
    series3.dataFields.categoryX = "value";
    series3.dataFields.valueY = "bidsvolume";
    series3.strokeWidth = 0;
    series3.fill = am4core.color("#fff");
    series3.fillOpacity = 0.2;
    
    let series4 = chart.series.push(new am4charts.ColumnSeries());
    series4.dataFields.categoryX = "value";
    series4.dataFields.valueY = "asksvolume";
    series4.strokeWidth = 0;
    series4.fill = am4core.color("#fff");
    series4.fillOpacity = 0.2;
    
    // Add cursor
    chart.cursor = new am4charts.XYCursor();
    return () => {chart.dispose();}
  },[])
  return (
    // <div className='tradingview-widget-container'>
    //   <div id='tradingview_b6bc8' />
    // </div>
    <div
    id="chartdiv"
    style={{ width: "100%", height: "350px" ,color:"#fff",backgroundColor:"rgb(24 34 47)",fontSize:"8px", fontWeight:400}}
  ></div>
  );
}
