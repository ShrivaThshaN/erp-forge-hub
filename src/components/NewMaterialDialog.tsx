import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface NewMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (material: any) => void;
}

export function NewMaterialDialog({ open, onOpenChange, onAdd }: NewMaterialDialogProps) {
  const [formData, setFormData] = useState({
    materialName: "",
    supplier: "",
    requiredQty: 0,
    availableQty: 0,
    leadTime: "",
    status: "Required",
    plannedDate: "",
    relatedOrder: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.materialName.trim() || !formData.supplier.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.requiredQty <= 0 || formData.availableQty < 0) {
      toast({
        title: "Validation Error",
        description: "Please enter valid quantities",
        variant: "destructive",
      });
      return;
    }

    const materialCode = `MAT-${Date.now().toString().slice(-6)}`;
    const shortfall = Math.max(0, formData.requiredQty - formData.availableQty);
    
    onAdd({
      materialCode,
      ...formData,
      shortfall,
    });
    
    toast({
      title: "Material Added",
      description: `${formData.materialName} has been added successfully`,
    });
    
    setFormData({
      materialName: "",
      supplier: "",
      requiredQty: 0,
      availableQty: 0,
      leadTime: "",
      status: "Required",
      plannedDate: "",
      relatedOrder: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Material Requirement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Material Name *</Label>
            <Input
              value={formData.materialName}
              onChange={(e) => setFormData({ ...formData, materialName: e.target.value })}
              placeholder="Enter material name"
              required
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Supplier *</Label>
            <Input
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              placeholder="Enter supplier name"
              required
              maxLength={100}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Required Quantity *</Label>
              <Input
                type="number"
                min="1"
                value={formData.requiredQty || ""}
                onChange={(e) => setFormData({ ...formData, requiredQty: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Available Quantity *</Label>
              <Input
                type="number"
                min="0"
                value={formData.availableQty || ""}
                onChange={(e) => setFormData({ ...formData, availableQty: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lead Time *</Label>
              <Input
                value={formData.leadTime}
                onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                placeholder="e.g., 5 days"
                required
                maxLength={50}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Shortage">Shortage</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Planned Date *</Label>
              <Input
                type="date"
                value={formData.plannedDate}
                onChange={(e) => setFormData({ ...formData, plannedDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Related Order</Label>
              <Input
                value={formData.relatedOrder}
                onChange={(e) => setFormData({ ...formData, relatedOrder: e.target.value })}
                placeholder="e.g., CO-2025-001"
                maxLength={50}
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Material</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
