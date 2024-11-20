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

// =========== USER OPERATIONS ===========
export async function createUser(userData: Partial<IUser>): Promise<IUser> {
  try {
    await connectDB();
    const User = mongoose.model<IUser>('User');
    const user = new User(userData);
    await user.validate();
    return await user.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to create user: ${error.message}`);
    }
    throw new DatabaseError('Failed to create user');
  }
}

export async function getUserByAuth0Id(auth0Id: string): Promise<IUser | null> {
  try {
    await connectDB();
    const User = mongoose.model<IUser>('User');
    return await User.findOne({ auth0Id });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get user: ${error.message}`);
    }
    throw new DatabaseError('Failed to get user');
  }
}

export async function updateUser(auth0Id: string, updateData: Partial<IUser>): Promise<IUser | null> {
  try {
    await connectDB();
    const User = mongoose.model<IUser>('User');
    return await User.findOneAndUpdate({ auth0Id }, updateData, {
      new: true,
      runValidators: true
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to update user: ${error.message}`);
    }
    throw new DatabaseError('Failed to update user');
  }
}

// =========== TEAM OPERATIONS ===========
export async function createTeam(teamData: Partial<ITeam>): Promise<ITeam> {
  try {
    await connectDB();
    const Team = mongoose.model<ITeam>('Team');
    const team = new Team(teamData);
    await team.validate();
    return await team.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to create team: ${error.message}`);
    }
    throw new DatabaseError('Failed to create team');
  }
}

export async function updateTeam(teamId: string, updateData: Partial<ITeam>): Promise<ITeam | null> {
  try {
    await connectDB();
    const Team = mongoose.model<ITeam>('Team');
    return await Team.findByIdAndUpdate(teamId, updateData, {
      new: true,
      runValidators: true
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to update team: ${error.message}`);
    }
    throw new DatabaseError('Failed to update team');
  }
}

export async function getUserTeams(userId: string): Promise<ITeam[]> {
  try {
    await connectDB();
    const Team = mongoose.model<ITeam>('Team');
    return await Team.find({
      'members.userId': userId
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get user teams: ${error.message}`);
    }
    throw new DatabaseError('Failed to get user teams');
  }
}

// =========== AUDIT OPERATIONS ===========
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

// =========== COMMENT OPERATIONS ===========
export async function createComment(commentData: Partial<IComment>): Promise<IComment> {
  try {
    await connectDB();
    const Comment = mongoose.model<IComment>('Comment');
    const comment = new Comment(commentData);
    await comment.validate();

    if (comment.parent) {
      await Comment.findByIdAndUpdate(comment.parent, {
        $push: { replies: comment._id }
      });
    }

    return await comment.save();
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to create comment: ${error.message}`);
    }
    throw new DatabaseError('Failed to create comment');
  }
}

export async function getComments(auditId: string): Promise<IComment[]> {
  try {
    await connectDB();
    const Comment = mongoose.model<IComment>('Comment');
    return await Comment.find({ auditId }).sort({ createdAt: -1 });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get comments: ${error.message}`);
    }
    throw new DatabaseError('Failed to get comments');
  }
}
