const fetchApi = async (endpoint: string, params?: string) => {
    const response = await fetch(`/api/report/${endpoint}?${params}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
};

export const getPipelineReport = (params: string) => fetchApi("pipeline", params);
export const getLeadsClosedByAgents = (params: string) => fetchApi("leads-closed-by-agents", params);
export const getStatusDistribution = (params: string) => fetchApi("status-distribution", params);
export const getDashboardReport = () => fetchApi("last-month-comparison");

