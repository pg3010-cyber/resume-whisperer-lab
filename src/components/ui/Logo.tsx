import { Sparkles } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Sparkles className="text-white" size={iconSizes[size]} />
        </div>
        <div className="absolute -inset-1 rounded-xl gradient-primary opacity-30 blur-md -z-10" />
      </div>
      <span className={`font-bold ${sizes[size]} tracking-tight`}>
        <span className="gradient-text">AI Resume</span>
        <span className="text-foreground"> Analyzer</span>
      </span>
    </div>
  );
};

export default Logo;
