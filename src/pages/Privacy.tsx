
import { Shield, Lock, Eye, FileText } from "lucide-react";
import MetricCard from "../components/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Privacy = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Privacy & Trust</h1>
        <p className="text-slate-400">Data protection and compliance management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Data Compliance"
          value="100%"
          change="GDPR & CCPA compliant"
          changeType="positive"
          icon={Shield}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Encryption Level"
          value="AES-256"
          change="Military grade"
          changeType="positive"
          icon={Lock}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="Data Visibility"
          value="Full Control"
          change="User controlled"
          changeType="positive"
          icon={Eye}
          iconColor="text-purple-500"
        />
        <MetricCard
          title="Audit Logs"
          value="24/7"
          change="Comprehensive tracking"
          changeType="positive"
          icon={FileText}
          iconColor="text-yellow-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Data Protection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                <span className="text-white">End-to-End Encryption</span>
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">ACTIVE</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                <span className="text-white">Data Anonymization</span>
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">ENABLED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                <span className="text-white">Access Controls</span>
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">ENFORCED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                <span className="text-white">Audit Logging</span>
                <span className="px-2 py-1 bg-green-500 text-white rounded text-xs">MONITORING</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded">
                <span className="text-white">GDPR Compliance</span>
                <span className="text-green-500 font-semibold">✓ COMPLIANT</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded">
                <span className="text-white">CCPA Compliance</span>
                <span className="text-green-500 font-semibold">✓ COMPLIANT</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded">
                <span className="text-white">SOC 2 Type II</span>
                <span className="text-green-500 font-semibold">✓ CERTIFIED</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded">
                <span className="text-white">ISO 27001</span>
                <span className="text-green-500 font-semibold">✓ CERTIFIED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
