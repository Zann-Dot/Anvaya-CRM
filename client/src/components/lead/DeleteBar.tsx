import { Button, Spinner } from "flowbite-react";
import { AnimatePresence, motion } from "motion/react";
import { HiTrash } from "react-icons/hi";

interface DeleteBarProps {
    leadIds: string[];
    handleDeleteLead: () => void;
    isTableLoading: boolean;
}

export default function DeleteBar({
    leadIds,
    handleDeleteLead,
    isTableLoading,
}: DeleteBarProps) {
    return (
        <AnimatePresence initial={false}>
            {leadIds.length !== 0 && (
                <motion.div
                    key="delete-bar-wrapper"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                >
                    <motion.div
                        key="delete-bar"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="flex justify-end border-b border-gray-100 bg-violet-50/30 p-4 px-11 dark:border-gray-700 dark:bg-gray-900/20"
                    >
                        <Button
                            onClick={handleDeleteLead}
                            disabled={isTableLoading}
                            className="cursor-pointer border border-violet-600 bg-transparent text-violet-600 shadow-md transition-colors duration-200 ease-in-out hover:bg-white disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto dark:bg-transparent hover:dark:bg-gray-900/20"
                        >
                            {isTableLoading ? (
                                <Spinner className="mr-1.5 mb-0.5" size="sm" color="purple" />
                            ) : (
                                <HiTrash className="mr-1.5 h-4 w-4" />
                            )}
                            {isTableLoading ? "Deleting..." : "Delete Selected"}
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
