import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface EditQualityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inspection: any;
  onSave: (inspection: any) => void;
}

export function EditQualityDialog({ open, onOpenChange, inspection, onSave }: EditQualityDialogProps) {
  const [formData, setFormData] = useState({
    inspectionDate: inspection.inspectionDate,
    inspector: inspection.inspector,
    testType: inspection.testType,
    result: inspection.result,
    defectCount: inspection.defectCount,
    notes: inspection.notes,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.defectCount < 0) {
      toast({
        title: "Validation Error",
        description: "Defect count cannot be negative",
        variant: "destructive",
      });
      return;
    }
    
    onSave({
      ...inspection,
      ...formData,
    });
    
    toast({
      title: "Inspection Updated",
      description: `Inspection ${inspection.inspectionId} has been updated successfully`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Inspection - {inspection.inspectionId}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Inspection ID</Label>
            <Input value={inspection.inspectionId} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Product Name</Label>
            <Input value={inspection.productName} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Batch Number</Label>
            <Input value={inspection.batchNumber} disabled />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Inspection Date</Label>
              <Input
                type="date"
                value={formData.inspectionDate}
                onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                max={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Inspector</Label>
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
            <Label>Test Type</Label>
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
              <Label>Result</Label>
              <Select value={formData.result} onValueChange={(value) => setFormData({ ...formData, result: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pass">Pass</SelectItem>
                  <SelectItem value="Fail">Fail</SelectItem>
                  <SelectItem value="Warning">Warning</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Defect Count</Label>
              <Input
                type="number"
                min="0"
                value={formData.defectCount}
                onChange={(e) => setFormData({ ...formData, defectCount: parseInt(e.target.value) || 0 })}
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
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
