
import { Bell, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Alerts = () => {
  const alerts = [
    { id: 1, type: 'critical', title: 'Low Stock Alert', message: 'Widget B is below reorder point', time: '2 minutes ago' },
    { id: 2, type: 'warning', title: 'Delivery Delay', message: 'Route NY-001 experiencing delays', time: '15 minutes ago' },
    { id: 3, type: 'info', title: 'Forecast Update', message: 'New demand predictions available', time: '1 hour ago' },
    { id: 4, type: 'success', title: 'Optimization Complete', message: 'Route optimization completed successfully', time: '2 hours ago' },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return Clock;
      case 'success': return CheckCircle;
      default: return Bell;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500 bg-red-500/10';
      case 'warning': return 'border-yellow-500 bg-yellow-500/10';
      case 'success': return 'border-green-500 bg-green-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Mobile Optimization Alerts</h1>
        <p className="text-slate-400">Real-time system notifications</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Alerts"
          value="12"
          change="4 new today"
          changeType="neutral"
          icon={Bell}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Critical"
          value="2"
          change="Needs attention"
          changeType="negative"
          icon={AlertTriangle}
          iconColor="text-red-500"
        />
        <MetricCard
          title="Resolved Today"
          value="8"
          change="94% success rate"
          changeType="positive"
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Avg Response"
          value="4 min"
          change="Response time"
          changeType="positive"
          icon={Clock}
          iconColor="text-purple-500"
        />
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => {
              const IconComponent = getAlertIcon(alert.type);
              return (
                <div key={alert.id} className={`p-4 border rounded-lg ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start space-x-3">
                    <IconComponent className="h-5 w-5 mt-1 text-white" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-medium">{alert.title}</h3>
                        <span className="text-slate-400 text-sm">{alert.time}</span>
                      </div>
                      <p className="text-slate-300 text-sm mt-1">{alert.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
