import { useQuery } from "@tanstack/react-query"
import { getLeadsClosedByAgents, getPipelineReport } from "../api/reports"

interface Pipeline {
    totalLeadsInPipeline: number;
    totalLeadsClosed: number
}

interface ClosedLeads {
    name: string;
    leadsClosed: number
}

export function usePipeline() {
    return useQuery<Pipeline>({
        queryKey: ["pipeline"],
        queryFn: getPipelineReport
    })
}

export function useClosedLeadsReport() {
    return useQuery<ClosedLeads[]>({
        queryKey: ["leadsClosedByAgents"],
        queryFn: getLeadsClosedByAgents
    })
}