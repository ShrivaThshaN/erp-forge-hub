import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  productName: string;
  orderDate: string;
  deliveryDate: string;
  status: string;
  totalValue: number;
  items: number;
}

interface NewOrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (order: Omit<Order, 'id'>) => void;
}

export const NewOrderDialog: React.FC<NewOrderDialogProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    productName: '',
    orderDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    status: 'Processing',
    totalValue: 0,
    items: 1
  });

  const handleSave = () => {
    if (formData.orderNumber && formData.customerName && formData.productName) {
      onSave(formData);
      onClose();
      // Reset form
      setFormData({
        orderNumber: '',
        customerName: '',
        productName: '',
        orderDate: new Date().toISOString().split('T')[0],
        deliveryDate: '',
        status: 'Processing',
        totalValue: 0,
        items: 1
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Generate order number
  React.useEffect(() => {
    if (isOpen && !formData.orderNumber) {
      const orderNumber = `CO-2024-${String(Date.now()).slice(-3)}`;
      setFormData(prev => ({ ...prev, orderNumber }));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={formData.orderNumber}
                onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                placeholder="CO-2024-XXX"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Ready to Ship">Ready to Ship</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="customerName">Customer Name *</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) => handleInputChange('customerName', e.target.value)}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div>
            <Label htmlFor="productName">Product Name *</Label>
            <Input
              id="productName"
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="orderDate">Order Date</Label>
              <Input
                id="orderDate"
                type="date"
                value={formData.orderDate}
                onChange={(e) => handleInputChange('orderDate', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="deliveryDate">Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="items">Items</Label>
              <Input
                id="items"
                type="number"
                min="1"
                value={formData.items}
                onChange={(e) => handleInputChange('items', parseInt(e.target.value) || 1)}
              />
            </div>
            <div>
              <Label htmlFor="totalValue">Total Value (₹)</Label>
              <Input
                id="totalValue"
                type="number"
                min="0"
                value={formData.totalValue}
                onChange={(e) => handleInputChange('totalValue', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Create Order
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};