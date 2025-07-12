
import { User, Mail, Shield, Calendar, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  const rolePermissions = {
    admin: [
      "Full system access",
      "User management",
      "System configuration",
      "All data access",
      "Advanced analytics"
    ],
    warehouse: [
      "Warehouse management",
      "Inventory tracking",
      "Load balancing",
      "Staff coordination",
      "Performance monitoring"  
    ],
    delivery: [
      "Route optimization",
      "Delivery tracking",
      "Driver coordination",
      "Performance metrics",
      "Customer communication"
    ],
    store: [
      "Demand forecasting",
      "Product management",
      "Customer insights",
      "Markdown control",
      "Sales analytics"
    ]
  };

  const roleDisplayNames = {
    admin: "System Administrator",
    warehouse: "Warehouse Manager", 
    delivery: "Delivery Coordinator",
    store: "Store Manager"
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">User Profile</h1>
        <p className="text-slate-400">Manage your account and permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{user?.name}</h3>
                  <p className="text-slate-400 capitalize">{roleDisplayNames[user?.role as keyof typeof roleDisplayNames]}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Role</p>
                    <p className="text-white capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Member Since</p>
                    <p className="text-white">January 2024</p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Permissions & Settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rolePermissions[user?.role as keyof typeof rolePermissions]?.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-slate-300">{permission}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Activity Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">47</p>
                  <p className="text-slate-400 text-sm">Tasks Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">12</p>
                  <p className="text-slate-400 text-sm">Reports Generated</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">156</p>
                  <p className="text-slate-400 text-sm">Items Processed</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">98%</p>
                  <p className="text-slate-400 text-sm">Accuracy Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Inventory Updated</p>
                    <p className="text-slate-400 text-sm">Updated stock levels for 15 items</p>
                  </div>
                  <span className="text-slate-400 text-sm">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Report Generated</p>
                    <p className="text-slate-400 text-sm">Monthly warehouse efficiency report</p>
                  </div>
                  <span className="text-slate-400 text-sm">1 day ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700 rounded">
                  <div>
                    <p className="text-white font-medium">Route Optimized</p>
                    <p className="text-slate-400 text-sm">Improved delivery route NY-001</p>
                  </div>
                  <span className="text-slate-400 text-sm">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
