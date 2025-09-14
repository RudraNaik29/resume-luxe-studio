import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Star, Crown, ArrowLeft, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  category: string;
  preview_url: string | null;
  is_premium: boolean;
  rating: number;
  downloads: number;
  template_data: any;
}

const TemplateGallery = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    filterTemplates();
  }, [templates, searchTerm, selectedCategory]);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from("resume_templates")
        .select("*")
        .order("downloads", { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterTemplates = () => {
    let filtered = templates;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(template => 
        template.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTemplates(filtered);
  };

  const useTemplate = async (templateId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      // Create a new resume with the selected template
      const { data, error } = await supabase
        .from("resumes")
        .insert([
          {
            user_id: user.id,
            title: "New Resume",
            template_id: templateId,
            content: {
              personalInfo: {
                fullName: "",
                email: "",
                phone: "",
                location: "",
                summary: ""
              },
              experience: [],
              education: [],
              skills: []
            }
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      toast({
        title: "Template selected!",
        description: "Your new resume is ready to edit.",
      });
      
      navigate(`/builder/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create resume with template",
        variant: "destructive",
      });
    }
  };

  const categories = ["all", ...new Set(templates.map(t => t.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-2xl font-bold text-primary">
                Resume Builder
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Choose Your Template</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Select from our collection of professionally designed resume templates. 
            Each template is optimized for ATS systems and modern hiring practices.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="group relative overflow-hidden bg-gradient-card backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-luxury"
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-muted/50 to-muted">
                  {template.preview_url ? (
                    <img 
                      src={template.preview_url} 
                      alt={`${template.name} resume template`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gradient-primary text-white">
                      <div className="text-center">
                        <Star className="w-12 h-12 mx-auto mb-2" />
                        <p className="text-lg font-semibold">{template.name}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Premium Badge */}
                  {template.is_premium && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 z-10">
                      <Crown className="w-3 h-3 mr-1" />
                      Premium
                    </Badge>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-2">
                      <Button variant="glass" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        variant="glass" 
                        size="sm"
                        onClick={() => useTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </div>
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
                    <span className="px-2 py-1 bg-muted rounded-full capitalize">{template.category}</span>
                    <span>{template.downloads.toLocaleString()}+ downloads</span>
                  </div>

                  <Button 
                    variant={template.is_premium ? "premium" : "default"} 
                    className="w-full"
                    onClick={() => useTemplate(template.id)}
                  >
                    {template.is_premium ? "Use Premium Template" : "Use Template"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6">
              Create your professional resume in minutes with our AI-powered builder.
            </p>
            <Link to="/dashboard">
              <Button variant="hero" size="lg">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TemplateGallery;