import { useQuery } from "@tanstack/react-query";
import { fetchLeadById, fetchLeads } from "../api/leads";

export function useLeads() {
    return useQuery({
        queryKey: ['leads'],
        queryFn: fetchLeads,
    })
};

export function useLead(leadId: string | undefined) {
    return useQuery({
        queryKey: ['lead'],
        queryFn: () => fetchLeadById(leadId)
    })
}