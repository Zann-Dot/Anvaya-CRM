import {
   useClosedLeadsReport,
   usePipeline,
   useStatusDistribution,
} from "../hooks/useReports";
import PieChart from "../components/charts/PieChart";
import {
   ArcElement,
   BarElement,
   CategoryScale,
   Chart,
   DoughnutController,
   Legend,
   LinearScale,
   Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";

Chart.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   DoughnutController
);

export default function Reports() {
   const { data: pipeline } = usePipeline();
   const { data: closedLeads } = useClosedLeadsReport();
   const { data: statusDistribution } = useStatusDistribution();

   const barData = {
      labels: closedLeads?.map((r) => r.name),
      datasets: [
         {
            label: "Closed leads report",
            data: closedLeads?.map((r) => r.leadsClosed),
            backgroundColor: ["#4D55CC"],
         },
      ],
   };

   const doughnutData = {
      labels: statusDistribution?.map((d) => d.status),
      datasets: [
         {
            label: "Status Distribution",
            data: statusDistribution?.map((d) => d.leadCount),
            backgroundColor: [
               "#D96868",
               "#9564DD",
               "#1B2CC1",
               "#DC95FF",
               "#8C56D4",
            ],
            borderWidth: 0,
            offset: 0,
            hoverOffset: 30,
         },
      ],
   };

   const dataConfig = {
      labels: ["Leads in Pipeline", "Leads Closed"],
      datasets: [
         {
            label: "Leads Report",
            data: [pipeline?.totalLeadsInPipeline, pipeline?.totalLeadsClosed],
            backgroundColor: ["#4D55CC", "#211C84"],
            borderWidth: 0,
            borderRadius: 10,
            offset: 0,
            hoverOffset: 30,
         },
      ],
   };

   const [chartData, setChartData] = useState(dataConfig);

   useEffect(() => {
      setChartData(dataConfig);
   }, [pipeline]);

   return (
      <div className="grid grid-cols-2 gap-10 p-6">
         <div className="flex flex-col items-center">
            <h1 className="py-3 text-xl text-black dark:text-white">Pie Chart</h1>
            {pipeline && <PieChart chartData={chartData} />}
         </div>

         <div className="flex flex-col items-center">
            <h1 className="py-3 text-xl text-black dark:text-white">Bar Chart</h1>
            {closedLeads && <BarChart chartData={barData} />}
         </div>

         <div className="flex flex-col items-center">
            <h1 className="py-3 text-xl text-black dark:text-white">Doughnut Chart</h1>
            {statusDistribution && <DoughnutChart chartData={doughnutData} />}
         </div>
      </div>
   );
}
