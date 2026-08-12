import { Button } from "flowbite-react";
import { HiOutlinePlus, HiOutlineCollection } from "react-icons/hi";
import FilterLead from "../components/lead/FilterLead";
import Footer from "../components/lead/Footer";
import LeadsTable from "../components/lead/LeadsTable";
import { useDeleteLead, useLeads } from "../hooks/useLeads";
import AddLeadModal from "../components/AddLeadModal";
import { useState } from "react";
import useMain from "../context/MainProvider";
import DeleteBar from "../components/lead/DeleteBar";
import { useDebounce } from "../hooks/useDebounce";
import useFilterReducer, { Filter } from "../hooks/useFilterReducer";

export default function Leads() {
   const [openModal, setOpenModal] = useState(false);
   const [leadIds, setLeadIds] = useState<string[]>([]);
   const [page, setPage] = useState(1);
   const [searchParams, setSearchParams] = useState("");

   const filters: Filter = {
      status: "",
      agent: "",
      sort: {
         sortType: "",
         value: ""
      }
   };

   const params = new URLSearchParams();
   const search = useDebounce(searchParams, 300);
   const { filter, dispatch } = useFilterReducer(filters)

   if (filter.status && filter.status !== "all")
      params.set("status", filter.status);

   if (filter.agent && filter.agent !== "all")
      params.set("salesAgent", filter.agent);

   if (filter.sort.sortType && filter.sort.value !== "all")
      params.set(filter.sort.sortType, filter.sort.value);

   const { data, isLoading, isError, isPlaceholderData, isFetching } = useLeads(
      10,
      page,
      search,
      params.toString(),
   );
   const { mutate: deleteLeads, isPending } = useDeleteLead();
   const { setToastNotification, setIsPending, setNotificationActive } =
      useMain();

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
            setLeadIds([]);
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
            <FilterLead
               setSearchParams={setSearchParams}
               dispatch={dispatch}
            />

            <DeleteBar
               leadIds={leadIds}
               handleDeleteLead={handleDeleteLead}
               isTableLoading={isTableLoading}
            />

            {isTableLoading ? (
               <div role="status" className="w-full animate-pulse space-y-4 p-6">
                  <div className="grid grid-cols-6 border-b border-gray-200 pb-3 dark:border-gray-700">
                     <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                     <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
                     <div className="justify-self-end  h-4 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                     <div className="justify-self-end h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
                     <div className="justify-self-end h-4 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                     <div className="justify-self-end h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                  </div>

                  {[...Array(5)].map((_, i) => (
                     <div
                        key={i}
                        className="grid grid-cols-6 border-b border-gray-100 py-3 dark:border-gray-700/60"
                     >
                        <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex items-center gap-3">
                           <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                           <div className="space-y-1.5">
                              <div className="h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                              <div className="h-3 w-32 rounded bg-gray-100 dark:bg-gray-700/50"></div>
                           </div>
                        </div>
                        <div className="justify-self-end h-3.5 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
                        <div className="justify-self-end h-5 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="justify-self-end h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="justify-self-end h-4 w-12 rounded bg-gray-200 dark:bg-gray-700"></div>
                     </div>
                  ))}
                  <span className="sr-only">Loading...</span>
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
               <LeadsTable
                  leads={data?.leads}
                  leadIds={leadIds}
                  setLeadIds={setLeadIds}
               />
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
