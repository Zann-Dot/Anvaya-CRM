import { HiOutlineCog } from "react-icons/hi";

export default function Settings() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-2xl bg-gray-100 p-6 dark:bg-gray-700">
        <HiOutlineCog className="h-12 w-12 text-gray-600 dark:text-gray-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Account & workspace settings — coming soon.
      </p>
    </div>
  );
}
