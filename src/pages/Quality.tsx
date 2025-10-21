import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Download, CheckCircle, XCircle, AlertTriangle, Clock, Edit, Trash2, ClipboardCheck } from "lucide-react";
import { PaginationComponent } from "@/components/Pagination";
import { qualityControlData as initialQualityData, getQualityStats } from "@/data/mockData";
import { useUser } from "@/contexts/UserContext";
import { toast } from "@/hooks/use-toast";
import { EditQualityDialog } from "@/components/EditQualityDialog";
import { NewQualityDialog } from "@/components/NewQualityDialog";
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

const Quality = () => {
  const { user } = useUser();
  const [qualityData, setQualityData] = useState(initialQualityData);
  const [searchTerm, setSearchTerm] = useState("");
  const [resultFilter, setResultFilter] = useState("all");
  const [testTypeFilter, setTestTypeFilter] = useState("all");
  const [inspectorFilter, setInspectorFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingInspection, setEditingInspection] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [inspectionToDelete, setInspectionToDelete] = useState<any>(null);

  const stats = getQualityStats();

  const handleEditInspection = (inspection: any) => {
    setEditingInspection(inspection);
    setIsEditDialogOpen(true);
  };

  const handleSaveInspection = (updatedInspection: any) => {
    // Update mockData
    const index = initialQualityData.findIndex(item => item.inspectionId === updatedInspection.inspectionId);
    if (index !== -1) {
      initialQualityData[index] = updatedInspection;
    }
    // Update local state
    setQualityData([...initialQualityData]);
  };

  const handleAddInspection = (newInspection: any) => {
    // Add to mockData
    initialQualityData.push(newInspection);
    // Update local state
    setQualityData([...initialQualityData]);
  };

  const handleDeleteClick = (inspection: any) => {
    setInspectionToDelete(inspection);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (inspectionToDelete) {
      // Delete from mockData
      const index = initialQualityData.findIndex(item => item.inspectionId === inspectionToDelete.inspectionId);
      if (index !== -1) {
        initialQualityData.splice(index, 1);
      }
      // Update local state
      setQualityData([...initialQualityData]);
      toast({
        title: "Inspection Deleted",
        description: `Inspection ${inspectionToDelete.inspectionId} has been removed`,
        variant: "destructive",
      });
      setInspectionToDelete(null);
    }
    setDeleteConfirmOpen(false);
  };

  const filteredData = qualityData.filter(item => {
    const matchesSearch = item.inspectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesResult = resultFilter === "all" || item.result === resultFilter;
    const matchesTestType = testTypeFilter === "all" || item.testType === testTypeFilter;
    const matchesInspector = inspectorFilter === "all" || item.inspector === inspectorFilter;
    
    return matchesSearch && matchesResult && matchesTestType && matchesInspector;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getResultBadge = (result: string) => {
    switch (result) {
      case "Pass":
        return <Badge className="bg-status-completed text-white">Pass</Badge>;
      case "Fail":
        return <Badge className="bg-status-delayed text-white">Fail</Badge>;
      case "Warning":
        return <Badge className="bg-status-progress text-white">Warning</Badge>;
      case "Pending":
        return <Badge className="bg-status-pending text-white">Pending</Badge>;
      default:
        return <Badge variant="secondary">{result}</Badge>;
    }
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "Pass":
        return <CheckCircle className="h-4 w-4 text-erp-success" />;
      case "Fail":
        return <XCircle className="h-4 w-4 text-erp-danger" />;
      case "Warning":
        return <AlertTriangle className="h-4 w-4 text-erp-warning" />;
      case "Pending":
        return <Clock className="h-4 w-4 text-erp-info" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quality Control</h1>
          <p className="text-muted-foreground">Manage quality inspections, testing, and compliance</p>
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
                <DialogTitle>Filter Inspections</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Result</label>
                  <Select value={resultFilter} onValueChange={setResultFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Results" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Results</SelectItem>
                      <SelectItem value="Pass">Pass</SelectItem>
                      <SelectItem value="Fail">Fail</SelectItem>
                      <SelectItem value="Warning">Warning</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Test Type</label>
                  <Select value={testTypeFilter} onValueChange={setTestTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Test Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Test Types</SelectItem>
                      <SelectItem value="Dimensional Check">Dimensional Check</SelectItem>
                      <SelectItem value="Functional Test">Functional Test</SelectItem>
                      <SelectItem value="Material Analysis">Material Analysis</SelectItem>
                      <SelectItem value="Assembly Check">Assembly Check</SelectItem>
                      <SelectItem value="Stress Test">Stress Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Inspector</label>
                  <Select value={inspectorFilter} onValueChange={setInspectorFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Inspectors" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Inspectors</SelectItem>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="Mike Wilson">Mike Wilson</SelectItem>
                      <SelectItem value="Emily Davis">Emily Davis</SelectItem>
                      <SelectItem value="Robert Brown">Robert Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={() => {
            const headers = ["Inspection ID", "Product Name", "Batch Number", "Inspection Date", "Inspector", "Test Type", "Defects", "Result", "Notes"];
            const csvContent = [
              headers.join(","),
              ...filteredData.map(item => [
                item.inspectionId,
                item.productName,
                item.batchNumber,
                item.inspectionDate,
                item.inspector,
                item.testType,
                item.defectCount,
                item.result,
                `"${item.notes}"`
              ].join(","))
            ].join("\n");
            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "quality-inspections.csv";
            a.click();
            window.URL.revokeObjectURL(url);
          }}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          {user.role === 'admin' && (
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setIsNewDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Inspection
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
                <div className="text-2xl font-bold">{stats.totalInspections}</div>
                <div className="text-sm text-muted-foreground">Total Inspections</div>
              </div>
              <ClipboardCheck className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-success">{stats.passed}</div>
                <div className="text-sm text-muted-foreground">Passed</div>
              </div>
              <CheckCircle className="h-8 w-8 text-erp-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-danger">{stats.failed}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <XCircle className="h-8 w-8 text-erp-danger" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-warning">{stats.pending}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <Clock className="h-8 w-8 text-erp-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quality Inspections</CardTitle>
          <p className="text-sm text-muted-foreground">Track quality control inspections and test results</p>
        </CardHeader>
        <CardContent>
          {/* Search Bar */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search inspections..."
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
                  <TableHead>Inspection ID</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Batch Number</TableHead>
                  <TableHead>Inspection Date</TableHead>
                  <TableHead>Inspector</TableHead>
                  <TableHead>Test Type</TableHead>
                  <TableHead>Defects</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead>Notes</TableHead>
                  {user.role === 'admin' && <TableHead>Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.inspectionId}</TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="font-mono text-sm">{item.batchNumber}</TableCell>
                    <TableCell>{item.inspectionDate}</TableCell>
                    <TableCell>{item.inspector}</TableCell>
                    <TableCell>{item.testType}</TableCell>
                    <TableCell className={`font-medium ${item.defectCount > 0 ? 'text-erp-danger' : 'text-erp-success'}`}>
                      {item.defectCount}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getResultIcon(item.result)}
                        {getResultBadge(item.result)}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate" title={item.notes}>
                      {item.notes}
                    </TableCell>
                    {user.role === 'admin' && (
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleEditInspection(item)}
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

      {editingInspection && (
        <EditQualityDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          inspection={editingInspection}
          onSave={handleSaveInspection}
        />
      )}

      <NewQualityDialog
        open={isNewDialogOpen}
        onOpenChange={setIsNewDialogOpen}
        onAdd={handleAddInspection}
      />

      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete inspection {inspectionToDelete?.inspectionId}. This action cannot be undone.
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

export default Quality;