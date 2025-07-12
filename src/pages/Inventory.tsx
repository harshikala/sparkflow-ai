
import { useQuery } from "@tanstack/react-query";
import { Package, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import DataTable from "../components/DataTable";
import MetricCard from "../components/MetricCard";
import { apiService } from "../services/api";

const Inventory = () => {
  const { data: inventoryData, isLoading } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => apiService.getInventory(),
  });

  const inventory = inventoryData?.data?.data || [];

  const columns = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'stock', label: 'Current Stock', sortable: true },
    { key: 'reorderPoint', label: 'Reorder Point', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
    },
  ];

  const lowStockItems = inventory.filter((item: any) => item.stock <= item.reorderPoint);
  const outOfStockItems = inventory.filter((item: any) => item.stock === 0);
  const inStockItems = inventory.filter((item: any) => item.stock > item.reorderPoint);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading inventory data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Inventory Management</h1>
        <p className="text-slate-400">Monitor stock levels and reorder points</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Items"
          value={inventory.length}
          change="Active SKUs"
          changeType="neutral"
          icon={Package}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="In Stock"
          value={inStockItems.length}
          change={`${Math.round((inStockItems.length / inventory.length) * 100)}% of inventory`}
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Low Stock"
          value={lowStockItems.length}
          change="Need reordering"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-yellow-500"
        />
        <MetricCard
          title="Out of Stock"
          value={outOfStockItems.length}
          change="Critical items"
          changeType="negative"
          icon={XCircle}
          iconColor="text-red-500"
        />
      </div>

      {/* Inventory Table */}
      <DataTable
        title="Inventory Items"
        columns={columns}
        data={inventory}
        searchable={true}
        pagination={true}
        pageSize={10}
      />
    </div>
  );
};

export default Inventory;
