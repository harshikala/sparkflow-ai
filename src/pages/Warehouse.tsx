
import { useQuery } from "@tanstack/react-query";
import { Warehouse as WarehouseIcon, Activity, Users, TrendingUp } from "lucide-react";
import DataTable from "../components/DataTable";
import MetricCard from "../components/MetricCard";
import { apiService } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Warehouse = () => {
  const { data: warehouseData, isLoading } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => apiService.getWarehouses(),
  });

  const warehouses = warehouseData?.data?.data || [];

  const columns = [
    { key: 'name', label: 'Warehouse', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'load', label: 'Load %', sortable: true },
    { key: 'capacity', label: 'Capacity', sortable: true },
    { key: 'efficiency', label: 'Efficiency %', sortable: true },
  ];

  const avgLoad = warehouses.reduce((sum: number, w: any) => sum + w.load, 0) / warehouses.length;
  const avgEfficiency = warehouses.reduce((sum: number, w: any) => sum + w.efficiency, 0) / warehouses.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading warehouse data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Warehouse Load Balancer</h1>
        <p className="text-slate-400">Optimize warehouse capacity and efficiency</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Warehouses"
          value={warehouses.length}
          change="All operational"
          changeType="positive"
          icon={WarehouseIcon}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Average Load"
          value={`${Math.round(avgLoad)}%`}
          change="Balanced distribution"
          changeType="positive"
          icon={Activity}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Average Efficiency"
          value={`${Math.round(avgEfficiency)}%`}
          change="+3% this month"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Staff Utilization"
          value="87%"
          change="Optimal levels"
          changeType="positive"
          icon={Users}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Load Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Warehouse Load Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={warehouses}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  color: '#fff'
                }} 
              />
              <Bar dataKey="load" fill="#3b82f6" />
              <Bar dataKey="efficiency" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Warehouse Table */}
      <DataTable
        title="Warehouse Details"
        columns={columns}
        data={warehouses}
        searchable={true}
        pagination={false}
      />
    </div>
  );
};

export default Warehouse;
