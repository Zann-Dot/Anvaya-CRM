import { useState } from "react";
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

interface AddLeadModalProps {
    show: boolean;
    onClose: () => void;
}

const AVAILABLE_TAGS = [
    "High Value",
    "Follow-up",
    "Enterprise",
    "Inbound",
    "Urgent",
    "Hot Lead",
];

export default function AddLeadModal({ show, onClose }: AddLeadModalProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>(["High Value"]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    return (
        <Modal show={show} onClose={onClose} size="lg">
            <ModalHeader>Add New Lead</ModalHeader>
            <ModalBody>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    {/* Lead Name */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="leadName" defaultValue="Lead Name">Lead Name</Label>
                        </div>
                        <TextInput
                            id="leadName"
                            placeholder="Enter customer or company name"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Lead Source */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="leadSource">Lead Source</Label>
                            </div>
                            <Select id="leadSource">
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Email Campaign">Email Campaign</option>
                                <option value="Other">Other</option>
                            </Select>
                        </div>

                        {/* Assigned Sales Agent */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="assignedAgent" defaultValue="Assigned Sales Agent">Assigned Sales Agent</Label>
                            </div>
                            <Select id="assignedAgent">
                                <option value="">Select Sales Agent</option>
                                <option value="Alex Morgan">Alex Morgan</option>
                                <option value="Sarah Jenkins">Sarah Jenkins</option>
                                <option value="Michael Brown">Michael Brown</option>
                                <option value="Emily Davis">Emily Davis</option>
                            </Select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Lead Status */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="leadStatus" defaultValue="Lead Status">Lead Status</Label>
                            </div>
                            <Select id="leadStatus">
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="priority" defaultValue="Priority">Priority</Label>
                            </div>
                            <Select id="priority">
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </Select>
                        </div>
                    </div>

                    {/* Time to Close */}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="timeToClose" defaultValue="Time to Close (days)">Time to Close (days)</Label>
                        </div>
                        <TextInput
                            id="timeToClose"
                            type="number"
                            placeholder="Estimated days to close (e.g., 14)"
                            min={1}
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <div className="mb-2 block">
                            <Label defaultValue="Tags">Tags</Label>
                        </div>
                        <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 p-3 dark:border-gray-700 dark:bg-gray-700/50">
                            {AVAILABLE_TAGS.map((tag) => {
                                const isSelected = selectedTags.includes(tag);
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
                                            onChange={() => { }}
                                            className="h-3.5 w-3.5 rounded text-violet-600 focus:ring-violet-500"
                                        />
                                        <span>{tag}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="cursor-pointer border-0 bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md hover:from-violet-700 hover:to-indigo-700"
                    onClick={onClose}
                >
                    Add Lead
                </Button>
                <Button color="gray" className="cursor-pointer" onClick={onClose}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}
