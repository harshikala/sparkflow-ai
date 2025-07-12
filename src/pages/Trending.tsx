
import { TrendingUp, BarChart3, Eye, Star } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Trending = () => {
  const trendingProducts = [
    { id: 1, product: 'Widget A', category: 'Electronics', trend: '+45%', sales: 1250, rank: 1 },
    { id: 2, product: 'Component X', category: 'Hardware', trend: '+32%', sales: 980, rank: 2 },
    { id: 3, product: 'Device Pro', category: 'Electronics', trend: '+28%', sales: 875, rank: 3 },
    { id: 4, product: 'Tool Kit', category: 'Tools', trend: '+15%', sales: 645, rank: 4 },
    { id: 5, product: 'Smart Sensor', category: 'IoT', trend: '+12%', sales: 520, rank: 5 },
  ];

  const trendData = [
    { month: 'Jan', electronics: 4000, hardware: 2400, tools: 1800 },
    { month: 'Feb', electronics: 3000, hardware: 1398, tools: 2200 },
    { month: 'Mar', electronics: 2000, hardware: 9800, tools: 1600 },
    { month: 'Apr', electronics: 2780, hardware: 3908, tools: 2800 },
    { month: 'May', electronics: 1890, hardware: 4800, tools: 2400 },
    { month: 'Jun', electronics: 2390, hardware: 3800, tools: 3200 },
  ];

  const columns = [
    { key: 'rank', label: 'Rank', sortable: true },
    { key: 'product', label: 'Product', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'trend', label: 'Trend', sortable: true },
    { key: 'sales', label: 'Sales', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Trend Watch</h1>
        <p className="text-slate-400">Monitor product trends and market insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Trending Products"
          value="127"
          change="+23 this week"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Top Category"
          value="Electronics"
          change="45% growth"
          changeType="positive"
          icon={BarChart3}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Market Watch"
          value="89%"
          change="Coverage rate"
          changeType="positive"
          icon={Eye}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Trend Score"
          value="8.7/10"
          change="+0.3 this month"
          changeType="positive"
          icon={Star}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Trend Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Category Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #374151',
                  color: '#fff'
                }} 
              />
              <Line type="monotone" dataKey="electronics" stroke="#3b82f6" strokeWidth={2} name="Electronics" />
              <Line type="monotone" dataKey="hardware" stroke="#10b981" strokeWidth={2} name="Hardware" />
              <Line type="monotone" dataKey="tools" stroke="#f59e0b" strokeWidth={2} name="Tools" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Trending Products Table */}
      <DataTable
        title="Top Trending Products"
        columns={columns}
        data={trendingProducts}
        searchable={true}
        pagination={false}
      />

      {/* Insights Panel */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Market Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Rising Trends</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Smart Home Devices</span>
                  <span className="text-green-500">+65%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Eco-Friendly Products</span>
                  <span className="text-green-500">+42%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Wireless Accessories</span>
                  <span className="text-green-500">+38%</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Declining Trends</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Wired Headphones</span>
                  <span className="text-red-500">-28%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Legacy Hardware</span>
                  <span className="text-red-500">-15%</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-slate-700 rounded">
                  <span className="text-slate-300">Bulk Cables</span>
                  <span className="text-red-500">-12%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trending;
