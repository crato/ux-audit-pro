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

// User Operations
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

// Team Operations
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

export async function getTeam(teamId: string): Promise<ITeam | null> {
  try {
    await connectDB();
    const Team = mongoose.model<ITeam>('Team');
    return await Team.findById(teamId);
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get team: ${error.message}`);
    }
    throw new DatabaseError('Failed to get team');
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

// Comment Operations
export async function createComment(commentData: Partial<IComment>): Promise<IComment> {
  try {
    await connectDB();
    const Comment = mongoose.model<IComment>('Comment');
    const comment = new Comment(commentData);
    await comment.validate();

    // If this is a reply, update the parent comment
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

export async function getAuditComments(auditId: string): Promise<IComment[]> {
  try {
    await connectDB();
    const Comment = mongoose.model<IComment>('Comment');
    return await Comment.find({
      auditId,
      parent: null // Only get top-level comments
    }).sort({ createdAt: -1 });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get audit comments: ${error.message}`);
    }
    throw new DatabaseError('Failed to get audit comments');
  }
}

export async function getCommentReplies(commentId: string): Promise<IComment[]> {
  try {
    await connectDB();
    const Comment = mongoose.model<IComment>('Comment');
    return await Comment.find({
      parent: commentId
    }).sort({ createdAt: 1 });
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get comment replies: ${error.message}`);
    }
    throw new DatabaseError('Failed to get comment replies');
  }
}

// Extended Audit Operations
export async function getAuditWithDetails(auditId: string): Promise<any> {
  try {
    await connectDB();
    const Audit = mongoose.model<IAudit>('Audit');
    const Comment = mongoose.model<IComment>('Comment');
    const User = mongoose.model<IUser>('User');

    const [audit, comments, assignedUsers] = await Promise.all([
      Audit.findById(auditId),
      Comment.find({ auditId }).sort({ createdAt: -1 }),
      User.find({ _id: { $in: (await Audit.findById(auditId))?.assignedTo || [] } })
    ]);

    if (!audit) {
      throw new ValidationError('Audit not found');
    }

    return {
      ...audit.toObject(),
      comments,
      assignedUsers: assignedUsers.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email
      }))
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to get audit details: ${error.message}`);
    }
    throw new DatabaseError('Failed to get audit details');
  }
}

// Search Operations
export async function searchAudits(query: string, userId: string): Promise<IAudit[]> {
  try {
    await connectDB();
    const Audit = mongoose.model<IAudit>('Audit');
    return await Audit.find({
      $and: [
        {
          $or: [
            { title: { $regex: query, $options: 'i' } },
            { projectName: { $regex: query, $options: 'i' } },
            { clientName: { $regex: query, $options: 'i' } }
          ]
        },
        {
          $or: [
            { createdBy: userId },
            { assignedTo: userId }
          ]
        }
      ]
    }).limit(10);
  } catch (error) {
    if (error instanceof Error) {
      throw new DatabaseError(`Failed to search audits: ${error.message}`);
    }
    throw new DatabaseError('Failed to search audits');
  }
}