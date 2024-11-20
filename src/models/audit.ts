import mongoose, { Schema, Document } from 'mongoose';

export interface IAudit extends Document {
  title: string;
  description: string;
  projectName: string;
  clientName: string;
  status: 'draft' | 'in_progress' | 'review' | 'completed';
  createdBy: string;
  assignedTo: string[];
  dueDate?: Date;
  completedDate?: Date;
  sections: {
    name: string;
    description?: string;
    score: number;
    findings: {
      severity: 'critical' | 'high' | 'medium' | 'low';
      title: string;
      description: string;
      recommendation: string;
      screenshots?: string[];
    }[];
  }[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const AuditSchema = new Schema<IAudit>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  projectName: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true
  },
  clientName: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true
  },
  status: {
    type: String,
    enum: {
      values: ['draft', 'in_progress', 'review', 'completed'],
      message: '{VALUE} is not a valid status'
    },
    default: 'draft'
  },
  createdBy: {
    type: String,
    required: [true, 'Creator ID is required']
  },
  assignedTo: [{
    type: String,
    ref: 'User'
  }],
  dueDate: {
    type: Date
  },
  completedDate: {
    type: Date
  },
  sections: [{
    name: {
      type: String,
      required: [true, 'Section name is required']
    },
    description: {
      type: String
    },
    score: {
      type: Number,
      required: [true, 'Score is required'],
      min: [0, 'Score cannot be less than 0'],
      max: [100, 'Score cannot be more than 100']
    },
    findings: [{
      severity: {
        type: String,
        enum: {
          values: ['critical', 'high', 'medium', 'low'],
          message: '{VALUE} is not a valid severity level'
        },
        required: [true, 'Severity is required']
      },
      title: {
        type: String,
        required: [true, 'Finding title is required'],
        trim: true
      },
      description: {
        type: String,
        required: [true, 'Finding description is required']
      },
      recommendation: {
        type: String,
        required: [true, 'Recommendation is required']
      },
      screenshots: [String]
    }]
  }],
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
AuditSchema.index({ projectName: 1 });
AuditSchema.index({ clientName: 1 });
AuditSchema.index({ status: 1 });
AuditSchema.index({ createdBy: 1 });
AuditSchema.index({ 'sections.score': 1 });

export default mongoose.models.Audit || mongoose.model<IAudit>('Audit', AuditSchema);