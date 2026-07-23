import { DarkThemeToggle } from "flowbite-react";
import {
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineChevronDown,
} from "react-icons/hi";

interface TopNavbarProps {
  title: string;
  subtitle?: string;
}

export default function TopNavbar({ title, subtitle }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      {/* Left: Page Title */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <HiOutlineSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm text-gray-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative rounded-xl border border-gray-200 bg-gray-50 p-2 text-gray-600 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
          <HiOutlineBell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-violet-500" />
        </button>

        {/* Dark Mode Toggle */}
        <DarkThemeToggle className="rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" />

        {/* User Pill */}
        <button className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Anvaya"
            alt="avatar"
            className="h-7 w-7 rounded-full"
          />
          <span className="hidden text-sm font-medium text-gray-700 sm:block dark:text-gray-300">
            Rohan
          </span>
          <HiOutlineChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
