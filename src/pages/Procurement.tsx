import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download, Search, Filter, Edit, Trash2 } from "lucide-react";
import { PaginationComponent } from "@/components/Pagination";
import { useUser } from "@/contexts/UserContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { NewPurchaseOrderDialog } from "@/components/NewPurchaseOrderDialog";
import { EditPurchaseOrderDialog } from "@/components/EditPurchaseOrderDialog";
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
import { toast } from "@/hooks/use-toast";
import { procurementData, getProcurementStats } from "@/data/mockData";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "bg-status-completed";
    case "Pending":
      return "bg-status-pending";
    case "Approved":
      return "bg-status-progress";
    case "Ordered":
      return "bg-status-progress";
    case "Received":
      return "bg-status-completed";
    default:
      return "bg-secondary";
  }
};

const Procurement = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const itemsPerPage = 10;

  const uniqueStatuses = Array.from(new Set(procurementData.map(order => order.status)));
  const uniqueVendors = Array.from(new Set(procurementData.map(order => order.supplier)));

  const filteredOrders = procurementData.filter(order => {
    const matchesSearch = 
      order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.materialName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(order.supplier);

    return matchesSearch && matchesStatus && matchesVendor;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const stats = getProcurementStats();
  const totalValue = procurementData.reduce((sum, order) => {
    const amount = parseFloat(order.totalAmount.replace('₹', '').replace(',', ''));
    return sum + amount;
  }, 0);

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (orderId: string) => {
    setOrderToDelete(orderId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (orderToDelete) {
      // Actually delete from the mockData array
      const index = procurementData.findIndex(po => po.poNumber === orderToDelete);
      if (index !== -1) {
        procurementData.splice(index, 1);
      }
      toast({
        title: "Success",
        description: "Purchase order deleted successfully",
      });
      setRefreshKey(prev => prev + 1);
      setIsDeleteDialogOpen(false);
      setOrderToDelete(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Procurement</h1>
          <p className="text-muted-foreground">Manage purchase orders and vendor relationships</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Purchase Order
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Track and manage all procurement activities</p>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Orders</div>
                  <div className="text-2xl font-bold">{stats.totalPOs}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Total Value</div>
                  <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Pending Orders</div>
                  <div className="text-2xl font-bold text-status-pending">{stats.pending}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div>
                  <div className="text-sm text-muted-foreground">Approved Orders</div>
                  <div className="text-2xl font-bold text-erp-success">{stats.approved}</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by PO ID, vendor, or material..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Status</h4>
                    <div className="space-y-2">
                      {uniqueStatuses.map((status) => (
                        <div key={status} className="flex items-center">
                          <Checkbox
                            id={`status-${status}`}
                            checked={selectedStatuses.includes(status)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedStatuses([...selectedStatuses, status]);
                              } else {
                                setSelectedStatuses(selectedStatuses.filter(s => s !== status));
                              }
                            }}
                          />
                          <label htmlFor={`status-${status}`} className="ml-2 text-sm">
                            {status}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Vendor</h4>
                    <div className="space-y-2">
                      {uniqueVendors.map((vendor) => (
                        <div key={vendor} className="flex items-center">
                          <Checkbox
                            id={`vendor-${vendor}`}
                            checked={selectedVendors.includes(vendor)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedVendors([...selectedVendors, vendor]);
                              } else {
                                setSelectedVendors(selectedVendors.filter(v => v !== vendor));
                              }
                            }}
                          />
                          <label htmlFor={`vendor-${vendor}`} className="ml-2 text-sm">
                            {vendor}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO ID</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Status</TableHead>
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.poNumber}>
                    <TableCell className="font-medium">{order.poNumber}</TableCell>
                    <TableCell>{order.supplier}</TableCell>
                    <TableCell>{order.materialName}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.unitPrice}</TableCell>
                    <TableCell className="font-medium">{order.totalAmount}</TableCell>
                    <TableCell>{order.expectedDelivery}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(order)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(order.poNumber)}>
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

      <NewPurchaseOrderDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onOrderAdded={() => setRefreshKey(prev => prev + 1)}
      />

      <EditPurchaseOrderDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        order={selectedOrder}
        onOrderUpdated={() => setRefreshKey(prev => prev + 1)}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the purchase order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Procurement;
