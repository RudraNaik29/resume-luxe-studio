import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Edit, Trash2, Download, User, LogOut, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Resume {
  id: string;
  title: string;
  template_id: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  display_name: string;
  subscription_tier: string;
}

const Dashboard = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchResumes();
    fetchProfile();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch resumes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, subscription_tier")
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const createNewResume = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("resumes")
        .insert([
          {
            user_id: user.id,
            title: "New Resume",
            template_id: "modern-minimal",
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
        title: "Resume created!",
        description: "Your new resume is ready to edit.",
      });
      
      navigate(`/builder/${data.id}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create resume",
        variant: "destructive",
      });
    }
  };

  const deleteResume = async (id: string) => {
    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      setResumes(resumes.filter(resume => resume.id !== id));
      toast({
        title: "Resume deleted",
        description: "Your resume has been permanently deleted.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
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
              {profile?.subscription_tier === 'premium' && (
                <Badge className="bg-accent text-accent-foreground">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{profile?.display_name || "User"}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {profile?.display_name || "User"}!
          </h1>
          <p className="text-muted-foreground">
            Manage your resumes and create new ones to land your dream job.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white cursor-pointer hover:shadow-card transition-all duration-300" onClick={createNewResume}>
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Create New Resume</h3>
              <p className="text-white/80">Start building your professional resume</p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-card transition-all duration-300">
            <CardContent className="p-6 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{resumes.length}</h3>
              <p className="text-muted-foreground">Total Resumes</p>
            </CardContent>
          </Card>

          <Link to="/templates">
            <Card className="border border-border hover:shadow-card transition-all duration-300 cursor-pointer">
              <CardContent className="p-6 text-center">
                <Eye className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">Browse Templates</h3>
                <p className="text-muted-foreground">Explore premium designs</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Resumes Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-foreground">Your Resumes</h2>
            <Button onClick={createNewResume}>
              <Plus className="w-4 h-4 mr-2" />
              New Resume
            </Button>
          </div>

          {resumes.length === 0 ? (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">No resumes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first resume to get started on your job search.
              </p>
              <Button onClick={createNewResume}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Resume
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resumes.map((resume) => (
                <Card key={resume.id} className="hover:shadow-card transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg truncate">{resume.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Updated {format(new Date(resume.updated_at), "MMM d, yyyy")}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="capitalize">
                        {resume.template_id.replace('-', ' ')}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/builder/${resume.id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => navigate(`/preview/${resume.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteResume(resume.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;