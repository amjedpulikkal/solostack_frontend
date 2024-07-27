import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartState {
  series: {
    data: number[];
  }[];
  options: ApexOptions;
}

const SparkLinesChart: React.FC = () => {
  // State management using useState hooks
  const [state] = useState<{
    series: ChartState['series'];
    options: ChartState['options'];
    seriesSpark2: ChartState['series'];
    optionsSpark2: ChartState['options'];
    seriesSpark3: ChartState['series'];
    optionsSpark3: ChartState['options'];
  }>({
    series: [{
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    options: {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ["#16a34a"],
      title: {
        text: '$424,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    },

    seriesSpark2: [{
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    optionsSpark2: {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.3,
      },
      yaxis: {
        min: 0
      },
      colors: ["#16a34a"],
      title: {
        text: '$235,312',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Expenses',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    },

    seriesSpark3: [{
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
    }],
    optionsSpark3: {
      chart: {
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      colors: ["#16a34a"],
      fill: {
        opacity: 0.3
      },
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      yaxis: {
        min: 0
      },
      title: {
        text: '$135,965',
        offsetX: 0,
        style: {
          fontSize: '24px',
        }
      },
      subtitle: {
        text: 'Profits',
        offsetX: 0,
        style: {
          fontSize: '14px',
        }
      }
    },
  });

  // JSX for rendering
  return (
    <>
      <div className='py-7'>
        <div className="flex justify-around">
          <div className="col-md-4">
            <div>
              <ReactApexChart options={state.options} series={state.series} type="area" height={160} />
            </div>
          </div>
          <div className="col-md-4 text-white">
            <div>
              <ReactApexChart options={state.optionsSpark2} series={state.seriesSpark2} type="area" height={160} />
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <ReactApexChart options={state.optionsSpark3} series={state.seriesSpark3} type="area" height={160} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SparkLinesChart;