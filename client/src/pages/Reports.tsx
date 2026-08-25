import { HiOutlineDocumentReport } from "react-icons/hi";
import { usePiplineLeads } from "../hooks/useReports";
import PieChart from "../components/charts/PieChart";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { useEffect, useState } from "react";

Chart.register(ArcElement, Tooltip, Legend)

export default function Reports() {
  const { data: pipelineLeads } = usePiplineLeads();
  console.log(pipelineLeads);

  const dataConfig = {
    labels: ["Leads in Pipeline", "Leads Closed"],
    datasets: [
      {
        label: "Leads Report",
        data: [pipelineLeads?.totalLeadsInPipeline, 1],
        backgroundColor: [
          'rgba(255, 255, 255, 0.6)',
          'rgba(255, 255, 205, 0.6)'
        ]
      },
    ]
  }

  const [chartData, setChartData] = useState(dataConfig);
  useEffect(() => {
    setChartData(dataConfig)
  }, [pipelineLeads])

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">

      {pipelineLeads?.totalLeadsInPipeline && (<PieChart chartData={chartData} />)}
    </div>
  );
}
