
import axios from 'axios';

const API_BASE_URL = 'https://api.supplychain.demo';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Mock API responses for demo
const mockResponses = {
  '/api/inventory': {
    data: [
      { id: 1, sku: 'SKU001', name: 'Widget A', stock: 150, reorderPoint: 50, status: 'In Stock' },
      { id: 2, sku: 'SKU002', name: 'Widget B', stock: 25, reorderPoint: 30, status: 'Low Stock' },
      { id: 3, sku: 'SKU003', name: 'Widget C', stock: 0, reorderPoint: 20, status: 'Out of Stock' },
    ]
  },
  '/api/warehouses': {
    data: [
      { id: 1, name: 'Warehouse A', location: 'New York', load: 85, capacity: 100, efficiency: 92 },
      { id: 2, name: 'Warehouse B', location: 'Los Angeles', load: 67, capacity: 100, efficiency: 88 },
      { id: 3, name: 'Warehouse C', location: 'Chicago', load: 43, capacity: 100, efficiency: 95 },
    ]
  },
  '/api/demand': {
    data: [
      { zipCode: '10001', demand: 150, lat: 40.7505, lng: -73.9934 },
      { zipCode: '90210', demand: 120, lat: 34.0901, lng: -118.4065 },
      { zipCode: '60601', demand: 200, lat: 41.8825, lng: -87.6441 },
    ]
  },
  '/api/forecast': {
    data: {
      predictions: [
        { date: '2024-01-01', demand: 1200, confidence: 0.85 },
        { date: '2024-01-02', demand: 1350, confidence: 0.82 },
        { date: '2024-01-03', demand: 1100, confidence: 0.88 },
      ]
    }
  }
};

// Intercept requests and return mock data
api.interceptors.request.use((config) => {
  const mockData = mockResponses[config.url as keyof typeof mockResponses];
  if (mockData) {
    return Promise.reject({
      response: { data: mockData, status: 200 },
      config,
      isAxiosError: true,
    });
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 200) {
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  getInventory: () => api.get('/api/inventory'),
  getWarehouses: () => api.get('/api/warehouses'),
  getDemandData: () => api.get('/api/demand'),
  getForecast: () => api.get('/api/forecast'),
  getMarkdowns: () => api.get('/api/markdowns'),
  getCustomers: () => api.get('/api/customers'),
  getReturns: () => api.get('/api/returns'),
  getSimulations: () => api.get('/api/simulate'),
  getAlerts: () => api.get('/api/alerts'),
  getPreferences: () => api.get('/api/preferences'),
  getTraining: (zone: string) => api.get(`/api/training/${zone}`),
  getAccessKey: () => api.get('/api/accesskey'),
  getRoleData: () => api.get('/api/role'),
};

export default api;
