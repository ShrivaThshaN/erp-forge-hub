import { useState } from "react";
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

interface NewPurchaseOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderAdded: () => void;
}

export const NewPurchaseOrderDialog = ({ open, onOpenChange, onOrderAdded }: NewPurchaseOrderDialogProps) => {
  const generatePONumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `PO-2025-${timestamp}${random}`;
  };

  const [vendor, setVendor] = useState("");
  const [material, setMaterial] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [poNumber] = useState(generatePONumber());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSubmit = () => {
    if (!vendor || !material || !quantity || !unitPrice || !deliveryDate) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Purchase order created successfully",
    });

    setVendor("");
    setMaterial("");
    setQuantity("");
    setUnitPrice("");
    setDeliveryDate(undefined);
    
    onOrderAdded();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Purchase Order</DialogTitle>
          <DialogDescription>
            Add a new purchase order to the system
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="poNumber">PO Number</Label>
            <Input
              id="poNumber"
              value={poNumber}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Auto-generated</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vendor">Vendor</Label>
            <Select value={vendor} onValueChange={setVendor}>
              <SelectTrigger>
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Acme Steel Corp">Acme Steel Corp</SelectItem>
                <SelectItem value="Global Materials Ltd">Global Materials Ltd</SelectItem>
                <SelectItem value="Premium Supplies Inc">Premium Supplies Inc</SelectItem>
                <SelectItem value="Industrial Components Co">Industrial Components Co</SelectItem>
                <SelectItem value="Metal Works International">Metal Works International</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="material">Material</Label>
            <Input
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="Enter material name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="unitPrice">Unit Price (₹)</Label>
            <Input
              id="unitPrice"
              type="number"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              placeholder="Enter unit price"
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
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
