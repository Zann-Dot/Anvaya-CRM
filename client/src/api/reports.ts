const fetchApi = async (endpoint: string, params?: string) => {
    const response = await fetch(`/api/report/${endpoint}?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

export const getPipelineReport = () => fetchApi("pipeline");
export const getLeadsClosedByAgents = () => fetchApi("leads-closed-by-agents");
export const getStatusDistribution = () => fetchApi("status-distribution");

