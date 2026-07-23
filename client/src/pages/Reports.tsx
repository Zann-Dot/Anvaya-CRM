import { HiOutlineDocumentReport } from "react-icons/hi";

export default function Reports() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-2xl bg-amber-100 p-6 dark:bg-amber-900/20">
        <HiOutlineDocumentReport className="h-12 w-12 text-amber-600 dark:text-amber-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reports</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Analytics & reports overview — coming soon.
      </p>
    </div>
  );
}
