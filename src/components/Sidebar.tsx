
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Package, Warehouse, Truck, TrendingUp, 
  BarChart3, Users, Tag, Zap, Bell, RotateCcw, 
  GraduationCap, Bot, Shield, Settings, User, ChevronLeft 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "../hooks/useAuth";

interface SidebarProps {
  collapsed: boolean;
  onToggle: (collapsed: boolean) => void;
}

const navigationItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard", roles: ["admin", "warehouse", "delivery", "store"] },
  { path: "/inventory", icon: Package, label: "Inventory", roles: ["admin", "warehouse", "store"] },
  { path: "/warehouse", icon: Warehouse, label: "Warehouse", roles: ["admin", "warehouse"] },
  { path: "/delivery", icon: Truck, label: "Delivery", roles: ["admin", "delivery"] },
  { path: "/forecasting", icon: TrendingUp, label: "Forecasting", roles: ["admin", "store"] },
  { path: "/trending", icon: BarChart3, label: "Trending", roles: ["admin", "store"] },
  { path: "/customers", icon: Users, label: "Customers", roles: ["admin", "store"] },
  { path: "/markdowns", icon: Tag, label: "Markdowns", roles: ["admin", "store"] },
  { path: "/simulations", icon: Zap, label: "Simulations", roles: ["admin"] },
  { path: "/alerts", icon: Bell, label: "Alerts", roles: ["admin", "warehouse", "delivery", "store"] },
  { path: "/returns", icon: RotateCcw, label: "Returns", roles: ["admin", "warehouse"] },
  { path: "/training", icon: GraduationCap, label: "Training", roles: ["admin", "store"] },
  { path: "/copilot", icon: Bot, label: "AI Co-Pilot", roles: ["admin", "warehouse", "delivery", "store"] },
  { path: "/privacy", icon: Shield, label: "Privacy", roles: ["admin"] },
  { path: "/preferences", icon: Settings, label: "Preferences", roles: ["admin", "warehouse", "delivery", "store"] },
  { path: "/profile", icon: User, label: "Profile", roles: ["admin", "warehouse", "delivery", "store"] },
];

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const { user } = useAuth();

  const filteredItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || "")
  );

  return (
    <div className={cn(
      "bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-4 border-b border-slate-700 flex items-center justify-between">
        {!collapsed && (
          <h1 className="text-white font-bold text-lg">Supply Chain</h1>
        )}
        <button
          onClick={() => onToggle(!collapsed)}
          className="text-slate-400 hover:text-white p-1 rounded"
        >
          <ChevronLeft className={cn("h-5 w-5 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>
      
      <nav className="flex-1 py-4">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors",
                isActive && "bg-blue-600 text-white border-r-2 border-blue-400",
                collapsed && "justify-center px-2"
              )
            }
          >
            <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
