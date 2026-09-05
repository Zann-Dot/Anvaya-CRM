import {
  HiOutlineUserGroup,
  HiOutlineCheckCircle,
  HiOutlineTrendingUp,
  HiOutlineViewGrid,
} from "react-icons/hi";
import { Badge } from "flowbite-react";
import useMain from "../../context/MainProvider";

interface ReportSummaryCardsProps {
  pipeline?: {
    totalLeadsInPipeline: number;
    totalLeadsClosed: number;
  };
  agentsCount?: number;
}

export default function ReportSummaryCards({
  pipeline,
  agentsCount = 0,
}: ReportSummaryCardsProps) {
  const totalInPipeline = pipeline?.totalLeadsInPipeline || 0;
  const totalClosed = pipeline?.totalLeadsClosed || 0;
  const totalLeads = totalInPipeline + totalClosed;
  const conversionRate = totalLeads > 0 ? ((totalClosed / totalLeads) * 100).toFixed(1) : "0";
  const { dashboardReport } = useMain()
  console.log(dashboardReport);

  const cards = [
    {
      title: "Total Pipeline Leads",
      value: totalInPipeline,
      subtitle: "Active leads in pipeline",
      badge: "In Progress",
      badgeColor: "purple" as const,
      icon: HiOutlineViewGrid,
      accentColor: "from-violet-500 to-indigo-600",
    },
    {
      title: "Leads Closed",
      value: totalClosed,
      subtitle: "Successfully closed deals",
      badge: "Won Deals",
      badgeColor: "success" as const,
      icon: HiOutlineCheckCircle,
      accentColor: "from-emerald-500 to-teal-600",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      subtitle: "Pipeline to close ratio",
      badge: `${dashboardReport?.changeInConversionRate}%` || 0,
      badgeColor: "info" as const,
      icon: HiOutlineTrendingUp,
      accentColor: "from-blue-500 to-cyan-600",
    },
    {
      title: "Active Sales Agents",
      value: agentsCount,
      subtitle: "Agents assigned to pipeline",
      badge: "Team",
      badgeColor: "indigo" as const,
      icon: HiOutlineUserGroup,
      accentColor: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-800/80"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-r ${card.accentColor} text-white shadow-md shadow-violet-500/10`}
              >
                <IconComponent className="h-6 w-6" />
              </div>
              <Badge color={card.badgeColor} size="xs" className="font-semibold">
                {card.badge}
              </Badge>
            </div>

            <div className="mt-4">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {card.title}
              </p>
              <h3 className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
                {card.value}
              </h3>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                {card.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
