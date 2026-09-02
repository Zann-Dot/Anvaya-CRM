import { useState } from "react";
import { Button, Dropdown, DropdownItem, TextInput } from "flowbite-react";
import {
  HiOutlineCalendar,
  HiOutlineFilter,
  HiOutlineRefresh,
} from "react-icons/hi";

export interface DateRangeFilterProps {
  onRefreshClick?: () => void;
}

export type PresetRange =
  | "last-week"
  | "last-month"
  | "last-3months"
  | "last-year"
  | "custom";

const PRESET_LABELS: Record<PresetRange, string> = {
  "last-week": "Last Week",
  "last-month": "Last Month",
  "last-3months": "Last 3 Months",
  "last-year": "Last Year",
  custom: "Custom Range",
};

export default function DateRangeFilter({ onRefreshClick }: DateRangeFilterProps) {
  const [selectedRange, setSelectedRange] = useState<PresetRange>("last-month");
  const [startDate, setStartDate] = useState("2026-08-01");
  const [endDate, setEndDate] = useState("2026-09-02");

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-gray-700/60 dark:bg-gray-800/80 backdrop-blur-md">
      {/* Left side: Filter Label & Quick Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 pr-2 text-sm font-semibold text-gray-700 dark:text-gray-200 border-r border-gray-200 dark:border-gray-700">
          <HiOutlineFilter className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <span>Date Filter</span>
        </div>

        {/* Preset pill buttons for quick selection */}
        <div className="hidden items-center gap-1.5 md:flex">
          {(["last-week", "last-month", "last-3months", "last-year"] as PresetRange[]).map(
            (range) => {
              const isActive = selectedRange === range;
              return (
                <button
                  key={range}
                  type="button"
                  onClick={() => setSelectedRange(range)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-violet-600 text-white shadow-sm dark:bg-violet-500"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {PRESET_LABELS[range]}
                </button>
              );
            }
          )}
        </div>

        {/* Dropdown for Mobile / Custom Range */}
        <div className="block md:hidden">
          <Dropdown
            label={PRESET_LABELS[selectedRange]}
            size="xs"
            color="light"
            dismissOnClick={true}
          >
            {(["last-week", "last-month", "last-3months", "last-year", "custom"] as PresetRange[]).map(
              (range) => (
                <DropdownItem
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={selectedRange === range ? "font-bold text-violet-600" : ""}
                >
                  {PRESET_LABELS[range]}
                </DropdownItem>
              )
            )}
          </Dropdown>
        </div>
      </div>

      {/* Right side: Date Picker Inputs & Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <TextInput
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setSelectedRange("custom");
              }}
              icon={HiOutlineCalendar}
              className="w-36 text-xs"
            />
          </div>
          <span className="text-xs text-gray-400 font-medium">to</span>
          <div className="relative">
            <TextInput
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setSelectedRange("custom");
              }}
              icon={HiOutlineCalendar}
              className="w-36 text-xs"
            />
          </div>
        </div>

        <Button
          size="xs"
          color="gray"
          className="rounded-lg"
          onClick={onRefreshClick}
        >
          <HiOutlineRefresh className="mr-1 h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
          <span>Apply UI</span>
        </Button>
      </div>
    </div>
  );
}
