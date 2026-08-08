import { Spinner, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { ToastNotificationDetails } from "../context/MainProvider";

interface ToastNotificationProps {
    isPending: boolean;
    toastNotification: ToastNotificationDetails;
}

export function ToastNotification({
    isPending,
    toastNotification,
}: ToastNotificationProps) {
    return (
        <div className="fixed top-5 right-10 z-60 flex flex-col gap-4">
            {isPending && (
                <Toast>
                    <Spinner aria-label="Default status example" />
                </Toast>
            )}

            {toastNotification?.isSuccess && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {toastNotification?.successMessage}
                    </div>
                </Toast>
            )}

            {toastNotification?.isError && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {toastNotification?.errorMessage}
                    </div>
                </Toast>
            )}
        </div>
    );
}
