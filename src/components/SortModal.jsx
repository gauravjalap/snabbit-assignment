import React from "react";

const SortModal = ({ isOpen, onClose, columns, onSort }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-semibold mb-4">Sort by</h2>
        <div className="flex flex-col space-y-2">
          {columns.map((col) => (
            <button
              key={col.accessorKey}
              onClick={() => {
                onSort(col.accessorKey);
                onClose();
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              {col.header}
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SortModal;
