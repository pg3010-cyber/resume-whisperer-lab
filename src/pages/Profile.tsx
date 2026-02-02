import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Camera,
  Edit3,
  Save,
  FileText,
  Calendar,
  Award,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import GlassCard from "@/components/ui/GlassCard";
import CircularProgress from "@/components/ui/CircularProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    title: "Senior Frontend Developer",
  });

  const stats = [
    { label: "Resumes Uploaded", value: 12 },
    { label: "Analyses Completed", value: 45 },
    { label: "Average Score", value: 82 },
  ];

  const recentResumes = [
    {
      name: "Resume_2024_v3.pdf",
      date: "Jan 15, 2024",
      score: 85,
    },
    {
      name: "Resume_2024_v2.pdf",
      date: "Jan 10, 2024",
      score: 78,
    },
    {
      name: "Resume_2024_v1.pdf",
      date: "Jan 5, 2024",
      score: 72,
    },
    {
      name: "Resume_2023.pdf",
      date: "Dec 20, 2023",
      score: 68,
    },
  ];

  const achievements = [
    { icon: Award, label: "First Analysis", unlocked: true },
    { icon: FileText, label: "10 Resumes", unlocked: true },
    { icon: Award, label: "Top 10% Score", unlocked: true },
    { icon: Award, label: "Perfect Match", unlocked: false },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout
      title="My Profile"
      subtitle="Manage your account settings and view your activity."
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard hover={false} className="text-center">
            <div className="relative inline-block mb-6">
              <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center text-white text-4xl font-bold mx-auto">
                {profile.name.split(" ").map(n => n[0]).join("")}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-card rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors shadow-lg">
                <Camera size={18} className="text-muted-foreground" />
              </button>
            </div>

            <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
            <p className="text-muted-foreground mb-4">{profile.title}</p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <MapPin size={14} />
              {profile.location}
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setEditing(!editing)}
              variant={editing ? "default" : "outline"}
              className={`w-full mt-6 ${editing ? "gradient-primary text-white border-0" : ""}`}
            >
              {editing ? (
                <>
                  <Save className="mr-2" size={18} />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="mr-2" size={18} />
                  Edit Profile
                </>
              )}
            </Button>
          </GlassCard>

          {/* Achievements */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard hover={false}>
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    className={`p-3 rounded-xl text-center ${
                      achievement.unlocked
                        ? "bg-primary/10"
                        : "bg-muted/50 opacity-50"
                    }`}
                    whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                  >
                    <achievement.icon
                      className={`mx-auto mb-2 ${
                        achievement.unlocked ? "text-primary" : "text-muted-foreground"
                      }`}
                      size={24}
                    />
                    <p className="text-xs font-medium">{achievement.label}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* Profile Details & Resume History */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* Profile Details */}
          <GlassCard hover={false}>
            <h3 className="text-lg font-semibold mb-6">Profile Details</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    id="title"
                    name="title"
                    value={profile.title}
                    onChange={handleChange}
                    disabled={!editing}
                    className="pl-10 bg-muted/50"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Resume History */}
          <GlassCard hover={false}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Resume History</h3>
              <Badge variant="secondary">{recentResumes.length} files</Badge>
            </div>

            <div className="space-y-4">
              {recentResumes.map((resume, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="text-primary" size={22} />
                    </div>
                    <div>
                      <p className="font-medium">{resume.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar size={12} />
                        {resume.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <CircularProgress value={resume.score} size={50} strokeWidth={4} />
                    <Button variant="ghost" size="icon">
                      <ExternalLink size={18} />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
