import { useQuery } from "@tanstack/react-query";
import { getDashboardReport, getLeadsClosedByAgents, getPipelineReport, getStatusDistribution } from "../api/reports";

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

interface DashboardReport {
    totalLeadsClosedThisMonth: number;
    totalLeadsOfTheMonth: number;
    activeLeads: number;
    changeInLeads: number;
    changeInClosedLeads: number;
    changeInActiveLeads: number;
    conversionRateThisMonth: number;
    changeInConversionRate: number;
}

export function usePipeline(params: string) {
    return useQuery<Pipeline>({
        queryKey: ["pipeline", params],
        queryFn: () => getPipelineReport(params),
    });
}

export function useClosedLeadsReport(params: string) {
    return useQuery<ClosedLeads[]>({
        queryKey: ["leadsClosedByAgents", params],
        queryFn: () => getLeadsClosedByAgents(params)
    })
}

export function useStatusDistribution(params: string) {
    return useQuery<StatusDistribution[]>({
        queryKey: ["statusDistribution", params],
        queryFn: () => getStatusDistribution(params)
    });
}

export function useDashboardReport() {
    return useQuery<DashboardReport>({
        queryKey: ["statusDistribution"],
        queryFn: getDashboardReport
    });
}