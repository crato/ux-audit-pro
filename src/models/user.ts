import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  name?: string;
  role: 'admin' | 'auditor' | 'viewer';
  teams: string[];
  profilePicture?: string;
  title?: string;
  isActive: boolean;
  lastLogin?: Date;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    theme?: 'light' | 'dark';
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  auth0Id: {
    type: String,
    required: [true, 'Auth0 ID is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  name: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'auditor', 'viewer'],
      message: '{VALUE} is not a valid role'
    },
    default: 'auditor'
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  profilePicture: String,
  title: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  preferences: {
    notifications: {
      type: Boolean,
      default: true
    },
    emailUpdates: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  }
}, {
  timestamps: true
});

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ auth0Id: 1 });
UserSchema.index({ teams: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);