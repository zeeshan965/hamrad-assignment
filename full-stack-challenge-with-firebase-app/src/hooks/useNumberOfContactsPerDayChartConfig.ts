import {useMemo} from "react";

interface ChartConfigProps {
  categoriesLabels: string[];
  currentWeek: number[];
}

export const useNumberOfContactsPerDayChartConfig = ({
  categoriesLabels,
  currentWeek,
}: ChartConfigProps) => {
  return useMemo(() => ({
    chart: {
      type: "line",
      backgroundColor: "#1E1E3F",
    },
    title: {
      text: "",
      align: "left",
      margin: 20,
      useHTML: true,
      style: {
        color: "#fff",
        fontWeight: "bold",

      },
    },
    yAxis: {
      title: {
        text: "",
      },
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    xAxis: {
      categories: categoriesLabels,
      labels: {
        style: {
          color: "#FFFFFF",
        },
      },
    },
    legend: {
      enabled: false,
    },
    series: [
      {
        name: "Contacts",
        data: currentWeek,
        color: "#00FFFF",
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  }), [categoriesLabels, currentWeek]);
};
