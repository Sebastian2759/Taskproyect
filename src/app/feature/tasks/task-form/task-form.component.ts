import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { ToastService } from '../../../shared/ui/toast/toast.service';
import { UsersService } from '../../users/users.service';
import { ValuesService } from '../../values/values.service';
import { ValueItem } from '../../values/values.models';

type UserOption = { id: string; name: string; email: string };

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  @Output() created = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private tasks = inject(TasksService);
  private usersService = inject(UsersService);
  private values = inject(ValuesService);
  private toast = inject(ToastService);

  loading = false;
  loadingLookups = false;

  users: UserOption[] = [];
  priorities: ValueItem[] = [];

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: [''],
    assignedUserId: ['', [Validators.required]],
    priorityId: [''],
    additionalInfo: ['']
  });

  async ngOnInit() {
    await this.loadLookups();
  }

  private async loadLookups() {
    this.loadingLookups = true;
    try {
      const [usersRes, prioritiesRes] = await Promise.all([
        this.usersService.getPaged({ pageNumber: 1, pageSize: 200, isActive: true, search: null }),
        this.values.getTaskPriorities()
      ]);

      const rawUsers = usersRes.data.page.items ?? [];
      this.users = rawUsers.map((u: any) => ({
        id: u.id,
        name: u.name,
        email: u.email
      }));

      this.priorities = prioritiesRes.data.items ?? [];
    } finally {
      this.loadingLookups = false;
    }
  }

  async submit() {
    if (this.form.invalid) return;

    this.loading = true;
    try {
      const res = await this.tasks.create({
        title: this.form.value.title!,
        description: this.form.value.description || null,
        assignedUserId: this.form.value.assignedUserId!,
        priorityId: this.form.value.priorityId || null,
        additionalInfo: this.form.value.additionalInfo || null
      });

      this.toast.success(res.message || 'Tarea creada');
      this.form.reset();
      this.created.emit();
    } finally {
      this.loading = false;
    }
  }
}
