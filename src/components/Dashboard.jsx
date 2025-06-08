import React, { useState, useMemo } from "react";
import { mockData } from "../mockData";
import Sidebar from "./Sidebar";
import GlobalHeader from "./GlobalHeader";
import Toolbar from "./Toolbar";
import DataTable from "./DataTable";
import Fuse from "fuse.js";
import { subDays, subMonths, subYears, isWithinInterval } from "date-fns";

const Dashboard = () => {
  // const [data, setData] = useState(mockData);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("All");
  const [isSidebarOpen, setSidebarOpen] = useState(true);

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

    const now = new Date();
    if (timeFilter !== "All") {
      let interval;
      if (timeFilter === "Weekly") {
        interval = { start: subDays(now, 7), end: now };
      } else if (timeFilter === "Monthly") {
        interval = { start: subMonths(now, 1), end: now };
      } else if (timeFilter === "Yearly") {
        interval = { start: subYears(now, 1), end: now };
      }
      const baseData = searchQuery ? filtered : mockData;
      if (interval) {
        filtered = baseData.filter((item) =>
          isWithinInterval(new Date(item.startDate), interval)
        );
      }
    }

    return filtered;
  }, [searchQuery, timeFilter]);

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
              setTimeFilter={setTimeFilter}
              data={filteredData}
            />
            <DataTable data={filteredData} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
