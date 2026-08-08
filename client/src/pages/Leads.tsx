import { Button, Spinner } from "flowbite-react";
import { HiOutlinePlus, HiOutlineCollection, HiTrash } from "react-icons/hi";
import FilterLead from "../components/lead/FilterLead";
import Footer from "../components/lead/Footer";
import LeadsTable from "../components/lead/LeadsTable";
import { useDeleteLead, useLeads } from "../hooks/useLeads";
import AddLeadModal from "../components/AddLeadModal";
import { useState } from "react";
import useMain from "../context/MainProvider";

export default function Leads() {
   const [openModal, setOpenModal] = useState(false);
   const [leadIds, setLeadIds] = useState<string[]>([]);
   const [page, setPage] = useState(1);
   const { data, isLoading, isError, isPlaceholderData, isFetching } = useLeads(10, page);
   const { mutate: deleteLeads, isPending } = useDeleteLead();
   const { setToastNotification, setIsPending, setNotificationActive } =
      useMain();

   const agents = Array.from(
      new Set(data?.leads?.map((l) => l.salesAgent?.name).filter(Boolean)),
   );

   const isTableLoading = isLoading || isPending || isFetching;

   function handleDeleteLead() {
      setIsPending(isTableLoading);
      deleteLeads(leadIds, {
         onSuccess: () => {
            setToastNotification({
               isError: false,
               isSuccess: true,
               successMessage: "Lead deleted successfully",
            });
         },
         onError: () => {
            setToastNotification({
               isError: true,
               isSuccess: false,
               successMessage: "Lead deleted successfully",
            });
         },
      });
      setNotificationActive(true);
      setTimeout(() => {
         setNotificationActive(false);
      }, 2500);
   }

   return (
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
               <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                     <HiOutlineCollection className="h-5 w-5" />
                  </span>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                     Leads
                  </h1>
                  {!isLoading && (
                     <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                        {data?.totalLeads} total
                     </span>
                  )}
               </div>
               <p className="mt-1 pl-1 text-sm text-gray-500 dark:text-gray-400">
                  Track, filter and manage your sales pipeline.
               </p>
            </div>

            <Button
               onClick={() => setOpenModal(true)}
               className="cursor-pointer self-start border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md sm:self-auto"
            >
               <HiOutlinePlus className="mr-1.5 h-4 w-4" />
               Add Lead
            </Button>
         </div>

         <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <FilterLead agents={agents} />

            <div className="flex justify-end border-b border-gray-100 bg-gray-100 p-4 px-11 dark:border-gray-700 dark:bg-gray-900/30">
               <Button
                  onClick={handleDeleteLead}
                  className="cursor-pointer border border-violet-600 bg-transparent text-violet-600 shadow-md transition-colors duration-200 ease-in-out hover:bg-white sm:self-auto dark:bg-transparent hover:dark:bg-gray-900/20"
               >
                  {isTableLoading ? (
                     <Spinner className="mb-0.5 mr-1.5" size="sm" color="purple" />
                  ) : (
                     <HiTrash className="mr-1.5 h-4 w-4" />
                  )}
                  {isTableLoading ? "Deleting..." : "Delete Selected"}
               </Button>
            </div>

            {isTableLoading ? (
               <div className="group flex items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 transition-all duration-200 hover:border-violet-200 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-violet-700">
                  <div className="text-center">
                     <Spinner color="purple" aria-label="Center-aligned spinner example" />
                  </div>
               </div>
            ) : data?.leads?.length === 0 || isError ? (
               <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-3 rounded-2xl bg-gray-100 p-4 dark:bg-gray-700">
                     <HiOutlineCollection className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                     No leads found
                  </p>
                  <p className="text-xs text-gray-400">
                     Try changing the filter or add a new lead
                  </p>
               </div>
            ) : (
               <LeadsTable leads={data?.leads} setLeadIds={setLeadIds} />
            )}

            <Footer
               data={data}
               page={page}
               setPage={setPage}
               isPlaceholderData={isPlaceholderData}
            />
         </div>

         <AddLeadModal
            isEdit={false}
            show={openModal}
            onClose={() => setOpenModal(false)}
         />
      </div>
   );
}
