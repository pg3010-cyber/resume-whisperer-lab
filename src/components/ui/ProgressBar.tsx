import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  className?: string;
  showValue?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
}

const ProgressBar = ({
  value,
  className,
  showValue = true,
  label,
  size = "md",
}: ProgressBarProps) => {
  const heights = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
  };

  const getColor = (val: number) => {
    if (val >= 80) return "from-green-500 to-emerald-400";
    if (val >= 60) return "from-primary to-cyan-500";
    if (val >= 40) return "from-yellow-500 to-orange-400";
    return "from-red-500 to-rose-400";
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-foreground">{label}</span>}
          {showValue && <span className="text-sm font-semibold text-muted-foreground">{value}%</span>}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", heights[size])}>
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r", getColor(value))}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
