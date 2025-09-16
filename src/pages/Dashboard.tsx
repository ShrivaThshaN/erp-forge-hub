import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { getDashboardStats, productionOrders } from "@/data/mockData";

const Dashboard = () => {
  const stats = getDashboardStats();
  
  const kpiData = [
    {
      title: "Total Production Orders",
      value: stats.totalProductionOrders.toString(),
      change: "+12%",
      changeType: "increase" as const,
      icon: Package,
      color: "text-erp-info"
    },
    {
      title: "Active Purchase Orders",
      value: stats.activePurchaseOrders.toString(),
      change: "+8%", 
      changeType: "increase" as const,
      icon: ShoppingCart,
      color: "text-erp-success"
    },
    {
      title: "Material Shortfall",
      value: stats.materialShortfall.toLocaleString(),
      change: "-5%",
      changeType: "decrease" as const,
      icon: AlertTriangle,
      color: "text-erp-danger"
    },
    {
      title: "Revenue (Monthly)",
      value: `₹${(stats.monthlyRevenue / 100000).toFixed(1)}L`,
      change: "+15%",
      changeType: "increase" as const,
      icon: DollarSign,
      color: "text-erp-success"
    },
  ];

  const recentOrders = productionOrders;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-status-completed text-white">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-status-progress text-white">In Progress</Badge>;
      case "Scheduled":
        return <Badge className="bg-status-scheduled text-white">Scheduled</Badge>;
      case "Delayed":
        return <Badge className="bg-status-delayed text-white">Delayed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Enterprise Resource Planning Overview</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${
                  kpi.changeType === 'increase' ? 'text-erp-success' : 'text-erp-danger'
                }`}>
                  {kpi.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders and Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Production Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Production Orders</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.product}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-muted-foreground">{order.progress}%</div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Material Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Material Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Total Required</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalRequired.toLocaleString()}</p>
                </div>
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Available Stock</p>
                  <p className="text-2xl font-bold text-erp-success">{stats.availableStock.toLocaleString()}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-erp-success" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Shortfall</p>
                  <p className="text-2xl font-bold text-erp-danger">{stats.shortfall.toLocaleString()}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-erp-danger" />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Items in Shortage</p>
                  <p className="text-2xl font-bold text-erp-warning">{stats.itemsInShortage}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-erp-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;