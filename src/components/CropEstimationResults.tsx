import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Wheat, Carrot, Apple, TrendingUp, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { SoilData } from "./SoilAnalysisForm";

interface CropRecommendation {
  name: string;
  icon: React.ReactNode;
  suitability: number;
  estimatedYield: string;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  notes: string;
}

interface CropEstimationResultsProps {
  soilData: SoilData;
}

export const CropEstimationResults = ({ soilData }: CropEstimationResultsProps) => {
  // Simple algorithm to calculate crop recommendations based on soil data
  const calculateCropSuitability = (): CropRecommendation[] => {
    const { ph, nitrogen, phosphorus, potassium, moisture, temperature, organicMatter } = soilData;
    
    // Wheat preferences: pH 6.0-7.5, moderate NPK, cool-moderate temps
    const wheatScore = Math.min(100, 
      (ph >= 6.0 && ph <= 7.5 ? 90 : Math.max(0, 90 - Math.abs(ph - 6.75) * 20)) *
      (nitrogen / 100) *
      (temperature >= 15 && temperature <= 25 ? 1 : 0.7) *
      (moisture >= 40 && moisture <= 70 ? 1 : 0.8)
    );

    // Corn preferences: pH 6.0-6.8, high nitrogen, warm temps
    const cornScore = Math.min(100,
      (ph >= 6.0 && ph <= 6.8 ? 95 : Math.max(0, 95 - Math.abs(ph - 6.4) * 25)) *
      (nitrogen / 80) *
      (temperature >= 20 && temperature <= 35 ? 1 : 0.6) *
      (moisture >= 50 && moisture <= 80 ? 1 : 0.7)
    );

    // Carrots: pH 6.0-7.0, moderate fertility, cool weather
    const carrotScore = Math.min(100,
      (ph >= 6.0 && ph <= 7.0 ? 88 : Math.max(0, 88 - Math.abs(ph - 6.5) * 22)) *
      ((nitrogen + phosphorus + potassium) / 150) *
      (temperature >= 10 && temperature <= 25 ? 1 : 0.6) *
      (organicMatter >= 2 ? 1 : 0.7)
    );

    // Apples: pH 6.0-7.0, balanced fertility, moderate conditions
    const appleScore = Math.min(100,
      (ph >= 6.0 && ph <= 7.0 ? 85 : Math.max(0, 85 - Math.abs(ph - 6.5) * 20)) *
      ((phosphorus + potassium) / 100) *
      (temperature >= 15 && temperature <= 30 ? 1 : 0.7) *
      (organicMatter >= 3 ? 1 : 0.8)
    );

    const getStatus = (score: number): 'excellent' | 'good' | 'fair' | 'poor' => {
      if (score >= 80) return 'excellent';
      if (score >= 60) return 'good';
      if (score >= 40) return 'fair';
      return 'poor';
    };

    const getYieldEstimate = (score: number, baseYield: number): string => {
      const multiplier = score / 100;
      return `${(baseYield * multiplier).toFixed(1)} tons/hectare`;
    };

    return [
      {
        name: "Wheat",
        icon: <Wheat className="h-5 w-5" />,
        suitability: Math.round(wheatScore),
        estimatedYield: getYieldEstimate(wheatScore, 4.5),
        status: getStatus(wheatScore),
        notes: wheatScore > 70 ? "Excellent for wheat cultivation" : "Consider soil amendments for better yield"
      },
      {
        name: "Corn",
        icon: <Leaf className="h-5 w-5" />,
        suitability: Math.round(cornScore),
        estimatedYield: getYieldEstimate(cornScore, 8.2),
        status: getStatus(cornScore),
        notes: cornScore > 70 ? "Great conditions for corn" : "May need higher nitrogen levels"
      },
      {
        name: "Carrots",
        icon: <Carrot className="h-5 w-5" />,
        suitability: Math.round(carrotScore),
        estimatedYield: getYieldEstimate(carrotScore, 35),
        status: getStatus(carrotScore),
        notes: carrotScore > 70 ? "Perfect for root vegetables" : "Improve organic matter content"
      },
      {
        name: "Apples",
        icon: <Apple className="h-5 w-5" />,
        suitability: Math.round(appleScore),
        estimatedYield: getYieldEstimate(appleScore, 25),
        status: getStatus(appleScore),
        notes: appleScore > 70 ? "Suitable for orchard development" : "Consider long-term soil improvement"
      }
    ].sort((a, b) => b.suitability - a.suitability);
  };

  const recommendations = calculateCropSuitability();
  const bestCrop = recommendations[0];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'excellent': return <CheckCircle className="h-4 w-4 text-leaf-green" />;
      case 'good': return <TrendingUp className="h-4 w-4 text-growth-green" />;
      case 'fair': return <AlertTriangle className="h-4 w-4 text-earth-amber" />;
      default: return <AlertTriangle className="h-4 w-4 text-destructive" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-leaf-green/10 text-leaf-green border-leaf-green/20';
      case 'good': return 'bg-growth-green/10 text-growth-green border-growth-green/20';
      case 'fair': return 'bg-earth-amber/10 text-earth-amber border-earth-amber/20';
      default: return 'bg-destructive/10 text-destructive border-destructive/20';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Overall Soil Health Summary */}
      <Card className="bg-gradient-subtle shadow-medium">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Soil Analysis Results</CardTitle>
          <CardDescription className="text-center">
            Based on your soil parameters, here are the recommended crops and estimated yields
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-2xl font-bold text-primary">{soilData.ph.toFixed(1)}</p>
              <p className="text-sm text-muted-foreground">Soil pH</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-leaf-green">{soilData.nitrogen}</p>
              <p className="text-sm text-muted-foreground">Nitrogen (mg/kg)</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-earth-amber">{soilData.moisture}%</p>
              <p className="text-sm text-muted-foreground">Moisture</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-soil-brown">{soilData.organicMatter.toFixed(1)}%</p>
              <p className="text-sm text-muted-foreground">Organic Matter</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Best Recommendation Highlight */}
      <Card className="border-2 border-leaf-green/30 shadow-large">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            {bestCrop.icon}
            <span className="bg-gradient-growth bg-clip-text text-transparent">
              Top Recommendation: {bestCrop.name}
            </span>
            <Badge className={getStatusColor(bestCrop.status)}>
              {getStatusIcon(bestCrop.status)}
              {bestCrop.status.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Suitability Score</span>
                  <span className="text-sm font-bold">{bestCrop.suitability}%</span>
                </div>
                <Progress value={bestCrop.suitability} className="h-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Estimated Yield</p>
                <p className="text-xl font-bold text-leaf-green">{bestCrop.estimatedYield}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Recommendation Notes</p>
              <p className="text-sm">{bestCrop.notes}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Crop Recommendations */}
      <Card className="shadow-medium">
        <CardHeader>
          <CardTitle>All Crop Suitability Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of how well different crops would perform in your soil conditions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendations.map((crop, index) => (
              <div key={crop.name}>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {crop.icon}
                    <div>
                      <h3 className="font-semibold">{crop.name}</h3>
                      <p className="text-sm text-muted-foreground">{crop.estimatedYield}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Progress value={crop.suitability} className="w-24 h-2" />
                      <p className="text-xs text-muted-foreground mt-1">{crop.suitability}% suitable</p>
                    </div>
                    <Badge className={getStatusColor(crop.status)}>
                      {getStatusIcon(crop.status)}
                      {crop.status}
                    </Badge>
                  </div>
                </div>
                {index < recommendations.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};