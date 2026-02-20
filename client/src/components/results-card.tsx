import { motion } from "framer-motion";
import { Leaf, Sprout, AlertTriangle, FlaskConical, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AnalysisResult {
  diseaseName: string;
  description: string;
  causes: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
}

interface ResultsCardProps {
  result: AnalysisResult;
  onReset: () => void;
  labels: {
    resultsTitle: string;
    causes: string;
    organic: string;
    chemical: string;
    tryAgain: string;
    disclaimer: string;
  };
}

export function ResultsCard({ result, onReset, labels }: ResultsCardProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="w-full space-y-6"
    >
      <Card className="overflow-hidden border-none shadow-xl bg-white/90 backdrop-blur-sm">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-green-400" />
        
        <CardHeader className="pb-2">
          <motion.div variants={item} className="flex items-center gap-2 text-primary mb-2">
            <Stethoscope className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-xs">{labels.resultsTitle}</span>
          </motion.div>
          <motion.div variants={item}>
            <CardTitle className="text-3xl md:text-4xl text-primary">{result.diseaseName}</CardTitle>
          </motion.div>
          <motion.div variants={item}>
            <CardDescription className="text-base mt-2 text-gray-600 leading-relaxed">
              {result.description}
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-8 pt-6">
          {/* Causes Section */}
          <motion.div variants={item} className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center gap-3 mb-4 text-orange-700">
              <AlertTriangle className="w-6 h-6" />
              <h4 className="text-xl font-bold font-display">{labels.causes}</h4>
            </div>
            <ul className="space-y-2">
              {result.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>{cause}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organic Treatment */}
            <motion.div variants={item} className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-center gap-3 mb-4 text-green-700">
                <Sprout className="w-6 h-6" />
                <h4 className="text-xl font-bold font-display">{labels.organic}</h4>
              </div>
              <ul className="space-y-3">
                {result.organicTreatment.map((treatment, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-green-100/50">
                    <Leaf className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm font-medium">{treatment}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Chemical Treatment */}
            <motion.div variants={item} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4 text-blue-700">
                <FlaskConical className="w-6 h-6" />
                <h4 className="text-xl font-bold font-display">{labels.chemical}</h4>
              </div>
              <ul className="space-y-3">
                {result.chemicalTreatment.map((treatment, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-blue-100/50">
                    <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{treatment}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div variants={item} className="pt-4 flex flex-col items-center gap-4">
            <Button size="lg" onClick={onReset} className="w-full md:w-auto min-w-[200px] text-lg">
              {labels.tryAgain}
            </Button>
            <p className="text-xs text-muted-foreground text-center max-w-md">
              {labels.disclaimer}
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
