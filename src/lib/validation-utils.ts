import { IUser } from '@/models/user';
import { ITeam } from '@/models/team';
import { IComment } from '@/models/comment';
import { IAudit } from '@/models/audit';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateUserData(data: Partial<IUser>) {
  const errors: string[] = [];

  if (!data.auth0Id) {
    errors.push('Auth0 ID is required');
  }

  if (!data.email) {
    errors.push('Email is required');
  } else if (!validateEmail(data.email)) {
    errors.push('Invalid email format');
  }

  if (data.role && !['admin', 'auditor', 'viewer'].includes(data.role)) {
    errors.push('Invalid role');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
}

export function validateTeamData(data: Partial<ITeam>) {
  const errors: string[] = [];

  if (!data.name) {
    errors.push('Team name is required');
  } else if (data.name.length > 50) {
    errors.push('Team name cannot be more than 50 characters');
  }

  if (data.description && data.description.length > 200) {
    errors.push('Description cannot be more than 200 characters');
  }

  if (!data.owner) {
    errors.push('Team owner is required');
  }

  if (data.members) {
    data.members.forEach((member, index) => {
      if (!member.userId) {
        errors.push(`Member ${index + 1} userId is required`);
      }
      if (!['owner', 'admin', 'member'].includes(member.role)) {
        errors.push(`Member ${index + 1} has invalid role`);
      }
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
}

export function validateCommentData(data: Partial<IComment>) {
  const errors: string[] = [];

  if (!data.auditId) {
    errors.push('Audit ID is required');
  }

  if (!data.content) {
    errors.push('Comment content is required');
  } else if (data.content.length > 2000) {
    errors.push('Comment cannot be more than 2000 characters');
  }

  if (!data.author) {
    errors.push('Author is required');
  }

  if (data.attachments) {
    data.attachments.forEach((attachment, index) => {
      if (!attachment.url) {
        errors.push(`Attachment ${index + 1} URL is required`);
      }
      if (!attachment.type) {
        errors.push(`Attachment ${index + 1} type is required`);
      }
      if (!attachment.name) {
        errors.push(`Attachment ${index + 1} name is required`);
      }
    });
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
}

// Enhanced audit validation from previous version
export function validateAuditData(data: Partial<IAudit>) {
  const errors: string[] = [];

  // Required fields
  const requiredFields = ['title', 'description', 'projectName', 'clientName', 'createdBy'];
  requiredFields.forEach(field => {
    if (!data[field as keyof IAudit]) {
      errors.push(`${field} is required`);
    }
  });

  // Length validations
  if (data.title && data.title.length > 100) {
    errors.push('Title cannot be more than 100 characters');
  }

  if (data.description && data.description.length > 500) {
    errors.push('Description cannot be more than 500 characters');
  }

  // Status validation
  if (data.status && !['draft', 'in_progress', 'review', 'completed'].includes(data.status)) {
    errors.push('Invalid status value');
  }

  // Sections validation
  if (data.sections) {
    if (!Array.isArray(data.sections)) {
      errors.push('Sections must be an array');
    } else {
      data.sections.forEach((section, index) => {
        if (!section.name) {
          errors.push(`Section ${index + 1} name is required`);
        }
        if (typeof section.score !== 'number' || section.score < 0 || section.score > 100) {
          errors.push(`Section ${index + 1} score must be between 0 and 100`);
        }

        // Validate findings
        if (section.findings) {
          section.findings.forEach((finding, findingIndex) => {
            if (!finding.severity || !['critical', 'high', 'medium', 'low'].includes(finding.severity)) {
              errors.push(`Finding ${findingIndex + 1} in section ${index + 1} has invalid severity`);
            }
            if (!finding.title) {
              errors.push(`Finding ${findingIndex + 1} in section ${index + 1} requires a title`);
            }
            if (!finding.description) {
              errors.push(`Finding ${findingIndex + 1} in section ${index + 1} requires a description`);
            }
            if (!finding.recommendation) {
              errors.push(`Finding ${findingIndex + 1} in section ${index + 1} requires a recommendation`);
            }
          });
        }
      });
    }
  }

  // Date validations
  if (data.dueDate && isNaN(Date.parse(data.dueDate.toString()))) {
    errors.push('Invalid due date format');
  }
  if (data.completedDate && isNaN(Date.parse(data.completedDate.toString()))) {
    errors.push('Invalid completed date format');
  }

  if (errors.length > 0) {
    throw new ValidationError(errors.join(', '));
  }

  return true;
}