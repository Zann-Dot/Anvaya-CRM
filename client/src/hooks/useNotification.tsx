import { useEffect } from "react";
import useMain from "../context/MainProvider";

export default function useNotification(
    isPending: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: Error | null,
    data: any,
) {
    const { setToastNotification, setNotificationActive, setIsPending } = useMain();
    useEffect(() => {
        setIsPending(isPending);
        isSuccess
            ? setToastNotification({
                isError,
                isSuccess,
                successMessage: data?.message,
            })
            : setToastNotification({
                isError,
                isSuccess,
                errorMessage: error?.message,
            });

        !isPending &&
            setTimeout(() => {
                setNotificationActive(false);
                setIsPending(false);
            }, 2300);
    }, [isPending, isSuccess, isError]);
}
