import { db } from "./db";
import { users } from "@shared/schema";

async function seedDatabase() {
  console.log("Seeding database...");

  const demoUsers = [
    {
      email: "admin@hospital.com",
      name: "Super Admin",
      password: "admin123",
      role: "super-admin" as const,
      specialty: null,
      department: null,
      patientId: null,
    },
    {
      email: "dr.smith@hospital.com",
      name: "Dr. John Smith",
      password: "doctor123",
      role: "doctor" as const,
      specialty: "Cardiology",
      department: null,
      patientId: null,
    },
    {
      email: "nurse.johnson@hospital.com",
      name: "Sarah Johnson",
      password: "nurse123",
      role: "nurse" as const,
      specialty: null,
      department: "Emergency",
      patientId: null,
    },
    {
      email: "patient@email.com",
      name: "John Doe",
      password: "patient123",
      role: "patient" as const,
      specialty: null,
      department: null,
      patientId: "P001",
    }
  ];

  try {
    // Check if users already exist
    const existingUsers = await db.select().from(users).limit(1);
    
    if (existingUsers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    // Insert demo users
    await db.insert(users).values(demoUsers);
    console.log("Database seeded successfully with demo users!");
    
    console.log("\nDemo Login Credentials:");
    console.log("Super Admin: admin@hospital.com / admin123");
    console.log("Doctor: dr.smith@hospital.com / doctor123");
    console.log("Nurse: nurse.johnson@hospital.com / nurse123");
    console.log("Patient: patient@email.com / patient123");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seed if this file is executed directly
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

export { seedDatabase };