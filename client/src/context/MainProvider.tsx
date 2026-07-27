import { createContext, useContext, useState, useEffect } from "react";

interface MainContextType {
    dashboardReport: any;
    loading: boolean;
    error: string | null;
    fetchDashboardReport: () => Promise<void>;
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
            }}
        >
            {children}
        </MainContext.Provider>
    );
}
