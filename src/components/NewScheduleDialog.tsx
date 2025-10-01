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

interface NewScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onScheduleAdded: () => void;
}

export const NewScheduleDialog = ({ open, onOpenChange, onScheduleAdded }: NewScheduleDialogProps) => {
  const [productName, setProductName] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [plannedStartDate, setPlannedStartDate] = useState<Date>();
  const [plannedEndDate, setPlannedEndDate] = useState<Date>();
  const [priority, setPriority] = useState("");
  const [workstation, setWorkstation] = useState("");
  const [supervisor, setSupervisor] = useState("");

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleSubmit = () => {
    if (!productName || !orderNumber || !plannedStartDate || !plannedEndDate || !priority || !workstation || !supervisor) {
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

    // Here you would normally add the schedule to your data
    toast({
      title: "Success",
      description: "Production schedule created successfully",
    });

    // Reset form
    setProductName("");
    setOrderNumber("");
    setPlannedStartDate(undefined);
    setPlannedEndDate(undefined);
    setPriority("");
    setWorkstation("");
    setSupervisor("");
    
    onScheduleAdded();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Production Schedule</DialogTitle>
          <DialogDescription>
            Add a new item to the production schedule
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Product
            </Label>
            <Input
              id="product"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="order" className="text-right">
              Order Number
            </Label>
            <Input
              id="order"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="Enter order number"
              className="col-span-3"
            />
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
                  disabled={(date) => date < today}
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
            <Label htmlFor="workstation" className="text-right">
              Workstation
            </Label>
            <Select value={workstation} onValueChange={setWorkstation}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select workstation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assembly Line A">Assembly Line A</SelectItem>
                <SelectItem value="Assembly Line B">Assembly Line B</SelectItem>
                <SelectItem value="Welding Station 1">Welding Station 1</SelectItem>
                <SelectItem value="Welding Station 2">Welding Station 2</SelectItem>
                <SelectItem value="Painting Booth">Painting Booth</SelectItem>
                <SelectItem value="Quality Control">Quality Control</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="supervisor" className="text-right">
              Supervisor
            </Label>
            <Input
              id="supervisor"
              value={supervisor}
              onChange={(e) => setSupervisor(e.target.value)}
              placeholder="Enter supervisor name"
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Schedule
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
