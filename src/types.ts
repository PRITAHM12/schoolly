export enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  DEMO_SCHEDULED = 'demo-scheduled',
  PILOT_STARTED = 'pilot-started',
  LOST = 'lost'
}

export interface Lead {
  id: string;
  schoolName: string;
  contactName: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt: any;
}

export interface School {
  id: string;
  name: string;
  adminEmail: string;
  pilotEndDate: any;
  isPaid: boolean;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed'
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  ownerId: string;
  createdAt: any;
  updatedAt: any;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}
