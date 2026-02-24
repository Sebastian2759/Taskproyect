import { Injectable } from '@angular/core';
import { ApiClientService } from '../../core/http/api-client.service';
import { GetValuesResponse } from './values.models';

@Injectable({ providedIn: 'root' })
export class ValuesService {
  constructor(private api: ApiClientService) {}

  getTaskStatuses() {
    // GET /api/v1/values/task-statuses
    return this.api.get<GetValuesResponse>('/values/task-statuses');
  }

  getTaskPriorities() {
    // GET /api/v1/values/task-priorities
    return this.api.get<GetValuesResponse>('/values/task-priorities');
  }
}
