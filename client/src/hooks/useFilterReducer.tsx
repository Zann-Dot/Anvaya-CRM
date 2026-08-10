import { useReducer } from "react";

export interface Filter {
    status: string;
    agent: string;
    sort: string;
}

type FilterActionType = "STATUS" | "AGENT" | "SORT";

export interface FilterAction {
    type: FilterActionType;
    value: string;
}


export default function useFilterReducer(filters: Filter) {
    function filterReducer(filter: Filter, action: FilterAction): Filter {
        return {
            ...filter,
            [action.type.toLowerCase()]: action.value
        };
    }

    const [filter, dispatch] = useReducer(filterReducer, filters);

    return { filter, dispatch }
}