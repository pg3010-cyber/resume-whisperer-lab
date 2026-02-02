import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Download,
  Share2,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Code,
  Award,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import CircularProgress from "@/components/ui/CircularProgress";
import ProgressBar from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Results = () => {
  const overallScore = 85;

  const scoreBreakdown = [
    { label: "Experience", score: 92, icon: Briefcase },
    { label: "Education", score: 88, icon: GraduationCap },
    { label: "Skills", score: 85, icon: Code },
    { label: "Certifications", score: 75, icon: Award },
  ];

  const matchedSkills = [
    { name: "JavaScript", match: 95 },
    { name: "React", match: 92 },
    { name: "TypeScript", match: 88 },
    { name: "Node.js", match: 85 },
    { name: "SQL", match: 78 },
  ];

  const missingSkills = [
    "GraphQL",
    "Docker",
    "Kubernetes",
    "AWS Lambda",
  ];

  const suggestions = [
    {
      type: "success",
      icon: CheckCircle2,
      title: "Strong Technical Background",
      description: "Your experience with modern web technologies aligns well with the role.",
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Consider Adding Cloud Skills",
      description: "AWS or GCP certifications would strengthen your profile significantly.",
    },
    {
      type: "error",
      icon: XCircle,
      title: "Missing DevOps Experience",
      description: "Docker and CI/CD experience is often required for senior roles.",
    },
  ];

  const jobMatches = [
    { title: "Senior Frontend Developer", company: "TechCorp", match: 92 },
    { title: "Full Stack Engineer", company: "StartupXYZ", match: 88 },
    { title: "React Developer", company: "BigTech Inc", match: 85 },
    { title: "Software Engineer", company: "InnovateCo", match: 82 },
  ];

  return (
    <DashboardLayout
      title="Analysis Results"
      subtitle="Detailed breakdown of your resume analysis"
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="relative overflow-hidden" hover={false}>
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-5 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <CircularProgress
                value={overallScore}
                size={180}
                strokeWidth={12}
                label="Overall Score"
              />
              
              <div className="flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Excellent Resume!</h3>
                  <p className="text-muted-foreground">
                    Your resume scores in the top 15% of all analyzed resumes. 
                    Here are some insights to make it even better.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {scoreBreakdown.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="text-primary" size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="font-semibold">{item.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <Button className="gradient-primary text-white border-0">
                <Download className="mr-2" size={18} />
                Download Report
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2" size={18} />
                Share Results
              </Button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard hover={false} className="h-full">
            <h3 className="text-lg font-semibold mb-6">Job Match Score</h3>
            <div className="space-y-4">
              {jobMatches.map((job, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm">{job.title}</p>
                      <p className="text-xs text-muted-foreground">{job.company}</p>
                    </div>
                    <CircularProgress value={job.match} size={45} strokeWidth={3} />
                  </div>
                </motion.div>
              ))}
            </div>
            <Link to="/job-description">
              <Button variant="ghost" className="w-full mt-4">
                Find More Jobs <ChevronRight size={16} />
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>

      {/* Detailed Analysis Tabs */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
            <TabsTrigger value="missing">Missing</TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold mb-6">Skill Match Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {matchedSkills.map((skill, index) => (
                    <ProgressBar
                      key={index}
                      value={skill.match}
                      label={skill.name}
                      size="md"
                    />
                  ))}
                </div>
                <div className="bg-muted/50 rounded-xl p-6">
                  <h4 className="font-semibold mb-4">Summary</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your skills align well with current job market demands. 
                    JavaScript and React are your strongest areas.
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success" />
                    <span className="text-sm">5 matching skills found</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="suggestions">
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold mb-6">Improvement Suggestions</h3>
              <div className="space-y-4">
                {suggestions.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      item.type === "success"
                        ? "bg-success/10"
                        : item.type === "warning"
                        ? "bg-warning/10"
                        : "bg-destructive/10"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <item.icon
                      className={
                        item.type === "success"
                          ? "text-success"
                          : item.type === "warning"
                          ? "text-warning"
                          : "text-destructive"
                      }
                      size={22}
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="missing">
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold mb-6">Missing Skills</h3>
              <p className="text-muted-foreground mb-6">
                These skills were mentioned in job postings but not found in your resume:
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {missingSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <XCircle className="text-destructive" size={20} />
                    <span className="font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl bg-primary/5">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Pro tip:</strong> Consider adding 
                  these skills to your resume if you have experience with them, or 
                  invest in learning them to improve your job prospects.
                </p>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  );
};

export default Results;
