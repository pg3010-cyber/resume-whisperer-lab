import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  FileText,
  BarChart3,
  Briefcase,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Upload Resume", path: "/upload", icon: Upload },
    { name: "Analysis Results", path: "/results", icon: BarChart3 },
    { name: "Job Description", path: "/job-description", icon: Briefcase },
    { name: "My Resumes", path: "/resumes", icon: FileText },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const bottomItems = [
    { name: "Settings", path: "/settings", icon: Settings },
    { name: "Logout", path: "/login", icon: LogOut },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-card border-r border-border z-40 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-4 border-b border-border">
        <Link to="/dashboard" className="flex items-center">
          {collapsed ? (
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-lg">A</span>
            </div>
          ) : (
            <Logo size="sm" />
          )}
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6 px-3 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon size={20} className={cn(collapsed && "mx-auto")} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
                {isActive(item.path) && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full gradient-primary"
                    layoutId="sidebar-indicator"
                  />
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Items */}
      <div className="p-3 border-t border-border">
        <ul className="space-y-2">
          {bottomItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground group relative",
                  item.name === "Logout" && "hover:text-destructive"
                )}
              >
                <item.icon size={20} className={cn(collapsed && "mx-auto")} />
                {!collapsed && (
                  <span className="font-medium text-sm">{item.name}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-sm"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </motion.aside>
  );
};

export default DashboardSidebar;
