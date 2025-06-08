import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import { FiChevronUp, FiChevronDown, FiEye, FiDownload } from 'react-icons/fi';
import { format } from 'date-fns';

const DataTable = ({ data }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: 'executionId',
        header: 'Execution ID',
        cell: info => <a href="#" className="text-blue-600 hover:underline">{info.getValue()}</a>
      },
      {
        accessorKey: 'hostName',
        header: 'Host Name',
      },
      {
        accessorKey: 'hostIp',
        header: 'Host IP',
      },
      {
        accessorKey: 'executionName',
        header: 'Execution Name',
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        cell: info => format(new Date(info.getValue()), 'yyyy-MM-dd HH:mm:ss'),
      },
      {
        accessorKey: 'executionState',
        header: 'Execution State',
        cell: info => {
            const value = info.getValue();
            let color = 'bg-green-500';
            if (value < 50) color = 'bg-yellow-500';
            if (value < 30) color = 'bg-red-500';
            return (
                <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-2.5">
                        <div className={color} style={{ width: `${value}%`, height: '100%', borderRadius: 'inherit' }}></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">{value}%</span>
                </div>
            )
        }
      },
      {
        accessorKey: 'type',
        header: 'Type',
      },
      {
        accessorKey: 'executedBy',
        header: 'Executed by',
        cell: info => <span className="px-2 py-1 text-xs font-semibold text-gray-600 bg-gray-100 rounded-full">{info.getValue()}</span>
      },
      {
        id: 'actions',
        header: 'Logs',
        cell: () => (
            <div className="flex items-center space-x-2">
                <button className="text-gray-500 hover:text-gray-700"><FiEye /></button>
                <button className="text-gray-500 hover:text-gray-700"><FiDownload /></button>
            </div>
        )
      }
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <span className="ml-2">
                      {{
                        asc: <FiChevronUp />,
                        desc: <FiChevronDown />,
                      }[header.column.getIsSorted()] ?? null}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable; 