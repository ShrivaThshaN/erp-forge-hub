import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search } from "lucide-react";

const MasterProductionSchedule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    productName: "",
    quantity: "",
    dueDate: "",
    status: "Scheduled"
  });

  const scheduleData = [
    {
      productName: "Widget A v3",
      workOrderId: "WO-2024-001", 
      quantity: 120,
      dueDate: "2024-01-31T18:30:00.000Z",
      status: "Completed"
    },
    {
      productName: "Gadget B v3",
      workOrderId: "WO-2024-002",
      quantity: 200, 
      dueDate: "2024-02-01T18:30:00.000Z",
      status: "In Progress"
    },
    {
      productName: "Component C v3", 
      workOrderId: "WO-2024-003",
      quantity: 150,
      dueDate: "2024-02-02T18:30:00.000Z", 
      status: "Scheduled"
    },
    {
      productName: "Assembly D v3",
      workOrderId: "WO-2024-004",
      quantity: 180,
      dueDate: "2024-02-03T18:30:00.000Z",
      status: "Delayed" 
    },
    {
      productName: "Module E v3",
      workOrderId: "WO-2024-005", 
      quantity: 90,
      dueDate: "2024-02-04T18:30:00.000Z",
      status: "In Progress"
    }
  ];

  const filteredData = scheduleData.filter(item => 
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.workOrderId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-status-completed text-white">Completed</Badge>;
      case "In Progress":  
        return <Badge className="bg-status-progress text-white">In Progress</Badge>;
      case "Scheduled":
        return <Badge className="bg-status-scheduled text-white">Scheduled</Badge>;
      case "Delayed":
        return <Badge className="bg-status-delayed text-white">Delayed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleAddSchedule = () => {
    if (newSchedule.productName && newSchedule.quantity && newSchedule.dueDate) {
      // Add logic to save schedule
      console.log("Adding new schedule:", newSchedule);
      setIsAddDialogOpen(false);
      setNewSchedule({
        productName: "",
        quantity: "",
        dueDate: "",
        status: "Scheduled"
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Master Production Schedule</h1>
          <p className="text-muted-foreground">Plan and manage production schedules and work orders</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Master Production Schedule (MPS)</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Schedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Production Schedule</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="productName" className="text-right">
                      Product Name
                    </Label>
                    <Input
                      id="productName"
                      value={newSchedule.productName}
                      onChange={(e) => setNewSchedule({ ...newSchedule, productName: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newSchedule.quantity}
                      onChange={(e) => setNewSchedule({ ...newSchedule, quantity: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="dueDate" className="text-right">
                      Due Date
                    </Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={newSchedule.dueDate}
                      onChange={(e) => setNewSchedule({ ...newSchedule, dueDate: e.target.value })}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select value={newSchedule.status} onValueChange={(value) => setNewSchedule({ ...newSchedule, status: value })}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Delayed">Delayed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSchedule} className="bg-primary hover:bg-primary/90">
                    Add Schedule
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-sm text-muted-foreground">Plan and manage production schedules and work orders</p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by product or work order..."
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
                  <TableHead>Product Name</TableHead>
                  <TableHead>Work Order ID</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.productName}</TableCell>
                    <TableCell>{item.workOrderId}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatDate(item.dueDate)}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-5 of 35 entries
            </p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">Previous</Button>
              <Button variant="outline" size="sm" className="bg-primary text-white">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">4</Button>
              <Button variant="outline" size="sm">5</Button>
              <Button variant="outline" size="sm">6</Button>
              <Button variant="outline" size="sm">7</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterProductionSchedule;