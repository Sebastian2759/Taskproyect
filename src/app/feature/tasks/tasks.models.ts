import { PagedResult } from '../../core/http/api.models';

export type TaskStatus = 'Pending' | 'InProgress' | 'Done';

export interface TaskListItem {
  id: string;
  title: string;
  assignedUserId: string;
  assignedUserName: string;
  status: TaskStatus;
  priorityId?: string | null;
  priority?: string | null;
  createdAtUtc: string;
  totalCount: number;
}

export interface GetTasksResponse {
  page: PagedResult<TaskListItem>;
}

export interface CreateTaskRequest {
  title: string;
  description?: string | null;
  assignedUserId: string;
  priorityId?: string | null;
  additionalInfo?: string | null;
}

export interface CreateTaskResponse {
  task: { id: string; title: string; assignedUserId: string; statusId: string; };
}

export interface UpdateTaskStatusResponse {
  task: { id: string; statusId: string; status: string; updatedAtUtc: string; };
}
