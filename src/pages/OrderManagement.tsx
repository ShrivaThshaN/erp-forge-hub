import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download } from "lucide-react";

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const customerOrders = [
    {
      orderNumber: "CO-2024-001",
      customerName: "TechCorp Solutions",
      orderDate: "2024-01-15",
      deliveryDate: "2024-02-15",
      status: "Processing",
      totalValue: "$45,250.00",
      items: 5
    },
    {
      orderNumber: "CO-2024-002", 
      customerName: "Industrial Dynamics",
      orderDate: "2024-01-18",
      deliveryDate: "2024-02-18",
      status: "Shipped",
      totalValue: "$32,890.50", 
      items: 3
    },
    {
      orderNumber: "CO-2024-003",
      customerName: "Manufacturing Plus",
      orderDate: "2024-01-20",
      deliveryDate: "2024-02-20", 
      status: "Delivered",
      totalValue: "$67,125.75",
      items: 8
    },
    {
      orderNumber: "CO-2024-004",
      customerName: "Global Industries",
      orderDate: "2024-01-22", 
      deliveryDate: "2024-02-22",
      status: "Cancelled",
      totalValue: "$28,450.25",
      items: 4
    },
    {
      orderNumber: "CO-2024-005",
      customerName: "Precision Systems",
      orderDate: "2024-01-25",
      deliveryDate: "2024-02-25",
      status: "Processing", 
      totalValue: "$54,380.00",
      items: 6
    },
    {
      orderNumber: "CO-2024-006",
      customerName: "Advanced Manufacturing",
      orderDate: "2024-01-28",
      deliveryDate: "2024-02-28",
      status: "Ready to Ship",
      totalValue: "$41,750.50",
      items: 7
    }
  ];

  const filteredOrders = customerOrders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-status-completed text-white">Delivered</Badge>;
      case "Shipped":
        return <Badge className="bg-primary text-white">Shipped</Badge>;
      case "Ready to Ship":
        return <Badge className="bg-erp-info text-white">Ready to Ship</Badge>;
      case "Processing":
        return <Badge className="bg-status-progress text-white">Processing</Badge>;
      case "Cancelled":
        return <Badge className="bg-status-delayed text-white">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Track and manage customer orders and fulfillment</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">156</div>
            <div className="text-sm text-muted-foreground">Total Orders</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-erp-success">89</div>
            <div className="text-sm text-muted-foreground">Delivered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-progress">42</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">$2.4M</div>
            <div className="text-sm text-muted-foreground">Total Value</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Orders</CardTitle>
          <p className="text-sm text-muted-foreground">View and manage all customer orders</p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{order.orderNumber}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.deliveryDate}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-medium">{order.totalValue}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;