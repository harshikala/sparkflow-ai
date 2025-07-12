
import { Menu, User } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="text-slate-400 hover:text-white mr-4 md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h2 className="text-white text-xl font-semibold">Supply Chain Optimizer</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-white text-sm font-medium">{user?.name}</p>
          <p className="text-slate-400 text-xs capitalize">{user?.role}</p>
        </div>
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <User className="h-4 w-4 text-white" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={logout}
          className="text-slate-400 hover:text-white"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
