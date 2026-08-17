export async function fetchAgents() {
    const response = await fetch("/api/agents");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}

export async function addAgent(agent: {
    agentId?: string;
    name?: string;
    email?: string;
}) {
    const response = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(agent),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}

export async function deleteAgent(agentId?: string) {
    const response = await fetch(`/api/agents/${agentId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}
