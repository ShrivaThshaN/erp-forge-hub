// Extended mock data for all pages with proper calculations

export const inventoryData = [
  {
    itemCode: "INV-0001",
    itemName: "Aluminum Rods 6mm",
    category: "Raw Materials",
    currentStock: 450,
    minimumStock: 200,
    maximumStock: 1000,
    location: "Warehouse A-1",
    unitPrice: "₹12.50",
    status: "In Stock",
    lastUpdated: "2024-01-28"
  },
  {
    itemCode: "INV-0002", 
    itemName: "Steel Bolts M8x50",
    category: "Fasteners",
    currentStock: 85,
    minimumStock: 100,
    maximumStock: 500,
    location: "Warehouse B-2",
    unitPrice: "₹0.75",
    status: "Low Stock",
    lastUpdated: "2024-01-27"
  },
  {
    itemCode: "INV-0003",
    itemName: "Rubber Gaskets",
    category: "Sealing",
    currentStock: 0,
    minimumStock: 50,
    maximumStock: 300,
    location: "Warehouse C-1",
    unitPrice: "₹3.25",
    status: "Out of Stock",
    lastUpdated: "2024-01-26"
  },
  {
    itemCode: "INV-0004",
    itemName: "Electric Motors 5HP",
    category: "Components", 
    currentStock: 15,
    minimumStock: 10,
    maximumStock: 50,
    location: "Warehouse D-3",
    unitPrice: "₹450.00",
    status: "In Stock",
    lastUpdated: "2024-01-25"
  },
  {
    itemCode: "INV-0005",
    itemName: "Circuit Boards PCB-A1",
    category: "Electronics",
    currentStock: 75,
    minimumStock: 25,
    maximumStock: 200,
    location: "Warehouse E-1",
    unitPrice: "₹85.00",
    status: "In Stock",
    lastUpdated: "2024-01-24"
  },
  {
    itemCode: "INV-0006",
    itemName: "Hydraulic Cylinders", 
    category: "Components",
    currentStock: 8,
    minimumStock: 15,
    maximumStock: 60,
    location: "Warehouse F-2",
    unitPrice: "₹275.00",
    status: "Low Stock",
    lastUpdated: "2024-01-23"
  },
  // Additional items for pagination
  {
    itemCode: "INV-0007",
    itemName: "Copper Wires 12AWG",
    category: "Electrical",
    currentStock: 250,
    minimumStock: 100,
    maximumStock: 500,
    location: "Warehouse A-2",
    unitPrice: "₹8.50",
    status: "In Stock",
    lastUpdated: "2024-01-22"
  },
  {
    itemCode: "INV-0008",
    itemName: "Plastic Connectors",
    category: "Fasteners",
    currentStock: 0,
    minimumStock: 200,
    maximumStock: 800,
    location: "Warehouse B-1",
    unitPrice: "₹1.25",
    status: "Out of Stock",
    lastUpdated: "2024-01-21"
  },
  {
    itemCode: "INV-0009",
    itemName: "Stainless Steel Sheets",
    category: "Raw Materials",
    currentStock: 120,
    minimumStock: 50,
    maximumStock: 300,
    location: "Warehouse C-2",
    unitPrice: "₹125.00",
    status: "In Stock",
    lastUpdated: "2024-01-20"
  },
  {
    itemCode: "INV-0010",
    itemName: "LED Strip Lights",
    category: "Electronics",
    currentStock: 45,
    minimumStock: 60,
    maximumStock: 200,
    location: "Warehouse E-2",
    unitPrice: "₹35.00",
    status: "Low Stock",
    lastUpdated: "2024-01-19"
  },
  // More items...
  {
    itemCode: "INV-0011",
    itemName: "Industrial Valves",
    category: "Components",
    currentStock: 0,
    minimumStock: 25,
    maximumStock: 100,
    location: "Warehouse F-1",
    unitPrice: "₹180.00",
    status: "Out of Stock",
    lastUpdated: "2024-01-18"
  },
  {
    itemCode: "INV-0012",
    itemName: "Carbon Fiber Sheets",
    category: "Raw Materials",
    currentStock: 90,
    minimumStock: 30,
    maximumStock: 150,
    location: "Warehouse A-3",
    unitPrice: "₹350.00",
    status: "In Stock",
    lastUpdated: "2024-01-17"
  },
  {
    itemCode: "INV-0013",
    itemName: "Pneumatic Actuators",
    category: "Components",
    currentStock: 22,
    minimumStock: 30,
    maximumStock: 80,
    location: "Warehouse D-1",
    unitPrice: "₹425.00",
    status: "Low Stock",
    lastUpdated: "2024-01-16"
  },
  {
    itemCode: "INV-0014",
    itemName: "Thermal Sensors",
    category: "Electronics",
    currentStock: 180,
    minimumStock: 50,
    maximumStock: 300,
    location: "Warehouse E-3",
    unitPrice: "₹65.00",
    status: "In Stock",
    lastUpdated: "2024-01-15"
  },
  {
    itemCode: "INV-0015",
    itemName: "Titanium Screws",
    category: "Fasteners",
    currentStock: 0,
    minimumStock: 150,
    maximumStock: 600,
    location: "Warehouse B-3",
    unitPrice: "₹2.50",
    status: "Out of Stock",
    lastUpdated: "2024-01-14"
  }
];

