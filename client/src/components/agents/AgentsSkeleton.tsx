import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export default function AgentsSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div
        role="status"
        className="flex w-full animate-pulse flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800"
      >
        <div className="w-1/2 rounded-lg bg-gray-200 py-4 dark:bg-gray-700"></div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="w-40 rounded-lg bg-gray-200 py-3 dark:bg-gray-700"></div>
          <div className="w-20 rounded-lg bg-gray-200 py-3 dark:bg-gray-700"></div>
        </div>
      </div>

      <div className="animate-pulse overflow-x-auto">
        <Table hoverable>
          <TableHead className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              {[...Array(3)].map((_, i) => (
                <TableHeadCell key={i}>
                  <div className="w-20 rounded-lg bg-gray-100 py-1.5 dark:bg-gray-600"></div>
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className="divide-y divide-gray-200 dark:divide-gray-800">
            {[...Array(3)].map((_, i) => (
              <TableRow
                key={i}
                className="bg-white transition-colors hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800/50"
              >
                <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                  <div className="w-20 rounded-lg bg-gray-200 py-1.5 dark:bg-gray-700"></div>
                </TableCell>

                <TableCell>
                  <div className="w-20 rounded-lg bg-gray-200 py-1.5 dark:bg-gray-700"></div>
                </TableCell>

                <TableCell>
                  <div className="w-20 rounded-lg bg-gray-200 py-1.5 dark:bg-gray-700"></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 p-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
        <div className="w-30 rounded-lg bg-gray-200 py-px dark:bg-gray-800"></div>
      </div>
    </div>
  );
}
