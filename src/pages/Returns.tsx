
import { RotateCcw, TrendingDown, Package, MapPin } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Returns = () => {
  const returnData = [
    { id: 1, product: 'Widget A', reason: 'Defective', region: 'Northeast', quantity: 15, value: 749.85 },
    { id: 2, product: 'Component X', reason: 'Wrong Item', region: 'West', quantity: 8, value: 719.92 },
    { id: 3, product: 'Device Pro', reason: 'Customer Change', region: 'South', quantity: 12, value: 1559.88 },
  ];

  const returnReasons = [
    { name: 'Defective', value: 35, color: '#ef4444' },
    { name: 'Wrong Item', value: 25, color: '#f59e0b' },
    { name: 'Customer Change', value: 20, color: '#3b82f6' },
    { name: 'Damaged', value: 20, color: '#10b981' },
  ];

  const columns = [
    { key: 'product', label: 'Product', sortable: true },
    { key: 'reason', label: 'Return Reason', sortable: true },
    { key: 'region', label: 'Region', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'value', label: 'Value ($)', sortable: true },
  ];

  return (
    <ScrollArea className="h-full w-full">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Reverse Logistics</h1>
          <p className="text-slate-400">Manage returns and optimize reverse supply chain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Return Rate"
            value="3.2%"
            change="-0.5% improvement"
            changeType="positive"
            icon={RotateCcw}
            iconColor="text-blue-500"
          />
          <MetricCard
            title="Returns This Month"
            value="156"
            change="35 items"
            changeType="neutral"
            icon={Package}
            iconColor="text-red-500"
          />
          <MetricCard
            title="Recovery Rate"
            value="78%"
            change="Value recovered"
            changeType="positive"
            icon={TrendingDown}
            iconColor="text-green-500"
          />
          <MetricCard
            title="Top Region"
            value="Northeast"
            change="Highest return rate"
            changeType="neutral"
            icon={MapPin}
            iconColor="text-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Return Reasons</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={returnReasons}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                  >
                    {returnReasons.map((entry, index) => (
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
              <div className="grid grid-cols-2 gap-2 mt-4">
                {returnReasons.map((entry) => (
                  <div key={entry.name} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: entry.color }}
                    ></div>
                    <span className="text-slate-400 text-sm">{entry.name} ({entry.value}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Return Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Inspection Queue</p>
                    <p className="text-slate-400 text-sm">Awaiting quality check</p>
                  </div>
                  <span className="text-yellow-500 font-bold">23</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Refurbishment</p>
                    <p className="text-slate-400 text-sm">Being processed</p>
                  </div>
                  <span className="text-blue-500 font-bold">12</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Ready for Resale</p>
                    <p className="text-slate-400 text-sm">Back in inventory</p>
                  </div>
                  <span className="text-green-500 font-bold">45</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="Recent Returns"
          columns={columns}
          data={returnData}
          searchable={true}
          pagination={false}
        />
      </div>
    </ScrollArea>
  );
};

export default Returns;
