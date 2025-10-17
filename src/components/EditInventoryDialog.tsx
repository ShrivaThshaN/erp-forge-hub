import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { inventoryData } from "@/data/mockData";

interface EditInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: any;
  onSave: (item: any) => void;
}

export function EditInventoryDialog({ open, onOpenChange, item, onSave }: EditInventoryDialogProps) {
  const [formData, setFormData] = useState({
    currentStock: item.currentStock,
    minimumStock: item.minimumStock,
    maximumStock: item.maximumStock,
    location: item.location,
    unitPrice: item.unitPrice,
  });

  useEffect(() => {
    if (item) {
      setFormData({
        currentStock: item.currentStock,
        minimumStock: item.minimumStock,
        maximumStock: item.maximumStock,
        location: item.location,
        unitPrice: item.unitPrice,
      });
    }
  }, [item]);

  const getStatus = (current: number, minimum: number) => {
    if (current === 0) return "Out of Stock";
    if (current <= minimum) return "Low Stock";
    return "In Stock";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.currentStock < 0 || formData.minimumStock < 0 || formData.maximumStock < 0) {
      toast({
        title: "Validation Error",
        description: "Stock values cannot be negative",
        variant: "destructive",
      });
      return;
    }

    if (formData.minimumStock > formData.maximumStock) {
      toast({
        title: "Validation Error",
        description: "Minimum stock cannot exceed maximum stock",
        variant: "destructive",
      });
      return;
    }

    const status = getStatus(formData.currentStock, formData.minimumStock);
    
    // Update the actual mockData
    const inventoryItem = inventoryData.find(i => i.itemCode === item.itemCode);
    if (inventoryItem) {
      inventoryItem.currentStock = formData.currentStock;
      inventoryItem.minimumStock = formData.minimumStock;
      inventoryItem.maximumStock = formData.maximumStock;
      inventoryItem.location = formData.location;
      inventoryItem.unitPrice = formData.unitPrice;
      inventoryItem.status = status;
      inventoryItem.lastUpdated = new Date().toISOString().split('T')[0];
    }
    
    // Also call onSave for local state update
    onSave({
      ...item,
      ...formData,
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: "Item Updated",
      description: `${item.itemName} has been updated successfully`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Inventory Item - {item.itemName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Item Code</Label>
            <Input value={item.itemCode} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Item Name</Label>
            <Input value={item.itemName} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Category</Label>
            <Input value={item.category} disabled />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Current Stock</Label>
              <Input
                type="number"
                min="0"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Minimum Stock</Label>
              <Input
                type="number"
                min="0"
                value={formData.minimumStock}
                onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Maximum Stock</Label>
              <Input
                type="number"
                min="0"
                value={formData.maximumStock}
                onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Warehouse A-1"
                required
                maxLength={50}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Unit Price</Label>
              <Input
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: e.target.value })}
                placeholder="₹0.00"
                required
                maxLength={20}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
