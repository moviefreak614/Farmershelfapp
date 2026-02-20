import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We can use this table to store analysis history if needed
export const analyses = pgTable("analyses", {
  id: serial("id").primaryKey(),
  imageUrl: text("image_url"),
  diseaseName: text("disease_name").notNull(),
  description: text("description").notNull(),
  causes: text("causes").notNull(),
  organicTreatment: text("organic_treatment").notNull(),
  chemicalTreatment: text("chemical_treatment").notNull(),
  language: varchar("language", { length: 2 }).notNull().default('en'),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertAnalysisSchema = createInsertSchema(analyses).omit({ id: true, createdAt: true });

export type Analysis = typeof analyses.$inferSelect;
export type InsertAnalysis = z.infer<typeof insertAnalysisSchema>;
