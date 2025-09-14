import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Star, Crown, Briefcase, Palette } from "lucide-react";
import template1 from "@/assets/template-1.jpg";
import template2 from "@/assets/template-2.jpg";
import template3 from "@/assets/template-3.jpg";

const templates = [
  {
    id: 1,
    name: "Executive Pro",
    category: "Executive",
    preview: template1,
    isPremium: true,
    rating: 4.9,
    downloads: "12K+",
    icon: Crown,
    gradient: "from-purple-600 to-blue-600"
  },
  {
    id: 2,
    name: "Creative Edge",
    category: "Creative",
    preview: template2,
    isPremium: false,
    rating: 4.8,
    downloads: "8.5K+",
    icon: Palette,
    gradient: "from-pink-500 to-orange-500"
  },
  {
    id: 3,
    name: "Tech Innovator",
    category: "Technology",
    preview: template3,
    isPremium: true,
    rating: 4.9,
    downloads: "15K+",
    icon: Briefcase,
    gradient: "from-cyan-500 to-blue-500"
  },
  {
    id: 4,
    name: "Modern Minimal",
    category: "Minimalist",
    preview: template1,
    isPremium: false,
    rating: 4.7,
    downloads: "9.2K+",
    icon: Star,
    gradient: "from-green-500 to-teal-500"
  },
  {
    id: 5,
    name: "Professional Plus",
    category: "Business",
    preview: template3,
    isPremium: true,
    rating: 5.0,
    downloads: "20K+",
    icon: Crown,
    gradient: "from-indigo-600 to-purple-600"
  },
  {
    id: 6,
    name: "Designer's Choice",
    category: "Creative",
    preview: template2,
    isPremium: false,
    rating: 4.6,
    downloads: "6.8K+",
    icon: Palette,
    gradient: "from-rose-500 to-pink-500"
  }
];

const Templates = () => {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-gradient-primary text-white px-4 py-2 mb-6">
            Premium Templates
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Choose Your Perfect
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Template
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professionally designed templates crafted by industry experts. 
            Each template is optimized for ATS systems and modern hiring practices.
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => {
            const IconComponent = template.icon;
            return (
              <Card 
                key={template.id} 
                className="group relative overflow-hidden bg-gradient-card backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-luxury animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  {/* Template Preview */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted">
                    <img 
                      src={template.preview} 
                      alt={`${template.name} resume template`}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-20`} />
                    
                     {/* Premium Badge */}
                     {template.isPremium && (
                       <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 z-10">
                         <Crown className="w-3 h-3 mr-1" />
                         Premium
                       </Badge>
                     )}

                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                       <Button variant="glass" size="lg" className="transform scale-90 group-hover:scale-100 transition-transform duration-300">
                         <Eye className="w-5 h-5 mr-2" />
                         Preview
                       </Button>
                     </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{template.name}</h3>
                      <div className="flex items-center text-accent">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{template.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="px-2 py-1 bg-muted rounded-full">{template.category}</span>
                      <span>{template.downloads} downloads</span>
                    </div>

                    <Button 
                      variant={template.isPremium ? "premium" : "default"} 
                      className="w-full"
                    >
                      {template.isPremium ? "Use Premium" : "Use Template"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Templates Button */}
        <div className="text-center animate-fade-in">
          <Button variant="hero" size="lg" className="px-12 py-4 text-lg">
            View All Templates
            <Crown className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Templates;