import { useQuery } from "@tanstack/react-query"
import {
    getLeadsClosedByAgents,
    getPipelineReport,
    getStatusDistribution,
} from "../api/reports"

interface Pipeline {
    totalLeadsInPipeline: number;
    totalLeadsClosed: number;
}

interface ClosedLeads {
    name: string;
    leadsClosed: number;
}

interface StatusDistribution {
    status: string;
    leadCount: number;
}

export function usePipeline() {
    return useQuery<Pipeline>({
        queryKey: ["pipeline"],
        queryFn: getPipelineReport,
    })
}

export function useClosedLeadsReport() {
    return useQuery<ClosedLeads[]>({
        queryKey: ["leadsClosedByAgents"],
        queryFn: getLeadsClosedByAgents,
    })
}

export function useStatusDistribution() {
    return useQuery<StatusDistribution[]>({
        queryKey: ["statusDistribution"],
        queryFn: getStatusDistribution,
    })
}
