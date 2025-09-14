import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Sparkles, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-hero animate-gradient-shift bg-[length:400%_400%]" />
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-glow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-glow/20 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <Badge className="bg-gradient-glass backdrop-blur-md border border-white/20 text-white px-6 py-2 text-sm font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Resume Builder
          </Badge>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-slide-up leading-tight">
          Build Your
          <span className="block bg-gradient-to-r from-accent to-primary-glow bg-clip-text text-transparent animate-gradient-shift bg-[length:400%_400%]">
            Dream Resume
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
          Create stunning, professional resumes in minutes with our AI-powered platform. 
          Stand out from the crowd with premium templates and intelligent content suggestions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button variant="hero" size="lg" className="text-lg px-8 py-4 h-auto">
            Start Building Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <Button variant="glass" size="lg" className="text-lg px-8 py-4 h-auto">
            <Zap className="w-5 h-5 mr-2" />
            View Templates
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/60 text-sm">Resumes Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">95%</div>
            <div className="text-white/60 text-sm">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="text-3xl font-bold text-white">4.9</div>
              <Star className="w-6 h-6 text-accent ml-2 fill-current" />
            </div>
            <div className="text-white/60 text-sm">User Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;