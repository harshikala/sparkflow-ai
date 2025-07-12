
import { Zap, Play, BarChart, Target } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Simulations = () => {
  const scenarios = [
    { id: 1, name: 'Holiday Rush Scenario', description: '300% demand increase simulation', status: 'Ready' },
    { id: 2, name: 'Supply Chain Disruption', description: 'Warehouse outage impact analysis', status: 'Running' },
    { id: 3, name: 'New Product Launch', description: 'Market penetration simulation', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Smart Simulations</h1>
        <p className="text-slate-400">Test scenarios and optimize strategies</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Simulations"
          value="3"
          change="2 completed today"
          changeType="positive"
          icon={Zap}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Scenarios Tested"
          value="47"
          change="This month"
          changeType="neutral"
          icon={Play}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Accuracy Rate"
          value="96%"
          change="Prediction accuracy"
          changeType="positive"
          icon={Target}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Cost Savings"
          value="$45K"
          change="From optimizations"
          changeType="positive"
          icon={BarChart}
          iconColor="text-yellow-500"
        />
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Simulation Scenarios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scenarios.map((scenario) => (
              <div key={scenario.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div>
                  <h3 className="text-white font-medium">{scenario.name}</h3>
                  <p className="text-slate-400 text-sm">{scenario.description}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    scenario.status === 'Ready' ? 'bg-blue-500 text-white' :
                    scenario.status === 'Running' ? 'bg-yellow-500 text-slate-900' :
                    'bg-green-500 text-white'
                  }`}>
                    {scenario.status}
                  </span>
                  <Button size="sm" variant="outline">
                    {scenario.status === 'Ready' ? 'Run' : scenario.status === 'Running' ? 'View' : 'Results'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Simulations;
