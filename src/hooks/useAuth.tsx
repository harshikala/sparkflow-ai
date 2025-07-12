
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "warehouse" | "delivery" | "store";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@supply.com", role: "admin" },
  { id: "2", name: "Warehouse Manager", email: "warehouse@supply.com", role: "warehouse" },
  { id: "3", name: "Delivery Agent", email: "delivery@supply.com", role: "delivery" },
  { id: "4", name: "Store Manager", email: "store@supply.com", role: "store" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate, location.pathname]);

  const login = async (email: string, password: string) => {
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === "password") {
      setUser(foundUser);
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
