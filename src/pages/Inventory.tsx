import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download, Package, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inventoryData = [
    {
      itemCode: "INV-0001",
      itemName: "Aluminum Rods 6mm",
      category: "Raw Materials",
      currentStock: 450,
      minimumStock: 200,
      maximumStock: 1000,
      location: "Warehouse A-1",
      unitPrice: "$12.50",
      status: "In Stock",
      lastUpdated: "2024-01-28"
    },
    {
      itemCode: "INV-0002", 
      itemName: "Steel Bolts M8x50",
      category: "Fasteners",
      currentStock: 85,
      minimumStock: 100,
      maximumStock: 500,
      location: "Warehouse B-2",
      unitPrice: "$0.75",
      status: "Low Stock",
      lastUpdated: "2024-01-27"
    },
    {
      itemCode: "INV-0003",
      itemName: "Rubber Gaskets",
      category: "Sealing",
      currentStock: 0,
      minimumStock: 50,
      maximumStock: 300,
      location: "Warehouse C-1",
      unitPrice: "$3.25",
      status: "Out of Stock",
      lastUpdated: "2024-01-26"
    },
    {
      itemCode: "INV-0004",
      itemName: "Electric Motors 5HP",
      category: "Components", 
      currentStock: 15,
      minimumStock: 10,
      maximumStock: 50,
      location: "Warehouse D-3",
      unitPrice: "$450.00",
      status: "In Stock",
      lastUpdated: "2024-01-25"
    },
    {
      itemCode: "INV-0005",
      itemName: "Circuit Boards PCB-A1",
      category: "Electronics",
      currentStock: 75,
      minimumStock: 25,
      maximumStock: 200,
      location: "Warehouse E-1",
      unitPrice: "$85.00",
      status: "In Stock",
      lastUpdated: "2024-01-24"
    },
    {
      itemCode: "INV-0006",
      itemName: "Hydraulic Cylinders", 
      category: "Components",
      currentStock: 8,
      minimumStock: 15,
      maximumStock: 60,
      location: "Warehouse F-2",
      unitPrice: "$275.00",
      status: "Low Stock",
      lastUpdated: "2024-01-23"
    }
  ];

  const filteredData = inventoryData.filter(item => 
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-status-completed text-white">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-status-progress text-white">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-status-delayed text-white">Out of Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStockLevel = (current: number, minimum: number, maximum: number) => {
    const percentage = (current / maximum) * 100;
    if (current === 0) return "text-erp-danger";
    if (current <= minimum) return "text-erp-warning";
    return "text-erp-success";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground">Track stock levels, locations, and inventory movements</p>
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
            Add Item
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-sm text-muted-foreground">Total Items</div>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-success">890</div>
                <div className="text-sm text-muted-foreground">In Stock</div>
              </div>
              <CheckCircle className="h-8 w-8 text-erp-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-warning">145</div>
                <div className="text-sm text-muted-foreground">Low Stock</div>
              </div>
              <TrendingDown className="h-8 w-8 text-erp-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-danger">32</div>
                <div className="text-sm text-muted-foreground">Out of Stock</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-erp-danger" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Items</CardTitle>
          <p className="text-sm text-muted-foreground">Monitor stock levels and inventory status</p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search inventory..."
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
                  <TableHead>Item Code</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min/Max</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.itemCode}</TableCell>
                    <TableCell>{item.itemName}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className={`font-medium ${getStockLevel(item.currentStock, item.minimumStock, item.maximumStock)}`}>
                      {item.currentStock}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {item.minimumStock}/{item.maximumStock}
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="font-medium">{item.unitPrice}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
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

export default Inventory;