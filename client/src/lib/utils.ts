import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simple dictionary for UI translations
export const translations = {
  en: {
    title: "Crop Doctor AI",
    subtitle: "Instant disease detection for healthier crops",
    uploadTitle: "Upload Crop Image",
    uploadDesc: "Drag & drop or click to select a photo of the affected plant",
    analyzeBtn: "Analyze Crop",
    analyzing: "Analyzing...",
    resultsTitle: "Diagnosis Results",
    causes: "Possible Causes",
    organic: "Organic Solutions",
    chemical: "Chemical Treatments",
    tryAgain: "Analyze Another Image",
    error: "Something went wrong. Please try again.",
    noFile: "No file selected",
    selectFile: "Select a file",
    preview: "Image Preview",
    disclaimer: "AI diagnosis is for reference only. Consult an expert for confirmation."
  },
  hi: {
    title: "फसल डॉक्टर एआई",
    subtitle: "स्वस्थ फसलों के लिए तत्काल रोग पहचान",
    uploadTitle: "फसल की छवि अपलोड करें",
    uploadDesc: "प्रभावित पौधे की फोटो चुनें या खींचें और छोड़ें",
    analyzeBtn: "विश्लेषण करें",
    analyzing: "विश्लेषण हो रहा है...",
    resultsTitle: "निदान परिणाम",
    causes: "संभावित कारण",
    organic: "जैविक उपचार",
    chemical: "रासायनिक उपचार",
    tryAgain: "दूसरी छवि का विश्लेषण करें",
    error: "कुछ गलत हो गया। कृपया पुन: प्रयास करें।",
    noFile: "कोई फाइल नहीं चुनी गई",
    selectFile: "फाइल चुनें",
    preview: "छवि पूर्वावलोकन",
    disclaimer: "एआई निदान केवल संदर्भ के लिए है। पुष्टि के लिए विशेषज्ञ से सलाह लें।"
  }
};
