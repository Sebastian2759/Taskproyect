import { PagedResult } from '../../core/http/api.models';

export interface UserListItem {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAtUtc: string;
  updatedAtUtc: string;
  totalCount: number; // si lo traes por fila desde SP
}

export interface GetUsersResponse {
  page: PagedResult<UserListItem>;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface CreateUserResponse {
  user: { id: string; name: string; email: string; };
}
