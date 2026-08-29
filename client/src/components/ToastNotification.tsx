import { Spinner, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import { ToastNotificationDetails } from "../context/MainProvider";
import { motion } from "motion/react";

interface ToastNotificationProps {
    isPending: boolean;
    toastNotification: ToastNotificationDetails;
}

const MotionToast = motion.create(Toast);

export function ToastNotification({
    isPending,
    toastNotification,
}: ToastNotificationProps) {

    return (
        <motion.div
            className="z-60 flex flex-col gap-4">
            {isPending && (
                <div className="fixed top-1/2 left-1/2">
                    <Spinner className="size-15" color="purple" aria-label="Center-aligned status example" />
                </div>
            )}

            {toastNotification.isSuccess && (
                <MotionToast
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, ease: "circOut" }}
                    className="fixed top-5 right-10"
                >
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                        <HiCheck className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {toastNotification?.successMessage}
                    </div>
                </MotionToast>
            )}

            {toastNotification?.isError && (
                <MotionToast
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.2, ease: "circOut" }}
                    className="fixed top-5 right-10"
                >
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                        <HiX className="h-5 w-5" />
                    </div>
                    <div className="ml-3 text-sm font-normal">
                        {toastNotification?.errorMessage}
                    </div>
                </MotionToast>
            )}
        </motion.div>
    );
}
