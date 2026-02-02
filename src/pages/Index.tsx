import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  FileText,
  Zap,
  Target,
  TrendingUp,
  CheckCircle2,
  Users,
  Clock,
  Shield,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui/GlassCard";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.png";

const Index = () => {
  const stats = [
    { value: 50000, suffix: "+", label: "Resumes Analyzed", icon: FileText },
    { value: 98, suffix: "%", label: "Accuracy Rate", icon: Target },
    { value: 75, suffix: "%", label: "Time Saved", icon: Clock },
    { value: 5000, suffix: "+", label: "Happy Users", icon: Users },
  ];

  const features = [
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Get comprehensive resume insights in seconds with our advanced AI engine.",
    },
    {
      icon: Target,
      title: "Skill Matching",
      description: "Automatically match candidate skills with job requirements for perfect fits.",
    },
    {
      icon: TrendingUp,
      title: "Smart Scoring",
      description: "Objective resume scoring based on industry standards and best practices.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and never shared. Complete confidentiality guaranteed.",
    },
  ];

  const steps = [
    { step: "01", title: "Upload Resume", description: "Drag and drop your resume in PDF or DOC format" },
    { step: "02", title: "AI Analysis", description: "Our AI extracts and analyzes key information" },
    { step: "03", title: "Get Results", description: "Receive detailed scores and improvement suggestions" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Zap size={16} />
                Powered by Advanced AI
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">AI-Powered</span>
                <br />
                <span className="gradient-text">Resume Screening</span>
                <br />
                <span className="text-foreground">Made Easy</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Transform your hiring process with intelligent resume analysis. 
                Get instant insights, skill matching, and objective scoring in seconds.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/upload">
                  <Button size="lg" className="gradient-primary text-white border-0 shadow-lg shadow-primary/25 group">
                    Upload Resume
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="bg-card/50 backdrop-blur-sm">
                    Get Started Free
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-10">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>{["No credit card", "Free trial", "Cancel anytime"][i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Hero Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative animate-float">
                <img
                  src={heroImage}
                  alt="AI Resume Analysis"
                  className="w-full rounded-2xl shadow-glass-lg"
                />
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-cyan-500/20 rounded-3xl blur-2xl -z-10" />
              </div>

              {/* Floating Cards */}
              <motion.div
                className="absolute -left-8 top-1/4 glass-card rounded-xl p-4 shadow-glass"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <CheckCircle2 className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Resume Score</p>
                    <p className="font-bold text-foreground">92/100</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -right-4 bottom-1/4 glass-card rounded-xl p-4 shadow-glass"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <Target className="text-success" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Skill Match</p>
                    <p className="font-bold text-foreground">85%</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassCard key={index} className="text-center" hover={false}>
                <stat.icon className="mx-auto mb-4 text-primary" size={32} />
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for
              <span className="gradient-text"> Smart Hiring</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform streamlines the resume screening process,
              saving you time while finding the best candidates.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <GlassCard key={index} className="group">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-6xl font-bold gradient-text opacity-20 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="relative overflow-hidden" hover={false}>
            <div className="absolute inset-0 gradient-primary opacity-10" />
            <div className="relative z-10 text-center py-12 px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of companies using AI Resume Analyzer to find the perfect candidates faster.
              </p>
              <Link to="/signup">
                <Button size="lg" className="gradient-primary text-white border-0 shadow-lg shadow-primary/25">
                  Start Free Trial
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 AI Resume Analyzer. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {["Privacy", "Terms", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
