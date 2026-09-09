import React, {
    createContext,
    useContext,
    useState,
    useMemo,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import { useCreateComment, NewComment } from "../hooks/useComments";
import { useDebounce } from "../hooks/useDebounce";
import useFilterReducer, {
    Filter,
    FilterAction,
} from "../hooks/useFilterReducer";

export type ToastNotificationDetails = {
    isError: boolean | null;
    isSuccess: boolean | null;
    successMessage?: string;
    errorMessage?: string;
};

type SelectStatus = "active" | "oncall" | "offline" | "all";

interface MainContextType {
    handleComments: (
        e: ChangeEvent<HTMLTextAreaElement, HTMLTextAreaElement>,
    ) => void;
    postComment: (leadId: string | undefined, author: string | undefined) => void;
    setToastNotification: Dispatch<SetStateAction<ToastNotificationDetails>>;
    setIsPending: Dispatch<SetStateAction<boolean>>;
    isPending: boolean;
    toastNotification: ToastNotificationDetails;
    setNotificationActive: Dispatch<SetStateAction<boolean>>;
    isNotificationActive: boolean;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    setNotificationState: (
        modal: boolean,
        edit: boolean,
        id?: string | undefined,
    ) => void;
    showAddModal: boolean;
    isEdit: boolean;
    agentId?: string;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
    params: URLSearchParams;
    selectedFilter: SelectStatus;
    setSelectedFilter: Dispatch<SetStateAction<SelectStatus>>;
    dispatch: React.ActionDispatch<[action: FilterAction]>;
}

const MainContext = createContext<MainContextType | null>(null);
const useMain = () => {
    const context = useContext(MainContext);
    if (!context) {
        throw new Error("useMain must be used within a MainProvider");
    }
    return context;
};
export default useMain;

export function MainProvider({ children }: React.PropsWithChildren) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [agentId, setAgentId] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<SelectStatus>("all");
    const debouncedSearch = useDebounce(search, 400);

    const [isPending, setIsPending] = useState(false);
    const [isNotificationActive, setNotificationActive] = useState(false);
    const [toastNotification, setToastNotification] =
        useState<ToastNotificationDetails>({
            isError: null,
            isSuccess: null,
            successMessage: "",
            errorMessage: "",
        });
    const [comment, setComment] = useState("");
    const { mutate: addComment } = useCreateComment();
    const filters: Filter = {
        status: "",
        agent: "",
        priority: "",
        sort: {
            sortType: "",
            value: "",
        },
    };
    const { filter, dispatch } = useFilterReducer(filters);

    const params = useMemo(() => {
        const p = new URLSearchParams();

        const appendIfValid = (key: string, value: any) => {
            if (value && value !== "all") p.set(key, String(value).trim());
        };

        if (page) p.set("page", String(page));

        if (debouncedSearch.trim()) p.set("search", debouncedSearch.trim());

        const activeFilter =
            selectedFilter !== "all" ? selectedFilter : filter.status;
        appendIfValid("status", activeFilter.toLowerCase());
        appendIfValid("agent", filter.agent);
        appendIfValid("priority", filter.priority);

        if (
            filter.sort?.sortType &&
            filter.sort?.value &&
            filter.sort.value !== "all"
        )
            p.set(filter.sort.sortType, filter.sort.value);

        return p;
    }, [page, debouncedSearch, selectedFilter, filter]);

    const handleComments = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setComment(e.target.value);

    function postComment(leadId: string | undefined, author: string | undefined) {
        const newComment: NewComment = {
            leadId,
            author,
            commentText: comment,
        };
        addComment(newComment);
    }

    function setNotificationState(
        modal: boolean,
        edit: boolean,
        id: string | undefined = undefined,
    ) {
        setShowAddModal(modal);
        setIsEdit(edit);
        setAgentId(id);
    }

    return (
        <MainContext.Provider
            value={{
                handleComments,
                postComment,
                setToastNotification,
                setIsPending,
                isPending,
                toastNotification,
                setNotificationActive,
                isNotificationActive,
                page,
                setPage,
                search,
                setSearch,
                setNotificationState,
                showAddModal,
                setShowAddModal,
                isEdit,
                agentId,
                params,
                selectedFilter,
                setSelectedFilter,
                dispatch,
            }}
        >
            {children}
        </MainContext.Provider>
    );
}
