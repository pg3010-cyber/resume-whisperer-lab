import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Upload,
  Search,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Shield,
  Globe,
  FileText,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import GlassCard from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";

const About = () => {
  const steps = [
    {
      icon: Upload,
      step: "01",
      title: "Upload Resume",
      description:
        "Simply drag and drop your resume in PDF or DOC format. Our system accepts all standard resume formats.",
    },
    {
      icon: Search,
      step: "02",
      title: "AI Analysis",
      description:
        "Our advanced AI engine powered by NLP extracts key information, skills, and experience from your resume.",
    },
    {
      icon: BarChart3,
      step: "03",
      title: "Get Results",
      description:
        "Receive detailed scoring, skill matching, and actionable suggestions to improve your resume.",
    },
    {
      icon: CheckCircle2,
      step: "04",
      title: "Improve & Apply",
      description:
        "Use our insights to optimize your resume and increase your chances of landing your dream job.",
    },
  ];

  const technologies = [
    {
      icon: Brain,
      title: "Natural Language Processing",
      description: "Advanced NLP algorithms understand context and meaning in resumes.",
    },
    {
      icon: Sparkles,
      title: "Machine Learning",
      description: "Continuously improving models trained on millions of resumes.",
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Get instant results with our optimized processing pipeline.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with full data encryption.",
    },
  ];

  const benefits = [
    "Analyze unlimited resumes with AI precision",
    "Match candidates to job requirements automatically",
    "Reduce hiring time by up to 75%",
    "Eliminate unconscious bias in screening",
    "Integrate with your existing ATS systems",
    "24/7 support and dedicated success manager",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Globe size={16} />
              Trusted by 5,000+ companies worldwide
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              How <span className="gradient-text">AI Resume Analyzer</span> Works
            </h1>

            <p className="text-lg text-muted-foreground mb-8">
              Our cutting-edge AI technology transforms the way companies screen resumes,
              making hiring faster, fairer, and more efficient.
            </p>

            <Link to="/signup">
              <Button size="lg" className="gradient-primary text-white border-0 shadow-lg shadow-primary/25">
                Get Started Free
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How It Works - Steps */}
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
              Simple <span className="gradient-text">4-Step Process</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From upload to insights in minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard className="h-full relative">
                  <div className="text-5xl font-bold gradient-text opacity-30 absolute top-4 right-4">
                    {step.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/25">
                      <step.icon className="text-white" size={26} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Technology */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Powered by <span className="gradient-text">Advanced AI</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Our AI engine uses state-of-the-art natural language processing
                and machine learning to understand resumes like a human recruiter,
                but faster and more consistently.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <tech.icon className="text-primary" size={22} />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{tech.title}</h4>
                      <p className="text-sm text-muted-foreground">{tech.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="relative overflow-hidden" hover={false}>
                <div className="absolute inset-0 gradient-primary opacity-5" />
                <div className="relative z-10 p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                      <FileText className="text-white" size={28} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sample Analysis</p>
                      <p className="text-xl font-bold">Resume_John_Doe.pdf</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Experience Match", value: "92%", color: "from-green-500 to-emerald-400" },
                      { label: "Skills Coverage", value: "88%", color: "from-primary to-cyan-500" },
                      { label: "Education Score", value: "85%", color: "from-orange-500 to-amber-400" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: item.value }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                          <span className="font-semibold text-sm w-12 text-right">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-success/10">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="text-success" size={20} />
                      <span className="font-medium">Excellent match for Senior Developer role</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
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
              Why Choose <span className="gradient-text">AI Resume Analyzer?</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <CheckCircle2 className="text-success shrink-0" size={20} />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <GlassCard className="relative overflow-hidden" hover={false}>
            <div className="absolute inset-0 gradient-primary opacity-10" />
            <div className="relative z-10 text-center py-12 px-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                Start analyzing resumes with AI today. No credit card required.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="gradient-primary text-white border-0 shadow-lg shadow-primary/25">
                    Start Free Trial
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline">
                    View Demo
                  </Button>
                </Link>
              </div>
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

export default About;
