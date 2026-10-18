import { desc, eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { commentary } from "../db/schema.js";
import { createCommentarySchema, listCommentaryQuerySchema } from "../validation/commentary.js";
import { matchIdParamSchema } from "../validation/matches.js";

const MAX_LIMIT = 100;

export const commentaryController = {
  getMatchCommentary: async (req, res) => {
    const parsedParams = matchIdParamSchema.safeParse(req.params);

    if (!parsedParams.success) {
      return res.status(400).json({
        error: "Invalid match ID.",
        details: parsedParams.error.issues,
      });
    }

    const parsedQuery = listCommentaryQuerySchema.safeParse(req.query);

    if (!parsedQuery.success) {
      return res.status(400).json({
        error: "Invalid query.",
        details: parsedQuery.error.issues,
      });
    }

    try {
      const { id: matchId } = parsedParams.data;
      const { limit = 10 } = parsedQuery.data;

      const safeLimit = Math.min(limit, MAX_LIMIT);

      const data = await db
        .select()
        .from(commentary)
        .where(eq(commentary.matchId, matchId))
        .orderBy(desc(commentary.createdAt))
        .limit(safeLimit);

      return res.json({ data });
    } catch (error) {
      console.error("Failed to list commentary:", error);
      return res.status(500).json({ error: "Failed to list commentary." });
    }
  },

  createCommentary: async (req, res) => {
    const parsedParams = matchIdParamSchema.safeParse(req.params);

    if (!parsedParams.success) {
      return res.status(400).json({
        error: "Invalid match ID.",
        details: parsedParams.error.issues,
      });
    }

    const parsedBody = createCommentarySchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({
        error: "Invalid payload.",
        details: parsedBody.error.issues,
      });
    }

    try {
      const [event] = await db
        .insert(commentary)
        .values({ ...parsedBody.data, matchId: parsedParams.data.id })
        .returning();

      return res.status(201).json({ data: event });
    } catch (error) {
      console.error("Failed to create commentary:", error);
      return res.status(500).json({ error: "Failed to create commentary." });
    }
  }
}