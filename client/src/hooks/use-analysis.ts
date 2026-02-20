import { useMutation } from "@tanstack/react-query";
import { api, type AnalysisResponse } from "@shared/routes"; // Assuming these exist from your context
import { z } from "zod";

// Response schema based on the API definition provided in context
const AnalysisResponseSchema = z.object({
  diseaseName: z.string(),
  description: z.string(),
  causes: z.array(z.string()),
  organicTreatment: z.array(z.string()),
  chemicalTreatment: z.array(z.string()),
});

type AnalyzeParams = {
  image: File;
  language: 'en' | 'hi';
};

export function useAnalyzeCrop() {
  return useMutation({
    mutationFn: async ({ image, language }: AnalyzeParams) => {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('language', language);

      // Using raw fetch here because we need to send FormData
      // The shared api client helpers usually expect JSON
      const res = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header manually for FormData, browser does it with boundary
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to analyze image');
      }

      const data = await res.json();
      return AnalysisResponseSchema.parse(data);
    },
  });
}
