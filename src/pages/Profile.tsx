import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  User, Mail, FileText, Calendar, ChevronRight, LogOut, TrendingUp,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import CircularProgress from "@/components/ui/CircularProgress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { resumeApi, dashboardApi } from "@/lib/api";

const Profile = () => {
  const { user, logout } = useAuth();
  const [history, setHistory]   = useState<any[]>([]);
  const [stats,   setStats]     = useState<any>(null);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      resumeApi.getHistory(),
      dashboardApi.getStats(),
    ])
      .then(([h, s]) => { setHistory(h); setStats(s); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const joinedDate = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const avgScore   = stats?.avg_score ?? 0;
  const total      = stats?.total_resumes ?? 0;

  return (
    <DashboardLayout title="Profile" subtitle="Your account overview and analysis history">
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard hover={false} className="text-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold shadow-lg shadow-primary/25">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h2 className="text-xl font-bold mb-1">{user?.name || "User"}</h2>
            <p className="text-muted-foreground text-sm mb-4">{user?.email}</p>

            <div className="flex justify-center gap-6 py-4 border-y border-border mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold">{loading ? "—" : total}</p>
                <p className="text-xs text-muted-foreground">Resumes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{loading ? "—" : `${avgScore}%`}</p>
                <p className="text-xs text-muted-foreground">Avg Score</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <User size={16} className="text-muted-foreground" />
                <span>{user?.name}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <Mail size={16} className="text-muted-foreground" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <Calendar size={16} className="text-muted-foreground" />
                <span>Joined {joinedDate}</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full mt-5 text-destructive border-destructive/30 hover:bg-destructive/5"
              onClick={logout}
            >
              <LogOut size={16} className="mr-2" /> Sign Out
            </Button>
          </GlassCard>
        </motion.div>

        {/* Analysis History */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-semibold text-lg">Analysis History</h3>
              <Link to="/upload">
                <Button size="sm" className="gradient-primary text-white border-0">
                  New Analysis
                </Button>
              </Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-20 rounded-xl bg-muted/50 animate-pulse" />
                ))}
              </div>
            ) : history.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="mx-auto text-muted-foreground mb-3" size={40} />
                <p className="text-muted-foreground mb-4">No analyses yet</p>
                <Link to="/upload">
                  <Button className="gradient-primary text-white border-0">Upload First Resume</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map((item: any, i: number) => (
                  <Link key={item.id} to={`/results/${item.id}`}>
                    <motion.div
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group cursor-pointer"
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <FileText className="text-primary" size={18} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate max-w-[240px]">{item.filename}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {item.job_title && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0">{item.job_title}</Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.analyzed_at).toLocaleDateString("en-US", {
                                day: "numeric", month: "short", year: "numeric"
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-muted-foreground">TF-IDF</p>
                          <p className="text-sm font-medium">{(item.tfidf_score * 100).toFixed(0)}%</p>
                        </div>
                        <CircularProgress value={item.overall_score} size={48} strokeWidth={4} />
                        <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>

      </div>

      {/* Stats Row */}
      {!loading && stats && (
        <motion.div
          className="grid sm:grid-cols-3 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: "Total Analyses",  value: total,                      icon: FileText },
            { label: "Average Score",   value: `${avgScore}%`,             icon: TrendingUp },
            { label: "Top Skills Found",value: stats.top_skills?.length ?? 0, icon: User },
          ].map((s, i) => (
            <GlassCard key={i} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <s.icon className="text-primary" size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default Profile;