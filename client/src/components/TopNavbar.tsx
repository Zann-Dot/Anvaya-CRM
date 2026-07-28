import { DarkThemeToggle, Popover, Badge } from "flowbite-react";
import {
  HiOutlineChevronDown,
  HiOutlineOfficeBuilding,
  HiOutlineMail,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { useLeads } from "../hooks/useLeads";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
}

export default function TopNavbar({ title, subtitle }: TopNavbarProps) {
  const { data: leads } = useLeads();

  const companyProfileContent = (
    <div className="w-80 p-4 text-sm text-gray-600 dark:text-gray-300">
      <div className="flex items-start gap-3 border-b border-gray-100 pb-3.5 dark:border-gray-700/60">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 shadow-md">
          <svg
            viewBox="0 0 40 40"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
          >
            <path d="M20 6L32 28C33 29.8 31.8 32 29.6 32H25.5C24.4 32 23.4 31.4 22.8 30.4L20 25L17.2 30.4C16.6 31.4 15.6 32 14.5 32H10.4C8.2 32 7 29.8 8 28L20 6Z" />
            <circle cx="20" cy="18" r="3.5" className="fill-indigo-900" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="truncate text-base font-bold text-gray-900 dark:text-white">
              Anvaya CRM Inc.
            </h4>
            <Badge color="purple" size="xs">
              Enterprise
            </Badge>
          </div>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            ID: #ANV-8942
          </p>
        </div>
      </div>

      <div className="my-3 grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-2.5 dark:bg-gray-800/60">
        <div className="text-center">
          <p className="text-[10px] uppercase font-medium text-gray-400 dark:text-gray-500">
            Leads
          </p>
          <p className="text-xs font-bold text-gray-900 dark:text-white">{leads?.length}</p>
        </div>
        <div className="text-center border-x border-gray-200 dark:border-gray-700">
          <p className="text-[10px] uppercase font-medium text-gray-400 dark:text-gray-500">
            Team
          </p>
          <p className="text-xs font-bold text-gray-900 dark:text-white">{ } Active</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase font-medium text-gray-400 dark:text-gray-500">
            Status
          </p>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Verified</p>
        </div>
      </div>


      <div className="space-y-2 py-1">
        <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300">
          <HiOutlineGlobeAlt className="h-4 w-4 shrink-0 text-violet-500" />
          <span className="truncate">https://anvaya.io</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300">
          <HiOutlineMail className="h-4 w-4 shrink-0 text-violet-500" />
          <span className="truncate">support@anvaya.io</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300">
          <HiOutlineOfficeBuilding className="h-4 w-4 shrink-0 text-violet-500" />
          <span className="truncate">San Francisco, CA • HQ</span>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <DarkThemeToggle className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />

        <Popover content={companyProfileContent} placement="bottom-end">
          <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img
              src="https://api.dicebear.com/9.x/avataaars/svg?seed=Anvaya"
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover ring-1 ring-violet-300 dark:ring-violet-600"
            />
            <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
              User
            </span>
            <HiOutlineChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </Popover>
      </div>
    </header>
  );
}

