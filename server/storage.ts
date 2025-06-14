import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Initialize with demo users
    this.initializeDemoUsers();
  }

  private initializeDemoUsers() {
    const demoUsers: InsertUser[] = [
      {
        email: 'admin@medora.com',
        name: 'Admin User',
        password: 'admin123',
        role: 'super-admin',
        specialty: null,
        department: null,
        patientId: null
      },
      {
        email: 'dr.smith@medora.com',
        name: 'Dr. Smith',
        password: 'doctor123',
        role: 'doctor',
        specialty: 'Cardiology',
        department: null,
        patientId: null
      },
      {
        email: 'nurse.johnson@medora.com',
        name: 'Nurse Johnson',
        password: 'nurse123',
        role: 'nurse',
        specialty: null,
        department: 'Emergency',
        patientId: null
      },
      {
        email: 'patient.doe@medora.com',
        name: 'John Doe',
        password: 'patient123',
        role: 'patient',
        specialty: null,
        department: null,
        patientId: 'P12345'
      }
    ];

    demoUsers.forEach(userData => {
      const id = this.currentId++;
      const user: User = {
        ...userData,
        id,
        specialty: userData.specialty || null,
        department: userData.department || null,
        patientId: userData.patientId || null
      };
      this.users.set(id, user);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      specialty: insertUser.specialty || null,
      department: insertUser.department || null,
      patientId: insertUser.patientId || null
    };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
