import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface NewLogisticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (shipment: any) => void;
}

export function NewLogisticsDialog({ open, onOpenChange, onAdd }: NewLogisticsDialogProps) {
  const [formData, setFormData] = useState({
    orderNumber: "",
    carrier: "",
    trackingNumber: "",
    origin: "",
    destination: "",
    departureDate: "",
    estimatedArrival: "",
    status: "Preparing",
    priority: "Medium",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orderNumber.trim() || !formData.carrier.trim() || !formData.trackingNumber.trim() ||
        !formData.origin.trim() || !formData.destination.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
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

    const shipmentId = `SH-2025-${Date.now().toString().slice(-3)}`;
    
    onAdd({
      shipmentId,
      ...formData,
    });
    
    toast({
      title: "Shipment Created",
      description: `Shipment ${shipmentId} has been created successfully`,
    });
    
    setFormData({
      orderNumber: "",
      carrier: "",
      trackingNumber: "",
      origin: "",
      destination: "",
      departureDate: "",
      estimatedArrival: "",
      status: "Preparing",
      priority: "Medium",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Order Number *</Label>
            <Input
              value={formData.orderNumber}
              onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
              placeholder="e.g., CO-2025-001"
              required
              maxLength={50}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Origin *</Label>
              <Input
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                placeholder="Warehouse A"
                required
                maxLength={100}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Destination *</Label>
              <Input
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                placeholder="New York, NY"
                required
                maxLength={100}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Carrier *</Label>
            <Input
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              placeholder="FedEx Express"
              required
              maxLength={100}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tracking Number *</Label>
            <Input
              value={formData.trackingNumber}
              onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
              placeholder="1234567890"
              required
              maxLength={50}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Departure Date *</Label>
              <Input
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Estimated Arrival *</Label>
              <Input
                type="date"
                value={formData.estimatedArrival}
                onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status *</Label>
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
              <Label>Priority *</Label>
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
            <Button type="submit">Create Shipment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
