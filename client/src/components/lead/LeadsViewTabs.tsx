import { NavLink } from "react-router-dom";
import { HiOutlineTable, HiOutlineUser, HiOutlineViewBoards } from "react-icons/hi";

const tabs = [
  { label: "Table View", path: "/leads", icon: HiOutlineTable, end: true },
  { label: "By Status", path: "/leads/status", icon: HiOutlineViewBoards, end: false },
  { label: "By Agents", path: "/leads/agents", icon: HiOutlineUser, end: false },
];

export default function LeadsViewTabs() {
  return (
    <div className="inline-flex items-center rounded-xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-800/80">
      {tabs.map(({ label, path, icon: Icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${isActive
              ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-sm shadow-violet-200 dark:shadow-violet-900/30"
              : "text-gray-500 hover:bg-white hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            }`
          }
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </NavLink>
      ))}
    </div>
  );
}
