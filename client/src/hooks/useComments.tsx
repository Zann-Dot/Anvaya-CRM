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
    author: string | undefined;
    leadId: string | undefined;
}

export function useComments(leadId: string | undefined) {
    return useQuery<Comments[]>({
        queryKey: ["comments"],
        queryFn: () => fetchComments(leadId),
    });
}

export function useCreateComment() {
    const queryCLient = useQueryClient();
    return useMutation({
        mutationFn: createComment,
        onSuccess: () => queryCLient.invalidateQueries({ queryKey: ["comments"] }),
        onError: (error) => console.error(error.message),
    });
}
