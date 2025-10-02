import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface NewQualityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (inspection: any) => void;
}

export function NewQualityDialog({ open, onOpenChange, onAdd }: NewQualityDialogProps) {
  const [formData, setFormData] = useState({
    productName: "",
    batchNumber: "",
    inspectionDate: new Date().toISOString().split('T')[0],
    inspector: "",
    testType: "Dimensional Check",
    result: "Pending",
    defectCount: 0,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productName.trim() || !formData.batchNumber.trim() || !formData.inspector.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.defectCount < 0) {
      toast({
        title: "Validation Error",
        description: "Defect count cannot be negative",
        variant: "destructive",
      });
      return;
    }

    const inspectionId = `QC-2025-${Date.now().toString().slice(-3)}`;
    
    onAdd({
      inspectionId,
      ...formData,
    });
    
    toast({
      title: "Inspection Created",
      description: `Inspection ${inspectionId} has been created successfully`,
    });
    
    setFormData({
      productName: "",
      batchNumber: "",
      inspectionDate: new Date().toISOString().split('T')[0],
      inspector: "",
      testType: "Dimensional Check",
      result: "Pending",
      defectCount: 0,
      notes: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Quality Inspection</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Product Name *</Label>
            <Input
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="Enter product name"
              required
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Batch Number *</Label>
            <Input
              value={formData.batchNumber}
              onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              placeholder="e.g., BA-001"
              required
              maxLength={50}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Inspection Date *</Label>
              <Input
                type="date"
                value={formData.inspectionDate}
                onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Inspector *</Label>
              <Input
                value={formData.inspector}
                onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
                placeholder="Inspector name"
                required
                maxLength={100}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Test Type *</Label>
            <Select value={formData.testType} onValueChange={(value) => setFormData({ ...formData, testType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dimensional Check">Dimensional Check</SelectItem>
                <SelectItem value="Functional Test">Functional Test</SelectItem>
                <SelectItem value="Material Analysis">Material Analysis</SelectItem>
                <SelectItem value="Assembly Check">Assembly Check</SelectItem>
                <SelectItem value="Stress Test">Stress Test</SelectItem>
                <SelectItem value="Electrical Test">Electrical Test</SelectItem>
                <SelectItem value="Pressure Test">Pressure Test</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Result *</Label>
              <Select value={formData.result} onValueChange={(value) => setFormData({ ...formData, result: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Defect Count *</Label>
              <Input
                type="number"
                min="0"
                value={formData.defectCount || ""}
                onChange={(e) => setFormData({ ...formData, defectCount: parseInt(e.target.value) || 0 })}
                placeholder="0"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter inspection notes"
              rows={3}
              maxLength={500}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Inspection</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
