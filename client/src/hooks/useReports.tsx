import { useQuery } from "@tanstack/react-query"
import { getPipelineLeads } from "../api/reports"

interface PipelineLeads {
    totalLeadsInPipeline: number
}

export function usePiplineLeads() {
    return useQuery<PipelineLeads>({
        queryKey: ["pipelineLeads"],
        queryFn: getPipelineLeads
    })
}