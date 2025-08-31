import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SoilAnalysisForm, SoilData } from "@/components/SoilAnalysisForm";
import { CropEstimationResults } from "@/components/CropEstimationResults";
import { useToast } from "@/hooks/use-toast";
import { Sprout, BarChart3, Leaf, ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const Index = () => {
  const [analysisResult, setAnalysisResult] = useState<SoilData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleSoilAnalysis = async (soilData: SoilData) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setAnalysisResult(soilData);
    setIsAnalyzing(false);
    
    toast({
      title: "Analysis Complete",
      description: "Your soil analysis has been processed and crop recommendations are ready.",
    });

    // Scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }, 100);
  };

  const scrollToForm = () => {
    document.getElementById('analysis-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Sprout className="h-16 w-16 mx-auto mb-6 text-growth-green" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Smart Crop
              <span className="block bg-gradient-growth bg-clip-text text-transparent">
                Estimation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Analyze your soil conditions and get AI-powered crop yield estimates 
              and farming recommendations for maximum productivity.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={scrollToForm}
              size="lg"
              className="bg-gradient-earth hover:opacity-90 text-white font-semibold px-8 py-4 shadow-large transition-all duration-300"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              Start Soil Analysis
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4"
            >
              <Leaf className="mr-2 h-5 w-5" />
              Learn More
            </Button>
          </div>
          
          <div className="animate-bounce">
            <ArrowDown className="h-8 w-8 mx-auto text-white/70" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Advanced Agricultural Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines soil science with modern technology to provide 
              accurate crop yield predictions and farming insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-earth rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Soil Analysis</h3>
                <p className="text-muted-foreground">
                  Comprehensive analysis of pH, NPK levels, moisture content, 
                  and organic matter to understand your soil health.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-growth rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Yield Prediction</h3>
                <p className="text-muted-foreground">
                  AI-powered algorithms provide accurate crop yield estimates 
                  based on your specific soil conditions and environmental factors.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-soil-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Crop Recommendations</h3>
                <p className="text-muted-foreground">
                  Get personalized crop recommendations optimized for your soil type 
                  and environmental conditions to maximize your harvest.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Analysis Form Section */}
      <section id="analysis-form" className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Analyze Your Soil
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your soil testing results below to get detailed crop recommendations 
              and yield estimates tailored to your specific conditions.
            </p>
          </div>
          
          <SoilAnalysisForm onAnalyze={handleSoilAnalysis} isAnalyzing={isAnalyzing} />
        </div>
      </section>

      {/* Results Section */}
      {analysisResult && (
        <section id="results" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <CropEstimationResults soilData={analysisResult} />
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-6 w-6 text-leaf-green" />
            <span className="text-lg font-semibold">AgriSmart</span>
          </div>
          <p className="text-muted-foreground">
            Empowering farmers with intelligent crop estimation technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;