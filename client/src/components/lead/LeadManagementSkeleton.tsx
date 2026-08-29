export default function LeadManagementSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 animate-pulse items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900/40" />
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="h-5 w-50 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900/40" />
                        </div>
                        <div className="mt-2 h-6 w-105 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900/40" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="space-y-6 lg:col-span-1">
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="space-y-3">
                            <p className="h-3 w-25 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900/40"></p>
                            <div className="animate-pulse rounded-xl bg-gray-100 p-3 dark:bg-gray-900/40"></div>
                            <div className="animate-pulse rounded-xl bg-gray-100 p-3 dark:bg-gray-900/40"></div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 lg:col-span-3">
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
                            <div className="h-9 w-65 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-900/40" />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }, (_, i) => (
                                <div
                                    key={i}
                                    className="animate-pulse rounded-xl bg-gray-100 p-4 dark:bg-gray-900/40"
                                />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-700"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
