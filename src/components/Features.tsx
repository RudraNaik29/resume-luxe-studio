import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Download, 
  Palette, 
  Shield, 
  Zap, 
  Users,
  FileText,
  Target,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content",
    description: "Let our advanced AI suggest compelling content tailored to your industry and role.",
    gradient: "from-purple-500 to-blue-500",
    delay: "0s"
  },
  {
    icon: Palette,
    title: "Premium Templates",
    description: "Choose from 50+ professionally designed templates that pass ATS systems.",
    gradient: "from-pink-500 to-orange-500",
    delay: "0.1s"
  },
  {
    icon: Zap,
    title: "Instant Export",
    description: "Export your resume as PDF, Word, or share via direct links in seconds.",
    gradient: "from-cyan-500 to-blue-500",
    delay: "0.2s"
  },
  {
    icon: Target,
    title: "ATS Optimized",
    description: "All templates are optimized to pass Applicant Tracking Systems with high scores.",
    gradient: "from-green-500 to-teal-500",
    delay: "0.3s"
  },
  {
    icon: Users,
    title: "Industry Specific",
    description: "Templates and suggestions tailored for specific industries and career levels.",
    gradient: "from-indigo-500 to-purple-500",
    delay: "0.4s"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is encrypted and secure. We never share your information with third parties.",
    gradient: "from-rose-500 to-pink-500",
    delay: "0.5s"
  }
];

const stats = [
  { number: "50K+", label: "Successful Resumes", icon: FileText },
  { number: "95%", label: "Interview Rate", icon: Target },
  { number: "24/7", label: "AI Assistant", icon: Brain },
  { number: "100+", label: "Templates", icon: Palette }
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <Badge className="bg-gradient-primary text-white px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Everything You Need to
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge AI technology with beautiful design 
            to create resumes that get noticed by both humans and ATS systems.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title}
                className="group relative overflow-hidden bg-gradient-card backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-card animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${0.6 + index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;