import { DarkThemeToggle } from "flowbite-react";
import { HiOutlineBell, HiOutlineChevronDown } from "react-icons/hi";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
}

export default function TopNavbar({ title, subtitle }: TopNavbarProps) {
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
        <button className="relative rounded-xl border border-gray-200 bg-gray-50 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500" />
        </button>

        <DarkThemeToggle className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />

        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img src="" alt="avatar" className="h-7 w-7 rounded-full" />
          <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
            User
          </span>
          <HiOutlineChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
