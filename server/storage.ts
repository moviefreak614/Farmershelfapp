import { db } from "./db";
import { analyses, type Analysis, type InsertAnalysis } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  getAnalyses(): Promise<Analysis[]>;
}

export class DatabaseStorage implements IStorage {
  async createAnalysis(analysis: InsertAnalysis): Promise<Analysis> {
    const [result] = await db.insert(analyses).values(analysis).returning();
    return result;
  }
  
  async getAnalyses(): Promise<Analysis[]> {
    return await db.select().from(analyses);
  }
}

export const storage = new DatabaseStorage();
