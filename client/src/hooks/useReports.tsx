import { useQuery } from "@tanstack/react-query"
import {
    getLeadsClosedByAgents,
    getPipelineReport,
    getPriorityDistribution,
    getSourceDistribution,
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

interface SourceDistribution {
    source: string;
    leadCount: number;
    closedCount: number;
}

interface PriorityDistribution {
    priority: string;
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

export function useSourceDistribution() {
    return useQuery<SourceDistribution[]>({
        queryKey: ["sourceDistribution"],
        queryFn: getSourceDistribution,
    })
}

export function usePriorityDistribution() {
    return useQuery<PriorityDistribution[]>({
        queryKey: ["priorityDistribution"],
        queryFn: getPriorityDistribution,
    })
}