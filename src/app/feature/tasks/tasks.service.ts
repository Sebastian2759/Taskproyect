import { Injectable } from '@angular/core';
import { ApiClientService } from '../../core/http/api-client.service';
import { CreateTaskRequest, CreateTaskResponse, GetTasksResponse, UpdateTaskStatusResponse } from './tasks.models';

@Injectable({ providedIn: 'root' })
export class TasksService {
  constructor(private api: ApiClientService) {}

  getPaged(q: any) {
    return this.api.get<GetTasksResponse>('/tasks', q);
  }

  create(body: CreateTaskRequest) {
    return this.api.post<CreateTaskResponse>('/tasks', body);
  }

  updateStatus(id: string, status: string) {
    return this.api.put<UpdateTaskStatusResponse>(`/tasks/${id}/status`, { status });
  }
}
