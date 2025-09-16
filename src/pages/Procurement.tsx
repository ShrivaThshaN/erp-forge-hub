import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Filter, Download, Search, Eye, Edit, Package } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { PaginationComponent } from "@/components/Pagination";

// Dummy data for purchase orders (extended for pagination)
const purchaseOrders = [
  {
    id: "PO-001",
    vendor: "Steel Dynamics Inc.",
    material: "Steel Sheets",
    quantity: 500,
    unit: "kg",
    unitPrice: 85,
    totalAmount: 42500,
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-25",
    status: "Pending",
    relatedOrder: "ORD-002"
  },
  {
    id: "PO-002",
    vendor: "Glass Masters Ltd.",
    material: "Tempered Glass",
    quantity: 20,
    unit: "pieces",
    unitPrice: 750,
    totalAmount: 15000,
    orderDate: "2024-01-16",
    deliveryDate: "2024-01-28",
    status: "Approved",
    relatedOrder: "ORD-001"
  },
  {
    id: "PO-003",
    vendor: "Aluminum Corp",
    material: "Aluminum Profiles",
    quantity: 100,
    unit: "meters",
    unitPrice: 120,
    totalAmount: 12000,
    orderDate: "2024-01-17",
    deliveryDate: "2024-01-30",
    status: "Delivered",
    relatedOrder: "ORD-003"
  },
  {
    id: "PO-004",
    vendor: "Rubber Supplies Co.",
    material: "Rubber Gaskets",
    quantity: 200,
    unit: "pieces",
    unitPrice: 45,
    totalAmount: 9000,
    orderDate: "2024-01-18",
    deliveryDate: "2024-02-01",
    status: "In Transit",
    relatedOrder: "ORD-004"
  },
  {
    id: "PO-005",
    vendor: "Motor Tech Industries",
    material: "Electric Motors",
    quantity: 10,
    unit: "pieces",
    unitPrice: 2800,
    totalAmount: 28000,
    orderDate: "2024-01-19",
    deliveryDate: "2024-02-05",
    status: "Pending",
    relatedOrder: "ORD-005"
  },
  // Additional orders for pagination
  {
    id: "PO-006",
    vendor: "Circuit Board Solutions",
    material: "PCB Boards",
    quantity: 150,
    unit: "pieces",
    unitPrice: 95,
    totalAmount: 14250,
    orderDate: "2024-01-20",
    deliveryDate: "2024-02-08",
    status: "Approved",
    relatedOrder: "ORD-006"
  },
  {
    id: "PO-007",
    vendor: "Hydraulic Systems Ltd.",
    material: "Hydraulic Cylinders",
    quantity: 25,
    unit: "pieces",
    unitPrice: 450,
    totalAmount: 11250,
    orderDate: "2024-01-21",
    deliveryDate: "2024-02-10",
    status: "Delivered",
    relatedOrder: "ORD-007"
  },
  {
    id: "PO-008",
    vendor: "Copper Wire Co.",
    material: "Electrical Wires",
    quantity: 1000,
    unit: "meters",
    unitPrice: 12,
    totalAmount: 12000,
    orderDate: "2024-01-22",
    deliveryDate: "2024-02-12",
    status: "In Transit",
    relatedOrder: "ORD-008"
  },
  {
    id: "PO-009",
    vendor: "Plastic Molding Inc.",
    material: "Injection Molded Parts",
    quantity: 300,
    unit: "pieces",
    unitPrice: 28,
    totalAmount: 8400,
    orderDate: "2024-01-23",
    deliveryDate: "2024-02-15",
    status: "Pending",
    relatedOrder: "ORD-009"
  },
  {
    id: "PO-010",
    vendor: "Stainless Steel Corp",
    material: "Stainless Steel Pipes",
    quantity: 50,
    unit: "pieces",
    unitPrice: 180,
    totalAmount: 9000,
    orderDate: "2024-01-24",
    deliveryDate: "2024-02-18",
    status: "Approved",
    relatedOrder: "ORD-010"
  },
  {
    id: "PO-011",
    vendor: "LED Technology Ltd.",
    material: "LED Strips",
    quantity: 200,
    unit: "pieces",
    unitPrice: 45,
    totalAmount: 9000,
    orderDate: "2024-01-25",
    deliveryDate: "2024-02-20",
    status: "Delivered",
    relatedOrder: "ORD-011"
  },
  {
    id: "PO-012",
    vendor: "Valve Systems Inc.",
    material: "Industrial Valves",
    quantity: 15,
    unit: "pieces",
    unitPrice: 320,
    totalAmount: 4800,
    orderDate: "2024-01-26",
    deliveryDate: "2024-02-22",
    status: "In Transit",
    relatedOrder: "ORD-012"
  }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-blue-100 text-blue-800';
    case 'in transit': return 'bg-purple-100 text-purple-800';
    case 'delivered': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const Procurement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search and filters
  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.relatedOrder.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(order.status);
    const matchesVendor = selectedVendors.length === 0 || selectedVendors.includes(order.vendor);
    
    return matchesSearch && matchesStatus && matchesVendor;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  const pendingOrders = filteredOrders.filter(order => order.status === "Pending").length;
  const deliveredOrders = filteredOrders.filter(order => order.status === "Delivered").length;

  const uniqueStatuses = [...new Set(purchaseOrders.map(order => order.status))];
  const uniqueVendors = [...new Set(purchaseOrders.map(order => order.vendor))];

  const handleStatusFilter = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    }
  };

  const handleVendorFilter = (vendor: string, checked: boolean) => {
    if (checked) {
      setSelectedVendors([...selectedVendors, vendor]);
    } else {
      setSelectedVendors(selectedVendors.filter(v => v !== vendor));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement</h1>
          <p className="text-muted-foreground">
            Manage and track all purchase orders and vendor relationships
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Purchase Order
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Purchase Order</DialogTitle>
                <DialogDescription>
                  Create a new purchase order for materials and components.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="vendor" className="text-right">
                    Vendor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steel-dynamics">Steel Dynamics Inc.</SelectItem>
                      <SelectItem value="glass-masters">Glass Masters Ltd.</SelectItem>
                      <SelectItem value="aluminum-corp">Aluminum Corp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="material" className="text-right">
                    Material
                  </Label>
                  <Input id="material" className="col-span-3" placeholder="Material name" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input id="quantity" type="number" className="col-span-3" placeholder="0" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Unit Price (₹)
                  </Label>
                  <Input id="price" type="number" className="col-span-3" placeholder="0.00" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="delivery" className="text-right">
                    Delivery Date
                  </Label>
                  <Input id="delivery" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea id="notes" className="col-span-3" placeholder="Additional notes..." />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Create Order
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredOrders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalValue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveredOrders}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Purchase Orders</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Status</h4>
                      <div className="grid gap-2">
                        {uniqueStatuses.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              id={`status-${status}`}
                              checked={selectedStatuses.includes(status)}
                              onCheckedChange={(checked) => handleStatusFilter(status, checked as boolean)}
                            />
                            <Label htmlFor={`status-${status}`} className="text-sm">
                              {status}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Vendor</h4>
                      <div className="grid gap-2">
                        {uniqueVendors.map((vendor) => (
                          <div key={vendor} className="flex items-center space-x-2">
                            <Checkbox
                              id={`vendor-${vendor}`}
                              checked={selectedVendors.includes(vendor)}
                              onCheckedChange={(checked) => handleVendorFilter(vendor, checked as boolean)}
                            />
                            <Label htmlFor={`vendor-${vendor}`} className="text-sm">
                              {vendor}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSelectedStatuses([]);
                        setSelectedVendors([]);
                      }}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent>
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
                <TableHead>Related Order</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.material}</TableCell>
                  <TableCell>{order.quantity} {order.unit}</TableCell>
                  <TableCell>₹{order.unitPrice}</TableCell>
                  <TableCell>₹{order.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{order.relatedOrder}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
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
    </div>
  );
};

export default Procurement;