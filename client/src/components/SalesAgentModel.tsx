import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from 'flowbite-react'
import { Dispatch, SetStateAction } from 'react'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { useCreateAgent } from '../hooks/useAgents'

interface SalesAgentModelProps {
    showAddModal: boolean,
    setShowAddModal: Dispatch<SetStateAction<boolean>>
}

export default function SalesAgentModel({ showAddModal, setShowAddModal }: SalesAgentModelProps) {
    const { mutate: addAgent } = useCreateAgent();

    function handleAgent(formData: FormData) {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;

        const agentPayload = { name, email }
        addAgent(agentPayload, {
            onSuccess: () => {
                console.log("agent add successfully");

            },
            onError: () => console.error("something went wrong")
        })
    }

    return (
        <Modal
            show={showAddModal}
            onClose={() => setShowAddModal(false)}
            size="lg"
        >
            <ModalHeader className="border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    <HiOutlineUserAdd className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    <span className="font-bold text-gray-900 dark:text-white">
                        Add New Sales Agent
                    </span>
                </div>
            </ModalHeader>
            <form action={handleAgent}>
                <ModalBody className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="agent-name" defaultValue="Full Name" />
                            </div>
                            <TextInput
                                id="agent-name"
                                placeholder="e.g. Alex Morgan"
                                required
                                name='name'
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="agent-email" defaultValue="Email Address" />
                            </div>
                            <TextInput
                                id="agent-email"
                                type="email"
                                placeholder="alex.morgan@anvaya.com"
                                required
                                name='email'
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-t border-gray-200 dark:border-gray-800">
                    <Button
                        // onClick={() => setShowAddModal(false)}
                        type='submit'
                        className="cursor-pointer bg-linear-to-r from-violet-600 to-indigo-600 text-white hover:bg-violet-700"
                    >
                        Save Agent
                    </Button>
                    <Button className='cursor-pointer' color="gray" onClick={() => setShowAddModal(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    )
}
