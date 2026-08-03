import { useQuery } from "@tanstack/react-query";
import { fetchAgents } from "../api/agents";

interface Agent {
    _id: string,
    email: string,
    name: string,
    createdAt: string
}

export function useAgents() {
    return useQuery<Agent[]>({
        queryKey: ["agents"],
        queryFn: fetchAgents
    })
}