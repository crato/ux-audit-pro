import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description?: string;
  owner: string;
  members: {
    userId: string;
    role: 'owner' | 'admin' | 'member';
    joinedAt: Date;
  }[];
  settings: {
    isPrivate: boolean;
    allowMemberInvites: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema = new Schema<ITeam>({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    trim: true,
    maxlength: [50, 'Team name cannot be more than 50 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  owner: {
    type: String,
    required: [true, 'Team owner is required'],
    ref: 'User'
  },
  members: [{
    userId: {
      type: String,
      required: true,
      ref: 'User'
    },
    role: {
      type: String,
      enum: {
        values: ['owner', 'admin', 'member'],
        message: '{VALUE} is not a valid role'
      },
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  settings: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    allowMemberInvites: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes
TeamSchema.index({ name: 1 });
TeamSchema.index({ owner: 1 });
TeamSchema.index({ 'members.userId': 1 });

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);