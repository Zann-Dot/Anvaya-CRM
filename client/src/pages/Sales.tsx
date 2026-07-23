import { HiOutlineChartBar } from "react-icons/hi";

export default function Sales() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-2xl bg-blue-100 p-6 dark:bg-blue-900/20">
        <HiOutlineChartBar className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Sales</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Sales pipeline & analytics — coming soon.
      </p>
    </div>
  );
}
