
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { TrendingUp, MapPin, Calendar, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MetricCard from "../components/MetricCard";
import { apiService } from "../services/api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Import Leaflet dynamically to avoid SSR issues
let L: any = null;
if (typeof window !== 'undefined') {
  import('leaflet').then((leaflet) => {
    L = leaflet.default;
  });
}

const Forecasting = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const { data: demandData } = useQuery({
    queryKey: ['demand'],
    queryFn: () => apiService.getDemandData(),
  });

  const { data: forecastData } = useQuery({
    queryKey: ['forecast'],
    queryFn: () => apiService.getForecast(),
  });

  const demandPoints = demandData?.data?.data || [];
  const predictions = forecastData?.data?.data?.predictions || [];

  useEffect(() => {
    if (!mapRef.current || !L || demandPoints.length === 0) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([39.8283, -98.5795], 4);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Clear existing markers
    mapInstanceRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.CircleMarker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    // Add demand heatmap points
    demandPoints.forEach((point: any) => {
      const radius = Math.max(5, Math.min(50, point.demand / 10));
      const color = point.demand > 150 ? '#ef4444' : point.demand > 100 ? '#f59e0b' : '#10b981';
      
      L.circleMarker([point.lat, point.lng], {
        radius,
        fillColor: color,
        color: '#fff',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.6
      })
      .bindPopup(`
        <div class="text-sm">
          <strong>Zip Code: ${point.zipCode}</strong><br>
          Demand: ${point.demand} units
        </div>
      `)
      .addTo(mapInstanceRef.current);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [demandPoints]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Demand Forecasting</h1>
        <p className="text-slate-400">AI-powered demand predictions and geo-heatmaps</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Forecast Accuracy"
          value="94.2%"
          change="+2.1% this quarter"
          changeType="positive"
          icon={TrendingUp}
          iconColor="text-blue-500"
        />
        <MetricCard
          title="High Demand Zones"
          value={demandPoints.filter((p: any) => p.demand > 150).length}
          change="Requires attention"
          changeType="neutral"
          icon={MapPin}
          iconColor="text-red-500"
        />
        <MetricCard
          title="Prediction Horizon"
          value="30 Days"
          change="Rolling forecast"
          changeType="neutral"
          icon={Calendar}
          iconColor="text-green-500"
        />
        <MetricCard
          title="Avg Daily Demand"
          value="1,217"
          change="+8% vs last month"
          changeType="positive"
          icon={BarChart3}
          iconColor="text-purple-500"
        />
      </div>

      {/* Charts and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Forecast Chart */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">30-Day Demand Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={predictions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #374151',
                    color: '#fff'
                  }} 
                />
                <Line type="monotone" dataKey="demand" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Geo Heatmap */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Demand Geo-Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef} 
              className="h-[300px] w-full rounded-lg bg-slate-700"
              style={{ minHeight: "300px" }}
            >
              {!L && (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Loading map...
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-slate-400">Low Demand</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-slate-400">Medium Demand</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-slate-400">High Demand</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Forecasting;
