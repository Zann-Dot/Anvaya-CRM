export async function getPipelineReport() {
    const response = await fetch("/api/report/pipeline");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data
}

export async function getLeadsClosedByAgents() {
    const response = await fetch("/api/report/leads-closed-by-agents");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data
}

export async function getStatusDistribution() {
    const response = await fetch("/api/report/status-distribution");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data
}