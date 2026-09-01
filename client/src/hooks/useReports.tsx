import { useQuery } from "@tanstack/react-query"
import { getPipelineReport } from "../api/reports"

interface Pipeline {
    totalLeadsInPipeline: number;
    totalLeadsClosed: number
}

export function usePipeline() {
    return useQuery<Pipeline>({
        queryKey: ["pipeline"],
        queryFn: getPipelineReport
    })
}