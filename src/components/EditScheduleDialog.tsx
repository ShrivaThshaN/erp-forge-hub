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
import { processProductionCompletion, checkInventoryAvailability } from "@/lib/materialInventorySync";
import { productionScheduleData } from "@/data/mockData";

interface Schedule {
  scheduleId: string;
  productName: string;
  orderNumber: string;
  plannedStartDate: string;
  plannedEndDate: string;
  priority: string;
  workstation: string;
  supervisor: string;
  status: string;
}

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onScheduleUpdated: () => void;
}

export const EditScheduleDialog = ({ open, onOpenChange, schedule, onScheduleUpdated }: EditScheduleDialogProps) => {
  const [orderNumber, setOrderNumber] = useState("");
  const [plannedStartDate, setPlannedStartDate] = useState<Date>();
  const [plannedEndDate, setPlannedEndDate] = useState<Date>();
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [previousStatus, setPreviousStatus] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (schedule) {
      setOrderNumber(schedule.orderNumber);
      setPlannedStartDate(new Date(schedule.plannedStartDate));
      setPlannedEndDate(new Date(schedule.plannedEndDate));
      setPriority(schedule.priority);
      setStatus(schedule.status);
      setPreviousStatus(schedule.status);
    }
  }, [schedule]);

  const handleSubmit = () => {
    if (!orderNumber || !plannedStartDate || !plannedEndDate || !priority || !status) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (plannedEndDate < plannedStartDate) {
      toast({
        title: "Error",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    // Check if status changed to "Completed"
    if (status === "Completed" && previousStatus !== "Completed") {
      const productName = schedule?.productName || "";
      const orderNum = schedule?.orderNumber || "";
      
      // Check if materials are available
      const availability = checkInventoryAvailability(productName);
      if (!availability.available) {
        const missingItems = availability.missing.map(m => 
          `${m.itemName} (need ${m.required}, have ${m.available})`
        ).join(", ");
        
        toast({
          title: "Cannot Complete Production",
          description: `Insufficient materials: ${missingItems}`,
          variant: "destructive",
        });
        return;
      }
      
      const result = processProductionCompletion(productName, orderNum);
      
      if (!result.success) {
        toast({
          title: "Cannot Complete Production",
          description: `Material processing failed: ${result.errors.join(", ")}`,
          variant: "destructive",
        });
        return;
      }
      
      // Update the actual schedule data in mockData
      const scheduleItem = productionScheduleData.find(s => s.scheduleId === schedule.scheduleId);
      if (scheduleItem) {
        scheduleItem.plannedStartDate = plannedStartDate.toISOString().split('T')[0];
        scheduleItem.plannedEndDate = plannedEndDate.toISOString().split('T')[0];
        scheduleItem.priority = priority;
        scheduleItem.status = status;
      }
      
      const materialsUsed = result.updates.map(u => `${u.itemName} (${u.quantityUsed} units)`).join(", ");
      toast({
        title: "Production Completed",
        description: `Schedule updated. Materials used: ${materialsUsed}. Inventory has been updated.`,
      });
    } else {
      // Update schedule data for non-completed status changes
      const scheduleItem = productionScheduleData.find(s => s.scheduleId === schedule.scheduleId);
      if (scheduleItem) {
        scheduleItem.plannedStartDate = plannedStartDate.toISOString().split('T')[0];
        scheduleItem.plannedEndDate = plannedEndDate.toISOString().split('T')[0];
        scheduleItem.priority = priority;
        scheduleItem.status = status;
      }
      
      toast({
        title: "Success",
        description: "Production schedule updated successfully",
      });
    }

    onScheduleUpdated();
    onOpenChange(false);
  };

  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Production Schedule</DialogTitle>
          <DialogDescription>
            Update the production schedule details
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">
              Product
            </Label>
            <div className="col-span-3 text-sm">{schedule.productName}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">
              Workstation
            </Label>
            <div className="col-span-3 text-sm">{schedule.workstation}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-muted-foreground">
              Supervisor
            </Label>
            <div className="col-span-3 text-sm">{schedule.supervisor}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="order" className="text-right">
              Order Number
            </Label>
            <div className="col-span-3">
              <Input
                id="order"
                value={orderNumber}
                disabled
                className="bg-muted"
              />
              <p className="text-xs text-muted-foreground mt-1">Cannot be changed</p>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startDate" className="text-right">
              Start Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !plannedStartDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {plannedStartDate ? format(plannedStartDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={plannedStartDate}
                  onSelect={setPlannedStartDate}
                  disabled={(date) => date < today}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endDate" className="text-right">
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "col-span-3 justify-start text-left font-normal",
                    !plannedEndDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {plannedEndDate ? format(plannedEndDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={plannedEndDate}
                  onSelect={setPlannedEndDate}
                  disabled={(date) => {
                    if (plannedStartDate && date < plannedStartDate) return true;
                    return false;
                  }}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Delayed">Delayed</SelectItem>
                <SelectItem value="On Hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Update Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
