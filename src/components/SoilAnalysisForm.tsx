import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Leaf, Droplets, Thermometer, Zap } from "lucide-react";

export interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  moisture: number;
  temperature: number;
  organicMatter: number;
}

interface SoilAnalysisFormProps {
  onAnalyze: (data: SoilData) => void;
  isAnalyzing: boolean;
}

export const SoilAnalysisForm = ({ onAnalyze, isAnalyzing }: SoilAnalysisFormProps) => {
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    moisture: 60,
    temperature: 25,
    organicMatter: 3.5,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(soilData);
  };

  const updateValue = (field: keyof SoilData, value: number) => {
    setSoilData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Leaf className="h-6 w-6 text-leaf-green" />
          Soil Analysis Parameters
        </CardTitle>
        <CardDescription>
          Enter your soil testing results to get crop yield estimates and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* pH Level */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold flex items-center gap-2">
              <Zap className="h-4 w-4 text-earth-amber" />
              Soil pH Level: {soilData.ph.toFixed(1)}
            </Label>
            <Slider
              value={[soilData.ph]}
              onValueChange={([value]) => updateValue('ph', value)}
              min={4.0}
              max={10.0}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Acidic (4.0)</span>
              <span>Neutral (7.0)</span>
              <span>Alkaline (10.0)</span>
            </div>
          </div>

          <Separator />

          {/* NPK Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Nitrogen (N) - {soilData.nitrogen} mg/kg</Label>
              <Slider
                value={[soilData.nitrogen]}
                onValueChange={([value]) => updateValue('nitrogen', value)}
                min={0}
                max={200}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Phosphorus (P) - {soilData.phosphorus} mg/kg</Label>
              <Slider
                value={[soilData.phosphorus]}
                onValueChange={([value]) => updateValue('phosphorus', value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Potassium (K) - {soilData.potassium} mg/kg</Label>
              <Slider
                value={[soilData.potassium]}
                onValueChange={([value]) => updateValue('potassium', value)}
                min={0}
                max={150}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <Separator />

          {/* Environmental Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Droplets className="h-4 w-4 text-accent" />
                Moisture Content: {soilData.moisture}%
              </Label>
              <Slider
                value={[soilData.moisture]}
                onValueChange={([value]) => updateValue('moisture', value)}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-semibold flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-destructive" />
                Temperature: {soilData.temperature}°C
              </Label>
              <Slider
                value={[soilData.temperature]}
                onValueChange={([value]) => updateValue('temperature', value)}
                min={0}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Organic Matter */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">
              Organic Matter Content: {soilData.organicMatter.toFixed(1)}%
            </Label>
            <Slider
              value={[soilData.organicMatter]}
              onValueChange={([value]) => updateValue('organicMatter', value)}
              min={0}
              max={10}
              step={0.1}
              className="w-full"
            />
          </div>

          <Separator />

          <Button
            type="submit"
            disabled={isAnalyzing}
            className="w-full bg-gradient-earth hover:opacity-90 text-white font-semibold py-3 shadow-medium transition-all duration-300"
          >
            {isAnalyzing ? "Analyzing Soil..." : "Analyze Soil & Estimate Crops"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};