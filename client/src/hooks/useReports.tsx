import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "../api/reports";

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

export function usePipeline(params: string) {
    return useQuery<Pipeline>({
        queryKey: ["pipeline", params],
        queryFn: () => fetchApi("pipeline", params),
    });
}

export function useClosedLeadsReport(params: string) {
    return useQuery<ClosedLeads[]>({
        queryKey: ["leadsClosedByAgents"],
        queryFn: () => fetchApi("leads-closed-by-agents", params)
    })
}

export function useStatusDistribution(params: string) {
    return useQuery<StatusDistribution[]>({
        queryKey: ["statusDistribution"],
        queryFn: () => fetchApi("status-distribution", params)
    });
}
