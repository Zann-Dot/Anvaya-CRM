import { useQuery } from "@tanstack/react-query";
import { fetchLeadById, fetchLeads } from "../api/leads";
import { Lead } from "../components/LeadCard";

export function useLeads() {
    return useQuery<Lead[]>({
        queryKey: ['leads'],
        queryFn: fetchLeads,
    })
};

export function useLead(leadId: string | undefined) {
    return useQuery<Lead>({
        queryKey: ['lead', leadId],
        queryFn: () => fetchLeadById(leadId)
    })
}