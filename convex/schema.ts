// Convex initial schema for Tech Interview Simulator
// See: https://docs.convex.dev/database/schemas for details
import { defineSchema, defineTable } from "convex/server";

// User table: minimal for now, expanded later as needed
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(), // User's display name
    email: v.string(), // User's email address
    stackAuthId: v.string(), // Stack-Auth user id
    createdAt: v.number(), // Unix timestamp
  }),
});
