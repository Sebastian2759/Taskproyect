import { Injectable } from '@angular/core';
import { ApiClientService } from '../../core/http/api-client.service';
import { CreateUserRequest, CreateUserResponse, GetUsersResponse } from './users.models';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private api: ApiClientService) {}

  getPaged(q: any) {
    return this.api.get<GetUsersResponse>('/users', q);
  }

  create(body: CreateUserRequest) {
    return this.api.post<CreateUserResponse>('/users', body);
  }
}
