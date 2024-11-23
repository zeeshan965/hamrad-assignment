import React from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useNumberOfContactsPerDayChart } from "../../hooks/useNumberOfContactsPerDayChart.ts";
import { useNumberOfContactsPerDayChartConfig } from "../../hooks/useNumberOfContactsPerDayChartConfig";

const NumberOfContactsPerDayChart: React.FC = () => {
  const {
    currentWeekIndex,
    currentMonth,
    categoriesLabels,
    currentWeek,
    previousWeek,
    nextWeek,
  } = useNumberOfContactsPerDayChart(2024);

  const chartOptions = useNumberOfContactsPerDayChartConfig({
    categoriesLabels,
    currentWeek,
  });

  return (
    <div className="graph-container">
      <div className="container-heading">
        <h2>Number of Contacts Per Day</h2>
      </div>
      <div className="graph-details">
        <div className="weeks">
          <button onClick={previousWeek}>Previous</button>
          Week {currentWeekIndex}
          <button onClick={nextWeek}>Next</button>
        </div>
        <div className="month">{currentMonth}</div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default NumberOfContactsPerDayChart;
