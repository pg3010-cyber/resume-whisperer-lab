import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Sparkles,
  Save,
  CheckCircle2,
  Tag,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const JobDescription = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 2000);
  };

  const extractedKeywords = [
    { word: "React", type: "skill" },
    { word: "TypeScript", type: "skill" },
    { word: "Node.js", type: "skill" },
    { word: "5+ years", type: "experience" },
    { word: "Full-time", type: "type" },
    { word: "Remote", type: "location" },
    { word: "Agile", type: "methodology" },
    { word: "AWS", type: "skill" },
  ];

  const savedJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Remote",
      salary: "$120k - $150k",
      type: "Full-time",
    },
    {
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      salary: "$140k - $180k",
      type: "Full-time",
    },
    {
      title: "React Developer",
      company: "BigTech Inc",
      location: "New York, NY",
      salary: "$110k - $140k",
      type: "Contract",
    },
  ];

  return (
    <DashboardLayout
      title="Job Description"
      subtitle="Paste a job description to analyze requirements and match with resumes."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Job Description Input */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard hover={false}>
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Frontend Developer"
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="e.g., TechCorp"
                    className="bg-muted/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Paste the full job description here..."
                  className="min-h-[250px] bg-muted/50 resize-none"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAnalyze}
                  disabled={!jobDescription || analyzing}
                  className="gradient-primary text-white border-0"
                >
                  {analyzing ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2" size={18} />
                      Analyze Keywords
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Save className="mr-2" size={18} />
                  Save Job
                </Button>
              </div>
            </div>

            {/* Extracted Keywords */}
            {analyzed && (
              <motion.div
                className="mt-8 pt-8 border-t border-border"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="text-primary" size={20} />
                  <h3 className="text-lg font-semibold">Extracted Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {extractedKeywords.map((keyword, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge
                        variant={
                          keyword.type === "skill"
                            ? "default"
                            : keyword.type === "experience"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          keyword.type === "skill"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : ""
                        }
                      >
                        {keyword.word}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-xl bg-success/10 flex items-start gap-3">
                  <CheckCircle2 className="text-success mt-0.5" size={20} />
                  <div>
                    <p className="font-medium">8 keywords extracted</p>
                    <p className="text-sm text-muted-foreground">
                      Upload a resume to see how it matches with these requirements.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Saved Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Saved Jobs</h3>
              <Badge variant="secondary">{savedJobs.length}</Badge>
            </div>

            <div className="space-y-4">
              {savedJobs.map((job, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium">{job.title}</p>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white text-sm font-bold">
                      {job.company[0]}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={12} />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {job.type}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="ghost" className="w-full mt-4">
              <Search className="mr-2" size={16} />
              Browse More Jobs
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default JobDescription;
