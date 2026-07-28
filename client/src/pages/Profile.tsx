import { Badge, Button, Label, TextInput } from "flowbite-react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineIdentification,
  HiOutlineShieldCheck,
  HiOutlineCheckCircle,
  HiOutlineCamera,
  HiOutlineLockClosed,
  HiOutlineGlobeAlt,
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function Profile() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="h-32 bg-linear-to-r from-violet-600 via-indigo-600 to-purple-600 p-6" />

        <div className="relative px-6 pb-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="-mt-16 flex items-end gap-4">
              <div className="relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
                  alt="User Profile Avatar"
                  className="h-24 w-24 rounded-2xl border-4 border-white bg-violet-100 object-cover shadow-lg dark:border-gray-800 dark:bg-violet-900/40"
                />
                <button
                  type="button"
                  disabled
                  className="absolute -right-1 -bottom-1 flex h-7 w-7 cursor-not-allowed items-center justify-center rounded-full bg-violet-600 text-white shadow-sm hover:bg-violet-700"
                  title="Change avatar (UI only)"
                >
                  <HiOutlineCamera className="h-4 w-4" />
                </button>
              </div>

              <div className="mb-1">
                <div className="mb-5 flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">Anay Karn</h1>
                  <Badge color="purple" size="sm" icon={HiOutlineCheckCircle}>
                    Verified Admin
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @anay_admin • Lead System Architect & Administrator
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button color="light" disabled size="sm">
                <HiOutlineLockClosed className="mr-2 h-4 w-4" />
                Edit Profile (Disabled)
              </Button>
              <Button color="purple" disabled size="sm">
                Save Changes (Disabled)
              </Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <HiOutlineIdentification className="h-4 w-4 text-violet-500" />
              <span>
                User ID:{" "}
                <strong className="font-semibold text-gray-700 dark:text-gray-300">
                  #USR-8942
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineOfficeBuilding className="h-4 w-4 text-violet-500" />
              <span>
                Department:{" "}
                <strong className="font-semibold text-gray-700 dark:text-gray-300">
                  Engineering & CRM Ops
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineGlobeAlt className="h-4 w-4 text-violet-500" />
              <span>
                Location:{" "}
                <strong className="font-semibold text-gray-700 dark:text-gray-300">
                  Noida, UP
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiOutlineCalendar className="h-4 w-4 text-violet-500" />
              <span>
                Joined:{" "}
                <strong className="font-semibold text-gray-700 dark:text-gray-300">
                  January 2024
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  User details and primary account attributes
                </p>
              </div>
              <Badge color="gray">Read-Only</Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="userId" defaultValue="User ID" />
                </div>
                <TextInput
                  id="userId"
                  type="text"
                  icon={HiOutlineIdentification}
                  value="#USR-8942"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="username" defaultValue="Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  icon={HiOutlineUser}
                  value="anay_admin"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="fullName" defaultValue="Full Name" />
                </div>
                <TextInput
                  id="fullName"
                  type="text"
                  icon={HiOutlineUser}
                  value="Anay Karn"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="email" defaultValue="Email Address" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  icon={HiOutlineMail}
                  value="anay.karn@anvaya.io"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="mobile" defaultValue="Mobile Number" />
                </div>
                <TextInput
                  id="mobile"
                  type="text"
                  icon={HiOutlinePhone}
                  value="+1 (555) 234-5678"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>

              <div>
                <div className="mb-1 block">
                  <Label htmlFor="role" defaultValue="User Role & Access" />
                </div>
                <TextInput
                  id="role"
                  type="text"
                  icon={HiOutlineShieldCheck}
                  value="Super Administrator"
                  readOnly
                  disabled
                  className="cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
