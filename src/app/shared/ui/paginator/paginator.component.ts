import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  standalone: true,
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() pageNumber = 1;
  @Input() pageSize = 20;
  @Input() totalCount = 0;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages() {
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }
  prev() { this.pageChange.emit(Math.max(1, this.pageNumber - 1)); }
  next() { this.pageChange.emit(Math.min(this.totalPages, this.pageNumber + 1)); }
}
