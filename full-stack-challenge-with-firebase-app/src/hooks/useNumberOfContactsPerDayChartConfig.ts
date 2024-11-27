import { useMemo } from "react";

interface ChartConfigProps {
  categoriesLabels: string[];
  currentWeek: number[];
}

export const useNumberOfContactsPerDayChartConfig = ({
  categoriesLabels,
  currentWeek,
}: ChartConfigProps) => {
  const chartOptions = useMemo(() => ({
    chart: {
      type: "line",
      backgroundColor: "#1E1E3F",
    },
    title: {
      text: "<div style='margin-bottom: 2em;'>Number of Contacts Per Day</div>",
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

  return chartOptions;
};
