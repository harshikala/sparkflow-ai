
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Training = () => {
  const trainingModules = [
    { id: 1, title: 'Northeast Product Training', region: 'Northeast', completion: 85, participants: 24 },
    { id: 2, title: 'West Coast Logistics', region: 'West', completion: 92, participants: 18 },
    { id: 3, title: 'Southern Market Analysis', region: 'South', completion: 78, participants: 31 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Regional Product Training</h1>
        <p className="text-slate-400">Zone-specific training and knowledge management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Programs"
          value="12"
          change="3 regions covered"
          changeType="positive"
          icon={GraduationCap}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Completion Rate"
          value="85%"
          change="Above target"
          changeType="positive"
          icon={BookOpen}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Participants"
          value="73"
          change="Across all zones"
          changeType="neutral"
          icon={Users}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Certification Rate"
          value="94%"
          change="High success rate"
          changeType="positive"
          icon={Award}
          iconColor="text-yellow-500"
        />
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Training Modules by Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trainingModules.map((module) => (
              <div key={module.id} className="p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-white font-medium">{module.title}</h3>
                    <p className="text-slate-400 text-sm">{module.region} Region • {module.participants} participants</p>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View Details
                  </Button>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${module.completion}%` }}
                  ></div>
                </div>
                <p className="text-slate-400 text-sm mt-2">{module.completion}% completed</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Training;
