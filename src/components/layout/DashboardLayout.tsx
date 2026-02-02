import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const DashboardLayout = ({ children, title, subtitle }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="pl-64 min-h-screen">
        <div className="p-8">
          {(title || subtitle) && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title && (
                <h1 className="text-3xl font-bold text-foreground">{title}</h1>
              )}
              {subtitle && (
                <p className="text-muted-foreground mt-1">{subtitle}</p>
              )}
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
