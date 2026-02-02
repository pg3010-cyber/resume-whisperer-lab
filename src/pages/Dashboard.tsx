import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Upload,
  FileText,
  TrendingUp,
  Clock,
  ChevronRight,
  ArrowUpRight,
  Calendar,
  Target,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import ProgressBar from "@/components/ui/ProgressBar";
import CircularProgress from "@/components/ui/CircularProgress";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const quickStats = [
    {
      label: "Total Resumes",
      value: 127,
      change: "+12%",
      icon: FileText,
      color: "from-primary to-cyan-500",
    },
    {
      label: "Analyzed Today",
      value: 24,
      change: "+8%",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-400",
    },
    {
      label: "Avg. Score",
      value: 78,
      suffix: "%",
      change: "+5%",
      icon: Target,
      color: "from-orange-500 to-amber-400",
    },
    {
      label: "Time Saved",
      value: 42,
      suffix: "hrs",
      change: "+15%",
      icon: Clock,
      color: "from-purple-500 to-pink-400",
    },
  ];

  const recentAnalyses = [
    {
      name: "John Smith",
      position: "Senior Developer",
      score: 92,
      date: "2 hours ago",
    },
    {
      name: "Sarah Johnson",
      position: "Product Manager",
      score: 85,
      date: "4 hours ago",
    },
    {
      name: "Michael Chen",
      position: "UX Designer",
      score: 78,
      date: "Yesterday",
    },
    {
      name: "Emily Davis",
      position: "Data Analyst",
      score: 88,
      date: "Yesterday",
    },
  ];

  const topSkills = [
    { name: "JavaScript", percentage: 92 },
    { name: "React", percentage: 88 },
    { name: "Python", percentage: 75 },
    { name: "SQL", percentage: 82 },
    { name: "AWS", percentage: 65 },
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back! Here's an overview of your resume analytics."
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      <AnimatedCounter end={stat.value} />
                    </span>
                    {stat.suffix && (
                      <span className="text-lg text-muted-foreground">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">{stat.change}</span>
                    <span className="text-xs text-muted-foreground">vs last week</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="text-white" size={22} />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upload Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/upload">
            <GlassCard className="h-full flex flex-col items-center justify-center text-center py-12 group border-dashed border-2 border-primary/30 hover:border-primary/50">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/25">
                <Upload className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Resume</h3>
              <p className="text-muted-foreground text-sm max-w-xs">
                Drag and drop your resume here or click to browse
              </p>
              <Button className="mt-6 gradient-primary text-white border-0">
                Choose File
              </Button>
            </GlassCard>
          </Link>
        </motion.div>

        {/* Recent Analyses */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Recent Analyses</h3>
              <Link
                to="/results"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {recentAnalyses.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-medium">
                      {item.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Calendar size={14} />
                        {item.date}
                      </div>
                    </div>
                    <CircularProgress value={item.score} size={50} strokeWidth={4} />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Skills Analysis & Activity */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Top Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <GlassCard hover={false}>
            <h3 className="text-lg font-semibold mb-6">Top Skills Identified</h3>
            <div className="space-y-4">
              {topSkills.map((skill, index) => (
                <ProgressBar
                  key={index}
                  value={skill.percentage}
                  label={skill.name}
                  size="md"
                />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard hover={false}>
            <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "New Analysis", icon: TrendingUp, path: "/upload" },
                { label: "Job Match", icon: Target, path: "/job-description" },
                { label: "View Reports", icon: FileText, path: "/results" },
                { label: "My Resumes", icon: FileText, path: "/resumes" },
              ].map((action, index) => (
                <Link key={index} to={action.path}>
                  <motion.div
                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <action.icon className="text-primary" size={22} />
                    </div>
                    <span className="text-sm font-medium">{action.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
