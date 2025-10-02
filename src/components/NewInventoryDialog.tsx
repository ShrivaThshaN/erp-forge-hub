import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface NewInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (item: any) => void;
}

export function NewInventoryDialog({ open, onOpenChange, onAdd }: NewInventoryDialogProps) {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "Raw Materials",
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    location: "",
    unitPrice: "",
  });

  const getStatus = (current: number, minimum: number) => {
    if (current === 0) return "Out of Stock";
    if (current <= minimum) return "Low Stock";
    return "In Stock";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.itemName.trim() || !formData.location.trim() || !formData.unitPrice.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
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

    const itemCode = `INV-${Date.now().toString().slice(-4)}`;
    const status = getStatus(formData.currentStock, formData.minimumStock);
    
    onAdd({
      itemCode,
      ...formData,
      status,
      lastUpdated: new Date().toISOString().split('T')[0],
    });
    
    toast({
      title: "Item Added",
      description: `${formData.itemName} has been added to inventory`,
    });
    
    setFormData({
      itemName: "",
      category: "Raw Materials",
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      location: "",
      unitPrice: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Inventory Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Item Name *</Label>
            <Input
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              placeholder="Enter item name"
              required
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Raw Materials">Raw Materials</SelectItem>
                <SelectItem value="Fasteners">Fasteners</SelectItem>
                <SelectItem value="Sealing">Sealing</SelectItem>
                <SelectItem value="Components">Components</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Current Stock *</Label>
              <Input
                type="number"
                min="0"
                value={formData.currentStock || ""}
                onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Minimum Stock *</Label>
              <Input
                type="number"
                min="0"
                value={formData.minimumStock || ""}
                onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Maximum Stock *</Label>
              <Input
                type="number"
                min="0"
                value={formData.maximumStock || ""}
                onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Location *</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Warehouse A-1"
                required
                maxLength={50}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Unit Price *</Label>
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
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