export const customerOrders = [
  {
    id: 1,
    orderNumber: "CO-2024-001",
    customerName: "Luxury Home Interiors",
    productName: "Glass Dining Table",
    orderDate: "2024-01-15",
    deliveryDate: "2024-02-15",
    status: "Processing",
    totalValue: 85000,
    items: 1
  },
  {
    id: 2,
    orderNumber: "CO-2024-002", 
    customerName: "Corporate Office Solutions",
    productName: "Steel Office Desk",
    orderDate: "2024-01-18",
    deliveryDate: "2024-02-18",
    status: "Ready to Ship",
    totalValue: 45500, 
    items: 2
  },
  {
    id: 3,
    orderNumber: "CO-2024-003",
    customerName: "Metro Construction Ltd",
    productName: "Aluminum Window Frame",
    orderDate: "2024-01-20",
    deliveryDate: "2024-02-20", 
    status: "Processing",
    totalValue: 32750,
    items: 10
  },
  {
    id: 4,
    orderNumber: "CO-2024-004",
    customerName: "Industrial Equipment Co",
    productName: "Rubber Gasket Set",
    orderDate: "2024-01-22", 
    deliveryDate: "2024-02-22",
    status: "Delivered",
    totalValue: 15200,
    items: 50
  },
  {
    id: 5,
    orderNumber: "CO-2024-005",
    customerName: "Precision Manufacturing",
    productName: "Motor Assembly Unit",
    orderDate: "2024-01-25",
    deliveryDate: "2024-02-25",
    status: "Processing", 
    totalValue: 125000,
    items: 5
  },
  // Additional orders for pagination
  {
    id: 6,
    orderNumber: "CO-2024-006",
    customerName: "Tech Solutions Inc",
    productName: "Circuit Board Assembly",
    orderDate: "2024-01-26",
    deliveryDate: "2024-02-26",
    status: "Shipped",
    totalValue: 78500,
    items: 8
  },
  {
    id: 7,
    orderNumber: "CO-2024-007",
    customerName: "Automotive Parts Ltd",
    productName: "Hydraulic System",
    orderDate: "2024-01-27",
    deliveryDate: "2024-02-27",
    status: "Processing",
    totalValue: 95000,
    items: 3
  },
  {
    id: 8,
    orderNumber: "CO-2024-008",
    customerName: "Marine Equipment Co",
    productName: "Stainless Steel Propeller",
    orderDate: "2024-01-28",
    deliveryDate: "2024-02-28",
    status: "Ready to Ship",
    totalValue: 165000,
    items: 1
  },
  {
    id: 9,
    orderNumber: "CO-2024-009",
    customerName: "Energy Systems Corp",
    productName: "Solar Panel Frame",
    orderDate: "2024-01-29",
    deliveryDate: "2024-03-01",
    status: "Processing",
    totalValue: 52000,
    items: 20
  },
  {
    id: 10,
    orderNumber: "CO-2024-010",
    customerName: "Aerospace Components",
    productName: "Titanium Wing Parts",
    orderDate: "2024-01-30",
    deliveryDate: "2024-03-02",
    status: "Delivered",
    totalValue: 325000,
    items: 4
  },
  {
    id: 11,
    orderNumber: "CO-2024-011",
    customerName: "Medical Device Co",
    productName: "Surgical Steel Instruments",
    orderDate: "2024-01-31",
    deliveryDate: "2024-03-03",
    status: "Shipped",
    totalValue: 89000,
    items: 25
  },
  {
    id: 12,
    orderNumber: "CO-2024-012",
    customerName: "Food Processing Ltd",
    productName: "Conveyor Belt System",
    orderDate: "2024-02-01",
    deliveryDate: "2024-03-04",
    status: "Processing",
    totalValue: 145000,
    items: 1
  },
  {
    id: 13,
    orderNumber: "CO-2024-013",
    customerName: "Textile Manufacturing",
    productName: "Industrial Looms",
    orderDate: "2024-02-02",
    deliveryDate: "2024-03-05",
    status: "Ready to Ship",
    totalValue: 275000,
    items: 2
  },
  {
    id: 14,
    orderNumber: "CO-2024-014",
    customerName: "Chemical Processing",
    productName: "Reactor Vessel",
    orderDate: "2024-02-03",
    deliveryDate: "2024-03-06",
    status: "Processing",
    totalValue: 450000,
    items: 1
  },
  {
    id: 15,
    orderNumber: "CO-2024-015",
    customerName: "Mining Operations",
    productName: "Crusher Assembly",
    orderDate: "2024-02-04",
    deliveryDate: "2024-03-07",
    status: "Delivered",
    totalValue: 380000,
    items: 1
  }
];

