import { useEffect } from "react";
import useMain from "../context/MainProvider";

export default function useNotification(
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: Error | null,
    data: any,
) {
    const { setToastNotification, setNotificationActive, setIsPending } =
        useMain();
    useEffect(() => {
        if (!isPending && !isSuccess && !isError) return;

        setIsPending(isPending);
        if (isSuccess) {
            setToastNotification({
                isError: false,
                isSuccess: true,
                successMessage: data?.message || "Operation successful",
            });
            setNotificationActive(true);
        } else if (isError) {
            setToastNotification({
                isError: true,
                isSuccess: false,
                errorMessage: error?.message || "An error occurred",
            });
            setNotificationActive(true);
        }

        if (!isPending && (isSuccess || isError)) {
            const timer = setTimeout(() => {
                setNotificationActive(false);
                setIsPending(false);
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
