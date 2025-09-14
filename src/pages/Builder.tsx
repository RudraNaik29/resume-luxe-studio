import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Save, 
  Eye, 
  Download, 
  Plus, 
  Trash2, 
  ArrowLeft, 
  Sparkles,
  User,
  Briefcase,
  GraduationCap,
  Award
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ResumeContent {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
}

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [title, setTitle] = useState("Untitled Resume");
  const [content, setContent] = useState<ResumeContent>({
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
  });

  useEffect(() => {
    if (id) {
      fetchResume();
    }
  }, [id]);

  const fetchResume = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      
      setTitle(data.title);
      setContent((data.content as unknown as ResumeContent) || {
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
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load resume",
        variant: "destructive",
      });
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const saveResume = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("resumes")
        .update({
          title,
          content: content as any,
          updated_at: new Date().toISOString()
        })
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Resume saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save resume",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addExperience = () => {
    const newExp = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setContent({
      ...content,
      experience: [...content.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setContent({
      ...content,
      experience: content.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const removeExperience = (id: string) => {
    setContent({
      ...content,
      experience: content.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: crypto.randomUUID(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setContent({
      ...content,
      education: [...content.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setContent({
      ...content,
      education: content.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const removeEducation = (id: string) => {
    setContent({
      ...content,
      education: content.education.filter(edu => edu.id !== id)
    });
  };

  const addSkill = () => {
    setContent({
      ...content,
      skills: [...content.skills, ""]
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...content.skills];
    newSkills[index] = value;
    setContent({
      ...content,
      skills: newSkills
    });
  };

  const removeSkill = (index: number) => {
    setContent({
      ...content,
      skills: content.skills.filter((_, i) => i !== index)
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading resume builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="border-l border-border h-6" />
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none p-0 h-auto focus-visible:ring-0"
                placeholder="Resume Title"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => navigate(`/preview/${id}`)}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button variant="ghost" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={saveResume} disabled={isSaving}>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={content.personalInfo.fullName}
                      onChange={(e) => setContent({
                        ...content,
                        personalInfo: { ...content.personalInfo, fullName: e.target.value }
                      })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={content.personalInfo.email}
                      onChange={(e) => setContent({
                        ...content,
                        personalInfo: { ...content.personalInfo, email: e.target.value }
                      })}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={content.personalInfo.phone}
                      onChange={(e) => setContent({
                        ...content,
                        personalInfo: { ...content.personalInfo, phone: e.target.value }
                      })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={content.personalInfo.location}
                      onChange={(e) => setContent({
                        ...content,
                        personalInfo: { ...content.personalInfo, location: e.target.value }
                      })}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    value={content.personalInfo.summary}
                    onChange={(e) => setContent({
                      ...content,
                      personalInfo: { ...content.personalInfo, summary: e.target.value }
                    })}
                    placeholder="Write a brief summary of your professional background and career objectives..."
                  />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Suggest Content
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Work Experience
                  </CardTitle>
                  <Button onClick={addExperience}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.experience.map((exp, index) => (
                  <div key={exp.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">Experience {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                          placeholder="Company Name"
                        />
                      </div>
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                          placeholder="Job Title"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                          placeholder="Leave empty if current"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description</Label>
                      <Textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
                      />
                    </div>
                  </div>
                ))}
                {content.experience.length === 0 && (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No work experience added yet</p>
                    <Button onClick={addExperience}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Experience
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Education
                  </CardTitle>
                  <Button onClick={addEducation}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {content.education.map((edu, index) => (
                  <div key={edu.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">Education {index + 1}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>School/University</Label>
                        <Input
                          value={edu.school}
                          onChange={(e) => updateEducation(edu.id, "school", e.target.value)}
                          placeholder="School Name"
                        />
                      </div>
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <Label>Start Date</Label>
                        <Input
                          type="month"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label>End Date</Label>
                        <Input
                          type="month"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        rows={2}
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, "description", e.target.value)}
                        placeholder="Additional details, achievements, relevant coursework..."
                      />
                    </div>
                  </div>
                ))}
                {content.education.length === 0 && (
                  <div className="text-center py-8">
                    <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No education added yet</p>
                    <Button onClick={addEducation}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your Education
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Skills
                  </CardTitle>
                  <Button onClick={addSkill}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {content.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={skill}
                        onChange={(e) => updateSkill(index, e.target.value)}
                        placeholder="e.g. JavaScript, Project Management"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                {content.skills.length === 0 && (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No skills added yet</p>
                    <Button onClick={addSkill}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Skill
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Builder;