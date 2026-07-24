import { HiOutlineSearch } from 'react-icons/hi'

export default function Searchbar() {
    return (
        <div className="relative hidden sm:block">
            <HiOutlineSearch className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search..."
                className="w-64 rounded-xl border border-gray-200 bg-gray-50 py-2 pr-4 pl-9 text-sm text-gray-700 outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 dark:focus:border-violet-500 dark:focus:ring-violet-900/30"
            />
        </div>
    )
}
