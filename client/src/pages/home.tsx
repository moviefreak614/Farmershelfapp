import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Loader2, FlaskConical, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAnalyzeCrop } from "@/hooks/use-analysis";
import { LanguageToggle } from "@/components/language-toggle";
import { ImageUpload } from "@/components/image-upload";
import { ResultsCard } from "@/components/results-card";
import { Button } from "@/components/ui/button";
import { translations } from "@/lib/utils";

export default function Home() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [image, setImage] = useState<File | null>(null);
  const { toast } = useToast();
  
  const analyzeMutation = useAnalyzeCrop();
  const t = translations[language];

  const handleAnalyze = () => {
    if (!image) {
      toast({
        title: t.noFile,
        description: t.uploadDesc,
        variant: "destructive",
      });
      return;
    }

    analyzeMutation.mutate(
      { image, language },
      {
        onError: (error) => {
          toast({
            title: t.error,
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  const resetAnalysis = () => {
    setImage(null);
    analyzeMutation.reset();
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-50 via-background to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20">
              <Sprout className="w-6 h-6" />
            </div>
            <h1 className="font-display font-bold text-xl md:text-2xl text-foreground hidden sm:block">
              {language === 'en' ? 'Crop Doctor' : 'फसल डॉक्टर'} <span className="text-primary">AI</span>
            </h1>
          </div>
          <LanguageToggle currentLang={language} onToggle={setLanguage} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-4xl relative z-10">
        
        {/* Intro Section - Hide when showing results to reduce clutter */}
        <AnimatePresence mode="wait">
          {!analyzeMutation.data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center mb-10 space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-gradient">
                {t.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-8">
          {/* Main Content Area */}
          <AnimatePresence mode="wait">
            {analyzeMutation.data ? (
              // RESULTS VIEW
              <ResultsCard 
                key="results"
                result={analyzeMutation.data} 
                onReset={resetAnalysis} 
                labels={t}
              />
            ) : (
              // UPLOAD VIEW
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-2xl mx-auto space-y-8"
              >
                <div className="bg-white rounded-[2rem] p-4 md:p-8 shadow-xl shadow-green-900/5 border border-white/50 backdrop-blur-sm">
                  <ImageUpload 
                    onImageSelect={setImage} 
                    selectedImage={image}
                    labels={t}
                  />

                  <div className="mt-8 flex justify-center">
                    <Button 
                      size="lg" 
                      onClick={handleAnalyze}
                      disabled={!image || analyzeMutation.isPending}
                      className="w-full md:w-auto min-w-[200px] text-lg rounded-xl h-14"
                    >
                      {analyzeMutation.isPending ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {t.analyzing}
                        </>
                      ) : (
                        t.analyzeBtn
                      )}
                    </Button>
                  </div>
                </div>

                {/* Features Grid - Only show on home state */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                  <div className="p-6 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{language === 'en' ? 'Instant Detection' : 'तत्काल पहचान'}</h3>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Get results in seconds using advanced AI.' : 'उन्नत AI का उपयोग करके सेकंड में परिणाम प्राप्त करें।'}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                      <FlaskConical className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{language === 'en' ? 'Expert Solutions' : 'विशेषज्ञ समाधान'}</h3>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Get both organic and chemical treatment options.' : 'जैविक और रासायनिक दोनों उपचार विकल्प प्राप्त करें।'}</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/50 border border-white/60 hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                      <Leaf className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">{language === 'en' ? 'Multiple Crops' : 'कई फसलें'}</h3>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'Supports wide variety of common farm crops.' : 'आम कृषि फसलों की विस्तृत विविधता का समर्थन करता है।'}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground mt-auto border-t bg-white/30">
        <p>© {new Date().getFullYear()} Crop Doctor AI. {language === 'en' ? 'Helping farmers grow better.' : 'किसानों को बेहतर फसल उगाने में मदद करना।'}</p>
      </footer>
    </div>
  );
}
