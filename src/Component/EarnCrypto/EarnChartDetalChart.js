import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class EarnChartDetalChart extends Component {

  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
        data: [31, 40, 28, 51, 42, 109, 100]
      }],
      options: {
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false
          },
          stacked: true
        },
        grid: {
          show: false,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        xaxis: {
          type: 'datetime',
          categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        },
      },
    
    
    };
  }



  render() {
    return (
      

<div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="area" height={350} />
</div>


    );
  }
}

export default EarnChartDetalChart;