export async function fetchAgents() {
  const response = await fetch("/api/agents");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}
