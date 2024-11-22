import React, { useState } from 'react'
import HighchartsReact from "highcharts-react-official"
import Highcharts, { color } from "highcharts"

type graphWeeklyData = Record<string, number[]>

const graphWeeklyData: graphWeeklyData = {
  1: [10, 15, 18, 20, 16, 14, 12],
  2: [15, 20, 25, 22, 18, 16, 14],
  3: [20, 25, 30, 28, 24, 22, 20],
  4: [25, 30, 35, 32, 28, 26, 24],
  5: [30, 35, 40, 38, 34, 32, 30],
  6: [35, 40, 45, 43, 39, 37, 35],
  7: [40, 45, 50, 48, 44, 42, 40],
  8: [45, 50, 55, 53, 49, 47, 45],
  9: [50, 55, 60, 58, 54, 52, 50],
  10: [55, 60, 45, 63, 59, 57, 55],
  11: [60, 15, 40, 68, 64, 62, 60],
} 

// const weeks = Object.keys(graphWeeklyData);

import './App.css'

function App() {


  const [currentWeekIndex, setcurrentWeekIndex] = useState<Number>(7) //setting current week to 7 as per figma

  const [currentMonth, setCurrentMonth] = useState<string>('February')
  
  const currentWeek = graphWeeklyData[currentWeekIndex];

  const previousWeek = () => {
    if(currentWeekIndex == 1) {
      return false;
    }
    setcurrentWeekIndex(currentWeekIndex - 1)
  }

  const nextWeek = () => {
    if(!graphWeeklyData[currentWeekIndex + 1]) {
      return false;
    }
    if(currentWeekIndex == 52) {
      return false;
    }
    setcurrentWeekIndex(currentWeekIndex + 1)
  }

  const chartOptions = {
    chart: {
      type: 'line',
      backgroundColor: '#1E1E3F',
    },
    title: {
      text: 'Number of Contacts Per Day',
      align: 'left',
      style: {
        color: '#FFFFFF'
      }
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#FFFFFF'
        }
      }
    },
    xAxis: {
      categories: ["2/12", "2/13", "2/14", "2/15", "2/16", "2/17", "2/18"],
      labels: {
        style: {
          color: '#FFFFFF'
        }
      }
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Contacts",
        data: currentWeek,
        color: '#00FFFF'
      }
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom',
            },
          },
        },
      ],
    },
  };

  return (
    <>
      <div className="graph-container">
        <div className='container-heading' style={{}}>
            <h2>Number of Contacts Per Day</h2>
          </div>
          <div className='graph-details'>
            <div className='weeks'>
              <button onClick={previousWeek}>Previous</button>
                Week {currentWeekIndex} 
              <button onClick={nextWeek}>Next</button></div>
            <div className='month'>{ currentMonth }</div>
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </>
  )
}

export default App
