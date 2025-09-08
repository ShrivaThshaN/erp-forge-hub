import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download, Truck, MapPin, Clock, Package } from "lucide-react";

const Logistics = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const shipmentData = [
    {
      shipmentId: "SH-2024-001",
      orderNumber: "CO-2024-001",
      carrier: "FedEx Express",
      trackingNumber: "1234567890",
      origin: "Warehouse A",
      destination: "New York, NY",
      departureDate: "2024-01-15",
      estimatedArrival: "2024-01-17",
      status: "In Transit",
      priority: "High"
    },
    {
      shipmentId: "SH-2024-002",
      orderNumber: "CO-2024-002", 
      carrier: "UPS Ground",
      trackingNumber: "1Z9876543210",
      origin: "Warehouse B",
      destination: "Los Angeles, CA",
      departureDate: "2024-01-16",
      estimatedArrival: "2024-01-19", 
      status: "Delivered",
      priority: "Medium"
    },
    {
      shipmentId: "SH-2024-003",
      orderNumber: "CO-2024-003",
      carrier: "DHL International",
      trackingNumber: "DHL123456789",
      origin: "Warehouse C",
      destination: "Chicago, IL", 
      departureDate: "2024-01-18",
      estimatedArrival: "2024-01-20",
      status: "Preparing",
      priority: "Low"
    },
    {
      shipmentId: "SH-2024-004",
      orderNumber: "CO-2024-004",
      carrier: "USPS Priority",
      trackingNumber: "USPS987654321",
      origin: "Warehouse A",
      destination: "Houston, TX",
      departureDate: "2024-01-20",
      estimatedArrival: "2024-01-22",
      status: "Delayed",
      priority: "High"
    },
    {
      shipmentId: "SH-2024-005",
      orderNumber: "CO-2024-005",
      carrier: "FedEx Ground", 
      trackingNumber: "FDX555444333",
      origin: "Warehouse D",
      destination: "Miami, FL",
      departureDate: "2024-01-22",
      estimatedArrival: "2024-01-24",
      status: "In Transit",
      priority: "Medium"
    }
  ];

  const filteredData = shipmentData.filter(shipment => 
    shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-status-completed text-white">Delivered</Badge>;
      case "In Transit":
        return <Badge className="bg-primary text-white">In Transit</Badge>;
      case "Preparing":
        return <Badge className="bg-status-progress text-white">Preparing</Badge>;
      case "Delayed":
        return <Badge className="bg-status-delayed text-white">Delayed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium": 
        return <Badge className="bg-status-progress text-white">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Logistics & Shipping</h1>
          <p className="text-muted-foreground">Track shipments, manage deliveries, and coordinate logistics</p>
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
            New Shipment
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-sm text-muted-foreground">Total Shipments</div>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-muted-foreground">In Transit</div>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-success">89</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
              <MapPin className="h-8 w-8 text-erp-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-danger">8</div>
                <div className="text-sm text-muted-foreground">Delayed</div>
              </div>
              <Clock className="h-8 w-8 text-erp-danger" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Shipments</CardTitle>
          <p className="text-sm text-muted-foreground">Monitor all shipments and delivery status</p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search shipments..."
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
                  <TableHead>Shipment ID</TableHead>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Carrier</TableHead>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Origin</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Departure</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((shipment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{shipment.shipmentId}</TableCell>
                    <TableCell>{shipment.orderNumber}</TableCell>
                    <TableCell>{shipment.carrier}</TableCell>
                    <TableCell className="font-mono text-sm">{shipment.trackingNumber}</TableCell>
                    <TableCell>{shipment.origin}</TableCell>
                    <TableCell>{shipment.destination}</TableCell>
                    <TableCell>{shipment.departureDate}</TableCell>
                    <TableCell>{shipment.estimatedArrival}</TableCell>
                    <TableCell>{getPriorityBadge(shipment.priority)}</TableCell>
                    <TableCell>{getStatusBadge(shipment.status)}</TableCell>
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

export default Logistics;