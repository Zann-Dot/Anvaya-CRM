import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ChangeEvent,
    Dispatch,
    SetStateAction,
} from "react";
import { useCreateComment, NewComment } from "../hooks/useComments";
import { useSearchParams } from "react-router-dom";

export type ToastNotificationDetails = {
    isError: boolean | null;
    isSuccess: boolean | null;
    successMessage?: string;
    errorMessage?: string;
};

interface MainContextType {
    dashboardReport: any;
    loading: boolean;
    error: string | null;
    fetchDashboardReport: () => Promise<void>;
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
    setNotificationState: (
        modal: boolean,
        edit: boolean,
        id?: string | undefined,
    ) => void;
    showAddModal: boolean;
    isEdit: boolean;
    agentId?: string;
    setShowAddModal: Dispatch<SetStateAction<boolean>>;
    params: URLSearchParams
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
    const [dashboardReport, setDashboardReport] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showAddModal, setShowAddModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [agentId, setAgentId] = useState<string | undefined>(undefined);
    const [page, setPage] = useState(1);
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

    const params = new URLSearchParams();

    params.set("limit", "5");
    page && params.set("page", String(page));


    async function fetchDashboardReport() {
        try {
            setLoading(true);
            const response = await fetch("/api/report/last-month-comparison", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            setDashboardReport(data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch report");
        } finally {
            setLoading(false);
        }
    }

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

    useEffect(() => {
        fetchDashboardReport();
    }, []);

    return (
        <MainContext.Provider
            value={{
                dashboardReport,
                loading,
                error,
                fetchDashboardReport,
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
                setNotificationState,
                showAddModal,
                setShowAddModal,
                isEdit,
                agentId,
                params
            }}
        >
            {children}
        </MainContext.Provider>
    );
}
