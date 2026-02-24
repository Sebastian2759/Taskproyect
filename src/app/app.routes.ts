import { Routes } from '@angular/router';
import { TasksPageComponent } from './feature/tasks/tasks-page/tasks-page.component';
import { UsersPageComponent } from './feature/users/users-page/users-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tasks' },
  { path: 'tasks', component: TasksPageComponent },
  { path: 'users', component: UsersPageComponent },
];
