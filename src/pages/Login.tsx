
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome to Supply Chain Optimizer",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Try: admin@supply.com / password",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: "admin@supply.com", role: "Admin", password: "password" },
    { email: "warehouse@supply.com", role: "Warehouse Manager", password: "password" },
    { email: "delivery@supply.com", role: "Delivery Agent", password: "password" },
    { email: "store@supply.com", role: "Store Manager", password: "password" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Supply Chain Optimizer</h1>
          <p className="text-slate-400">Sign in to your account</p>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-slate-400">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-400">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Demo Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="w-full text-left p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded text-sm"
                >
                  <div className="font-medium">{account.role}</div>
                  <div className="text-xs text-slate-400">{account.email}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">
              Password for all accounts: <code className="bg-slate-700 px-1 rounded">password</code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
