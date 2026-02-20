import { pgTable, uuid, varchar, doublePrecision, timestamp, date } from "drizzle-orm/pg-core";

// Define the table
export const RentalSchema = pgTable("rentals", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientFirstName: varchar("customer_first_name", { length: 255 }).notNull(),
  clientLastName: varchar("customer_last_name", { length: 255 }).notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  revenue: doublePrecision("total_revenue").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Optional: Export types for use in your Adapter
export type RentalRow = typeof RentalSchema.$inferSelect; 
export type NewRentalRow = typeof RentalSchema.$inferInsert;