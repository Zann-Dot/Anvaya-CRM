export async function getPipelineReport() {
    const response = await fetch("/api/report/pipeline");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data
}