import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus } from "lucide-react";

const Procurement = () => {
  const purchaseOrders = [
    {
      poNumber: "PO-2024-001",
      vendorName: "Acme Corp",
      creationDate: "1/1/2024",
      status: "Pending Approval",
      totalAmount: "$29,698.49"
    },
    {
      poNumber: "PO-2024-002", 
      vendorName: "Stellar Industries",
      creationDate: "2/1/2024",
      status: "Fulfilled",
      totalAmount: "$39,985.57"
    },
    {
      poNumber: "PO-2024-003",
      vendorName: "Global Supply Co", 
      creationDate: "3/1/2024",
      status: "Sent to Vendor",
      totalAmount: "$34,705.62"
    },
    {
      poNumber: "PO-2024-004",
      vendorName: "Premier Materials",
      creationDate: "4/1/2024", 
      status: "Fulfilled",
      totalAmount: "$29,918.52"
    },
    {
      poNumber: "PO-2024-005",
      vendorName: "Elite Components",
      creationDate: "5/1/2024",
      status: "Sent to Vendor", 
      totalAmount: "$30,532.26"
    },
    {
      poNumber: "PO-2024-006",
      vendorName: "Quantum Systems",
      creationDate: "6/1/2024",
      status: "Fulfilled",
      totalAmount: "$13,267.15"
    },
    {
      poNumber: "PO-2024-007", 
      vendorName: "Precision Parts",
      creationDate: "7/1/2024",
      status: "Sent to Vendor",
      totalAmount: "$31,671.94"
    },
    {
      poNumber: "PO-2024-008",
      vendorName: "Advanced Tech",
      creationDate: "8/1/2024",
      status: "Fulfilled", 
      totalAmount: "$33,366.91"
    }
  ];

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
          <h3 className="text-lg font-semibold mb-4">Purchase Orders</h3>

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
                {purchaseOrders.map((order, index) => (
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