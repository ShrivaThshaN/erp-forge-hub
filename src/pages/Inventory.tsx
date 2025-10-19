import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, Package, TrendingDown, AlertTriangle, CheckCircle, Edit, Trash2 } from "lucide-react";
import { inventoryData, getInventoryStats } from "@/data/mockData";
import { PaginationComponent } from "@/components/Pagination";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { EditInventoryDialog } from "@/components/EditInventoryDialog";
import { NewInventoryDialog } from "@/components/NewInventoryDialog";
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

const Inventory = () => {
  const { user } = useUser();
  const [localInventory, setLocalInventory] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const itemsPerPage = 10;
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  // Calculate stats from local state
  const stats = {
    totalItems: localInventory.length,
    inStock: localInventory.filter(item => item.status === "In Stock").length,
    lowStock: localInventory.filter(item => item.status === "Low Stock").length,
    outOfStock: localInventory.filter(item => item.status === "Out of Stock").length,
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveItem = (updatedItem: any) => {
    // Update both local state and mockData
    const index = inventoryData.findIndex(item => item.itemCode === updatedItem.itemCode);
    if (index !== -1) {
      inventoryData[index] = updatedItem;
    }
    setLocalInventory(prev => prev.map(item => 
      item.itemCode === updatedItem.itemCode ? updatedItem : item
    ));
    setRefreshKey(prev => prev + 1);
  };

  const handleAddItem = (newItem: any) => {
    // Update both local state and mockData
    inventoryData.unshift(newItem);
    setLocalInventory(prev => [newItem, ...prev]);
    setRefreshKey(prev => prev + 1);
  };

  const handleDeleteClick = (item: any) => {
    setItemToDelete(item);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      // Update both local state and mockData
      const index = inventoryData.findIndex(item => item.itemCode === itemToDelete.itemCode);
      if (index !== -1) {
        inventoryData.splice(index, 1);
      }
      setLocalInventory(prev => prev.filter(item => item.itemCode !== itemToDelete.itemCode));
      toast({
        title: "Item Deleted",
        description: `${itemToDelete.itemName} has been removed from inventory`,
        variant: "destructive",
      });
      setItemToDelete(null);
      setRefreshKey(prev => prev + 1);
    }
    setDeleteConfirmOpen(false);
  };

  const filteredData = localInventory.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    const matchesLocation = locationFilter === "all" || item.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Inventory</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                      <SelectItem value="Fasteners">Fasteners</SelectItem>
                      <SelectItem value="Sealing">Sealing</SelectItem>
                      <SelectItem value="Components">Components</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Low Stock">Low Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="Warehouse A-1">Warehouse A-1</SelectItem>
                      <SelectItem value="Warehouse B-2">Warehouse B-2</SelectItem>
                      <SelectItem value="Warehouse C-1">Warehouse C-1</SelectItem>
                      <SelectItem value="Warehouse D-3">Warehouse D-3</SelectItem>
                      <SelectItem value="Warehouse E-1">Warehouse E-1</SelectItem>
                      <SelectItem value="Warehouse F-2">Warehouse F-2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => {
            const headers = ["Item Code", "Item Name", "Category", "Current Stock", "Minimum Stock", "Maximum Stock", "Location", "Unit Price", "Status", "Last Updated"];
            const csvContent = [
              headers.join(","),
              ...filteredData.map(item => [
                item.itemCode,
                item.itemName,
                item.category,
                item.currentStock,
                item.minimumStock,
                item.maximumStock,
                item.location,
                item.unitPrice,
                item.status,
                item.lastUpdated
              ].join(","))
            ].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "inventory.csv";
            a.click();
            window.URL.revokeObjectURL(url);
          }}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {user.role === 'admin' && (
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">{stats.totalItems}</div>
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
                <div className="text-2xl font-bold text-erp-success">{stats.inStock}</div>
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
                <div className="text-2xl font-bold text-erp-warning">{stats.lowStock}</div>
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
                <div className="text-2xl font-bold text-erp-danger">{stats.outOfStock}</div>
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
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
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
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditItem(item)}
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
          <div className="mt-4 flex justify-center">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>

      {editingItem && (
        <EditInventoryDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          item={editingItem}
          onSave={handleSaveItem}
        />
      )}

      <NewInventoryDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onAdd={handleAddItem}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {itemToDelete?.itemName}. This action cannot be undone.
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

export default Inventory;