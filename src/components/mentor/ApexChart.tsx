import React, { useState } from 'react';


import ReactApexChart from "react-apexcharts"
export const ApexChart = () => {
    const [chartState, ] = useState({
      series: [{
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
          
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#16a34a"]
        ,
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Product Trends by Month',
          align: 'left'
        },
        grid: {
          row: {
            show: false
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        }
      },
    });
  
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={chartState.options} series={chartState.series} type="line" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  };