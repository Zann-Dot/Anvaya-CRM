import { useReducer } from "react";

export interface Filter {
    status: string;
    agent: string;
    sort: {
        sortType: string;
        value: string
    }
}

type FilterActionType = "STATUS" | "AGENT" | "SORT";

export interface FilterAction {
    type: FilterActionType;
    value: string;
    sort?: string
}


export default function useFilterReducer(filters: Filter) {
    function filterReducer(filter: Filter, action: FilterAction): Filter {
        if (action.sort) {
            return {
                ...filter,
                [action.type.toLowerCase()]: {
                    sortType: action.sort,
                    value: action.value
                }
            }
        }

        return {
            ...filter,
            [action.type.toLowerCase()]: action.value
        };
    }

    const [filter, dispatch] = useReducer(filterReducer, filters);

    return { filter, dispatch }
}