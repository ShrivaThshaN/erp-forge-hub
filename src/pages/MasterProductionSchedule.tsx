import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download, Search, Calendar, Clock, CheckCircle, Edit, Trash2, AlertTriangle } from "lucide-react";
import { PaginationComponent } from "@/components/Pagination";
import { productionScheduleData, getProductionStats } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { NewScheduleDialog } from "@/components/NewScheduleDialog";
import { EditScheduleDialog } from "@/components/EditScheduleDialog";
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

const MasterProductionSchedule = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);
  const itemsPerPage = 10;

  const stats = getProductionStats();

  const filteredData = productionScheduleData.filter(item => {
    const matchesSearch = item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.scheduleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  
  // Calculate stats from actual data
  const totalSchedules = productionScheduleData.length;
  const inProgress = productionScheduleData.filter(item => item.status === "In Progress").length;
  const completed = productionScheduleData.filter(item => item.status === "Completed").length;
  const delayed = productionScheduleData.filter(item => item.status === "Delayed").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-status-completed text-white">Completed</Badge>;
      case "In Progress":
        return <Badge className="bg-status-progress text-white">In Progress</Badge>;
      case "Scheduled":
        return <Badge className="bg-status-pending text-white">Scheduled</Badge>;
      case "Delayed":
        return <Badge className="bg-status-delayed text-white">Delayed</Badge>;
      case "On Hold":
        return <Badge variant="secondary">On Hold</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleEdit = (schedule: any) => {
    setSelectedSchedule(schedule);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (scheduleId: string) => {
    setScheduleToDelete(scheduleId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      // Delete from mockData
      const index = productionScheduleData.findIndex(s => s.scheduleId === scheduleToDelete);
      if (index !== -1) {
        productionScheduleData.splice(index, 1);
      }
      toast({
        title: "Success",
        description: "Production schedule deleted successfully",
      });
      setRefreshKey(prev => prev + 1);
      setIsDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Master Production Schedule</h1>
          <p className="text-muted-foreground">Plan and track production schedules for all orders</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            const headers = ["Schedule ID", "Order Number", "Product Name", "Planned Start", "Planned End", "Actual Start", "Actual End", "Status", "Progress"];
            const csvContent = [
              headers.join(","),
              ...filteredData.map(item => [
                item.scheduleId,
                item.orderNumber,
                item.productName,
                item.plannedStartDate,
                item.plannedEndDate,
                item.actualStartDate || "N/A",
                item.actualEndDate || "N/A",
                item.status,
                item.progress
              ].join(","))
            ].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "production-schedule.csv";
            a.click();
            window.URL.revokeObjectURL(url);
          }}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Schedule
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Production Schedule Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Monitor and manage production timelines</p>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stats.totalSchedules}</div>
                    <div className="text-sm text-muted-foreground">Total Schedules</div>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-erp-success">{stats.completed}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <CheckCircle className="h-8 w-8 text-erp-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-status-progress">{stats.inProgress}</div>
                    <div className="text-sm text-muted-foreground">In Progress</div>
                  </div>
                  <Clock className="h-8 w-8 text-status-progress" />
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
                  <AlertTriangle className="h-8 w-8 text-erp-danger" />
                </div>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold mb-4">Production Schedule</h3>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search schedules..."
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
                  <TableHead>Schedule ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Planned Start</TableHead>
                  <TableHead>Planned End</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Workstation</TableHead>
                  <TableHead>Supervisor</TableHead>
                  <TableHead>Status</TableHead>
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.scheduleId}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="font-medium text-status-progress">{item.orderNumber}</TableCell>
                    <TableCell>{formatDate(item.plannedStartDate)}</TableCell>
                    <TableCell>{formatDate(item.plannedEndDate)}</TableCell>
                    <TableCell>
                      <Badge variant={item.priority === "High" ? "destructive" : item.priority === "Medium" ? "default" : "secondary"}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.workstation}</TableCell>
                    <TableCell>{item.supervisor}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(item.scheduleId)}>
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

      <NewScheduleDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onScheduleAdded={() => setRefreshKey(prev => prev + 1)}
      />

      <EditScheduleDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        schedule={selectedSchedule}
        onScheduleUpdated={() => setRefreshKey(prev => prev + 1)}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the production schedule.
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

export default MasterProductionSchedule;