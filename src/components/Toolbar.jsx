import React from 'react';
import { FiSearch, FiDownload, FiFilter } from 'react-icons/fi';
import { CSVLink } from 'react-csv';

const Toolbar = ({ searchQuery, setSearchQuery, timeFilter, setTimeFilter, data }) => {
  const timeFilters = ['All', 'Weekly', 'Monthly', 'Yearly'];

  const headers = [
    { label: "Execution ID", key: "executionId" },
    { label: "Host Name", key: "hostName" },
    { label: "Host IP", key: "hostIp" },
    { label: "Execution Name", key: "executionName" },
    { label: "Start Date", key: "startDate" },
    { label: "Execution State", key: "executionState" },
    { label: "Type", key: "type" },
    { label: "Executed By", key: "executedBy" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 space-y-4 md:space-y-0">
      <h2 className="text-lg font-semibold text-gray-700">Hosts</h2>
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
        <div className="flex items-center space-x-2">
          {timeFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setTimeFilter(filter)}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                timeFilter === filter
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              } border border-gray-300`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-auto">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <FiSearch className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Fuzzy search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <CSVLink 
            data={data}
            headers={headers}
            filename={"reports.csv"}
            className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <FiDownload className="mr-2" />
          Export
        </CSVLink>
      </div>
    </div>
  );
};

export default Toolbar; 