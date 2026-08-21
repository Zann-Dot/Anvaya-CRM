import { useEffect } from "react";
import useMain from "../context/MainProvider";

export default function useNotification(
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: Error | null,
    data: any,
) {
    const {
        setToastNotification,
        setNotificationActive,
        setIsPending,
        setShowAddModal,
    } = useMain();

    function reset() {
        setToastNotification({
            isError: null,
            isSuccess: null,
            successMessage: "",
            errorMessage: "",
        });
        setNotificationActive(false);
        setIsPending(false);
    }

    useEffect(() => {
        if (!isPending && !isSuccess && !isError) return;

        setIsPending(isPending);
        if (isSuccess) {
            setToastNotification({
                isError,
                isSuccess,
                successMessage: data?.message || "Operation successful",
            });
            setNotificationActive(true);
        } else if (isError) {
            setToastNotification({
                isError,
                isSuccess,
                errorMessage: error?.message || "An error occurred",
            });
            setNotificationActive(true);
        }

        if (!isPending && (isSuccess || isError)) {
            setShowAddModal(false);
            const timer = setTimeout(() => {
                reset();
            }, 2300);
            return () => clearTimeout(timer);
        }
    }, [
        isPending,
        isSuccess,
        isError,
        data,
        error,
        setIsPending,
        setNotificationActive,
        setToastNotification,
    ]);
}
