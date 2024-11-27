import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useNumberOfContactsPerDayChart } from "../../hooks/useNumberOfContactsPerDayChart.ts";
import { useNumberOfContactsPerDayChartConfig } from "../../hooks/useNumberOfContactsPerDayChartConfig";
import ExcludeIcon from "../assets/Icons/ExcludeIcon.tsx";
import LeftIcon from "../assets/Icons/LeftIcon.tsx";
import RightIcon from "../assets/Icons/RightIcon.tsx";
import LoaderIcon from "../assets/Icons/LoaderIcon.tsx";

const NumberOfContactsPerDayChart: React.FC = () => {
  const {
    currentWeekIndex,
    currentMonth,
    categoriesLabels,
    currentWeek,
    previousWeek,
    nextWeek,
    isLoader
  } = useNumberOfContactsPerDayChart(2024);

  const chartOptions = useNumberOfContactsPerDayChartConfig({
    categoriesLabels,
    currentWeek,
  });

  return (
      <div className="graph-container">
        <div style={{backgroundColor: '#1E1E3F'}} className="graph-section">
          {/* Top-right section with the icon */}
          <div
              className='graph-section-header'

          >
            <ExcludeIcon/>
          </div>

          {/* Section title */}

            <h2  className='graph-section-title' >Number of Contacts Per Day</h2>


          {/* Horizontal line */}
          <div className='horizontal-line' />

          {/* Week navigation and current month */}
          <div
              className='graph-action'

          >
            <div/>
            <div className="weeks">
              <div onClick={previousWeek} className={'graph-action-button'}>
                <LeftIcon/>
              </div>
              <p style={{color: '#17F9DA'}}>Week {currentWeekIndex}</p>
              <div onClick={nextWeek} className={'graph-action-button'}>
                <RightIcon/>
              </div>

            </div>
            <div className={'graph-current-month'} >{currentMonth}</div>
          </div>

          {/* Chart */}
          <div className={'graph-spacing'} >
            {isLoader?
                <div className={'loader-section'}><LoaderIcon /></div>:
            <HighchartsReact highcharts={Highcharts} options={chartOptions}/>}
          </div>
        </div>
      </div>

  );
};

export default NumberOfContactsPerDayChart;