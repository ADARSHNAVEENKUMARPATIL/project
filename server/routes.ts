import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Simple password check (in production, use proper password hashing)
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Check if the user's role matches the requested role
      if (user.role !== role) {
        return res.status(401).json({ message: "Invalid role for this user" });
      }

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      const newUser = await storage.createUser(validatedData);
      
      // Return user data without password
      const { password: _, ...userWithoutPassword } = newUser;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  const httpServer = createServer(app);

  return httpServer;
}
