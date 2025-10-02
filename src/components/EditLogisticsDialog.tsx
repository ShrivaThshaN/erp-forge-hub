import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface EditLogisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shipment: any;
  onSave: (shipment: any) => void;
}

export function EditLogisticsDialog({ open, onOpenChange, shipment, onSave }: EditLogisticsDialogProps) {
  const [formData, setFormData] = useState({
    carrier: shipment.carrier,
    trackingNumber: shipment.trackingNumber,
    departureDate: shipment.departureDate,
    estimatedArrival: shipment.estimatedArrival,
    status: shipment.status,
    priority: shipment.priority,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.trackingNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Tracking number is required",
        variant: "destructive",
      });
      return;
    }

    if (new Date(formData.departureDate) > new Date(formData.estimatedArrival)) {
      toast({
        title: "Validation Error",
        description: "Estimated arrival cannot be before departure date",
        variant: "destructive",
      });
      return;
    }
    
    onSave({
      ...shipment,
      ...formData,
    });
    
    toast({
      title: "Shipment Updated",
      description: `Shipment ${shipment.shipmentId} has been updated successfully`,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Shipment - {shipment.shipmentId}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Shipment ID</Label>
            <Input value={shipment.shipmentId} disabled />
          </div>
          
          <div className="space-y-2">
            <Label>Order Number</Label>
            <Input value={shipment.orderNumber} disabled />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Origin</Label>
              <Input value={shipment.origin} disabled />
            </div>
            
            <div className="space-y-2">
              <Label>Destination</Label>
              <Input value={shipment.destination} disabled />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Carrier</Label>
            <Input
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              placeholder="Enter carrier name"
              required
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tracking Number</Label>
            <Input
              value={formData.trackingNumber}
              onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
              placeholder="Enter tracking number"
              required
              maxLength={50}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departure Date</Label>
              <Input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Arrival</Label>
              <Input
                type="date"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
                min={formData.departureDate}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preparing">Preparing</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
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
