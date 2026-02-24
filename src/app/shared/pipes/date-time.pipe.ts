import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateTime', standalone: true })
export class DateTimePipe implements PipeTransform {
  private fmt = new Intl.DateTimeFormat('es-CO', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });

  transform(value: string | Date | null | undefined): string {
    if (!value) return '-';
    const d = typeof value === 'string' ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return '-';
    return this.fmt.format(d);
  }
}
