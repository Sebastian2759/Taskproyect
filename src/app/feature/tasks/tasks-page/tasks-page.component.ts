import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { DateTimePipe } from '../../../shared/pipes/date-time.pipe';
import { PaginatorComponent } from '../../../shared/ui/paginator/paginator.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ConfirmDialogComponent } from '../../../shared/ui/confirm/confirm-dialog.component';
import { ToastService } from '../../../shared/ui/toast/toast.service';
import { ValuesService } from '../../values/values.service';
import { ValueItem } from '../../values/values.models';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    DateTimePipe, PaginatorComponent,
    TaskFormComponent, ContainerComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent {
  private tasks = inject(TasksService);
  private values = inject(ValuesService);
  private toast = inject(ToastService);

  @ViewChild(ConfirmDialogComponent) confirmDlg!: ConfirmDialogComponent;

  loading = false;
  loadingStatuses = false;
  updatingId: string | null = null;

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;

  statusFilter = ''; // '' = todos
  search = '';

  statuses: ValueItem[] = [];
  rows: any[] = [];

  async ngOnInit() {
    await Promise.all([this.loadStatuses(), this.load()]);
  }

  private async loadStatuses() {
    this.loadingStatuses = true;
    try {
      const res = await this.values.getTaskStatuses();
      this.statuses = res.data.items ?? [];
    } finally {
      this.loadingStatuses = false;
    }
  }

  async load() {
    this.loading = true;
    try {
      const res = await this.tasks.getPaged({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        status: this.statusFilter || null,
        search: this.search || null
      });

      this.rows = res.data.page.items;
      this.totalCount = res.data.page.totalCount;
    } finally {
      this.loading = false;
    }
  }

  async onPage(p: number) {
    this.pageNumber = p;
    await this.load();
  }

  // ✅ Acciones según regla de negocio: Pending -> InProgress, InProgress -> Done
  getNextAction(status: string): 'InProgress' | 'Done' | null {
    if (status === 'Pending') return 'InProgress';
    if (status === 'InProgress') return 'Done';
    return null;
  }

  async applyNextStatus(taskId: string, currentStatus: string) {
    const next = this.getNextAction(currentStatus);
    if (!next) return;

    const ok = await this.confirmDlg.ask('Cambiar estado', `¿Confirmas cambiar a ${next}?`);
    if (!ok) return;

    this.updatingId = taskId;
    try {
      const res = await this.tasks.updateStatus(taskId, next);
      this.toast.success(res.message || 'Estado actualizado');
      await this.load();
    } finally {
      this.updatingId = null;
    }
  }
}
