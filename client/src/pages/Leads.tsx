import { Button } from "flowbite-react";
import { HiOutlinePlus, HiOutlineCollection } from "react-icons/hi";
import FilterLead from "../components/lead/FilterLead";
import Footer from "../components/lead/Footer";
import LeadsTable from "../components/lead/LeadsTable";
import { useLeads } from "../hooks/useLeads";
import AddLeadModal from "../components/AddLeadModal";
import { useState } from "react";

export default function Leads() {
  const { data: leads } = useLeads();
  const [openModal, setOpenModal] = useState(false);
  const agents = Array.from(
    new Set(leads?.map((l) => l.salesAgent?.name).filter(Boolean)),
  );

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
            <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
              {leads?.length} total
            </span>
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
        <LeadsTable leads={leads} />
        <Footer leads={leads} />
      </div>

      <AddLeadModal
        isEdit={false}
        show={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}
