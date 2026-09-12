import { useReducer } from "react";

export interface Filter {
    status: string;
    agent: string;
    priority: string;
    source: string;
    tags: string;
    sort: {
        sortType: string;
        value: string;
    };
}

export type FilterActionType =
    | "STATUS"
    | "AGENT"
    | "SORT"
    | "PRIORITY"
    | "SOURCE"
    | "TAGS"
    | "RESET";

export interface FilterAction {
    type: FilterActionType;
    value?: string;
    sort?: string;
}

export const initialFilter: Filter = {
    status: "",
    agent: "",
    priority: "",
    source: "",
    tags: "",
    sort: {
        sortType: "",
        value: "",
    },
};

export default function useFilterReducer(filters: Filter = initialFilter) {
    function filterReducer(filter: Filter, action: FilterAction): Filter {
        if (action.type === "RESET") {
            return {
                status: "",
                agent: "",
                priority: "",
                source: "",
                tags: "",
                sort: {
                    sortType: "",
                    value: "",
                },
            };
        }

        if (action.sort) {
            return {
                ...filter,
                [action.type.toLowerCase()]: {
                    sortType: action.sort,
                    value: action.value ?? "",
                },
            };
        }

        return {
            ...filter,
            [action.type.toLowerCase()]: action.value ?? "",
        };
    }

    const [filter, dispatch] = useReducer(filterReducer, filters);

    return { filter, dispatch };
}