import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Filter, Download, Search, Edit, Trash2, Plus } from "lucide-react";
import { PaginationComponent } from "@/components/Pagination";
import { materialRequirementData as initialMaterialData, getMRPStats } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { EditMaterialDialog } from "@/components/EditMaterialDialog";
import { NewMaterialDialog } from "@/components/NewMaterialDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const MaterialRequirementPlanning = () => {
  const { user } = useUser();
  const [materialData, setMaterialData] = useState(initialMaterialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [supplierFilter, setSupplierFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingMaterial, setEditingMaterial] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<any>(null);

  const stats = getMRPStats();

  const filteredData = materialData.filter(item => {
    const matchesSearch = item.materialName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesSupplier = supplierFilter === "all" || item.supplier === supplierFilter; 
    const matchesMaterial = materialFilter === "all" || item.materialName === materialFilter;
    
    return matchesSearch && matchesStatus && matchesSupplier && matchesMaterial;
  });

  const handleEditMaterial = (material: any) => {
    setEditingMaterial(material);
    setIsEditDialogOpen(true);
  };

  const handleSaveMaterial = (updatedMaterial: any) => {
    setMaterialData(prev => prev.map(item => 
      item.materialCode === updatedMaterial.materialCode ? updatedMaterial : item
    ));
  };

  const handleAddMaterial = (newMaterial: any) => {
    setMaterialData(prev => [newMaterial, ...prev]);
  };

  const handleDeleteClick = (material: any) => {
    setMaterialToDelete(material);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (materialToDelete) {
      setMaterialData(prev => prev.filter(item => item.materialCode !== materialToDelete.materialCode));
      toast({
        title: "Material Deleted",
        description: `${materialToDelete.materialName} has been removed`,
        variant: "destructive",
      });
      setMaterialToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
          {user.role === 'admin' && (
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          )}
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
                <div className="text-2xl font-bold">{stats.totalItems}</div>
                <div className="text-sm text-muted-foreground">Total Materials</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-success">{stats.available}</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-warning">{stats.shortage}</div>
                <div className="text-sm text-muted-foreground">Shortage</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-erp-danger">{stats.required}</div>
                <div className="text-sm text-muted-foreground">Required</div>
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
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
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
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditMaterial(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      {editingMaterial && (
        <EditMaterialDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          material={editingMaterial}
          onSave={handleSaveMaterial}
        />
      )}

      <NewMaterialDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onAdd={handleAddMaterial}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {materialToDelete?.materialName}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MaterialRequirementPlanning;