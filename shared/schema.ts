import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: text("role", { enum: ["super-admin", "doctor", "nurse", "patient"] }).notNull(),
  specialty: text("specialty"),
  department: text("department"),
  patientId: text("patient_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  doctorId: integer("doctor_id").references(() => users.id).notNull(),
  date: date("date").notNull(),
  time: text("time").notNull(),
  type: text("type").notNull(),
  status: text("status", { enum: ["upcoming", "completed", "cancelled"] }).default("upcoming"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  nurseId: integer("nurse_id").references(() => users.id).notNull(),
  patientId: integer("patient_id").references(() => users.id),
  description: text("description").notNull(),
  priority: text("priority", { enum: ["Low", "Medium", "High"] }).default("Medium"),
  status: text("status", { enum: ["Pending", "In Progress", "Completed"] }).default("Pending"),
  room: text("room"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const prescriptions = pgTable("prescriptions", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  doctorId: integer("doctor_id").references(() => users.id).notNull(),
  medication: text("medication").notNull(),
  dosage: text("dosage").notNull(),
  instructions: text("instructions").notNull(),
  status: text("status", { enum: ["Active", "Expired", "Discontinued"] }).default("Active"),
  prescribedDate: date("prescribed_date").defaultNow(),
  expiryDate: date("expiry_date"),
});

export const medicalRecords = pgTable("medical_records", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  doctorId: integer("doctor_id").references(() => users.id).notNull(),
  type: text("type", { enum: ["Lab Results", "Imaging", "Visit Notes", "Diagnosis"] }).notNull(),
  description: text("description").notNull(),
  attachmentUrl: text("attachment_url"),
  recordDate: date("record_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const vitals = pgTable("vitals", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => users.id).notNull(),
  nurseId: integer("nurse_id").references(() => users.id).notNull(),
  bloodPressure: text("blood_pressure"),
  heartRate: text("heart_rate"),
  temperature: text("temperature"),
  oxygenSaturation: text("oxygen_saturation"),
  recordedAt: timestamp("recorded_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  patientAppointments: many(appointments, { relationName: "patientAppointments" }),
  doctorAppointments: many(appointments, { relationName: "doctorAppointments" }),
  nurseTasks: many(tasks),
  patientPrescriptions: many(prescriptions, { relationName: "patientPrescriptions" }),
  doctorPrescriptions: many(prescriptions, { relationName: "doctorPrescriptions" }),
  patientRecords: many(medicalRecords, { relationName: "patientRecords" }),
  doctorRecords: many(medicalRecords, { relationName: "doctorRecords" }),
  patientVitals: many(vitals, { relationName: "patientVitals" }),
  nurseVitals: many(vitals, { relationName: "nurseVitals" }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  patient: one(users, {
    fields: [appointments.patientId],
    references: [users.id],
    relationName: "patientAppointments",
  }),
  doctor: one(users, {
    fields: [appointments.doctorId],
    references: [users.id],
    relationName: "doctorAppointments",
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  nurse: one(users, {
    fields: [tasks.nurseId],
    references: [users.id],
  }),
  patient: one(users, {
    fields: [tasks.patientId],
    references: [users.id],
  }),
}));

export const prescriptionsRelations = relations(prescriptions, ({ one }) => ({
  patient: one(users, {
    fields: [prescriptions.patientId],
    references: [users.id],
    relationName: "patientPrescriptions",
  }),
  doctor: one(users, {
    fields: [prescriptions.doctorId],
    references: [users.id],
    relationName: "doctorPrescriptions",
  }),
}));

export const medicalRecordsRelations = relations(medicalRecords, ({ one }) => ({
  patient: one(users, {
    fields: [medicalRecords.patientId],
    references: [users.id],
    relationName: "patientRecords",
  }),
  doctor: one(users, {
    fields: [medicalRecords.doctorId],
    references: [users.id],
    relationName: "doctorRecords",
  }),
}));

export const vitalsRelations = relations(vitals, ({ one }) => ({
  patient: one(users, {
    fields: [vitals.patientId],
    references: [users.id],
    relationName: "patientVitals",
  }),
  nurse: one(users, {
    fields: [vitals.nurseId],
    references: [users.id],
    relationName: "nurseVitals",
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  name: true,
  password: true,
  role: true,
  specialty: true,
  department: true,
  patientId: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

export const insertPrescriptionSchema = createInsertSchema(prescriptions).omit({
  id: true,
  prescribedDate: true,
});

export const insertMedicalRecordSchema = createInsertSchema(medicalRecords).omit({
  id: true,
  recordDate: true,
  createdAt: true,
});

export const insertVitalsSchema = createInsertSchema(vitals).omit({
  id: true,
  recordedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Prescription = typeof prescriptions.$inferSelect;
export type InsertPrescription = z.infer<typeof insertPrescriptionSchema>;
export type MedicalRecord = typeof medicalRecords.$inferSelect;
export type InsertMedicalRecord = z.infer<typeof insertMedicalRecordSchema>;
export type Vitals = typeof vitals.$inferSelect;
export type InsertVitals = z.infer<typeof insertVitalsSchema>;
