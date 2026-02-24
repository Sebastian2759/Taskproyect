import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { DateTimePipe } from '../../../shared/pipes/date-time.pipe';
import { PaginatorComponent } from '../../../shared/ui/paginator/paginator.component';
import { UserFormComponent } from '../user-form/user-form.component';
import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, DateTimePipe, PaginatorComponent, UserFormComponent, ContainerComponent,FormsModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {
  private users = inject(UsersService);

  loading = false;

  pageNumber = 1;
  pageSize = 10;
  totalCount = 0;

  search = '';
  isActive: boolean | null = true;

  rows: any[] = [];

  async load() {
    this.loading = true;
    try {
      const res = await this.users.getPaged({
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        search: this.search,
        isActive: this.isActive
      });

      this.rows = res.data.page.items;
      this.totalCount = res.data.page.totalCount;
    } finally {
      this.loading = false;
    }
  }

  async ngOnInit() { await this.load(); }

  async onPage(p: number) {
    this.pageNumber = p;
    await this.load();
  }
}
