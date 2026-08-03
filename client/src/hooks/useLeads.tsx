import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addNewLead, fetchLeadById, fetchLeads } from "../api/leads";
import { Lead } from "../components/LeadCard";

export interface NewLead {
    name: FormDataEntryValue | null | string,
    company: FormDataEntryValue | null | string,
    email: FormDataEntryValue | null | string,
    source: FormDataEntryValue | null | string,
    salesAgent: FormDataEntryValue | null | string,
    status: FormDataEntryValue | null | string,
    tags: FormDataEntryValue | null | string,
    timeToClose: number | FormDataEntryValue | null,
    priority: FormDataEntryValue | null | string,
}

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

export function useCreateLead() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addNewLead,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["leads"] });
        },
        onError: (error) => console.error(error.message)
    })
}