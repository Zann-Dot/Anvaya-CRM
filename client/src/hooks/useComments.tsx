import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, fetchComments } from "../api/comments";

export interface Comments {
    _id: string;
    leadId: string;
    author: {
        _id: string;
        name: string;
        email: string;
        createdAt: string
    };
    commentText: string;
    createdAt: string;
}

export interface NewComment {
    commentText: string;
    leadId?: string;
    author?: string;
}

export function useComments(leadId?: string) {
    return useQuery<Comments[]>({
        queryKey: ["comments"],
        queryFn: () => fetchComments(leadId),
    });
}

export function useCreateComment() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createComment,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
        onError: (error) => console.error(error.message),
    });
}
