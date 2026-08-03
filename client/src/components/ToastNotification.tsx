import { Spinner, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

interface ToastNotificationProps {
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
    successMessage: string;
    errorMessage: string;
}

export function ToastNotification({
    isError,
    isPending,
    isSuccess,
    successMessage,
    errorMessage,
}: ToastNotificationProps) {

    return (
        <div className="fixed top-5 right-10 flex flex-col gap-4">
            {isPending && (
                <Toast>
                    <Spinner aria-label="Default status example" />
                </Toast>
            )}

            {isSuccess && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">{successMessage}</div>
                </Toast>
            )}

            {isError && (
                <Toast>
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                </Toast>
            )}
        </div>
    );
}
