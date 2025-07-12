
import { Tag, TrendingDown, DollarSign, Target } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Markdowns = () => {
  const markdownOpportunities = [
    { id: 1, product: 'Widget B', current_price: 49.99, suggested_price: 39.99, discount: '20%', potential_sales: '+150 units' },
    { id: 2, product: 'Component Y', current_price: 89.99, suggested_price: 74.99, discount: '17%', potential_sales: '+85 units' },
    { id: 3, product: 'Device Mini', current_price: 129.99, suggested_price: 109.99, discount: '15%', potential_sales: '+120 units' },
  ];

  const columns = [
    { key: 'product', label: 'Product', sortable: true },
    { key: 'current_price', label: 'Current Price', sortable: true },
    { key: 'suggested_price', label: 'Suggested Price', sortable: true },
    { key: 'discount', label: 'Discount', sortable: true },
    { key: 'potential_sales', label: 'Potential Sales', sortable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Smart Markdown Engine</h1>
        <p className="text-slate-400">AI-powered pricing optimization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Markdown Opportunities"
          value="23"
          change="Active recommendations"
          changeType="neutral"
          icon={Tag}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Potential Revenue"
          value="$12.5K"
          change="From optimizations"
          changeType="positive"
          icon={DollarSign}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Avg Discount"
          value="17%"
          change="Optimal range"
          changeType="neutral"
          icon={TrendingDown}
          iconColor="text-yellow-500"
        />
        <MetricCard
          title="Success Rate"
          value="94%"
          change="Implementation success"
          changeType="positive"
          icon={Target}
          iconColor="text-purple-500"
        />
      </div>

      <DataTable
        title="Markdown Recommendations"
        columns={columns}
        data={markdownOpportunities}
        searchable={true}
        pagination={false}
      />
    </div>
  );
};

export default Markdowns;
