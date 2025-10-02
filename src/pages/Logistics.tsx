import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, Truck, MapPin, Clock, Package, Edit, Trash2 } from "lucide-react";
import { PaginationComponent } from "@/components/Pagination";
import { logisticsData as initialLogisticsData, getLogisticsStats } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { EditLogisticsDialog } from "@/components/EditLogisticsDialog";
import { NewLogisticsDialog } from "@/components/NewLogisticsDialog";
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

const Logistics = () => {
  const { user } = useUser();
  const [logisticsData, setLogisticsData] = useState(initialLogisticsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [carrierFilter, setCarrierFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingShipment, setEditingShipment] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [shipmentToDelete, setShipmentToDelete] = useState<any>(null);

  const handleEditShipment = (shipment: any) => {
    setEditingShipment(shipment);
    setIsEditDialogOpen(true);
  };

  const handleSaveShipment = (updatedShipment: any) => {
    setLogisticsData(prev => prev.map(item => 
      item.shipmentId === updatedShipment.shipmentId ? updatedShipment : item
    ));
  };

  const handleAddShipment = (newShipment: any) => {
    setLogisticsData(prev => [newShipment, ...prev]);
  };

  const handleDeleteClick = (shipment: any) => {
    setShipmentToDelete(shipment);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (shipmentToDelete) {
      setLogisticsData(prev => prev.filter(item => item.shipmentId !== shipmentToDelete.shipmentId));
      toast({
        title: "Shipment Deleted",
        description: `Shipment ${shipmentToDelete.shipmentId} has been cancelled`,
        variant: "destructive",
      });
      setShipmentToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const filteredData = logisticsData.filter(shipment => {
    const matchesSearch = shipment.shipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.carrier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || shipment.status === statusFilter;
    const matchesCarrier = carrierFilter === "all" || shipment.carrier === carrierFilter;
    const matchesPriority = priorityFilter === "all" || shipment.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCarrier && matchesPriority;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
  const stats = getLogisticsStats();

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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Shipments</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Preparing">Preparing</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Carrier</label>
                  <Select value={carrierFilter} onValueChange={setCarrierFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Carriers" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Carriers</SelectItem>
                      <SelectItem value="FedEx Express">FedEx Express</SelectItem>
                      <SelectItem value="UPS Ground">UPS Ground</SelectItem>
                      <SelectItem value="DHL International">DHL International</SelectItem>
                      <SelectItem value="USPS Priority">USPS Priority</SelectItem>
                      <SelectItem value="FedEx Ground">FedEx Ground</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {user.role === 'admin' && (
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Shipment
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
                <div className="text-2xl font-bold">{stats.totalShipments}</div>
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
                <div className="text-2xl font-bold text-primary">{stats.inTransit}</div>
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
                <div className="text-2xl font-bold text-erp-success">{stats.delivered}</div>
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
                <div className="text-2xl font-bold text-erp-danger">{stats.delayed}</div>
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
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((shipment, index) => (
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
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditShipment(shipment)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteClick(shipment)}
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

      {editingShipment && (
        <EditLogisticsDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          shipment={editingShipment}
          onSave={handleSaveShipment}
        />
      )}

      <NewLogisticsDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onAdd={handleAddShipment}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently cancel shipment {shipmentToDelete?.shipmentId}. This action cannot be undone.
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

export default Logistics;