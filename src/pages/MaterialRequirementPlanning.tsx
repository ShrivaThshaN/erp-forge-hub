import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Download, Search } from "lucide-react";

const MaterialRequirementPlanning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);

  const materialData = [
    // Glass Dining Table (CO-2024-001) requirements
    {
      materialCode: "MAT-GT-001",
      materialName: "Tempered Glass Top", 
      requiredQty: 1,
      availableQty: 0,
      shortfall: 1,
      supplier: "Premium Glass Solutions",
      leadTime: "7 days",
      status: "Required",
      plannedDate: "2024-01-10",
      relatedOrder: "CO-2024-001"
    },
    {
      materialCode: "MAT-GT-002",
      materialName: "Steel Table Base",
      requiredQty: 1, 
      availableQty: 2,
      shortfall: 0,
      supplier: "MetalCraft Industries",
      leadTime: "5 days", 
      status: "Available",
      plannedDate: "2024-01-08",
      relatedOrder: "CO-2024-001"
    },
    // Steel Office Desk (CO-2024-002) requirements
    {
      materialCode: "MAT-SD-001", 
      materialName: "Steel Sheets",
      requiredQty: 4,
      availableQty: 2,
      shortfall: 2,
      supplier: "Steel Supply Co",
      leadTime: "3 days",
      status: "Ordered",
      plannedDate: "2024-01-12",
      relatedOrder: "CO-2024-002"
    },
    {
      materialCode: "MAT-SD-002",
      materialName: "Desk Hardware Kit",
      requiredQty: 2,
      availableQty: 5, 
      shortfall: 0,
      supplier: "Office Components Ltd",
      leadTime: "2 days",
      status: "Available", 
      plannedDate: "2024-01-10",
      relatedOrder: "CO-2024-002"
    },
    // Aluminum Window Frame (CO-2024-003) requirements
    {
      materialCode: "MAT-WF-001",
      materialName: "Aluminum Extrusions",
      requiredQty: 50,
      availableQty: 30,
      shortfall: 20,
      supplier: "Aluminum Solutions Inc", 
      leadTime: "4 days",
      status: "Shortage",
      plannedDate: "2024-01-14",
      relatedOrder: "CO-2024-003"
    },
    // Rubber Gasket Set (CO-2024-004) requirements
    {
      materialCode: "MAT-RG-001",
      materialName: "Rubber Material",
      requiredQty: 25,
      availableQty: 40,
      shortfall: 0,
      supplier: "Rubber Industries",
      leadTime: "2 days",
      status: "Available",
      plannedDate: "2024-01-16",
      relatedOrder: "CO-2024-004"
    },
    // Motor Assembly (CO-2024-005) requirements
    {
      materialCode: "MAT-MA-001",
      materialName: "Electric Motor Core",
      requiredQty: 5,
      availableQty: 1,
      shortfall: 4,
      supplier: "Precision Motors Ltd",
      leadTime: "10 days",
      status: "Required",
      plannedDate: "2024-01-18",
      relatedOrder: "CO-2024-005"
    },
    {
      materialCode: "MAT-MA-002",
      materialName: "Copper Wiring",
      requiredQty: 500,
      availableQty: 200,
      shortfall: 300,
      supplier: "Electrical Components Co",
      leadTime: "6 days",
      status: "Ordered",
      plannedDate: "2024-01-20",
      relatedOrder: "CO-2024-005"
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
    // Export functionality - convert filteredData to CSV
    const headers = ["Material Code", "Material Name", "Required Qty", "Available Qty", "Shortfall", "Supplier", "Lead Time", "Status", "Planned Date"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => [
        item.materialCode,
        item.materialName,
        item.requiredQty,
        item.availableQty,
        item.shortfall,
        item.supplier,
        item.leadTime,
        item.status,
        item.plannedDate
      ].join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "material-requirements.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setStatusFilter("all");
    setSupplierFilter("all");
    setMaterialFilter("all");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Material Requirement Planning</h1>
          <p className="text-muted-foreground">Monitor material requirements, availability, and procurement status</p>
        </div>
        <div className="flex space-x-2">
          <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Filter Material Requirements</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Material Name</label>
                  <Select value={materialFilter} onValueChange={setMaterialFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Materials" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Materials</SelectItem>
                      <SelectItem value="Aluminum Rods">Aluminum Rods</SelectItem>
                      <SelectItem value="Rubber Seals">Rubber Seals</SelectItem>
                      <SelectItem value="Steel Sheets">Steel Sheets</SelectItem>
                      <SelectItem value="Glass Panels">Glass Panels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Supplier</label>
                  <Select value={supplierFilter} onValueChange={setSupplierFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Suppliers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Suppliers</SelectItem>
                      <SelectItem value="TechSupply Inc">TechSupply Inc</SelectItem>
                      <SelectItem value="MetalCorp Ltd">MetalCorp Ltd</SelectItem>
                      <SelectItem value="PrecisionParts">PrecisionParts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
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
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button onClick={() => setIsFilterDialogOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
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

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search materials, codes, or suppliers..."
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
                  <TableHead>Material Code</TableHead>
                  <TableHead>Material Name</TableHead>
                  <TableHead>Related Order</TableHead>
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
                    <TableCell className="font-medium text-status-progress">{item.relatedOrder}</TableCell>
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