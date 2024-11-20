import { connectDB } from './db';
import mongoose from 'mongoose';
import { IAudit } from '@/models/audit';
import { IUser } from '@/models/user';
import { ITeam } from '@/models/team';
import { IComment } from '@/models/comment';
import { ValidationError } from './validation-utils';

export class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
  }
}

// Audit Operations
export async function createAudit(auditData: Partial<IAudit>): Promise<IAudit> {
  try {
    await connectDB();
    const Audit = mongoose.model<IAudit>('Audit');
    const audit = new Audit(auditData);
    await audit.validate();
    return await audit.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to create audit: ${error.message}`);
    }
    throw new DatabaseError('Failed to create audit');
  }
}

export async function listAudits(filters: {
  createdBy?: string;
  status?: IAudit['status'];
  clientName?: string;
  projectName?: string;
  page?: number;
  limit?: number;
}) {
  try {
    await connectDB();
    const Audit = mongoose.model<IAudit>('Audit');
    
    const query: any = {};
    if (filters.createdBy) query.createdBy = filters.createdBy;
    if (filters.status) query.status = filters.status;
    if (filters.clientName) query.clientName = new RegExp(filters.clientName, 'i');
    if (filters.projectName) query.projectName = new RegExp(filters.projectName, 'i');

    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [audits, total] = await Promise.all([
      Audit.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Audit.countDocuments(query)
    ]);

    return {
      audits,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to list audits: ${error.message}`);
    }
    throw new DatabaseError('Failed to list audits');
  }
}

// Rest of the code remains the same...