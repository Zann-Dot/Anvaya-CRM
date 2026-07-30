import { NewComment } from "../hooks/useComments";

export async function fetchComments(leadId: string | undefined) {
  const response = await fetch(`/api/leads/${leadId}/comments`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}

export async function createComment(newComment: NewComment) {
  const response = await fetch(`/api/leads/${newComment.leadId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  console.log(data);
}
