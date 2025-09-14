import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Templates from "@/components/Templates";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Templates />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
