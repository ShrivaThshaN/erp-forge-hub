import { ERPSidebar } from "./ERPSidebar";

interface ERPLayoutProps {
  children: React.ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <ERPSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}