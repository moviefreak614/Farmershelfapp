import { z } from 'zod';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  analysis: {
    analyze: {
      method: 'POST' as const,
      path: '/api/analyze' as const,
      // The endpoint will expect multipart/form-data with 'image' (file) and 'language' ('en' or 'hi')
      responses: {
        200: z.object({
          diseaseName: z.string(),
          description: z.string(),
          causes: z.array(z.string()),
          organicTreatment: z.array(z.string()),
          chemicalTreatment: z.array(z.string()),
        }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type AnalysisResponse = z.infer<typeof api.analysis.analyze.responses[200]>;
