import { NewLead } from "../hooks/useLeads";

export async function fetchLeads() {
  const response = await fetch("/api/leads");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

export async function fetchLeadById(leadId?: string) {
    const response = await fetch(`/api/leads/details/${leadId}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}

export async function addNewLead(newLead: NewLead) {
  const response = await fetch(`/api/leads`,{
    method: "POST",
    headers: {"COntent-Type": "application/json"},
    body: JSON.stringify(newLead)
  });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}

export async function updateLead(lead: NewLead, leadId?: string) {
  const response = await fetch(`/api/leads/${leadId}`,{
    method: "PUT",
    headers: {"COntent-Type": "application/json"},
    body: JSON.stringify(lead)
  });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}