export const productionOrders = [
  { id: "WO-2024-001", product: "Widget A v3", status: "Completed", progress: 100 },
  { id: "WO-2024-002", product: "Gadget B v3", status: "In Progress", progress: 75 },
  { id: "WO-2024-003", product: "Component C v3", status: "Scheduled", progress: 0 },
  { id: "WO-2024-004", product: "Assembly D v3", status: "Delayed", progress: 45 },
  { id: "WO-2024-005", product: "Module E v3", status: "In Progress", progress: 85 },
];

// Calculate totals based on actual data
export const getInventoryStats = () => {
  const totalItems = inventoryData.length;
  const inStock = inventoryData.filter(item => item.status === "In Stock").length;
  const lowStock = inventoryData.filter(item => item.status === "Low Stock").length;
  const outOfStock = inventoryData.filter(item => item.status === "Out of Stock").length;

  return { totalItems, inStock, lowStock, outOfStock };
};

export const getOrderStats = () => {
  const totalOrders = customerOrders.length;
  const delivered = customerOrders.filter(order => order.status === "Delivered").length;
  const processing = customerOrders.filter(order => order.status === "Processing").length;
  const shipped = customerOrders.filter(order => order.status === "Shipped").length;
  const readyToShip = customerOrders.filter(order => order.status === "Ready to Ship").length;
  const inProgress = processing + shipped + readyToShip;
  const totalValue = customerOrders.reduce((sum, order) => sum + order.totalValue, 0);

  return { totalOrders, delivered, inProgress, totalValue };
};

export const getDashboardStats = () => {
  const orderStats = getOrderStats();
  const inventoryStats = getInventoryStats();
  
  // Calculate material requirements
  const totalRequired = 17772;
  const availableStock = 6878;
  const shortfall = totalRequired - availableStock;

  return {
    totalProductionOrders: 145,
    activePurchaseOrders: 28,
    materialShortfall: shortfall,
    monthlyRevenue: orderStats.totalValue,
    totalRequired,
    availableStock,
    shortfall,
    itemsInShortage: inventoryStats.outOfStock
  };
};