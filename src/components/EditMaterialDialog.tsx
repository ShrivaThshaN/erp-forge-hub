import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface EditMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material: any;
  onSave: (material: any) => void;
}

export function EditMaterialDialog({ open, onOpenChange, material, onSave }: EditMaterialDialogProps) {
  const [formData, setFormData] = useState({
    requiredQty: material.requiredQty,
    availableQty: material.availableQty,
    status: material.status,
    plannedDate: material.plannedDate,
    leadTime: material.leadTime,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.requiredQty <= 0 || formData.availableQty < 0) {
      toast({
        title: "Validation Error",
        description: "Please enter valid quantities",
        variant: "destructive",
      });
      return;
    }

    const shortfall = Math.max(0, formData.requiredQty - formData.availableQty);
    
    onSave({
      ...material,
      ...formData,
      shortfall,
    });
    
    toast({
      title: "Material Updated",
      description: `${material.materialName} has been updated successfully`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Material - {material.materialName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Material Code</Label>
            <Input value={material.materialCode} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Material Name</Label>
            <Input value={material.materialName} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Supplier</Label>
            <Input value={material.supplier} disabled />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Required Quantity</Label>
              <Input
                type="number"
                min="1"
                value={formData.requiredQty}
                onChange={(e) => setFormData({ ...formData, requiredQty: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Available Quantity</Label>
              <Input
                type="number"
                min="0"
                value={formData.availableQty}
                onChange={(e) => setFormData({ ...formData, availableQty: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lead Time</Label>
              <Input
                value={formData.leadTime}
                onChange={(e) => setFormData({ ...formData, leadTime: e.target.value })}
                placeholder="e.g., 5 days"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Ordered">Ordered</SelectItem>
                  <SelectItem value="Required">Required</SelectItem>
                  <SelectItem value="Shortage">Shortage</SelectItem>
                  <SelectItem value="Received">Received</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Planned Date</Label>
            <Input
              type="date"
              value={formData.plannedDate}
              onChange={(e) => setFormData({ ...formData, plannedDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              required
            />
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
