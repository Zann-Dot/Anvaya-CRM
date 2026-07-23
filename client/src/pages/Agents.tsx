import { HiOutlineUserGroup } from "react-icons/hi";

export default function Agents() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="rounded-2xl bg-emerald-100 p-6 dark:bg-emerald-900/20">
        <HiOutlineUserGroup className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Agents</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Agent management & performance — coming soon.
      </p>
    </div>
  );
}
