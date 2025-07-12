
import { useState } from "react";
import { Send, Bot, User, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const Copilot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Supply Chain Co-Pilot. I can help you with inventory optimization, demand forecasting, logistics planning, and more. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const suggestions = [
    "Show me products with low stock levels",
    "Predict demand for next week",
    "Optimize delivery routes for today",
    "Analyze warehouse efficiency trends",
    "Recommend markdown opportunities"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInputValue("");
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('stock') || input.includes('inventory')) {
      return "Based on current inventory data, I found 3 products with critically low stock: Widget B (25 units, below reorder point of 30), Product XYZ (12 units), and Component A (8 units). I recommend placing urgent reorders for these items. Would you like me to generate purchase orders?";
    }
    
    if (input.includes('demand') || input.includes('forecast')) {
      return "Our AI forecasting model predicts a 15% increase in demand over the next 7 days, particularly for Widget A and Widget C. This is likely due to the upcoming seasonal trend. I recommend increasing inventory levels by 20% for these products. Should I update the procurement schedule?";
    }
    
    if (input.includes('route') || input.includes('delivery')) {
      return "I've analyzed today's delivery routes and found optimization opportunities. By rerouting 3 trucks, we can reduce total distance by 120 miles and save approximately 2.5 hours. Route NY-001 can be combined with NY-003 for better efficiency. Would you like me to apply these optimizations?";
    }
    
    if (input.includes('warehouse') || input.includes('efficiency')) {
      return "Warehouse efficiency analysis shows: Warehouse A (92% efficiency - excellent), Warehouse B (88% efficiency - good), Warehouse C (95% efficiency - outstanding). The main bottleneck is in Warehouse B's picking process. I recommend redistributing 15% of Warehouse B's load to Warehouse C to improve overall performance.";
    }
    
    return "I understand you're looking for supply chain insights. I can help with inventory management, demand forecasting, route optimization, warehouse efficiency, and pricing strategies. Could you be more specific about what aspect you'd like me to analyze?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">AI Co-Pilot</h1>
        <p className="text-slate-400">Your intelligent supply chain assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-slate-800 border-slate-700 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-500" />
                Chat with AI Co-Pilot
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'ai' ? (
                            <Bot className="h-4 w-4 mt-1 text-blue-400" />
                          ) : (
                            <User className="h-4 w-4 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your supply chain..."
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Panel */}
        <div className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                Quick Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded text-sm transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-400">
                <div>
                  <h4 className="text-white font-medium">Inventory Management</h4>
                  <p>Stock optimization, reorder recommendations</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">Demand Forecasting</h4>
                  <p>AI-powered predictions and trend analysis</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">Route Optimization</h4>
                  <p>Delivery planning and cost reduction</p>
                </div>
                <div>
                  <h4 className="text-white font-medium">Performance Analytics</h4>
                  <p>KPI tracking and improvement insights</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Copilot;
