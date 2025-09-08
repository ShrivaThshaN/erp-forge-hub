import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Download, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";

const Quality = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const qualityData = [
    {
      inspectionId: "QC-2024-001",
      productName: "Widget A v3",
      batchNumber: "BA-001",
      inspectionDate: "2024-01-15",
      inspector: "John Smith",
      testType: "Dimensional Check",
      result: "Pass",
      defectCount: 0,
      notes: "All measurements within tolerance"
    },
    {
      inspectionId: "QC-2024-002",
      productName: "Gadget B v3", 
      batchNumber: "BB-002",
      inspectionDate: "2024-01-16",
      inspector: "Sarah Johnson",
      testType: "Functional Test",
      result: "Fail",
      defectCount: 3,
      notes: "Motor performance below specification"
    },
    {
      inspectionId: "QC-2024-003",
      productName: "Component C v3",
      batchNumber: "BC-003",
      inspectionDate: "2024-01-17",
      inspector: "Mike Wilson",
      testType: "Material Analysis",
      result: "Pass",
      defectCount: 0,
      notes: "Material composition verified"
    },
    {
      inspectionId: "QC-2024-004",
      productName: "Assembly D v3",
      batchNumber: "BD-004", 
      inspectionDate: "2024-01-18",
      inspector: "Emily Davis",
      testType: "Assembly Check",
      result: "Pending",
      defectCount: 0,
      notes: "Inspection in progress"
    },
    {
      inspectionId: "QC-2024-005",
      productName: "Module E v3",
      batchNumber: "BE-005",
      inspectionDate: "2024-01-19",
      inspector: "Robert Brown",
      testType: "Stress Test",
      result: "Warning", 
      defectCount: 1,
      notes: "Minor surface defect detected"
    }
  ];

  const filteredData = qualityData.filter(item => 
    item.inspectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.inspector.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Inspection
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">245</div>
                <div className="text-sm text-muted-foreground">Total Inspections</div>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-erp-success">210</div>
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
                <div className="text-2xl font-bold text-erp-danger">18</div>
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
                <div className="text-2xl font-bold">96.2%</div>
                <div className="text-sm text-muted-foreground">Pass Rate</div>
              </div>
              <AlertTriangle className="h-8 w-8 text-erp-success" />
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
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
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

export default Quality;