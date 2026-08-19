import { Select, TextInput } from "flowbite-react";
import {
    HiOutlineFilter,
    HiOutlineSearch,
    HiOutlineSortAscending,
    HiOutlineUser,
} from "react-icons/hi";
import { ActionDispatch, Dispatch, SetStateAction } from "react";
import { FilterAction } from "../../hooks/useFilterReducer";
import { useAgents } from "../../hooks/useAgents";

type FilterLeadProps = {
    setSearchParams: Dispatch<SetStateAction<string>>;
    dispatch: ActionDispatch<[action: FilterAction]>;
};
export default function FilterLead({
    setSearchParams,
    dispatch,
}: FilterLeadProps) {
    const { data: agentRes } = useAgents();

    return (
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 lg:flex-row lg:items-center lg:justify-between dark:border-gray-700">
            <TextInput
                id="lead-search"
                type="search"
                icon={HiOutlineSearch}
                placeholder="Search leads by name, company or email…"
                className="w-full lg:max-w-xs"
                onChange={(e) => setSearchParams(e.target.value)}
            />

            <div className="flex flex-wrap items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                    <HiOutlineFilter className="h-4 w-4 shrink-0 text-gray-400" />
                    <Select
                        id="filter-status"
                        className="w-36"
                        onChange={(e) =>
                            dispatch({ type: "STATUS", value: e.target.value })
                        }
                    >
                        <option value="all">All Statuses</option>
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Qualified</option>
                        <option>Proposal</option>
                        <option>Closed</option>
                    </Select>
                </div>

                <div className="flex items-center gap-1.5">
                    <HiOutlineUser className="h-4 w-4 shrink-0 text-gray-400" />
                    <Select
                        id="filter-agent"
                        className="w-40"
                        onChange={(e) => dispatch({ type: "AGENT", value: e.target.value })}
                    >
                        <option value="all">All Agents</option>
                        {agentRes?.agents?.map((a) => (
                            <option key={a._id} value={a._id}>
                                {a.name}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-1.5">
                    <HiOutlineSortAscending className="h-4 w-4 shrink-0 text-gray-400" />
                    <Select
                        id="sort-by"
                        className="w-48"
                        onChange={(e) =>
                            dispatch({
                                type: "SORT",
                                value: e.target.value,
                                sort: e.target.options[e.target.selectedIndex].dataset.sort
                            })
                        }
                    >
                        <option value="all">Sort: Default</option>
                        <option data-sort="priority" value="asc">Priority: High → Low</option>
                        <option data-sort="priority" value="desc">Priority: Low → High</option>
                        <option data-sort="timeToClose" value="desc">Time to Close: Longest</option>
                        <option data-sort="timeToClose" value="asc">Time to Close: Shortest</option>
                    </Select>
                </div>
            </div>
        </div>
    );
}
