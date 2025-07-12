
import { Users, UserCheck, TrendingUp, Heart } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Customers = () => {
  const customerSegments = [
    { id: 1, segment: 'Premium', customers: 145, revenue: 89500, retention: 94, predicted_reorder: 'High' },
    { id: 2, segment: 'Regular', customers: 678, revenue: 156800, retention: 87, predicted_reorder: 'Medium' },
    { id: 3, segment: 'New', customers: 234, revenue: 45600, retention: 72, predicted_reorder: 'Low' },
    { id: 4, segment: 'At Risk', customers: 89, revenue: 23400, retention: 45, predicted_reorder: 'Very Low' },
  ];

  const segmentData = [
    { name: 'Premium', value: 145, color: '#10b981' },
    { name: 'Regular', value: 678, color: '#3b82f6' },
    { name: 'New', value: 234, color: '#f59e0b' },
    { name: 'At Risk', value: 89, color: '#ef4444' },
  ];

  const reorderData = [
    { month: 'Jan', high: 120, medium: 340, low: 180 },
    { month: 'Feb', high: 135, medium: 380, low: 165 },
    { month: 'Mar', high: 145, medium: 420, low: 190 },
    { month: 'Apr', high: 160, medium: 450, low: 175 },
    { month: 'May', high: 175, medium: 480, low: 200 },
    { month: 'Jun', high: 190, medium: 520, low: 185 },
  ];

  const columns = [
    { key: 'segment', label: 'Segment', sortable: true },
    { key: 'customers', label: 'Customers', sortable: true },
    { key: 'revenue', label: 'Revenue ($)', sortable: true },
    { key: 'retention', label: 'Retention %', sortable: true },
    { key: 'predicted_reorder', label: 'Reorder Prediction', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Customer Insights</h1>
        <p className="text-slate-400">Analyze customer behavior and predict reorders</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Customers"
          value="1,146"
          change="+8% this month"
          changeType="positive"
          icon={Users}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Active Customers"
          value="967"
          change="84% engagement"
          changeType="positive"
          icon={UserCheck}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Avg. Retention"
          value="82%"
          change="+3% improvement"
          changeType="positive"
          icon={Heart}
          iconColor="text-red-500"
        />
        <MetricCard
          title="Reorder Rate"
          value="67%"
          change="+5% this quarter"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Customer Segments</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #374151',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {segmentData.map((entry) => (
                <div key={entry.name} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-slate-400 text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Reorder Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reorderData}>
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
                <Bar dataKey="high" stackId="a" fill="#10b981" name="High Probability" />
                <Bar dataKey="medium" stackId="a" fill="#3b82f6" name="Medium Probability" />
                <Bar dataKey="low" stackId="a" fill="#f59e0b" name="Low Probability" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments Table */}
      <DataTable
        title="Customer Segment Analysis"
        columns={columns}
        data={customerSegments}
        searchable={true}
        pagination={false}
      />

      {/* Customer Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recommended Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">High Priority</h3>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                  <p className="text-white font-medium">At-Risk Customer Recovery</p>
                  <p className="text-slate-400 text-sm">89 customers need immediate attention</p>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <p className="text-white font-medium">Premium Upselling</p>
                  <p className="text-slate-400 text-sm">234 regular customers show premium potential</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Opportunities</h3>
              <div className="space-y-3">
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                  <p className="text-white font-medium">New Customer Onboarding</p>
                  <p className="text-slate-400 text-sm">Improve retention for 234 new customers</p>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-white font-medium">Loyalty Program</p>
                  <p className="text-slate-400 text-sm">Launch rewards for 678 regular customers</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Customers;
