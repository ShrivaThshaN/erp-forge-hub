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
    lastUpdated: "2025-01-28"
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
    lastUpdated: "2025-01-27"
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
    lastUpdated: "2025-01-26"
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
    lastUpdated: "2025-01-25"
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
    lastUpdated: "2025-01-24"
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
    lastUpdated: "2025-01-14"
  }
];

export const customerOrders = [
  {
    id: 1,
    orderNumber: "CO-2025-001",
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
  { id: "WO-2025-001", product: "Widget A v3", status: "Completed", progress: 100 },
  { id: "WO-2025-002", product: "Gadget B v3", status: "In Progress", progress: 75 },
  { id: "WO-2025-003", product: "Component C v3", status: "Scheduled", progress: 0 },
  { id: "WO-2025-004", product: "Assembly D v3", status: "Delayed", progress: 45 },
  { id: "WO-2025-005", product: "Module E v3", status: "In Progress", progress: 85 },
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

// Extended data for Material Requirement Planning
export const materialRequirementData = [
  // Glass Dining Table (CO-2024-001) requirements
  {
    materialCode: "MAT-GT-001",
    materialName: "Tempered Glass Top", 
    requiredQty: 1,
    availableQty: 0,
    shortfall: 1,
    supplier: "Premium Glass Solutions",
    leadTime: "7 days",
    status: "Required",
    plannedDate: "2024-01-10",
    relatedOrder: "CO-2024-001"
  },
  {
    materialCode: "MAT-GT-002",
    materialName: "Steel Table Base",
    requiredQty: 1, 
    availableQty: 2,
    shortfall: 0,
    supplier: "MetalCraft Industries",
    leadTime: "5 days", 
    status: "Available",
    plannedDate: "2024-01-08",
    relatedOrder: "CO-2024-001"
  },
  // Steel Office Desk (CO-2024-002) requirements
  {
    materialCode: "MAT-SD-001", 
    materialName: "Steel Sheets",
    requiredQty: 4,
    availableQty: 2,
    shortfall: 2,
    supplier: "Steel Supply Co",
    leadTime: "3 days",
    status: "Ordered",
    plannedDate: "2024-01-12",
    relatedOrder: "CO-2024-002"
  },
  {
    materialCode: "MAT-SD-002",
    materialName: "Desk Hardware Kit",
    requiredQty: 2,
    availableQty: 5, 
    shortfall: 0,
    supplier: "Office Components Ltd",
    leadTime: "2 days",
    status: "Available", 
    plannedDate: "2024-01-10",
    relatedOrder: "CO-2024-002"
  },
  // Additional data for pagination
  {
    materialCode: "MAT-AL-001",
    materialName: "Aluminum Extrusions",
    requiredQty: 50,
    availableQty: 30,
    shortfall: 20,
    supplier: "Aluminum Solutions Inc", 
    leadTime: "4 days",
    status: "Shortage",
    plannedDate: "2024-01-14",
    relatedOrder: "CO-2024-003"
  },
  {
    materialCode: "MAT-RG-001",
    materialName: "Rubber Material",
    requiredQty: 25,
    availableQty: 40,
    shortfall: 0,
    supplier: "Rubber Industries",
    leadTime: "2 days",
    status: "Available",
    plannedDate: "2024-01-16",
    relatedOrder: "CO-2024-004"
  },
  {
    materialCode: "MAT-MA-001",
    materialName: "Electric Motor Core",
    requiredQty: 5,
    availableQty: 1,
    shortfall: 4,
    supplier: "Precision Motors Ltd",
    leadTime: "10 days",
    status: "Required",
    plannedDate: "2024-01-18",
    relatedOrder: "CO-2024-005"
  },
  {
    materialCode: "MAT-MA-002",
    materialName: "Copper Wiring",
    requiredQty: 500,
    availableQty: 200,
    shortfall: 300,
    supplier: "Electrical Components Co",
    leadTime: "6 days",
    status: "Ordered",
    plannedDate: "2024-01-20",
    relatedOrder: "CO-2024-005"
  },
  // More entries for pagination
  {
    materialCode: "MAT-PC-001",
    materialName: "Plastic Components",
    requiredQty: 100,
    availableQty: 75,
    shortfall: 25,
    supplier: "Plastic Tech Ltd",
    leadTime: "3 days",
    status: "Shortage",
    plannedDate: "2024-01-22",
    relatedOrder: "CO-2024-006"
  },
  {
    materialCode: "MAT-SS-001",
    materialName: "Stainless Steel Pipes",
    requiredQty: 20,
    availableQty: 0,
    shortfall: 20,
    supplier: "Stainless Corp",
    leadTime: "8 days",
    status: "Required",
    plannedDate: "2024-01-24",
    relatedOrder: "CO-2024-007"
  },
  {
    materialCode: "MAT-LED-001",
    materialName: "LED Components",
    requiredQty: 200,
    availableQty: 180,
    shortfall: 20,
    supplier: "LED Systems Inc",
    leadTime: "4 days",
    status: "Shortage",
    plannedDate: "2024-01-26",
    relatedOrder: "CO-2024-008"
  },
  {
    materialCode: "MAT-VL-001",
    materialName: "Industrial Valves",
    requiredQty: 15,
    availableQty: 12,
    shortfall: 3,
    supplier: "Valve Technologies",
    leadTime: "5 days",
    status: "Shortage",
    plannedDate: "2024-01-28",
    relatedOrder: "CO-2024-009"
  }
];

// Extended data for Production Schedule
export const productionScheduleData = [
  {
    scheduleId: "PS-2025-001",
    productName: "Glass Dining Table",
    orderNumber: "CO-2025-001",
    plannedStartDate: "2025-02-01",
    plannedEndDate: "2025-02-15",
    actualStartDate: "2025-02-01",
    actualEndDate: "",
    status: "In Progress",
    priority: "High",
    workstation: "Assembly Line A",
    supervisor: "John Smith",
    progress: 65
  },
  {
    scheduleId: "PS-2025-002",
    productName: "Steel Office Desk",
    orderNumber: "CO-2025-002",
    plannedStartDate: "2025-02-03",
    plannedEndDate: "2025-02-18",
    actualStartDate: "2025-02-03",
    actualEndDate: "2025-02-17",
    status: "Completed",
    priority: "Medium",
    workstation: "Fabrication Bay B",
    supervisor: "Sarah Johnson",
    progress: 100
  },
  {
    scheduleId: "PS-2025-003",
    productName: "Aluminum Window Frame",
    orderNumber: "CO-2025-003",
    plannedStartDate: "2025-02-05",
    plannedEndDate: "2025-02-20",
    actualStartDate: "",
    actualEndDate: "",
    status: "Scheduled",
    priority: "Low",
    workstation: "Extrusion Line C",
    supervisor: "Mike Wilson",
    progress: 0
  },
  {
    scheduleId: "PS-2025-004",
    productName: "Rubber Gasket Set",
    orderNumber: "CO-2025-004",
    plannedStartDate: "2025-02-07",
    plannedEndDate: "2025-02-22",
    actualStartDate: "2025-02-08",
    actualEndDate: "",
    status: "Delayed",
    priority: "Medium",
    workstation: "Molding Station D",
    supervisor: "Emily Davis",
    progress: 30
  },
  {
    scheduleId: "PS-2025-005",
    productName: "Motor Assembly Unit",
    orderNumber: "CO-2025-005",
    plannedStartDate: "2025-02-10",
    plannedEndDate: "2025-02-25",
    actualStartDate: "2025-02-10",
    actualEndDate: "",
    status: "In Progress",
    priority: "High",
    workstation: "Motor Assembly E",
    supervisor: "Robert Brown",
    progress: 45
  },
  {
    scheduleId: "PS-2025-006",
    productName: "Circuit Board Assembly",
    orderNumber: "CO-2025-006",
    plannedStartDate: "2025-02-12",
    plannedEndDate: "2025-02-26",
    actualStartDate: "",
    actualEndDate: "",
    status: "Scheduled",
    priority: "High",
    workstation: "Electronics Lab F",
    supervisor: "Lisa Chen",
    progress: 0
  },
  {
    scheduleId: "PS-2025-007",
    productName: "Hydraulic System",
    orderNumber: "CO-2025-007",
    plannedStartDate: "2025-02-14",
    plannedEndDate: "2025-02-27",
    actualStartDate: "2025-02-14",
    actualEndDate: "",
    status: "In Progress",
    priority: "Medium",
    workstation: "Hydraulics Bay G",
    supervisor: "Tom Anderson",
    progress: 20
  },
  {
    scheduleId: "PS-2025-008",
    productName: "Stainless Steel Propeller",
    orderNumber: "CO-2025-008",
    plannedStartDate: "2025-02-16",
    plannedEndDate: "2025-02-28",
    actualStartDate: "",
    actualEndDate: "",
    status: "On Hold",
    priority: "Low",
    workstation: "Precision Machining H",
    supervisor: "Alex Rodriguez",
    progress: 0
  },
  {
    scheduleId: "PS-2025-009",
    productName: "Solar Panel Frame",
    orderNumber: "CO-2025-009",
    plannedStartDate: "2025-02-18",
    plannedEndDate: "2025-03-01",
    actualStartDate: "2025-02-18",
    actualEndDate: "",
    status: "In Progress",
    priority: "Medium",
    workstation: "Frame Assembly I",
    supervisor: "Maria Garcia",
    progress: 75
  },
  {
    scheduleId: "PS-2025-010",
    productName: "Titanium Wing Parts",
    orderNumber: "CO-2025-010",
    plannedStartDate: "2025-02-20",
    plannedEndDate: "2025-03-02",
    actualStartDate: "2025-02-20",
    actualEndDate: "2025-03-01",
    status: "Completed",
    priority: "High",
    workstation: "Aerospace Unit J",
    supervisor: "David Kim",
    progress: 100
  },
  {
    scheduleId: "PS-2025-011",
    productName: "Medical Instruments",
    orderNumber: "CO-2025-011",
    plannedStartDate: "2025-02-22",
    plannedEndDate: "2025-03-03",
    actualStartDate: "",
    actualEndDate: "",
    status: "Scheduled",
    priority: "High",
    workstation: "Clean Room K",
    supervisor: "Dr. Jennifer Lee",
    progress: 0
  },
  {
    scheduleId: "PS-2025-012",
    productName: "Conveyor Belt System",
    orderNumber: "CO-2025-012",
    plannedStartDate: "2025-02-24",
    plannedEndDate: "2025-03-04",
    actualStartDate: "2025-02-25",
    actualEndDate: "",
    status: "Delayed",
    priority: "Medium",
    workstation: "Heavy Assembly L",
    supervisor: "Mark Thompson",
    progress: 15
  }
];

// Extended Quality Control Data
export const qualityControlData = [
  {
    inspectionId: "QC-2025-001",
    productName: "Widget A v3",
    batchNumber: "BA-001",
    inspectionDate: "2025-01-15",
    inspector: "John Smith",
    testType: "Dimensional Check",
    result: "Pass",
    defectCount: 0,
    notes: "All measurements within tolerance"
  },
  {
    inspectionId: "QC-2025-002",
    productName: "Gadget B v3", 
    batchNumber: "BB-002",
    inspectionDate: "2025-01-16",
    inspector: "Sarah Johnson",
    testType: "Functional Test",
    result: "Fail",
    defectCount: 3,
    notes: "Motor performance below specification"
  },
  {
    inspectionId: "QC-2025-003",
    productName: "Component C v3",
    batchNumber: "BC-003",
    inspectionDate: "2025-01-17",
    inspector: "Mike Wilson",
    testType: "Material Analysis",
    result: "Pass",
    defectCount: 0,
    notes: "Material composition verified"
  },
  {
    inspectionId: "QC-2025-004",
    productName: "Assembly D v3",
    batchNumber: "BD-004", 
    inspectionDate: "2025-01-18",
    inspector: "Emily Davis",
    testType: "Assembly Check",
    result: "Pending",
    defectCount: 0,
    notes: "Inspection in progress"
  },
  {
    inspectionId: "QC-2025-005",
    productName: "Module E v3",
    batchNumber: "BE-005",
    inspectionDate: "2025-01-19",
    inspector: "Robert Brown",
    testType: "Stress Test",
    result: "Warning", 
    defectCount: 1,
    notes: "Minor surface defect detected"
  },
  {
    inspectionId: "QC-2025-006",
    productName: "Circuit Board PCB-A1",
    batchNumber: "CB-006",
    inspectionDate: "2025-01-20",
    inspector: "Lisa Chen",
    testType: "Electrical Test",
    result: "Pass",
    defectCount: 0,
    notes: "All circuits functioning correctly"
  },
  {
    inspectionId: "QC-2025-007",
    productName: "Hydraulic Cylinder HC-7",
    batchNumber: "HC-007",
    inspectionDate: "2025-01-21",
    inspector: "Tom Anderson",
    testType: "Pressure Test",
    result: "Fail",
    defectCount: 2,
    notes: "Pressure leak detected at seal"
  },
  {
    inspectionId: "QC-2025-008",
    productName: "Steel Propeller SP-8",
    batchNumber: "SP-008",
    inspectionDate: "2025-01-22",
    inspector: "Alex Rodriguez",
    testType: "Balance Test",
    result: "Pass",
    defectCount: 0,
    notes: "Perfect balance achieved"
  },
  {
    inspectionId: "QC-2025-009",
    productName: "Solar Frame SF-9",
    batchNumber: "SF-009",
    inspectionDate: "2025-01-23",
    inspector: "Maria Garcia",
    testType: "Weather Resistance",
    result: "Warning",
    defectCount: 1,
    notes: "Minor corrosion on corner joint"
  },
  {
    inspectionId: "QC-2025-010",
    productName: "Titanium Part TP-10",
    batchNumber: "TP-010",
    inspectionDate: "2025-01-24",
    inspector: "David Kim",
    testType: "Strength Test",
    result: "Pass",
    defectCount: 0,
    notes: "Exceeds strength requirements"
  }
];

// Extended Logistics Data
export const logisticsData = [
  {
    shipmentId: "SH-2025-001",
    orderNumber: "CO-2025-001",
    carrier: "FedEx Express",
    trackingNumber: "1234567890",
    origin: "Warehouse A",
    destination: "New York, NY",
    departureDate: "2025-01-15",
    estimatedArrival: "2025-01-17",
    status: "In Transit",
    priority: "High"
  },
  {
    shipmentId: "SH-2025-002",
    orderNumber: "CO-2025-002", 
    carrier: "UPS Ground",
    trackingNumber: "1Z9876543210",
    origin: "Warehouse B",
    destination: "Los Angeles, CA",
    departureDate: "2025-01-16",
    estimatedArrival: "2025-01-19", 
    status: "Delivered",
    priority: "Medium"
  },
  {
    shipmentId: "SH-2025-003",
    orderNumber: "CO-2025-003",
    carrier: "DHL International",
    trackingNumber: "DHL123456789",
    origin: "Warehouse C",
    destination: "Chicago, IL", 
    departureDate: "2025-01-18",
    estimatedArrival: "2025-01-20",
    status: "Preparing",
    priority: "Low"
  },
  {
    shipmentId: "SH-2025-004",
    orderNumber: "CO-2025-004",
    carrier: "USPS Priority",
    trackingNumber: "USPS987654321",
    origin: "Warehouse A",
    destination: "Houston, TX",
    departureDate: "2025-01-20",
    estimatedArrival: "2025-01-22",
    status: "Delayed",
    priority: "High"
  },
  {
    shipmentId: "SH-2025-005",
    orderNumber: "CO-2025-005",
    carrier: "FedEx Ground", 
    trackingNumber: "FDX555444333",
    origin: "Warehouse D",
    destination: "Miami, FL",
    departureDate: "2025-01-22",
    estimatedArrival: "2025-01-24",
    status: "In Transit",
    priority: "Medium"
  },
  {
    shipmentId: "SH-2025-006",
    orderNumber: "CO-2025-006",
    carrier: "DHL Express",
    trackingNumber: "DHL987654321",
    origin: "Warehouse E",
    destination: "Seattle, WA",
    departureDate: "2025-01-24",
    estimatedArrival: "2025-01-26",
    status: "In Transit",
    priority: "High"
  },
  {
    shipmentId: "SH-2025-007",
    orderNumber: "CO-2025-007",
    carrier: "UPS Express",
    trackingNumber: "1Z1234567890",
    origin: "Warehouse F",
    destination: "Boston, MA",
    departureDate: "2025-01-25",
    estimatedArrival: "2025-01-27",
    status: "Delivered",
    priority: "Medium"
  },
  {
    shipmentId: "SH-2025-008",
    orderNumber: "CO-2025-008",
    carrier: "FedEx International",
    trackingNumber: "FDX111222333",
    origin: "Warehouse G",
    destination: "Denver, CO",
    departureDate: "2025-01-26",
    estimatedArrival: "2025-01-28",
    status: "In Transit",
    priority: "Low"
  },
  {
    shipmentId: "SH-2025-009",
    orderNumber: "CO-2025-009",
    carrier: "USPS Express",
    trackingNumber: "USPS555666777",
    origin: "Warehouse H",
    destination: "Phoenix, AZ",
    departureDate: "2025-01-27",
    estimatedArrival: "2025-01-29",
    status: "Preparing",
    priority: "Medium"
  },
  {
    shipmentId: "SH-2025-010",
    orderNumber: "CO-2025-010",
    carrier: "DHL Ground",
    trackingNumber: "DHL444555666",
    origin: "Warehouse I",
    destination: "Atlanta, GA",
    departureDate: "2025-01-28",
    estimatedArrival: "2025-01-30",
    status: "Delayed",
    priority: "High"
  }
];

// Calculate stats for various pages
export const getMRPStats = () => {
  const totalItems = materialRequirementData.length;
  const available = materialRequirementData.filter(item => item.status === "Available").length;
  const shortage = materialRequirementData.filter(item => item.status === "Shortage").length;
  const required = materialRequirementData.filter(item => item.status === "Required").length;
  const ordered = materialRequirementData.filter(item => item.status === "Ordered").length;
  
  return { totalItems, available, shortage, required, ordered };
};

export const getProductionStats = () => {
  const totalSchedules = productionScheduleData.length;
  const completed = productionScheduleData.filter(item => item.status === "Completed").length;
  const inProgress = productionScheduleData.filter(item => item.status === "In Progress").length;
  const scheduled = productionScheduleData.filter(item => item.status === "Scheduled").length;
  const delayed = productionScheduleData.filter(item => item.status === "Delayed").length;
  const onHold = productionScheduleData.filter(item => item.status === "On Hold").length;
  
  return { totalSchedules, completed, inProgress, scheduled, delayed, onHold };
};

export const getQualityStats = () => {
  const totalInspections = qualityControlData.length;
  const passed = qualityControlData.filter(item => item.result === "Pass").length;
  const failed = qualityControlData.filter(item => item.result === "Fail").length;
  const pending = qualityControlData.filter(item => item.result === "Pending").length;
  const warning = qualityControlData.filter(item => item.result === "Warning").length;
  
  return { totalInspections, passed, failed, pending, warning };
};

export const getLogisticsStats = () => {
  const totalShipments = logisticsData.length;
  const delivered = logisticsData.filter(item => item.status === "Delivered").length;
  const inTransit = logisticsData.filter(item => item.status === "In Transit").length;
  const preparing = logisticsData.filter(item => item.status === "Preparing").length;
  const delayed = logisticsData.filter(item => item.status === "Delayed").length;
  
  return { totalShipments, delivered, inTransit, preparing, delayed };
};

export const getDashboardStats = () => {
  const orderStats = getOrderStats();
  const inventoryStats = getInventoryStats();
  
  // Calculate material requirements based on actual data
  const totalRequired = materialRequirementData.reduce((sum, item) => sum + item.requiredQty, 0);
  const availableStock = materialRequirementData.reduce((sum, item) => sum + item.availableQty, 0);
  const shortfall = materialRequirementData.reduce((sum, item) => sum + item.shortfall, 0);
  const itemsInShortage = materialRequirementData.filter(item => item.shortfall > 0).length;

  return {
    totalProductionOrders: productionScheduleData.length,
    activePurchaseOrders: 28,
    materialShortfall: shortfall,
    monthlyRevenue: orderStats.totalValue,
    totalRequired,
    availableStock,
    shortfall,
    itemsInShortage
  };
};