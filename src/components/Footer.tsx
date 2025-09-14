import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Github,
  Mail,
  Heart
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: "Templates", href: "#" },
      { name: "Resume Builder", href: "#" },
      { name: "Cover Letter", href: "#" },
      { name: "AI Assistant", href: "#" },
      { name: "Pricing", href: "#" },
    ],
    Resources: [
      { name: "Career Guide", href: "#" },
      { name: "Interview Tips", href: "#" },
      { name: "Resume Examples", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Help Center", href: "#" },
    ],
    Company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Partners", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "Security", href: "#" },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "GitHub", icon: Github, href: "#" },
  ];

  return (
    <footer className="bg-background border-t border-white/10">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Stay Updated with Career Tips
          </h3>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Get weekly insights, resume tips, and career advice delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>
            <Button variant="premium" size="lg" className="px-8">
              <Mail className="w-4 h-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          {/* Logo */}
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center mr-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="font-bold text-xl text-foreground mr-3">
              ResumeAI
            </div>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              Premium
            </Badge>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary group transition-all duration-300 flex items-center justify-center"
                >
                  <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="flex items-center text-muted-foreground text-sm">
            <span>© 2024 ResumeAI. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span>for your career success.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;