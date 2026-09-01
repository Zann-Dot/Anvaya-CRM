import { useClosedLeadsReport, usePipeline } from "../hooks/useReports";
import PieChart from "../components/charts/PieChart";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import BarChart from "../components/charts/BarChart";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function Reports() {
   const { data: pipeline } = usePipeline();
   const { data: closedLeads } = useClosedLeadsReport();

   const barData = {
      labels: closedLeads?.map(r => r.name),
      datasets: [
         {
            label: "Closed leads report",
            data: closedLeads?.map(r => r.leadsClosed),
            backgroundColor: [
               '#4D55CC',
            ]
         }
      ]
   }

   const dataConfig = {
      labels: ["Leads in Pipeline", "Leads Closed"],
      datasets: [
         {
            label: "Leads Report",
            data: [pipeline?.totalLeadsInPipeline, pipeline?.totalLeadsClosed],
            backgroundColor: [
               '#4D55CC',
               '#211C84'
            ],
            borderWidth: 0,
            borderRadius: 10,
            offset: 0,
            hoverOffset: 30,
         },
      ]
   }

   const [chartData, setChartData] = useState(dataConfig);

   useEffect(() => {
      setChartData(dataConfig)
   }, [pipeline])

   return (
      <div className=" grid grid-cols-2 gap-4 p-6">
         <div className="flex flex-col items-center">
            <h1 className="text-xl py-3 text-black dark:text-white">Pie Chart</h1>
            {pipeline && (<PieChart chartData={chartData} />)}
         </div>

         <div className="flex flex-col items-center">
            <h1 className="text-xl py-3 text-black dark:text-white">Bar Chart</h1>
            {closedLeads && (<BarChart chartData={barData} />)}
         </div>
      </div>
   );
}
