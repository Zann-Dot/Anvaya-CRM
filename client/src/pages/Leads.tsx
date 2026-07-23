import { HiOutlineCollection } from "react-icons/hi";

export default function Leads() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-2xl bg-violet-100 p-6 dark:bg-violet-900/20">
        <HiOutlineCollection className="h-12 w-12 text-violet-600 dark:text-violet-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Leads</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Full leads management page — coming soon.
      </p>
    </div>
  );
}
