
import { useQuery } from "@tanstack/react-query";
import { Package, Warehouse, Truck, TrendingUp, AlertTriangle, Users } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { apiService } from "../services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const { data: inventoryData } = useQuery({
    queryKey: ['inventory'],
    queryFn: () => apiService.getInventory(),
  });

  const { data: warehouseData } = useQuery({
    queryKey: ['warehouses'],
    queryFn: () => apiService.getWarehouses(),
  });

  const mockChartData = [
    { name: 'Jan', orders: 4000, revenue: 2400 },
    { name: 'Feb', orders: 3000, revenue: 1398 },
    { name: 'Mar', orders: 2000, revenue: 9800 },
    { name: 'Apr', orders: 2780, revenue: 3908 },
    { name: 'May', orders: 1890, revenue: 4800 },
    { name: 'Jun', orders: 2390, revenue: 3800 },
  ];

  const warehouseChartData = warehouseData?.data?.data?.map((w: any) => ({
    name: w.name,
    load: w.load,
    efficiency: w.efficiency
  })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-400">Real-time supply chain insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Inventory"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={Package}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Active Warehouses"
          value={warehouseData?.data?.data?.length || 3}
          change="92% avg efficiency"
          changeType="positive"
          icon={Warehouse}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Deliveries Today"
          value="156"
          change="+8% from yesterday"
          changeType="positive"
          icon={Truck}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Forecast Accuracy"
          value="94.2%"
          change="+2.1% this quarter"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Orders & Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockChartData}>
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
                <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Warehouse Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={warehouseChartData}>
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
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
            Recent Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
              <div>
                <p className="text-white font-medium">Low Stock Alert</p>
                <p className="text-slate-400 text-sm">Widget B is below reorder point</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500 text-slate-900 rounded text-xs font-medium">
                WARNING
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
              <div>
                <p className="text-white font-medium">Delivery Delay</p>
                <p className="text-slate-400 text-sm">Route NY-001 experiencing 2hr delay</p>
              </div>
              <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium">
                CRITICAL
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
