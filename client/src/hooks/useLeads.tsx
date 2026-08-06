import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addNewLead,
    fetchLeadById,
    fetchLeads,
    updateLead,
} from "../api/leads";
import { Lead } from "../components/LeadCard";

export interface NewLead {
    name: FormDataEntryValue | null | string;
    company: FormDataEntryValue | null | string;
    email: FormDataEntryValue | null | string;
    source: FormDataEntryValue | null | string;
    salesAgent: FormDataEntryValue | null | string;
    status: FormDataEntryValue | null | string;
    tags: FormDataEntryValue | null | string[];
    timeToClose: number | FormDataEntryValue | null;
    priority: FormDataEntryValue | null | string;
}

interface MutateLeadVariables {
    lead: NewLead;
    leadId?: string;
}

export interface LeadResponse {
    leads: Lead[];
    totalLeads: number;
    totalPages: number;
    currentPage: number;
}

export function useLeads(limit: number, page: number) {
    return useQuery<LeadResponse>({
        queryKey: ["leads", page],
        queryFn: () => fetchLeads(limit, page),
        placeholderData: (previousData) => previousData
    });
}

export function useLead(leadId: string | undefined) {
    return useQuery<Lead>({
        queryKey: ["lead", leadId],
        queryFn: () => fetchLeadById(leadId),
    });
}

export function useMutateLead(isEdit: boolean) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ lead, leadId }: MutateLeadVariables) =>
            isEdit ? updateLead(lead, leadId) : addNewLead(lead),
        onSuccess: (_data, variables) => {
            if (variables.leadId) {
                queryClient.invalidateQueries({ queryKey: ["lead", variables.leadId] });
            }
            queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
        onError: (error) => console.error(error.message),
    });
}
