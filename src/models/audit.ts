import mongoose, { Schema, Document } from 'mongoose'

export interface IAudit extends Document {
  projectName: string
  clientName: string
  auditDate: Date
  auditor: {
    id: string
    email: string
  }
  status: 'draft' | 'in_review' | 'completed'
  createdAt: Date
  updatedAt: Date
}

const AuditSchema = new Schema({
  projectName: { type: String, required: true },
  clientName: { type: String, required: true },
  auditDate: { type: Date, default: Date.now },
  auditor: {
    id: { type: String, required: true },
    email: { type: String, required: true }
  },
  status: { 
    type: String, 
    enum: ['draft', 'in_review', 'completed'],
    default: 'draft'
  }
}, {
  timestamps: true
})

export default mongoose.models.Audit || mongoose.model<IAudit>('Audit', AuditSchema)