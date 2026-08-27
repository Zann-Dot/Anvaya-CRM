import { useEffect, useState } from "react";
import {
   Button,
   Checkbox,
   Label,
   Modal,
   ModalBody,
   ModalFooter,
   ModalHeader,
   Select,
   TextInput,
} from "flowbite-react";
import { NewLead, useMutateLead } from "../hooks/useLeads";
import { useAgents } from "../hooks/useAgents";
import { Lead } from "./dashboard/LeadCard";
import useNotification from "../hooks/useNotification";
import useMain from "../context/MainProvider";

interface AddLeadModalProps {
   lead?: Lead;
}

const AVAILABLE_TAGS = [
   "High Value",
   "Follow-up",
   "Enterprise",
   "Inbound",
   "Urgent",
   "Hot Lead",
];

export default function AddLeadModal({ lead }: AddLeadModalProps) {
   const { data: agentRes } = useAgents();
   const {
      isEdit,
      showAddModal,
      setShowAddModal,
      setNotificationActive,
   } = useMain();
   const { mutate, isPending, isError, isSuccess, error, data } =
      useMutateLead(isEdit);

   const [selectedTags, setSelectedTags] = useState<string[]>(
      isEdit && lead?.tags ? lead?.tags : ["High Value"],
   );

   useEffect(() => {
      if (showAddModal) {
         if (isEdit && lead?.tags) setSelectedTags(lead?.tags);
         else setSelectedTags(["High Value"]);
      }
   }, [showAddModal, isEdit, lead?.tags]);

   const toggleTag = (tag: string) => {
      setSelectedTags((prev) =>
         prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
   };

   useNotification(isPending, isSuccess, isError, error, data);

   function handleUpdateLead(formData: FormData) {
      const name = formData.get("leadName") as string;
      const company = formData.get("leadCompany") as string;
      const email = formData.get("leadEmail") as string;
      const source = formData.get("leadSource") as string;
      const salesAgent = formData.get("assignedAgent") as string;
      const status = formData.get("leadStatus") as string;
      const priority = formData.get("priority") as string;
      const timeToClose = formData.get("timeToClose") as string;
      const tags = selectedTags;

      const newLead: NewLead = {
         name,
         company,
         email,
         source,
         salesAgent,
         status,
         tags,
         timeToClose,
         priority,
      };

      mutate({ lead: newLead, leadId: lead?._id });
      setNotificationActive(true);
   }

   return (
      <>
         <Modal show={showAddModal} onClose={() => setShowAddModal(false)} size="lg">
            <ModalHeader className="border-primary-100 border-b">
               {isEdit ? "Update" : "Add New"} Lead
            </ModalHeader>
            <ModalBody>
               <form className="space-y-4" action={handleUpdateLead}>
                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="leadName" defaultValue="Lead Name">
                           Lead Name
                        </Label>
                     </div>
                     <TextInput
                        id="leadName"
                        name="leadName"
                        placeholder="Enter customer name"
                        required
                        defaultValue={isEdit ? lead?.name : ""}
                     />
                  </div>

                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="leadCompany" defaultValue="Lead Company">
                           Company Name
                        </Label>
                     </div>
                     <TextInput
                        id="leadCompany"
                        name="leadCompany"
                        placeholder="Enter company name"
                        required
                        defaultValue={isEdit ? lead?.company : ""}
                     />
                  </div>

                  <div>
                     <div className="mb-2 block">
                        <Label htmlFor="leadEmail" defaultValue="Lead Email">
                           Email
                        </Label>
                     </div>
                     <TextInput
                        id="leadEmail"
                        name="leadEmail"
                        placeholder="john@email.com"
                        required
                        defaultValue={isEdit ? lead?.email : ""}
                     />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="leadSource">Lead Source</Label>
                        </div>
                        <Select
                           name="leadSource"
                           id="leadSource"
                           defaultValue={isEdit ? lead?.source : "Website"}
                        >
                           <option value="Website">Website</option>
                           <option value="Referral">Referral</option>
                           <option value="Cold Call">Cold Call</option>
                           <option value="Advertisement">Advertisement</option>
                           <option value="Email">Email Campaign</option>
                           <option value="Other">Other</option>
                        </Select>
                     </div>

                     <div>
                        <div className="mb-2 block">
                           <Label
                              htmlFor="assignedAgent"
                              defaultValue="Assigned Sales Agent"
                           >
                              Assigned Sales Agent
                           </Label>
                        </div>
                        <Select
                           name="assignedAgent"
                           id="assignedAgent"
                           defaultValue={
                              isEdit ? lead?.salesAgent?._id : "Select Sales Agent"
                           }
                        >
                           <option value="Select Sales Agent">Select Sales Agent</option>
                           {agentRes?.agents &&
                              agentRes.agents.map((agent) => (
                                 <option key={agent._id} value={agent._id}>
                                    {agent.name}
                                 </option>
                              ))}
                        </Select>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="leadStatus" defaultValue="Lead Status">
                              Lead Status
                           </Label>
                        </div>
                        <Select
                           name="leadStatus"
                           id="leadStatus"
                           defaultValue={isEdit ? lead?.status : "New"}
                        >
                           <option value="New">New</option>
                           <option value="Contacted">Contacted</option>
                           <option value="Qualified">Qualified</option>
                           <option value="Proposal">Proposal Sent</option>
                           <option value="Closed">Closed</option>
                        </Select>
                     </div>

                     <div>
                        <div className="mb-2 block">
                           <Label htmlFor="priority" defaultValue="Priority">
                              Priority
                           </Label>
                        </div>
                        <Select
                           name="priority"
                           id="priority"
                           defaultValue={isEdit ? lead?.priority : "High"}
                        >
                           <option value="High">High</option>
                           <option value="Medium">Medium</option>
                           <option value="Low">Low</option>
                        </Select>
                     </div>
                  </div>

                  <div>
                     <div className="mb-2 block">
                        <Label
                           htmlFor="timeToClose"
                           defaultValue="Time to Close (days)"
                        >
                           Time to Close (days)
                        </Label>
                     </div>
                     <TextInput
                        id="timeToClose"
                        name="timeToClose"
                        type="number"
                        placeholder="Estimated days to close (e.g., 14)"
                        min={1}
                        defaultValue={isEdit ? lead?.timeToClose : ""}
                     />
                  </div>

                  <div>
                     <div className="mb-2 block">
                        <Label defaultValue="Tags">Tags</Label>
                     </div>
                     <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                        {AVAILABLE_TAGS.map((tag) => {
                           const isSelected = selectedTags?.includes(tag);
                           return (
                              <label
                                 key={tag}
                                 onClick={() => toggleTag(tag)}
                                 className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${isSelected
                                    ? "border-violet-500 bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
                                    : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                                    }`}
                              >
                                 <Checkbox
                                    checked={isSelected}
                                    name="tags"
                                    onChange={() => { }}
                                    className="h-3.5 w-3.5 rounded text-violet-600 focus:ring-violet-500"
                                 />
                                 <span>{tag}</span>
                              </label>
                           );
                        })}
                     </div>
                  </div>
                  <ModalFooter className="px-0 pb-0">
                     <Button
                        className="cursor-pointer border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700"
                        type="submit"
                     >
                        {isEdit ? "Update" : "Add"} Lead
                     </Button>
                     <Button
                        color="gray"
                        className="cursor-pointer"
                        onClick={() => setShowAddModal(false)}
                     >
                        Cancel
                     </Button>
                  </ModalFooter>
               </form>
            </ModalBody>
         </Modal>
      </>
   );
}
