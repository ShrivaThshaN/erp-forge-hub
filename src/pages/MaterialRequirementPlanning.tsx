import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Download, Search } from "lucide-react";

const MaterialRequirementPlanning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("all");

  const materialData = [
    {
      materialCode: "MAT-0001",
      materialName: "Aluminum Rods", 
      requiredQty: 180,
      availableQty: 1,
      shortfall: 255,
      supplier: "TechSupply Inc",
      leadTime: "14 days",
      status: "Received",
      plannedDate: "4/9/2025"
    },
    {
      materialCode: "MAT-0002",
      materialName: "Aluminum Rods",
      requiredQty: 359, 
      availableQty: 408,
      shortfall: 407,
      supplier: "MetalCorp Ltd",
      leadTime: "13 days", 
      status: "Required",
      plannedDate: "5/9/2025"
    },
    {
      materialCode: "MAT-0003", 
      materialName: "Rubber Seals",
      requiredQty: 374,
      availableQty: 356,
      shortfall: 159,
      supplier: "PrecisionParts",
      leadTime: "11 days",
      status: "Ordered",
      plannedDate: "6/9/2025"
    },
    {
      materialCode: "MAT-0004",
      materialName: "Steel Sheets",
      requiredQty: 418,
      availableQty: 10, 
      shortfall: 752,
      supplier: "TechSupply Inc",
      leadTime: "9 days",
      status: "Received", 
      plannedDate: "7/9/2025"
    },
    {
      materialCode: "MAT-0005",
      materialName: "Glass Panels",
      requiredQty: 773,
      availableQty: 150,
      shortfall: 428,
      supplier: "TechSupply Inc", 
      leadTime: "11 days",
      status: "Shortage",
      plannedDate: "8/9/2025"
    }
  ];

  const filteredData = materialData.filter(item => {
    const matchesSearch = item.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSupplier = supplierFilter === "all" || item.supplier === supplierFilter; 
    const matchesMaterial = materialFilter === "all" || item.materialName === materialFilter;
    
    return matchesSearch && matchesStatus && matchesSupplier && matchesMaterial;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Received":
        return <Badge className="bg-status-completed text-white">Received</Badge>;
      case "Ordered":
        return <Badge className="bg-status-progress text-white">Ordered</Badge>; 
      case "Required":
        return <Badge className="bg-status-pending text-white">Required</Badge>;
      case "Shortage":
        return <Badge className="bg-status-delayed text-white">Shortage</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting data...");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Material Requirement Planning</h1>
          <p className="text-muted-foreground">Monitor material requirements, availability, and procurement status</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExport}>
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Requirement Planning (MRP)</CardTitle>
          <p className="text-sm text-muted-foreground">Monitor material requirements, availability, and procurement status</p>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">17,772</div>
                <div className="text-sm text-muted-foreground">Total Required</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-success">6,878</div>
                <div className="text-sm text-muted-foreground">Available Stock</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-danger">8,691</div>
                <div className="text-sm text-muted-foreground">Total Shortfall</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-warning">8</div>
                <div className="text-sm text-muted-foreground">Items in Shortage</div>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold mb-4">Material Requirements Overview</h3>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={materialFilter} onValueChange={setMaterialFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Material Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Materials</SelectItem>
                <SelectItem value="Aluminum Rods">Aluminum Rods</SelectItem>
                <SelectItem value="Rubber Seals">Rubber Seals</SelectItem>
                <SelectItem value="Steel Sheets">Steel Sheets</SelectItem>
                <SelectItem value="Glass Panels">Glass Panels</SelectItem>
              </SelectContent>
            </Select>
            <Select value={supplierFilter} onValueChange={setSupplierFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Suppliers</SelectItem>
                <SelectItem value="TechSupply Inc">TechSupply Inc</SelectItem>
                <SelectItem value="MetalCorp Ltd">MetalCorp Ltd</SelectItem>
                <SelectItem value="PrecisionParts">PrecisionParts</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="Ordered">Ordered</SelectItem>
                <SelectItem value="Required">Required</SelectItem>
                <SelectItem value="Shortage">Shortage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material Code</TableHead>
                  <TableHead>Material Name</TableHead>
                  <TableHead>Required Qty</TableHead>
                  <TableHead>Available Qty</TableHead>
                  <TableHead>Shortfall</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Lead Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Planned Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.materialCode}</TableCell>
                    <TableCell>{item.materialName}</TableCell>
                    <TableCell>{item.requiredQty}</TableCell>
                    <TableCell>{item.availableQty}</TableCell>
                    <TableCell className="text-erp-danger font-medium">{item.shortfall}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.leadTime}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.plannedDate}</TableCell>
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

export default MaterialRequirementPlanning;