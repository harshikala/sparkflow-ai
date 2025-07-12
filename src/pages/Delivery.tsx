
import { MapPin, Clock, Truck, Route } from "lucide-react";
import MetricCard from "../components/MetricCard";
import DataTable from "../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Delivery = () => {
  const deliveries = [
    { id: 'D001', destination: 'New York, NY', status: 'In Transit', eta: '2:30 PM', driver: 'John Smith' },
    { id: 'D002', destination: 'Los Angeles, CA', status: 'Delivered', eta: 'Completed', driver: 'Sarah Johnson' },
    { id: 'D003', destination: 'Chicago, IL', status: 'Delayed', eta: '4:45 PM', driver: 'Mike Davis' },
    { id: 'D004', destination: 'Houston, TX', status: 'Pending', eta: '6:00 PM', driver: 'Lisa Wilson' },
  ];

  const columns = [
    { key: 'id', label: 'Delivery ID', sortable: true },
    { key: 'destination', label: 'Destination', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'eta', label: 'ETA', sortable: true },
    { key: 'driver', label: 'Driver', sortable: true },
  ];

  const routes = [
    { route: 'NY-001', distance: '245 mi', duration: '4h 30m', stops: 8, efficiency: 92 },
    { route: 'CA-002', distance: '180 mi', duration: '3h 15m', stops: 6, efficiency: 95 },
    { route: 'IL-003', distance: '320 mi', duration: '5h 45m', stops: 12, efficiency: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Delivery Optimizer</h1>
        <p className="text-slate-400">Optimize routes and track deliveries in real-time</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Deliveries"
          value="24"
          change="6 in transit"
          changeType="neutral"
          icon={Truck}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="On-Time Rate"
          value="94.5%"
          change="+2% this week"
          changeType="positive"
          icon={Clock}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Avg Distance"
          value="248 mi"
          change="-12 mi optimized"
          changeType="positive"
          icon={Route}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Delivery Zones"
          value="12"
          change="All regions covered"
          changeType="neutral"
          icon={MapPin}
          iconColor="text-yellow-500"
        />
      </div>

      {/* Route Optimization */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Optimized Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routes.map((route) => (
              <div key={route.route} className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-white font-semibold mb-3">{route.route}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Distance:</span>
                    <span className="text-white">{route.distance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white">{route.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stops:</span>
                    <span className="text-white">{route.stops}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Efficiency:</span>
                    <span className={`${route.efficiency > 90 ? 'text-green-500' : 'text-yellow-500'}`}>
                      {route.efficiency}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Table */}
      <DataTable
        title="Current Deliveries"
        columns={columns}
        data={deliveries}
        searchable={true}
        pagination={false}
      />
    </div>
  );
};

export default Delivery;
