import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addAgent, deleteAgent, fetchAgents } from "../api/agents";

export interface Agent {
    _id: string,
    status: string,
    email: string,
    name: string,
    createdAt: string
}

export interface AgentResponse {
    agents: Agent[];
    totalAgents: number;
    totalPages: number;
    currentPage: number
}

export function useAgents(params: string = "") {
    return useQuery<AgentResponse>({
        queryKey: ["agents", params],
        queryFn: () => fetchAgents(params),
        placeholderData: (prev) => prev
    })
}

export function useCreateAgent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] })
        },
        onError: (error) => console.error(error.message)
    })
}

export function useDeleteAgent() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAgent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["agents"] })
        },
        onError: (error) => console.error(error.message)
    })
}