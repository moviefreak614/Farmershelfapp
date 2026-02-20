import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api, type AnalysisResponse } from "@shared/routes";
import { z } from "zod";
import multer from "multer";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Expose the analysis endpoint
  app.post(api.analysis.analyze.path, upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file uploaded", field: "image" });
      }

      const language = req.body.language || 'en';
      
      // Simulate processing delay of 2 seconds
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Placeholder response logic since a real model isn't integrated yet
      let response: AnalysisResponse;
      
      if (language === 'hi') {
        response = {
          diseaseName: "लीफ ब्लाइट (पत्ता झुलसा)",
          description: "यह एक फंगल संक्रमण है जो मुख्य रूप से पत्तियों को प्रभावित करता है, जिससे वे भूरे और मुरझाए हुए हो जाते हैं।",
          causes: ["लंबे समय तक उच्च आर्द्रता", "खराब वायु संचार", "संक्रमित मिट्टी"],
          organicTreatment: ["नीम के तेल का छिड़काव", "संक्रमित पत्तियों को हटाएं", "उचित धूप सुनिश्चित करें"],
          chemicalTreatment: ["कॉपर-आधारित फफूंदनाशक", "मैंकोजेब 2 ग्राम/लीटर का छिड़काव करें"],
        };
      } else {
        response = {
          diseaseName: "Leaf Blight",
          description: "A common fungal infection that primarily affects leaves, causing them to turn brown and wither.",
          causes: ["Prolonged high humidity", "Poor air circulation", "Infected soil or debris"],
          organicTreatment: ["Apply Neem oil spray", "Remove infected leaves immediately", "Ensure proper sunlight exposure"],
          chemicalTreatment: ["Copper-based fungicides", "Spray Mancozeb at 2g/liter of water"],
        };
      }
      
      // Optionally save to database
      await storage.createAnalysis({
        imageUrl: "simulated_url",
        diseaseName: response.diseaseName,
        description: response.description,
        causes: response.causes.join(', '),
        organicTreatment: response.organicTreatment.join(', '),
        chemicalTreatment: response.chemicalTreatment.join(', '),
        language: language
      });
      
      res.status(200).json(response);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}
