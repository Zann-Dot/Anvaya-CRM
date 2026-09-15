import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
   HiOutlineChartBar,
   HiOutlineUserGroup,
   HiOutlineDocumentReport,
   HiOutlineCog,
   HiOutlineHome,
   HiOutlineCollection,
   HiOutlineX,
} from "react-icons/hi";
import useMain from "../context/MainProvider";

const navItems = [
   { label: "Dashboard", icon: HiOutlineHome, path: "/" },
   { label: "Leads", icon: HiOutlineCollection, path: "/leads" },
   // { label: "Sales", icon: HiOutlineChartBar, path: "/sales" },
   { label: "Agents", icon: HiOutlineUserGroup, path: "/agents" },
   { label: "Reports", icon: HiOutlineDocumentReport, path: "/reports" },
   // { label: "Settings", icon: HiOutlineCog, path: "/settings" },
];

export default function AppSidebar() {
   const location = useLocation();
   const navigate = useNavigate();
   const { isSidebarOpen, setIsSidebarOpen } = useMain();

   return (
      <>
         {isSidebarOpen && (
            <div
               onClick={() => setIsSidebarOpen(false)}
               className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
            />
         )}

         <aside
            className={`fixed top-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
               }`}
         >
            <div className="flex h-16 items-center gap-3 border-b border-gray-200 px-5 sm:px-6 dark:border-gray-700">
               <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 shadow-md">
                  <svg
                     viewBox="0 0 40 40"
                     fill="white"
                     xmlns="http://www.w3.org/2000/svg"
                     className="aspect-square h-6 w-auto"
                  >
                     <path
                        d="M20 6L32 28C33 29.8 31.8 32 29.6 32H25.5C24.4 32 23.4 31.4 22.8 30.4L20 25L17.2 30.4C16.6 31.4 15.6 32 14.5 32H10.4C8.2 32 7 29.8 8 28L20 6Z"
                        className="fill-primary"
                     />
                     <circle cx="20" cy="18" r="3.5" className="fill-background" />
                  </svg>
               </div>
               <div
                  className="cursor-pointer"
                  onClick={() => {
                     navigate("/");
                     setIsSidebarOpen(false);
                  }}
               >
                  <h1 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                     ANVAYA
                  </h1>
                  <p className="text-[10px] font-medium tracking-widest text-violet-600 uppercase dark:text-violet-400">
                     CRM Platform
                  </p>
               </div>

               <button
                  type="button"
                  aria-label="Close sidebar"
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden ml-auto rounded-xl p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
               >
                  <HiOutlineX className="h-5 w-5" />
               </button>
            </div>


            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
               <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-gray-400 uppercase dark:text-gray-500">
                  Main Menu
               </p>
               {navItems.map(({ label, icon: Icon, path }) => {
                  const isActive =
                     path === "/"
                        ? location.pathname === "/"
                        : location.pathname.startsWith(path);
                  return (
                     <NavLink
                        key={label}
                        to={path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                           ? "bg-linear-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200 dark:shadow-violet-900/30"
                           : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                           }`}
                     >
                        <Icon
                           className={`h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : "text-gray-500 dark:text-gray-400"
                              }`}
                        />
                        <span>{label}</span>
                        {isActive && (
                           <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70" />
                        )}
                     </NavLink>
                  );
               })}
            </nav>


            <div className="border-t border-gray-200 p-4 dark:border-gray-700">
               <NavLink
                  to="/profile"
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                     `flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors ${isActive
                        ? "bg-violet-50 dark:bg-violet-950/40 ring-1 ring-violet-200 dark:ring-violet-800"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800"
                     }`
                  }
               >
                  <div className="relative">
                     <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/03/Twitter_default_profile_400x400.png"
                        alt="User Avatar"
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-violet-200 dark:ring-violet-700"
                     />
                     <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
                  </div>
                  <div className="min-w-0 flex-1">
                     <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                        Anay Karn
                     </p>
                     <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                        Admin
                     </p>
                  </div>
                  <HiOutlineCog className="h-4 w-4 shrink-0 text-gray-400" />
               </NavLink>
            </div>
         </aside>
      </>
   );
}
