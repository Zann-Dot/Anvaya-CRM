import {
   ArcElement,
   BarController,
   BarElement,
   CategoryScale,
   Chart,
   DoughnutController,
   Filler,
   Legend,
   LinearScale,
   LineController,
   LineElement,
   PieController,
   PointElement,
   PolarAreaController,
   RadialLinearScale,
   Title,
   Tooltip,
} from "chart.js";
import { Badge, Spinner } from "flowbite-react";
import {
   HiOutlineChartBar,
   HiOutlineChartPie,
   HiOutlineFilter,
   HiOutlineTag,
   HiOutlineTrendingUp,
   HiOutlineUserGroup,
} from "react-icons/hi";
import {
   useClosedLeadsReport,
   usePipeline,
   useStatusDistribution,
} from "../hooks/useReports";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import PolarAreaChart from "../components/charts/PolarAreaChart";
import DateRangeFilter from "../components/reports/DateRangeFilter";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";

Chart.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
   LineElement,
   PointElement,
   RadialLinearScale,
   PolarAreaController,
   DoughnutController,
   PieController,
   BarController,
   LineController,
   Title,
   Filler
);

export default function Reports() {
   const {
      data: pipeline,
      isLoading: loadingPipeline,
      refetch: refetchPipeline,
   } = usePipeline();
   const {
      data: closedLeads,
      isLoading: loadingClosed,
      refetch: refetchClosed,
   } = useClosedLeadsReport();
   const {
      data: statusDistribution,
      isLoading: loadingStatus,
      refetch: refetchStatus,
   } = useStatusDistribution();

   const handleRefreshAll = () => {
      refetchPipeline();
      refetchClosed();
      refetchStatus();
   };

   const pipelineDataConfig = {
      labels: ["Leads in Pipeline", "Leads Closed"],
      datasets: [
         {
            label: "Leads Count",
            data: [
               pipeline?.totalLeadsInPipeline || 0,
               pipeline?.totalLeadsClosed || 0,
            ],
            backgroundColor: ["#6366F1", "#10B981"],
            borderColor: ["#4F46E5", "#059669"],
            borderWidth: 2,
            hoverOffset: 15,
         },
      ],
   };

   const agentBarData = {
      labels: closedLeads?.map((r) => r.name) || ["Agent A", "Agent B", "Agent C"],
      datasets: [
         {
            label: "Leads Closed",
            data: closedLeads?.map((r) => r.leadsClosed) || [0, 0, 0],
            backgroundColor: [
               "rgba(99, 102, 241, 0.85)",
               "rgba(168, 85, 247, 0.85)",
               "rgba(236, 72, 153, 0.85)",
               "rgba(59, 130, 246, 0.85)",
               "rgba(16, 185, 129, 0.85)",
            ],
            borderColor: [
               "#6366F1",
               "#A855F7",
               "#EC4899",
               "#3B82F6",
               "#10B981",
            ],
            borderWidth: 1.5,
            borderRadius: 8,
            barThickness: 28,
         },
      ],
   };

   const statusDoughnutData = {
      labels: statusDistribution?.map((d) => d.status) || ["New", "Contacted", "Qualified", "Proposal", "Closed"],
      datasets: [
         {
            label: "Lead Count",
            data: statusDistribution?.map((d) => d.leadCount) || [0, 0, 0, 0, 0],
            backgroundColor: [
               "#3B82F6",
               "#8B5CF6",
               "#F59E0B",
               "#EC4899",
               "#10B981",
            ],
            borderColor: "transparent",
            borderWidth: 0,
            hoverOffset: 16,
         },
      ],
   };

   // const sourceBarData = {
   //    labels: sourceDistribution?.map((s) => s.source) || ["Website", "Referral", "Cold Call", "Advertisement", "Email", "Other"],
   //    datasets: [
   //       {
   //          label: "Total Leads Acquired",
   //          data: sourceDistribution?.map((s) => s.leadCount) || [0, 0, 0, 0, 0, 0],
   //          backgroundColor: "rgba(99, 102, 241, 0.75)",
   //          borderColor: "#6366F1",
   //          borderWidth: 1,
   //          borderRadius: 6,
   //       },
   //       {
   //          label: "Leads Closed",
   //          data: sourceDistribution?.map((s) => s.closedCount) || [0, 0, 0, 0, 0, 0],
   //          backgroundColor: "rgba(16, 185, 129, 0.85)",
   //          borderColor: "#10B981",
   //          borderWidth: 1,
   //          borderRadius: 6,
   //       },
   //    ],
   // };

   // const priorityPolarData = {
   //    labels: priorityDistribution?.map((p) => `${p.priority} Priority`) || ["High Priority", "Medium Priority", "Low Priority"],
   //    datasets: [
   //       {
   //          label: "Lead Count",
   //          data: priorityDistribution?.map((p) => p.leadCount) || [0, 0, 0],
   //          backgroundColor: [
   //             "rgba(239, 68, 68, 0.75)",
   //             "rgba(245, 158, 11, 0.75)",
   //             "rgba(59, 130, 246, 0.75)",
   //          ],
   //          borderColor: [
   //             "#EF4444",
   //             "#F59E0B",
   //             "#3B82F6",
   //          ],
   //          borderWidth: 1.5,
   //       },
   //    ],
   // };

   const trendLineData = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      datasets: [
         {
            label: "New Leads Acquired",
            data: [12, 19, 15, 22, 30, 28, 35, 42, pipeline?.totalLeadsInPipeline ? pipeline.totalLeadsInPipeline + 10 : 38],
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: "#6366F1",
            pointBorderColor: "#FFFFFF",
            pointHoverRadius: 7,
         },
         {
            label: "Deals Closed",
            data: [4, 8, 7, 12, 18, 16, 22, 27, pipeline?.totalLeadsClosed || 24],
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.12)",
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: "#10B981",
            pointBorderColor: "#FFFFFF",
            pointHoverRadius: 7,
         },
      ],
   };

   const isInitialLoading =
      loadingPipeline || loadingClosed || loadingStatus

   return (
      <div className="space-y-6 p-6 pb-12">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
               <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                     Reports & Analytics
                  </h1>
               </div>
               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Real-time visual breakdown of pipeline progress, agent closure performance, lead sources, and priority allocation.
               </p>
            </div>
         </div>

         <DateRangeFilter onRefreshClick={handleRefreshAll} />

      </div>
   );
}
