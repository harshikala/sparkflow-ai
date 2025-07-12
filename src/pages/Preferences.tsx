
import { Settings, Bell, Eye, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    dataCollection: true,
    analyticsTracking: false,
    marketingEmails: false,
    performanceData: true,
  });

  const handleToggle = (key: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Consent & Preference Controls</h1>
        <p className="text-slate-400">Manage your data preferences and consent settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email Notifications</p>
                <p className="text-slate-400 text-sm">Receive alerts and updates via email</p>
              </div>
              <Switch
                checked={preferences.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Push Notifications</p>
                <p className="text-slate-400 text-sm">Browser notifications for urgent alerts</p>
              </div>
              <Switch
                checked={preferences.pushNotifications}
                onCheckedChange={() => handleToggle('pushNotifications')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Marketing Emails</p>
                <p className="text-slate-400 text-sm">Product updates and feature announcements</p>
              </div>
              <Switch
                checked={preferences.marketingEmails}
                onCheckedChange={() => handleToggle('marketingEmails')}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Data & Privacy Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Data Collection</p>
                <p className="text-slate-400 text-sm">Allow collection of usage data for improvements</p>
              </div>
              <Switch
                checked={preferences.dataCollection}
                onCheckedChange={() => handleToggle('dataCollection')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Analytics Tracking</p>
                <p className="text-slate-400 text-sm">Track interactions for analytics purposes</p>
              </div>
              <Switch
                checked={preferences.analyticsTracking}
                onCheckedChange={() => handleToggle('analyticsTracking')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Performance Data</p>
                <p className="text-slate-400 text-sm">Share performance metrics for optimization</p>
              </div>
              <Switch
                checked={preferences.performanceData}
                onCheckedChange={() => handleToggle('performanceData')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Download My Data
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Delete Account
            </Button>
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Export Preferences
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;
