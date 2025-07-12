
import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
}

const DataTable = ({ 
  title, 
  columns, 
  data, 
  searchable = true, 
  pagination = true, 
  pageSize = 10 
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = data.filter(item =>
    !searchTerm || Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = sortColumn
    ? [...filteredData].sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        const modifier = sortDirection === "asc" ? 1 : -1;
        return aVal > bVal ? modifier : -modifier;
      })
    : filteredData;

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : sortedData;

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">{title}</CardTitle>
          {searchable && (
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`text-left py-3 px-4 text-slate-400 font-medium ${
                      column.sortable ? "cursor-pointer hover:text-white" : ""
                    }`}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    {column.label}
                    {sortColumn === column.key && (
                      <span className="ml-2">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="border-b border-slate-700 hover:bg-slate-700">
                  {columns.map((column) => (
                    <td key={column.key} className="py-3 px-4 text-white">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {pagination && totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <p className="text-slate-400 text-sm">
              Showing {(currentPage - 1) * pageSize + 1} to{" "}
              {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
              {sortedData.length} results
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-slate-400 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-slate-400 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataTable;
