import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface PurchaseOrder {
  id: string;
  vendor: string;
  material: string;
  quantity: number;
  unitPrice: number;
  deliveryDate: string;
  status: string;
}

interface EditPurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: PurchaseOrder | null;
  onOrderUpdated: () => void;
}

export const EditPurchaseOrderDialog = ({ open, onOpenChange, order, onOrderUpdated }: EditPurchaseOrderDialogProps) => {
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [status, setStatus] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (order) {
      setQuantity(order.quantity.toString());
      setUnitPrice(order.unitPrice.toString());
      setDeliveryDate(new Date(order.deliveryDate));
      setStatus(order.status);
    }
  }, [order]);

  const handleSubmit = () => {
    if (!quantity || !unitPrice || !deliveryDate || !status) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Purchase order updated successfully",
    });

    onOrderUpdated();
    onOpenChange(false);
  };

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Purchase Order</DialogTitle>
          <DialogDescription>
            Update the purchase order details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label className="text-muted-foreground">PO Number</Label>
            <div className="text-sm font-medium">{order.id}</div>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Vendor</Label>
            <div className="text-sm">{order.vendor}</div>
          </div>
          <div className="space-y-2">
            <Label className="text-muted-foreground">Material</Label>
            <div className="text-sm">{order.material}</div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitPrice">Unit Price (₹)</Label>
            <Input
              id="unitPrice"
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryDate">Expected Delivery Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !deliveryDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={deliveryDate}
                  onSelect={setDeliveryDate}
                  disabled={(date) => date < today}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Ordered">Ordered</SelectItem>
                <SelectItem value="Received">Received</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Update Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
