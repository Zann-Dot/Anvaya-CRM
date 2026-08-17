import { Button } from "flowbite-react";
import useMain from "../../context/MainProvider";
import { useAgents } from "../../hooks/useAgents";

export default function Footer() {
    const { page, setPage } = useMain()
    const { data: agentRes, isPlaceholderData } = useAgents(page)
    return (
        <div className="flex items-center justify-between border-t border-gray-200 p-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
            <span>
                Showing {agentRes?.agents?.length} of {agentRes?.totalAgents}{" "}
                agents
            </span>
            <div className="flex items-center gap-1">
                <Button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="cursor-pointer disabled:cursor-default"
                    color="light"
                    size="xs"
                >
                    Previous
                </Button>
                <Button
                    onClick={() => {
                        if (
                            agentRes &&
                            !isPlaceholderData &&
                            page < agentRes?.totalPages
                        )
                            setPage((prev) => prev + 1);
                    }}
                    disabled={
                        isPlaceholderData ||
                        (agentRes && page >= agentRes?.totalPages)
                    }
                    className="cursor-pointer disabled:cursor-default"
                    color="light"
                    size="xs"
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
