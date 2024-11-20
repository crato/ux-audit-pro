import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  auditId: string;
  sectionId?: string;
  findingId?: string;
  content: string;
  author: string;
  mentions: string[];
  attachments: {
    url: string;
    type: string;
    name: string;
  }[];
  parent?: string;
  replies: string[];
  isResolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
  auditId: {
    type: String,
    required: [true, 'Audit ID is required'],
    ref: 'Audit'
  },
  sectionId: {
    type: String,
    ref: 'Audit.sections'
  },
  findingId: {
    type: String,
    ref: 'Audit.sections.findings'
  },
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [2000, 'Comment cannot be more than 2000 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    ref: 'User'
  },
  mentions: [{
    type: String,
    ref: 'User'
  }],
  attachments: [{
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }],
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  isResolved: {
    type: Boolean,
    default: false
  },
  resolvedBy: {
    type: String,
    ref: 'User'
  },
  resolvedAt: Date
}, {
  timestamps: true
});

// Indexes
CommentSchema.index({ auditId: 1 });
CommentSchema.index({ author: 1 });
CommentSchema.index({ parent: 1 });
CommentSchema.index({ mentions: 1 });

export default mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);