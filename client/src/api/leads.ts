export async function fetchLeads() {
  const response = await fetch("/api/leads");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

export async function fetchLeadById(leadId: string | undefined) {
    const response = await fetch(`/api/leads/details/${leadId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}
