import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Settings, 
  Factory, 
  ShoppingCart, 
  Package, 
  Truck, 
  CheckCircle, 
  Calendar,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Production",
    icon: Factory,
    children: [
      {
        title: "Master Production Schedule", 
        href: "/production/master-schedule"
      },
      {
        title: "Material Requirement Planning",
        href: "/production/material-planning"
      }
    ]
  },
  {
    title: "Procurement",
    href: "/procurement",
    icon: ShoppingCart,
  },
  {
    title: "Order Management",
    href: "/order-management",
    icon: Package,
  },
  {
    title: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    title: "Logistics",
    href: "/logistics",
    icon: Truck,
  },
  {
    title: "Quality",
    href: "/quality",
    icon: CheckCircle,
  },
];

export function ERPSidebar() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(["Production"]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isParentActive = (children: any[]) => {
    return children.some(child => location.pathname === child.href);
  };

  return (
    <div className="h-screen w-64 bg-erp-sidebar text-sidebar-foreground flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold">ERP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.title);
            const isItemActive = item.href ? isActive(item.href) : (hasChildren && isParentActive(item.children));

            return (
              <li key={item.title}>
                {hasChildren ? (
                  <>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors",
                        isItemActive 
                          ? "bg-erp-sidebar-active text-white" 
                          : "text-sidebar-foreground hover:bg-sidebar-accent"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </div>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {isExpanded && (
                      <ul className="ml-8 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              to={child.href}
                              className={cn(
                                "block px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive(child.href)
                                  ? "bg-erp-sidebar-active text-white"
                                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                              )}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href!}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                      isActive(item.href!)
                        ? "bg-erp-sidebar-active text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}