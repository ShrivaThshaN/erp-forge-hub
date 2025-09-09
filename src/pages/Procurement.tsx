import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download } from "lucide-react";

const Procurement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [vendorFilter, setVendorFilter] = useState("all");

  const purchaseOrders = [
    {
      poNumber: "PO-2024-001",
      vendorName: "Acme Corp",
      creationDate: "1/1/2024",
      status: "Pending Approval",
      totalAmount: "₹29,698.49"
    },
    {
      poNumber: "PO-2024-002", 
      vendorName: "Stellar Industries",
      creationDate: "2/1/2024",
      status: "Fulfilled",
      totalAmount: "₹39,985.57"
    },
    {
      poNumber: "PO-2024-003",
      vendorName: "Global Supply Co", 
      creationDate: "3/1/2024",
      status: "Sent to Vendor",
      totalAmount: "₹34,705.62"
    },
    {
      poNumber: "PO-2024-004",
      vendorName: "Premier Materials",
      creationDate: "4/1/2024", 
      status: "Fulfilled",
      totalAmount: "₹29,918.52"
    },
    {
      poNumber: "PO-2024-005",
      vendorName: "Elite Components",
      creationDate: "5/1/2024",
      status: "Sent to Vendor", 
      totalAmount: "₹30,532.26"
    },
    {
      poNumber: "PO-2024-006",
      vendorName: "Quantum Systems",
      creationDate: "6/1/2024",
      status: "Fulfilled",
      totalAmount: "₹13,267.15"
    },
    {
      poNumber: "PO-2024-007", 
      vendorName: "Precision Parts",
      creationDate: "7/1/2024",
      status: "Sent to Vendor",
      totalAmount: "₹31,671.94"
    },
    {
      poNumber: "PO-2024-008",
      vendorName: "Advanced Tech",
      creationDate: "8/1/2024",
      status: "Fulfilled", 
      totalAmount: "₹33,366.91"
    }
  ];

  const filteredOrders = purchaseOrders.filter(order => {
    const matchesSearch = order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesVendor = vendorFilter === "all" || order.vendorName === vendorFilter;
    
    return matchesSearch && matchesStatus && matchesVendor;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Fulfilled":
        return <Badge className="bg-status-completed text-white">Fulfilled</Badge>;
      case "Pending Approval":
        return <Badge className="bg-status-progress text-white">Pending Approval</Badge>;
      case "Sent to Vendor": 
        return <Badge className="bg-primary text-white">Sent to Vendor</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Filter Purchase Orders</DialogTitle>
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
                      <SelectItem value="Pending Approval">Pending Approval</SelectItem>
                      <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="Sent to Vendor">Sent to Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Vendor</label>
                  <Select value={vendorFilter} onValueChange={setVendorFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Vendors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vendors</SelectItem>
                      <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                      <SelectItem value="Stellar Industries">Stellar Industries</SelectItem>
                      <SelectItem value="Global Supply Co">Global Supply Co</SelectItem>
                      <SelectItem value="Premier Materials">Premier Materials</SelectItem>
                      <SelectItem value="Elite Components">Elite Components</SelectItem>
                      <SelectItem value="Quantum Systems">Quantum Systems</SelectItem>
                      <SelectItem value="Precision Parts">Precision Parts</SelectItem>
                      <SelectItem value="Advanced Tech">Advanced Tech</SelectItem>
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
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Procurement & Purchase Orders</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Manage purchase orders and vendor relationships</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Create New Purchase Order
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search purchase orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>PO Number</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Creation Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{order.poNumber}</TableCell>
                    <TableCell>{order.vendorName}</TableCell>
                    <TableCell>{order.creationDate}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="font-medium">{order.totalAmount}</TableCell>
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

export default Procurement;