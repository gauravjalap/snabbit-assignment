import React, { useState, useMemo } from "react";
import { mockData } from "../mockData";
import Sidebar from "./Sidebar";
import GlobalHeader from "./GlobalHeader";
import Toolbar from "./Toolbar";
import DataTable from "./DataTable";
import FilterModal from "./FilterModal";
import CustomDateRangeModal from "./CustomDateRangeModal";
import SortModal from "./SortModal";
import Fuse from "fuse.js";
import {
  subDays,
  subMonths,
  subYears,
  isWithinInterval,
  format,
} from "date-fns";
import { FiEye } from "react-icons/fi";
import { FileDown } from "lucide-react";

const Dashboard = () => {
  // const [data, setData] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [isCustomDateModalOpen, setCustomDateModalOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState(null);
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [sorting, setSorting] = useState([]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "executionId",
        header: "Execution ID",
        cell: (info) => (
          <a href="#" className="text-blue-600 hover:underline font-medium">
            {info.getValue()}
          </a>
        ),
        size: 99,
      },
      {
        accessorKey: "hostName",
        header: "Host Name",
        size: 145,
      },
      {
        accessorKey: "hostIp",
        header: "Host IP",
        size: 145,
      },
      {
        accessorKey: "executionName",
        header: "Execution Name",
        size: 145,
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: (info) =>
          format(new Date(info.getValue()), "yyyy-MM-dd HH:mm:ss"),
        size: 170,
      },
      {
        accessorKey: "executionState",
        header: "Execution State",
        cell: (info) => {
          const value = info.getValue();
          let gradient = "from-green-400 to-green-600";
          if (value < 50) gradient = "from-yellow-400 to-yellow-600";
          if (value < 30) gradient = "from-red-400 to-red-600";
          return (
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`bg-gradient-to-r ${gradient}`}
                  style={{
                    width: `${value}%`,
                    height: "100%",
                    borderRadius: "inherit",
                  }}
                ></div>
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">
                {value}%
              </span>
            </div>
          );
        },
        size: 224,
      },
      {
        accessorKey: "type",
        header: "Type",
        size: 92,
      },
      {
        accessorKey: "executedBy",
        header: "Executed by",
        cell: (info) => (
          <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">
            {info.getValue()}
          </span>
        ),
        size: 92,
      },
      {
        id: "actions",
        header: "Logs",
        cell: () => (
          <div className="flex items-center space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <FiEye />
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <FileDown size={16} />
            </button>
          </div>
        ),
        size: 67,
      },
    ],
    []
  );

  const fuse = new Fuse(mockData, {
    keys: ["hostName", "hostIp", "executionName", "executedBy", "executionId"],
    threshold: 0.3,
  });

  const filteredData = useMemo(() => {
    let filtered = mockData;

    if (searchQuery) {
      const result = fuse.search(searchQuery);
      filtered = result.map((item) => item.item);
    }

    const baseData = searchQuery ? filtered : mockData;

    const now = new Date();
    if (timeFilter !== "All") {
      let interval;
      if (timeFilter === "Weekly") {
        interval = { start: subDays(now, 7), end: now };
      } else if (timeFilter === "Monthly") {
        interval = { start: subMonths(now, 1), end: now };
      } else if (timeFilter === "Yearly") {
        interval = { start: subYears(now, 1), end: now };
      } else if (timeFilter === "Custom" && customDateRange) {
        interval = customDateRange;
      }

      if (interval) {
        filtered = baseData.filter((item) =>
          isWithinInterval(new Date(item.startDate), interval)
        );
      }
    }

    return filtered;
  }, [searchQuery, timeFilter, customDateRange]);

  const isCustomFilterActive = timeFilter === "Custom" && customDateRange;

  const handleTimeFilterChange = (filter) => {
    if (filter === "Custom") {
      setCustomDateModalOpen(true);
    } else {
      setTimeFilter(filter);
      setCustomDateRange(null);
    }
  };

  const handleCustomDateApply = (range) => {
    setCustomDateRange(range);
    setTimeFilter("Custom");
  };

  const handleFilterButtonClick = () => {
    if (isCustomFilterActive) {
      setTimeFilter("All");
      setCustomDateRange(null);
    } else {
      setFilterModalOpen(true);
    }
  };

  const handleSort = (columnId) => {
    setSorting((prev) => {
      const newSort = [{ id: columnId, desc: false }];
      if (prev.length > 0 && prev[0].id === columnId) {
        newSort[0].desc = !prev[0].desc;
      }
      return newSort;
    });
  };

  return (
    <div className="flex flex-col h-screen bg-[#f0f2f5]">
      <GlobalHeader
        setSidebarOpen={setSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">
                  Reports
                </h1>
                <p className="text-sm text-gray-600">
                  View reports for hosts and projects scans
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
            <Toolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              timeFilter={timeFilter}
              setTimeFilter={handleTimeFilterChange}
              data={filteredData}
              onFilterClick={handleFilterButtonClick}
              isCustomFilterActive={isCustomFilterActive}
              onSortClick={() => setSortModalOpen(true)}
            />
            <DataTable
              data={filteredData}
              columns={columns}
              sorting={sorting}
              setSorting={setSorting}
            />
          </div>
        </main>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
      />
      <CustomDateRangeModal
        isOpen={isCustomDateModalOpen}
        onClose={() => setCustomDateModalOpen(false)}
        onApply={handleCustomDateApply}
      />
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setSortModalOpen(false)}
        columns={columns.filter((c) => c.accessorKey)}
        onSort={handleSort}
      />
    </div>
  );
};

export default Dashboard;
